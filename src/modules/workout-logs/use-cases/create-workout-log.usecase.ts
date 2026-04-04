import {
  WorkoutLogInput,
  WorkoutLogsRepository,
} from "../repositories/workout-logs.repository";

type CreateWorkoutLogUseCaseDependencies = {
  workoutLogsRepository: WorkoutLogsRepository;
};

const createWorkoutLogUseCase =
  ({ workoutLogsRepository }: CreateWorkoutLogUseCaseDependencies) =>
  async (payload: WorkoutLogInput) =>
    workoutLogsRepository.create(payload);

export default createWorkoutLogUseCase;
