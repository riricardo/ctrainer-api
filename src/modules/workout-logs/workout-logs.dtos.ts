import { WorkoutLogStatus } from "modules/workout-logs/workout-logs.constants";

export type WorkoutLogExerciseInput = {
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
  restSeconds?: number;
  notes?: string;
  imageUrl?: string;
  longDescription?: string;
};

export type CreateWorkoutLogRequestBody = {
  workoutId?: string;
  startedAt?: string;
  completedAt?: string;
  durationSeconds?: number;
  status?: WorkoutLogStatus;
  notes?: string;
  exercises?: WorkoutLogExerciseInput[];
};

export type WorkoutLogResponse = {
  id: string;
  ownerUserId?: string;
  createdBy?: string;
  workoutId?: string;
  startedAt?: string;
  completedAt?: string;
  durationSeconds?: number;
  status?: WorkoutLogStatus;
  notes?: string;
  exercises?: WorkoutLogExerciseInput[];
  createdAt?: string;
  updatedAt?: string;
};
