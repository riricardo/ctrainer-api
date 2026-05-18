import {
  WorkoutLogInput,
  WorkoutLogsRepository,
} from "modules/workout-logs/repositories/workout-logs.repository";

type CreateWorkoutLogUseCaseDependencies = {
  workoutLogsRepository: WorkoutLogsRepository;
};

const createWorkoutLogUseCase =
  ({ workoutLogsRepository }: CreateWorkoutLogUseCaseDependencies) =>
  async (payload: WorkoutLogInput) =>
    workoutLogsRepository.create(payload);

export default createWorkoutLogUseCase;
