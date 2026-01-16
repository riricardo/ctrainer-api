const listPublicWorkoutsUseCase =
  ({ workoutsRepository }: { workoutsRepository: any }) =>
  async ({ search }: { search?: string }) =>
    workoutsRepository.listPublic(search);

export default listPublicWorkoutsUseCase;
