import { Request, Response } from "express";
import asyncHandler from "../../shared/utils/asyncHandler";
import { mapWorkout } from "./workouts.mappers/workout.mapper";
import httpStatus from "../../shared/http/http-status";
import createWorkoutUseCase from "./workouts.use-cases/create-workout.usecase";
import getWorkoutUseCase from "./workouts.use-cases/get-workout.usecase";
import updateWorkoutUseCase from "./workouts.use-cases/update-workout.usecase";
import deleteWorkoutUseCase from "./workouts.use-cases/delete-workout.usecase";
import listMyWorkoutsUseCase from "./workouts.use-cases/list-my-workouts.usecase";
import listPublicWorkoutsUseCase from "./workouts.use-cases/list-public-workouts.usecase";
import copyWorkoutUseCase from "./workouts.use-cases/copy-workout.usecase";
import { AppContainer } from "../../shared/types/container";
import {
  CreateWorkoutRequestBody,
  ListPublicWorkoutsQuery,
  UpdateWorkoutRequestBody,
} from "./workouts.dtos";

const buildWorkoutsController = (container: AppContainer) => {
  const { workoutsRepository } = container;
  const createWorkout = createWorkoutUseCase({ workoutsRepository });
  const getWorkout = getWorkoutUseCase({ workoutsRepository });
  const updateWorkout = updateWorkoutUseCase({ workoutsRepository });
  const deleteWorkout = deleteWorkoutUseCase({ workoutsRepository });
  const listMyWorkouts = listMyWorkoutsUseCase({ workoutsRepository });
  const listPublicWorkouts = listPublicWorkoutsUseCase({ workoutsRepository });
  const copyWorkout = copyWorkoutUseCase({ workoutsRepository });

  return {
    create: asyncHandler(
      async (
        req: Request<Record<string, string>, unknown, CreateWorkoutRequestBody>,
        res: Response
      ) => {
      const workout = await createWorkout({
        ownerUserId: req.auth!.uid,
        title: req.body.title,
        description: req.body.description,
        isPublic: req.body.isPublic,
        exercises: req.body.exercises,
      });

      res.status(httpStatus.created).json({ data: mapWorkout(workout) });
    }),
    getById: asyncHandler(
      async (req: Request<{ id: string }>, res: Response) => {
      const workout = await getWorkout({
        id: req.params.id,
        ownerUserId: req.auth!.uid,
      });

      res.status(httpStatus.ok).json({ data: mapWorkout(workout) });
    }),
    updateById: asyncHandler(
      async (
        req: Request<{ id: string }, unknown, UpdateWorkoutRequestBody>,
        res: Response
      ) => {
      const workout = await updateWorkout({
        id: req.params.id,
        ownerUserId: req.auth!.uid,
        updates: {
          title: req.body.title,
          description: req.body.description,
          isPublic: req.body.isPublic,
          exercises: req.body.exercises,
        },
      });

      res.status(httpStatus.ok).json({ data: mapWorkout(workout) });
    }),
    deleteById: asyncHandler(
      async (req: Request<{ id: string }>, res: Response) => {
      await deleteWorkout({
        id: req.params.id,
        ownerUserId: req.auth!.uid,
      });

      res.status(httpStatus.noContent).send();
    }),
    listMy: asyncHandler(async (req: Request, res: Response) => {
      const workouts = await listMyWorkouts({ ownerUserId: req.auth!.uid });
      res.status(httpStatus.ok).json({ data: workouts.map(mapWorkout) });
    }),
    listPublic: asyncHandler(
      async (
        req: Request<Record<string, string>, unknown, unknown, ListPublicWorkoutsQuery>,
        res: Response
      ) => {
      const search =
        typeof req.query.search === "string" ? req.query.search : undefined;
      const workouts = await listPublicWorkouts({ search });
      res.status(httpStatus.ok).json({ data: workouts.map(mapWorkout) });
    }),
    copy: asyncHandler(
      async (req: Request<{ id: string }>, res: Response) => {
      const workout = await copyWorkout({
        id: req.params.id,
        ownerUserId: req.auth!.uid,
      });

      res.status(httpStatus.created).json({ data: mapWorkout(workout) });
    }),
  };
};

export default buildWorkoutsController;
