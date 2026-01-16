import AppError from "../../../shared/errors/AppError";
import httpStatus from "../../../shared/http/http-status";
import {
  WorkoutInput,
  WorkoutsRepository,
} from "../workouts.repositories/workouts.repository";
import { WorkoutDocument } from "../workouts.model";

const copyWorkoutUseCase =
  ({ workoutsRepository }: { workoutsRepository: WorkoutsRepository }) =>
  async ({ id, ownerUserId }: { id: string; ownerUserId: string }) => {
    const workout = await workoutsRepository.findById(id);
    if (!workout) {
      throw new AppError(
        "Workout not found",
        httpStatus.notFound,
        "workout_not_found"
      );
    }

    if (!workout.isPublic && workout.ownerUserId !== ownerUserId) {
      throw new AppError("Forbidden", httpStatus.forbidden, "forbidden");
    }

    const copyData = (workout.toObject ? workout.toObject() : workout) as WorkoutDocument;
    const {
      _id,
      __v,
      ownerUserId: originalOwner,
      createdAt,
      updatedAt,
      title,
      description,
      exercises,
    } = copyData;

    const payload: WorkoutInput = {
      ownerUserId,
      title,
      description,
      isPublic: false,
      exercises,
    };

    return workoutsRepository.create(payload);
  };

export default copyWorkoutUseCase;
