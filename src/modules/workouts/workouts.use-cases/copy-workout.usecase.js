const AppError = require("../../../shared/errors/AppError");
const httpStatus = require("../../../shared/http/http-status");

const copyWorkoutUseCase =
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

    const copyData = workout.toObject ? workout.toObject() : workout;
    const { _id, __v, ownerUserId: originalOwner, createdAt, updatedAt, ...rest } =
      copyData;

    return workoutsRepository.create({
      ...rest,
      ownerUserId,
      isPublic: false,
    });
  };

module.exports = copyWorkoutUseCase;
