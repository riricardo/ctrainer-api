import AppError from "../../../shared/errors/AppError";
import { WorkoutsRepository } from "../workouts.repositories/workouts.repository";

const deleteWorkoutUseCase =
  ({ workoutsRepository }: { workoutsRepository: WorkoutsRepository }) =>
  async ({ id, ownerUserId }: { id: string; ownerUserId: string }) => {
    const workout = await workoutsRepository.findById(id);
    if (!workout) {
      throw AppError.workoutNotFound();
    }

    if (workout.ownerUserId !== ownerUserId) {
      throw AppError.forbidden();
    }

    await workoutsRepository.deleteById(id);
  };

export default deleteWorkoutUseCase;
