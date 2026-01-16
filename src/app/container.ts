import { createAuthProvider } from "../modules/auth/auth.services/auth.service";
import {
  createWorkoutsRepository,
} from "../modules/workouts/workouts.repositories/mongoose-workouts.repository";
import {
  createWorkoutLogsRepository,
} from "../modules/workout-logs/workout-logs.repositories/mongoose-workout-logs.repository";
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
