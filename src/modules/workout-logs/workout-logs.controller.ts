import { Request, Response } from "express";
import asyncHandler from "../../shared/utils/asyncHandler";
import httpStatus from "../../shared/http/http-status";
import createWorkoutLogUseCase from "./workout-logs.use-cases/create-workout-log.usecase";
import listMyWorkoutLogsUseCase from "./workout-logs.use-cases/list-my-workout-logs.usecase";
import { AppContainer } from "../../shared/types/container";
import { CreateWorkoutLogRequestBody } from "./workout-logs.dtos";
import { mapWorkoutLog } from "./workout-logs.mappers/workout-log.mapper";

const buildWorkoutLogsController = (container: AppContainer) => {
  const { workoutLogsRepository } = container;
  const createWorkoutLog = createWorkoutLogUseCase({ workoutLogsRepository });
  const listMyWorkoutLogs = listMyWorkoutLogsUseCase({ workoutLogsRepository });

  return {
    create: asyncHandler(
      async (
        req: Request<Record<string, string>, unknown, CreateWorkoutLogRequestBody>,
        res: Response
      ) => {
      const log = await createWorkoutLog({
        ownerUserId: req.auth!.uid,
        workoutId: req.body.workoutId,
        startedAt: req.body.startedAt,
        endedAt: req.body.endedAt,
        durationSeconds: req.body.durationSeconds,
        notes: req.body.notes,
        exercises: req.body.exercises,
      });

      res.status(httpStatus.created).json({ data: mapWorkoutLog(log) });
    }),
    listMy: asyncHandler(async (req: Request, res: Response) => {
      const logs = await listMyWorkoutLogs({ ownerUserId: req.auth!.uid });
      res
        .status(httpStatus.ok)
        .json({ data: logs.map(mapWorkoutLog) });
    }),
  };
};

export default buildWorkoutLogsController;
