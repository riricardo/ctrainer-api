import {
  WorkoutInput,
  WorkoutsRepository,
} from "../workouts.repositories/workouts.repository";

const createWorkoutUseCase =
  ({ workoutsRepository }: { workoutsRepository: WorkoutsRepository }) =>
  async (payload: WorkoutInput) =>
    workoutsRepository.create(payload);

export default createWorkoutUseCase;
