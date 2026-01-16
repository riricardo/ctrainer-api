const createWorkoutUseCase = ({ workoutsRepository }) => async (payload) =>
  workoutsRepository.create(payload);

module.exports = createWorkoutUseCase;
