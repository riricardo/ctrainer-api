import { WorkoutsRepository } from "../workouts.repositories/workouts.repository";

const listMyWorkoutsUseCase =
  ({ workoutsRepository }: { workoutsRepository: WorkoutsRepository }) =>
  async ({ ownerUserId }: { ownerUserId: string }) =>
    workoutsRepository.listByOwner(ownerUserId);

export default listMyWorkoutsUseCase;
