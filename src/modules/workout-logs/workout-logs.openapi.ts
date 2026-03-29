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
 *
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
export {};
