import AppError from "../../../shared/errors/AppError";
import {
  WorkoutUpdate,
  WorkoutsRepository,
} from "../workouts.repositories/workouts.repository";

const updateWorkoutUseCase =
  ({ workoutsRepository }: { workoutsRepository: WorkoutsRepository }) =>
  async ({
    id,
    ownerUserId,
    updates,
  }: {
    id: string;
    ownerUserId: string;
    updates: WorkoutUpdate;
  }) => {
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
