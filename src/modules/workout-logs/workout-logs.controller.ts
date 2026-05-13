import { Request, Response } from "express";
import asyncHandler from "../../shared/utils/asyncHandler";
import { HttpStatus } from "../../shared/http/http-status";
import createWorkoutLogUseCase from "./use-cases/create-workout-log.usecase";
import listMyWorkoutLogsUseCase from "./use-cases/list-my-workout-logs.usecase";
import { AppContainer } from "../../shared/types/container";
import { CreateWorkoutLogRequestBody } from "./workout-logs.dtos";
import { mapWorkoutLog } from "./workout-logs.mapper";

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
        startedAt: req.body.startedAt ? new Date(req.body.startedAt) : undefined,
        endedAt: req.body.endedAt ? new Date(req.body.endedAt) : undefined,
        durationSeconds: req.body.durationSeconds,
        notes: req.body.notes,
        exercises: req.body.exercises,
      });

      res.status(HttpStatus.Created).json({ data: mapWorkoutLog(log) });
    }),
    listMy: asyncHandler(async (req: Request, res: Response) => {
      const logs = await listMyWorkoutLogs({ ownerUserId: req.auth!.uid });
      res.status(HttpStatus.Ok).json({ data: logs.map(mapWorkoutLog) });
    }),
  };
};

export default buildWorkoutLogsController;
