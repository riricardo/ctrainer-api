import { WorkoutExerciseInput } from "./workouts.dtos";

export type Workout = {
  id: string;
  ownerUserId: string;
  title: string;
  description: string;
  difficulty?: string;
  duration?: number;
  isPublic: boolean;
  copiedFromWorkoutId?: string;
  exercises: WorkoutExerciseInput[];
  createdAt: string;
  updatedAt: string;
};
