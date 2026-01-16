const listMyWorkoutLogsUseCase =
  ({ workoutLogsRepository }: { workoutLogsRepository: any }) =>
  async ({ ownerUserId }: { ownerUserId: string }) =>
    workoutLogsRepository.listByOwner(ownerUserId);

export default listMyWorkoutLogsUseCase;
