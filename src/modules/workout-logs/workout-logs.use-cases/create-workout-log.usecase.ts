const createWorkoutLogUseCase =
  ({ workoutLogsRepository }: { workoutLogsRepository: any }) =>
  async (payload: unknown) =>
    workoutLogsRepository.create(payload);

export default createWorkoutLogUseCase;
