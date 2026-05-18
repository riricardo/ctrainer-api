import { z } from "zod";
import {
  buildZodValidator,
  optionalIsoDateTimeSchema,
  optionalNonNegativeNumberSchema,
  optionalStringSchema,
  requiredStringSchema,
  mongoObjectIdSchema,
  enumSchema,
  optionalArraySchema,
} from "shared/validation/zod";
import { CreateWorkoutLogRequestBody } from "modules/workout-logs/workout-logs.dtos";
import { WorkoutLogStatus } from "modules/workout-logs/workout-logs.constants";

const workoutLogExerciseSchema = z.object({
  name: requiredStringSchema("name"),
  notes: optionalStringSchema("notes"),
  imageUrl: optionalStringSchema("imageUrl"),
  longDescription: optionalStringSchema("longDescription"),
  sets: optionalNonNegativeNumberSchema("sets"),
  reps: optionalNonNegativeNumberSchema("reps"),
  weight: optionalNonNegativeNumberSchema("weight"),
  restSeconds: optionalNonNegativeNumberSchema("restSeconds"),
});

const createWorkoutLogSchema = z.object({
  workoutId: mongoObjectIdSchema,
  startedAt: optionalIsoDateTimeSchema("startedAt"),
  completedAt: optionalIsoDateTimeSchema("completedAt"),
  durationSeconds: optionalNonNegativeNumberSchema("durationSeconds"),
  status: enumSchema(WorkoutLogStatus, "status"),
  notes: optionalStringSchema("notes"),
  exercises: optionalArraySchema(workoutLogExerciseSchema, "exercises"),
});

export const validateCreateWorkoutLog =
  buildZodValidator<CreateWorkoutLogRequestBody>(createWorkoutLogSchema);
