const asyncHandler = require("../../shared/utils/asyncHandler");
const httpStatus = require("../../shared/http/http-status");
const createWorkoutLogUseCase = require("./workout-logs.use-cases/create-workout-log.usecase");
const listMyWorkoutLogsUseCase = require("./workout-logs.use-cases/list-my-workout-logs.usecase");

const buildWorkoutLogsController = (container) => {
  const { workoutLogsRepository } = container;
  const createWorkoutLog = createWorkoutLogUseCase({ workoutLogsRepository });
  const listMyWorkoutLogs = listMyWorkoutLogsUseCase({ workoutLogsRepository });

  return {
    create: asyncHandler(async (req, res) => {
      const log = await createWorkoutLog({
        ownerUserId: req.auth.uid,
        workoutId: req.body.workoutId,
        startedAt: req.body.startedAt,
        endedAt: req.body.endedAt,
        durationSeconds: req.body.durationSeconds,
        notes: req.body.notes,
        exercises: req.body.exercises,
      });

      res.status(httpStatus.created).json({ data: log });
    }),
    listMy: asyncHandler(async (req, res) => {
      const logs = await listMyWorkoutLogs({ ownerUserId: req.auth.uid });
      res.status(httpStatus.ok).json({ data: logs });
    }),
  };
};

module.exports = buildWorkoutLogsController;
