import AppError from "shared/errors/AppError";
import { WorkoutsRepository } from "modules/workouts/repositories/workouts.repository";

type DeleteWorkoutUseCaseDependencies = {
  workoutsRepository: WorkoutsRepository;
};

type DeleteWorkoutUseCaseInput = {
  id: string;
  ownerUserId: string;
};

const deleteWorkoutUseCase =
  ({ workoutsRepository }: DeleteWorkoutUseCaseDependencies) =>
  async ({ id, ownerUserId }: DeleteWorkoutUseCaseInput) => {
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
