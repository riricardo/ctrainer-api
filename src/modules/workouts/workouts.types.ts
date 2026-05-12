import { WorkoutExerciseInput } from "./workouts.dtos";

export type Workout = {
  id: string;
  ownerUserId: string;
  title: string;
  description: string;
  isPublic: boolean;
  exercises: WorkoutExerciseInput[];
  createdAt: string;
  updatedAt: string;
};
