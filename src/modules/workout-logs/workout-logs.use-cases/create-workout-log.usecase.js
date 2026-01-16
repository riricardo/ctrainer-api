const createWorkoutLogUseCase =
  ({ workoutLogsRepository }) =>
  async (payload) =>
    workoutLogsRepository.create(payload);

module.exports = createWorkoutLogUseCase;
