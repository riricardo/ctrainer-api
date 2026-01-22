import express from "express";
import buildWorkoutsController from "./workouts.controller";
import requireAuth from "../../middleware/requireAuth";
import { AppContainer } from "../../shared/types/container";

const buildWorkoutRoutes = (container: AppContainer) => {
  const router = express.Router();
  const controller = buildWorkoutsController(container);
  const guard = requireAuth(container.authProvider);

  /**
   * @openapi
   * /api/workouts/public:
   *   get:
   *     tags:
   *       - Workouts
   *     summary: List public workouts
   *     parameters:
   *       - in: query
   *         name: search
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: List of public workouts
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: "#/components/schemas/Workout"
   */
  router.get("/public", controller.listPublic);
  /**
   * @openapi
   * /api/workouts/my:
   *   get:
   *     tags:
   *       - Workouts
   *     summary: List my workouts
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of workouts owned by the current user
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: "#/components/schemas/Workout"
   */
  router.get("/my", guard, controller.listMy);
  /**
   * @openapi
   * /api/workouts:
   *   post:
   *     tags:
   *       - Workouts
   *     summary: Create a workout
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/WorkoutCreate"
   *     responses:
   *       201:
   *         description: Workout created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   $ref: "#/components/schemas/Workout"
   */
  router.post("/", guard, controller.create);
  /**
   * @openapi
   * /api/workouts/{id}:
   *   get:
   *     tags:
   *       - Workouts
   *     summary: Get workout by id
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Workout details
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   $ref: "#/components/schemas/Workout"
   */
  router.get("/:id", guard, controller.getById);
  /**
   * @openapi
   * /api/workouts/{id}:
   *   put:
   *     tags:
   *       - Workouts
   *     summary: Update workout by id
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/WorkoutUpdate"
   *     responses:
   *       200:
   *         description: Workout updated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   $ref: "#/components/schemas/Workout"
   */
  router.put("/:id", guard, controller.updateById);
  /**
   * @openapi
   * /api/workouts/{id}:
   *   delete:
   *     tags:
   *       - Workouts
   *     summary: Delete workout by id
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: Workout deleted
   */
  router.delete("/:id", guard, controller.deleteById);
  /**
   * @openapi
   * /api/workouts/{id}/copy:
   *   post:
   *     tags:
   *       - Workouts
   *     summary: Copy workout by id
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       201:
   *         description: Workout copied
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   $ref: "#/components/schemas/Workout"
   */
  router.post("/:id/copy", guard, controller.copy);

  return router;
};

export default buildWorkoutRoutes;
