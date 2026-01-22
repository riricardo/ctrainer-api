import swaggerJSDoc from "swagger-jsdoc";
import packageJson from "../../package.json";

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
          additionalProperties: true,
        },
        Workout: {
          type: "object",
          properties: {
            id: { type: "string" },
            ownerUserId: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            isPublic: { type: "boolean" },
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
            isPublic: { type: "boolean" },
            exercises: {
              type: "array",
              items: { $ref: "#/components/schemas/WorkoutExerciseInput" },
            },
          },
        },
        WorkoutLogExerciseInput: {
          type: "object",
          additionalProperties: true,
        },
        WorkoutLog: {
          type: "object",
          properties: {
            id: { type: "string" },
            ownerUserId: { type: "string" },
            workoutId: { type: "string" },
            startedAt: { type: "string" },
            endedAt: { type: "string" },
            durationSeconds: { type: "number" },
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
            endedAt: { type: "string" },
            durationSeconds: { type: "number" },
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
  apis: ["src/**/*.ts"],
});

export default swaggerSpec;
