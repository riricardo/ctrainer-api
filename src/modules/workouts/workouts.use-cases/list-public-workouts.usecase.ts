import { WorkoutsRepository } from "../workouts.repositories/workouts.repository";

const listPublicWorkoutsUseCase =
  ({ workoutsRepository }: { workoutsRepository: WorkoutsRepository }) =>
  async ({ search }: { search?: string }) =>
    workoutsRepository.listPublic(search);

export default listPublicWorkoutsUseCase;
