import { WorkoutExerciseInput } from "../workouts.dtos";
import { Workout } from "../workouts.types";

export type WorkoutInput = {
  ownerUserId: string;
  title: string;
  description?: string;
  isPublic?: boolean;
  exercises?: WorkoutExerciseInput[];
};

export type WorkoutUpdate = Partial<Omit<WorkoutInput, "ownerUserId">>;

export interface WorkoutsRepository {
  create(data: WorkoutInput): Promise<Workout>;
  findById(id: string): Promise<Workout | null>;
  updateById(
    id: string,
    data: WorkoutUpdate
  ): Promise<Workout | null>;
  deleteById(id: string): Promise<Workout | null>;
  listByOwner(ownerUserId: string): Promise<Workout[]>;
  listPublic(search?: string): Promise<Workout[]>;
}
