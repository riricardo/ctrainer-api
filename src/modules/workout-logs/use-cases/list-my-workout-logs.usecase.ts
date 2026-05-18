import { WorkoutLogsRepository } from "modules/workout-logs/repositories/workout-logs.repository";

type ListMyWorkoutLogsUseCaseDependencies = {
  workoutLogsRepository: WorkoutLogsRepository;
};

type ListMyWorkoutLogsUseCaseInput = {
  ownerUserId: string;
};

const listMyWorkoutLogsUseCase =
  ({ workoutLogsRepository }: ListMyWorkoutLogsUseCaseDependencies) =>
  async ({ ownerUserId }: ListMyWorkoutLogsUseCaseInput) =>
    workoutLogsRepository.listByOwner(ownerUserId);

export default listMyWorkoutLogsUseCase;
