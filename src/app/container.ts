import { createAuthProvider } from "../modules/auth/auth.service";
import { createWorkoutLogsRepository } from "../modules/workout-logs/repositories/workout-logs.repository.mongoose";
import { createWorkoutsRepository } from "../modules/workouts/repositories/workouts.repository.mongoose";
import { AppContainer } from "../shared/types/container";

const buildContainer = (): AppContainer => {
  const authProvider = createAuthProvider();
  const workoutsRepository = createWorkoutsRepository();
  const workoutLogsRepository = createWorkoutLogsRepository();

  return {
    authProvider,
    workoutsRepository,
    workoutLogsRepository,
  };
};

export default buildContainer;
