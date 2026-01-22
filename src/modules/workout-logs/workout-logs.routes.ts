import express from "express";
import buildWorkoutLogsController from "./workout-logs.controller";
import requireAuth from "../../middleware/requireAuth";
import { AppContainer } from "../../shared/types/container";

const buildWorkoutLogRoutes = (container: AppContainer) => {
  const router = express.Router();
  const controller = buildWorkoutLogsController(container);
  const guard = requireAuth(container.authProvider);

  /**
   * @openapi
   * /api/workout-logs:
   *   post:
   *     tags:
   *       - Workout Logs
   *     summary: Create a workout log
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/WorkoutLogCreate"
   *     responses:
   *       201:
   *         description: Workout log created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   $ref: "#/components/schemas/WorkoutLog"
   */
  router.post("/", guard, controller.create);
  /**
   * @openapi
   * /api/workout-logs/my:
   *   get:
   *     tags:
   *       - Workout Logs
   *     summary: List my workout logs
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of workout logs owned by the current user
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: "#/components/schemas/WorkoutLog"
   */
  router.get("/my", guard, controller.listMy);

  return router;
};

export default buildWorkoutLogRoutes;
