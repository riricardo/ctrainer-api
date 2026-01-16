const listPublicWorkoutsUseCase =
  ({ workoutsRepository }) =>
  async ({ search }) =>
    workoutsRepository.listPublic(search);

module.exports = listPublicWorkoutsUseCase;
