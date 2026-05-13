import AppError from "../../../shared/errors/AppError";
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

    const { title, description, difficulty, duration, exercises } = workout;

    const payload: WorkoutInput = {
      ownerUserId,
      title,
      description,
      difficulty,
      duration,
      isPublic: false,
      copiedFromWorkoutId: workout.id,
      exercises,
    };

    return workoutsRepository.create(payload);
  };

export default copyWorkoutUseCase;
