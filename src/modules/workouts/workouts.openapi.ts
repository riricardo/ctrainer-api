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
 *
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
 *
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
 *
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
 *
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
export {};
