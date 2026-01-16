import { WorkoutResponse } from "../workouts.dtos";

const mapWorkout = (workout: any): WorkoutResponse | null => {
  if (!workout) {
    return null;
  }

  const plain = workout.toObject ? workout.toObject({ versionKey: false }) : workout;
  const id = plain._id ? String(plain._id) : plain.id;
  const { _id, __v, ...rest } = plain;

  return {
    id,
    ...rest,
  };
};

export { mapWorkout };
