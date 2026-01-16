export type WorkoutExerciseInput = Record<string, unknown>;

export type CreateWorkoutRequestBody = {
  title: string;
  description?: string;
  isPublic?: boolean;
  exercises?: WorkoutExerciseInput[];
};

export type UpdateWorkoutRequestBody = {
  title?: string;
  description?: string;
  isPublic?: boolean;
  exercises?: WorkoutExerciseInput[];
};

export type ListPublicWorkoutsQuery = {
  search?: string;
};

export type WorkoutResponse = {
  id: string;
  ownerUserId?: string;
  title?: string;
  description?: string;
  isPublic?: boolean;
  exercises?: WorkoutExerciseInput[];
  createdAt?: string;
  updatedAt?: string;
};
