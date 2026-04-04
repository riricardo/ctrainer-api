import { WorkoutsRepository } from "../repositories/workouts.repository";

type ListMyWorkoutsUseCaseDependencies = {
  workoutsRepository: WorkoutsRepository;
};

type ListMyWorkoutsUseCaseInput = {
  ownerUserId: string;
};

const listMyWorkoutsUseCase =
  ({ workoutsRepository }: ListMyWorkoutsUseCaseDependencies) =>
  async ({ ownerUserId }: ListMyWorkoutsUseCaseInput) =>
    workoutsRepository.listByOwner(ownerUserId);

export default listMyWorkoutsUseCase;
