export type WorkoutLogExerciseInput = Record<string, unknown>;

export type CreateWorkoutLogRequestBody = {
  workoutId?: string;
  startedAt?: string;
  endedAt?: string;
  durationSeconds?: number;
  notes?: string;
  exercises?: WorkoutLogExerciseInput[];
};

export type WorkoutLogResponse = {
  id: string;
  ownerUserId?: string;
  workoutId?: string;
  startedAt?: string;
  endedAt?: string;
  durationSeconds?: number;
  notes?: string;
  exercises?: WorkoutLogExerciseInput[];
  createdAt?: string;
  updatedAt?: string;
};
