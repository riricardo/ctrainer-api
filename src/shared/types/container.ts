export type AppContainer = {
  authProvider: {
    verifyIdToken: (token: string) => Promise<unknown>;
  };
  workoutsRepository: unknown;
  workoutLogsRepository: unknown;
};
