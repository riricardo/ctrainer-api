const listMyWorkoutsUseCase =
  ({ workoutsRepository }: { workoutsRepository: any }) =>
  async ({ ownerUserId }: { ownerUserId: string }) =>
    workoutsRepository.listByOwner(ownerUserId);

export default listMyWorkoutsUseCase;
