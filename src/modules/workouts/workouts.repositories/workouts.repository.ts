import { WorkoutDocument } from "../workouts.model";
import { WorkoutExerciseInput } from "../workouts.dtos";

export type WorkoutInput = {
  ownerUserId: string;
  title: string;
  description?: string;
  isPublic?: boolean;
  exercises?: WorkoutExerciseInput[];
};

export type WorkoutUpdate = Partial<
  Omit<WorkoutInput, "ownerUserId">
>;

export type WorkoutsRepository = {
  create: (data: WorkoutInput) => Promise<WorkoutDocument>;
  findById: (id: string) => Promise<WorkoutDocument | null>;
  updateById: (
    id: string,
    data: WorkoutUpdate
  ) => Promise<WorkoutDocument | null>;
  deleteById: (id: string) => Promise<WorkoutDocument | null>;
  listByOwner: (ownerUserId: string) => Promise<WorkoutDocument[]>;
  listPublic: (search?: string) => Promise<WorkoutDocument[]>;
};
