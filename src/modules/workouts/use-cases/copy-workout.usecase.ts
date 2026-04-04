import AppError from "../../../shared/errors/AppError";
import { WorkoutDocument } from "../workouts.model";
import {
  WorkoutInput,
  WorkoutsRepository,
} from "../repositories/workouts.repository";

type CopyWorkoutUseCaseDependencies = {
  workoutsRepository: WorkoutsRepository;
};

type CopyWorkoutUseCaseInput = {
  id: string;
  ownerUserId: string;
};

const copyWorkoutUseCase =
  ({ workoutsRepository }: CopyWorkoutUseCaseDependencies) =>
  async ({ id, ownerUserId }: CopyWorkoutUseCaseInput) => {
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
