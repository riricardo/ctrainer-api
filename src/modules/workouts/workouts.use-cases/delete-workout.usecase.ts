import AppError from "../../../shared/errors/AppError";
import httpStatus from "../../../shared/http/http-status";

const deleteWorkoutUseCase =
  ({ workoutsRepository }: { workoutsRepository: any }) =>
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
