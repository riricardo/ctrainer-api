const AppError = require("../../../shared/errors/AppError");
const httpStatus = require("../../../shared/http/http-status");

const getWorkoutUseCase =
  ({ workoutsRepository }) =>
  async ({ id, ownerUserId }) => {
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

module.exports = getWorkoutUseCase;
