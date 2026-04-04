import {
  WorkoutInput,
  WorkoutsRepository,
} from "../repositories/workouts.repository";

type CreateWorkoutUseCaseDependencies = {
  workoutsRepository: WorkoutsRepository;
};

const createWorkoutUseCase =
  ({ workoutsRepository }: CreateWorkoutUseCaseDependencies) =>
  async (payload: WorkoutInput) =>
    workoutsRepository.create(payload);

export default createWorkoutUseCase;
