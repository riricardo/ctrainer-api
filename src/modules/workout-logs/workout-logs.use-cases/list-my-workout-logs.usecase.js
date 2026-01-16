const listMyWorkoutLogsUseCase =
  ({ workoutLogsRepository }) =>
  async ({ ownerUserId }) =>
    workoutLogsRepository.listByOwner(ownerUserId);

module.exports = listMyWorkoutLogsUseCase;
