const AppError = require("../../../shared/errors/AppError");
const httpStatus = require("../../../shared/http/http-status");

const updateWorkoutUseCase =
  ({ workoutsRepository }) =>
  async ({ id, ownerUserId, updates }) => {
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

module.exports = updateWorkoutUseCase;
