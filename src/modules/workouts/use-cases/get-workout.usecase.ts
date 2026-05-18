import AppError from "shared/errors/AppError";
import { WorkoutsRepository } from "modules/workouts/repositories/workouts.repository";

type GetWorkoutUseCaseDependencies = {
  workoutsRepository: WorkoutsRepository;
};

type GetWorkoutUseCaseInput = {
  id: string;
  ownerUserId: string;
};

const getWorkoutUseCase =
  ({ workoutsRepository }: GetWorkoutUseCaseDependencies) =>
  async ({ id, ownerUserId }: GetWorkoutUseCaseInput) => {
    const workout = await workoutsRepository.findById(id);
    if (!workout) {
      throw AppError.workoutNotFound();
    }

    if (!workout.isPublic && workout.ownerUserId !== ownerUserId) {
      throw AppError.forbidden();
    }

    return workout;
  };

export default getWorkoutUseCase;
