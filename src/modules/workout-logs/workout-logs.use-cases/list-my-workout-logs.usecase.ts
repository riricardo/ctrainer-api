import { WorkoutLogsRepository } from "../workout-logs.repositories/workout-logs.repository";

const listMyWorkoutLogsUseCase =
  ({ workoutLogsRepository }: { workoutLogsRepository: WorkoutLogsRepository }) =>
  async ({ ownerUserId }: { ownerUserId: string }) =>
    workoutLogsRepository.listByOwner(ownerUserId);

export default listMyWorkoutLogsUseCase;
