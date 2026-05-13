import swaggerJSDoc from "swagger-jsdoc";
import packageJson from "../../package.json";
import { WorkoutLogStatus } from "../modules/workout-logs/workout-logs.constants";

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: packageJson.name,
      version: packageJson.version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        WorkoutExerciseInput: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string" },
            sets: { type: "number" },
            reps: { type: "number" },
            weight: { type: "number" },
            restSeconds: { type: "number" },
            notes: { type: "string" },
            imageUrl: { type: "string" },
            longDescription: { type: "string" },
          },
        },
        Workout: {
          type: "object",
          properties: {
            id: { type: "string" },
            ownerUserId: { type: "string" },
            createdBy: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            difficulty: { type: "string" },
            duration: { type: "number" },
            isPublic: { type: "boolean" },
            copiedFromWorkoutId: { type: "string" },
            exercises: {
              type: "array",
              items: { $ref: "#/components/schemas/WorkoutExerciseInput" },
            },
            createdAt: { type: "string" },
            updatedAt: { type: "string" },
          },
        },
        WorkoutCreate: {
          type: "object",
          required: ["title"],
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            difficulty: { type: "string" },
            duration: { type: "number" },
            isPublic: { type: "boolean" },
            exercises: {
              type: "array",
              items: { $ref: "#/components/schemas/WorkoutExerciseInput" },
            },
          },
        },
        WorkoutUpdate: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            difficulty: { type: "string" },
            duration: { type: "number" },
            isPublic: { type: "boolean" },
            exercises: {
              type: "array",
              items: { $ref: "#/components/schemas/WorkoutExerciseInput" },
            },
          },
        },
        WorkoutLogExerciseInput: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string" },
            sets: { type: "number" },
            reps: { type: "number" },
            weight: { type: "number" },
            restSeconds: { type: "number" },
            notes: { type: "string" },
            imageUrl: { type: "string" },
            longDescription: { type: "string" },
          },
        },
        WorkoutLog: {
          type: "object",
          properties: {
            id: { type: "string" },
            ownerUserId: { type: "string" },
            createdBy: { type: "string" },
            workoutId: { type: "string" },
            startedAt: { type: "string" },
            completedAt: { type: "string" },
            durationSeconds: { type: "number" },
            status: {
              type: "string",
              enum: Object.values(WorkoutLogStatus),
            },
            notes: { type: "string" },
            exercises: {
              type: "array",
              items: { $ref: "#/components/schemas/WorkoutLogExerciseInput" },
            },
            createdAt: { type: "string" },
            updatedAt: { type: "string" },
          },
        },
        WorkoutLogCreate: {
          type: "object",
          properties: {
            workoutId: { type: "string" },
            startedAt: { type: "string" },
            completedAt: { type: "string" },
            durationSeconds: { type: "number" },
            status: {
              type: "string",
              enum: Object.values(WorkoutLogStatus),
            },
            notes: { type: "string" },
            exercises: {
              type: "array",
              items: { $ref: "#/components/schemas/WorkoutLogExerciseInput" },
            },
          },
        },
      },
    },
  },
  apis: ["src/**/*.routes.ts", "src/**/*.openapi.ts"],
});

export default swaggerSpec;
