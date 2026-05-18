import {
  WorkoutInput,
  WorkoutsRepository,
} from "modules/workouts/repositories/workouts.repository";

type CreateWorkoutUseCaseDependencies = {
  workoutsRepository: WorkoutsRepository;
};

const createWorkoutUseCase =
  ({ workoutsRepository }: CreateWorkoutUseCaseDependencies) =>
  async (payload: WorkoutInput) =>
    workoutsRepository.create(payload);

export default createWorkoutUseCase;
