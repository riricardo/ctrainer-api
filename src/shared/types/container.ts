import { AuthProvider } from "modules/auth/auth.types";
import { WorkoutLogsRepository } from "modules/workout-logs/repositories/workout-logs.repository";
import { WorkoutsRepository } from "modules/workouts/repositories/workouts.repository";

export type AppContainer = {
  authProvider: AuthProvider;
  workoutsRepository: WorkoutsRepository;
  workoutLogsRepository: WorkoutLogsRepository;
};
