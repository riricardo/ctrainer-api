const AppError = require("../../../shared/errors/AppError");
const httpStatus = require("../../../shared/http/http-status");

const deleteWorkoutUseCase =
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

    if (workout.ownerUserId !== ownerUserId) {
      throw new AppError("Forbidden", httpStatus.forbidden, "forbidden");
    }

    await workoutsRepository.deleteById(id);
  };

module.exports = deleteWorkoutUseCase;
