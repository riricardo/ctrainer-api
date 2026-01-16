const listMyWorkoutsUseCase =
  ({ workoutsRepository }) =>
  async ({ ownerUserId }) =>
    workoutsRepository.listByOwner(ownerUserId);

module.exports = listMyWorkoutsUseCase;
