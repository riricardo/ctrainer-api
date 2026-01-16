const { createAuthProvider } = require("../modules/auth/auth.services/auth.service");
const {
  createWorkoutsRepository,
} = require("../modules/workouts/workouts.repositories/mongoose-workouts.repository");
const {
  createWorkoutLogsRepository,
} = require("../modules/workout-logs/workout-logs.repositories/mongoose-workout-logs.repository");

const buildContainer = () => {
  const authProvider = createAuthProvider();
  const workoutsRepository = createWorkoutsRepository();
  const workoutLogsRepository = createWorkoutLogsRepository();

  return {
    authProvider,
    workoutsRepository,
    workoutLogsRepository,
  };
};

module.exports = {
  buildContainer,
};
