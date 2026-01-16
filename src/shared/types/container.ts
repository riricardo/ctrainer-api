import { WorkoutsRepository } from "../../modules/workouts/workouts.repositories/workouts.repository";
import { WorkoutLogsRepository } from "../../modules/workout-logs/workout-logs.repositories/workout-logs.repository";

export type AppContainer = {
  authProvider: {
    verifyIdToken: (token: string) => Promise<unknown>;
  };
  workoutsRepository: WorkoutsRepository;
  workoutLogsRepository: WorkoutLogsRepository;
};
