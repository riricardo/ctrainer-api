const asyncHandler = require("../../shared/utils/asyncHandler");
const { mapWorkout } = require("./workouts.mappers/workout.mapper");
const httpStatus = require("../../shared/http/http-status");
const createWorkoutUseCase = require("./workouts.use-cases/create-workout.usecase");
const getWorkoutUseCase = require("./workouts.use-cases/get-workout.usecase");
const updateWorkoutUseCase = require("./workouts.use-cases/update-workout.usecase");
const deleteWorkoutUseCase = require("./workouts.use-cases/delete-workout.usecase");
const listMyWorkoutsUseCase = require("./workouts.use-cases/list-my-workouts.usecase");
const listPublicWorkoutsUseCase = require("./workouts.use-cases/list-public-workouts.usecase");
const copyWorkoutUseCase = require("./workouts.use-cases/copy-workout.usecase");

const buildWorkoutsController = (container) => {
  const { workoutsRepository } = container;
  const createWorkout = createWorkoutUseCase({ workoutsRepository });
  const getWorkout = getWorkoutUseCase({ workoutsRepository });
  const updateWorkout = updateWorkoutUseCase({ workoutsRepository });
  const deleteWorkout = deleteWorkoutUseCase({ workoutsRepository });
  const listMyWorkouts = listMyWorkoutsUseCase({ workoutsRepository });
  const listPublicWorkouts = listPublicWorkoutsUseCase({ workoutsRepository });
  const copyWorkout = copyWorkoutUseCase({ workoutsRepository });

  return {
    create: asyncHandler(async (req, res) => {
      const workout = await createWorkout({
        ownerUserId: req.auth.uid,
        title: req.body.title,
        description: req.body.description,
        isPublic: req.body.isPublic,
        exercises: req.body.exercises,
      });

      res.status(httpStatus.created).json({ data: mapWorkout(workout) });
    }),
    getById: asyncHandler(async (req, res) => {
      const workout = await getWorkout({
        id: req.params.id,
        ownerUserId: req.auth.uid,
      });

      res.status(httpStatus.ok).json({ data: mapWorkout(workout) });
    }),
    updateById: asyncHandler(async (req, res) => {
      const workout = await updateWorkout({
        id: req.params.id,
        ownerUserId: req.auth.uid,
        updates: {
          title: req.body.title,
          description: req.body.description,
          isPublic: req.body.isPublic,
          exercises: req.body.exercises,
        },
      });

      res.status(httpStatus.ok).json({ data: mapWorkout(workout) });
    }),
    deleteById: asyncHandler(async (req, res) => {
      await deleteWorkout({
        id: req.params.id,
        ownerUserId: req.auth.uid,
      });

      res.status(httpStatus.noContent).send();
    }),
    listMy: asyncHandler(async (req, res) => {
      const workouts = await listMyWorkouts({ ownerUserId: req.auth.uid });
      res.status(httpStatus.ok).json({ data: workouts.map(mapWorkout) });
    }),
    listPublic: asyncHandler(async (req, res) => {
      const workouts = await listPublicWorkouts({ search: req.query.search });
      res.status(httpStatus.ok).json({ data: workouts.map(mapWorkout) });
    }),
    copy: asyncHandler(async (req, res) => {
      const workout = await copyWorkout({
        id: req.params.id,
        ownerUserId: req.auth.uid,
      });

      res.status(httpStatus.created).json({ data: mapWorkout(workout) });
    }),
  };
};

module.exports = buildWorkoutsController;
