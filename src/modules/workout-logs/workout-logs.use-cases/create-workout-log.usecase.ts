import {
  WorkoutLogInput,
  WorkoutLogsRepository,
} from "../workout-logs.repositories/workout-logs.repository";

const createWorkoutLogUseCase =
  ({ workoutLogsRepository }: { workoutLogsRepository: WorkoutLogsRepository }) =>
  async (payload: WorkoutLogInput) =>
    workoutLogsRepository.create(payload);

export default createWorkoutLogUseCase;
