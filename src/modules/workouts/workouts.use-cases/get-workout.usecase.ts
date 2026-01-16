import AppError from "../../../shared/errors/AppError";
import httpStatus from "../../../shared/http/http-status";

const getWorkoutUseCase =
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

    if (!workout.isPublic && workout.ownerUserId !== ownerUserId) {
      throw new AppError("Forbidden", httpStatus.forbidden, "forbidden");
    }

    return workout;
  };

export default getWorkoutUseCase;
