import AppError from "../../../shared/errors/AppError";
import {
  WorkoutInput,
  WorkoutsRepository,
} from "../workouts.repositories/workouts.repository";
import { WorkoutDocument } from "../workouts.model";

const copyWorkoutUseCase =
  ({ workoutsRepository }: { workoutsRepository: WorkoutsRepository }) =>
  async ({ id, ownerUserId }: { id: string; ownerUserId: string }) => {
    const workout = await workoutsRepository.findById(id);
    if (!workout) {
      throw AppError.workoutNotFound();
    }

    if (!workout.isPublic && workout.ownerUserId !== ownerUserId) {
      throw AppError.forbidden();
    }

    const copyData = (workout.toObject ? workout.toObject() : workout) as WorkoutDocument;
    const { title, description, exercises } = copyData;

    const payload: WorkoutInput = {
      ownerUserId,
      title,
      description,
      isPublic: false,
      exercises,
    };

    return workoutsRepository.create(payload);
  };

export default copyWorkoutUseCase;
