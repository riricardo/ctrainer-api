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

export type WorkoutRecord = WorkoutInput & {
  _id?: unknown;
  id?: string;
  __v?: number;
  createdAt?: Date;
  updatedAt?: Date;
  toObject?: (options?: unknown) => WorkoutRecord;
};

export type WorkoutsRepository = {
  create: (data: WorkoutInput) => Promise<WorkoutRecord>;
  findById: (id: string) => Promise<WorkoutRecord | null>;
  updateById: (
    id: string,
    data: WorkoutUpdate
  ) => Promise<WorkoutRecord | null>;
  deleteById: (id: string) => Promise<WorkoutRecord | null>;
  listByOwner: (ownerUserId: string) => Promise<WorkoutRecord[]>;
  listPublic: (search?: string) => Promise<WorkoutRecord[]>;
};
