import AppError from "../../../shared/errors/AppError";
import httpStatus from "../../../shared/http/http-status";
import {
  WorkoutUpdate,
  WorkoutsRepository,
} from "../workouts.repositories/workouts.repository";

const updateWorkoutUseCase =
  ({ workoutsRepository }: { workoutsRepository: WorkoutsRepository }) =>
  async ({
    id,
    ownerUserId,
    updates,
  }: {
    id: string;
    ownerUserId: string;
    updates: WorkoutUpdate;
  }) => {
    const workout = await workoutsRepository.findById(id);
    if (!workout) {
      throw new AppError(
        "Workout not found",
        httpStatus.notFound,
        "workout_not_found"
      );
    }

    if (workout.ownerUserId !== ownerUserId) {
      throw new AppError("Forbidden", httpStatus.forbidden, "forbidden");
    }

    return workoutsRepository.updateById(id, updates);
  };

export default updateWorkoutUseCase;
