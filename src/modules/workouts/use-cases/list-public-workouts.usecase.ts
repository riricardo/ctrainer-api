import { WorkoutsRepository } from "../repositories/workouts.repository";

type ListPublicWorkoutsUseCaseDependencies = {
  workoutsRepository: WorkoutsRepository;
};

type ListPublicWorkoutsUseCaseInput = {
  search?: string;
};

const listPublicWorkoutsUseCase =
  ({ workoutsRepository }: ListPublicWorkoutsUseCaseDependencies) =>
  async ({ search }: ListPublicWorkoutsUseCaseInput) =>
    workoutsRepository.listPublic(search);

export default listPublicWorkoutsUseCase;
