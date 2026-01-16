import AppError from "../../../shared/errors/AppError";
import httpStatus from "../../../shared/http/http-status";
import { WorkoutsRepository } from "../workouts.repositories/workouts.repository";

const deleteWorkoutUseCase =
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

    if (workout.ownerUserId !== ownerUserId) {
      throw new AppError("Forbidden", httpStatus.forbidden, "forbidden");
    }

    await workoutsRepository.deleteById(id);
  };

export default deleteWorkoutUseCase;
