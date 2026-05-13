export type WorkoutExerciseInput = {
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
  restSeconds?: number;
  notes?: string;
  imageUrl?: string;
  longDescription?: string;
};

export type CreateWorkoutRequestBody = {
  title: string;
  description?: string;
  difficulty?: string;
  duration?: number;
  isPublic?: boolean;
  exercises?: WorkoutExerciseInput[];
};

export type UpdateWorkoutRequestBody = {
  title?: string;
  description?: string;
  difficulty?: string;
  duration?: number;
  isPublic?: boolean;
  exercises?: WorkoutExerciseInput[];
};

export type ListPublicWorkoutsQuery = {
  search?: string;
};

export type WorkoutResponse = {
  id: string;
  ownerUserId?: string;
  createdBy?: string;
  title?: string;
  description?: string;
  difficulty?: string;
  duration?: number;
  isPublic?: boolean;
  copiedFromWorkoutId?: string;
  exercises?: WorkoutExerciseInput[];
  createdAt?: string;
  updatedAt?: string;
};
