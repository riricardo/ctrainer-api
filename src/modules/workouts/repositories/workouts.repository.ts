import { WorkoutExerciseInput } from "modules/workouts/workouts.dtos";
import { Workout } from "modules/workouts/workouts.types";

export type WorkoutInput = {
  ownerUserId: string;
  title: string;
  description?: string;
  difficulty?: string;
  duration?: number;
  isPublic?: boolean;
  copiedFromWorkoutId?: string;
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
