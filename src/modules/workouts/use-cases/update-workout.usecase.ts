import AppError from "../../../shared/errors/AppError";
import {
  WorkoutUpdate,
  WorkoutsRepository,
} from "../repositories/workouts.repository";

type UpdateWorkoutUseCaseDependencies = {
  workoutsRepository: WorkoutsRepository;
};

type UpdateWorkoutUseCaseInput = {
  id: string;
  ownerUserId: string;
  updates: WorkoutUpdate;
};

const updateWorkoutUseCase =
  ({ workoutsRepository }: UpdateWorkoutUseCaseDependencies) =>
  async ({ id, ownerUserId, updates }: UpdateWorkoutUseCaseInput) => {
    const workout = await workoutsRepository.findById(id);
    if (!workout) {
      throw AppError.workoutNotFound();
    }

    if (workout.ownerUserId !== ownerUserId) {
      throw AppError.forbidden();
    }

    return workoutsRepository.updateById(id, updates);
  };

export default updateWorkoutUseCase;
