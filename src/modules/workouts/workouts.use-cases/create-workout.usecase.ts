const createWorkoutUseCase =
  ({ workoutsRepository }: { workoutsRepository: any }) =>
  async (payload: unknown) =>
    workoutsRepository.create(payload);

export default createWorkoutUseCase;
