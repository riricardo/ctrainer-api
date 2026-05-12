import { WorkoutResponse } from "./workouts.dtos";
import { Workout } from "./workouts.types";

const mapWorkout = (workout: Workout | null): WorkoutResponse | null => {
  if (!workout) {
    return null;
  }

  return {
    id: workout.id,
    ownerUserId: workout.ownerUserId,
    title: workout.title,
    description: workout.description,
    isPublic: workout.isPublic,
    exercises: workout.exercises,
    createdAt: workout.createdAt,
    updatedAt: workout.updatedAt,
  };
};

export { mapWorkout };
