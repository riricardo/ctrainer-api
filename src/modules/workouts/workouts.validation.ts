import { z } from "zod";
import {
  buildZodValidator,
  optionalArraySchema,
  optionalBooleanSchema,
  optionalNonNegativeNumberSchema,
  optionalStringSchema,
  requiredStringSchema,
} from "shared/validation/zod";
import {
  CreateWorkoutRequestBody,
  UpdateWorkoutRequestBody,
} from "modules/workouts/workouts.dtos";
const workoutExerciseSchema = z.object({
  name: requiredStringSchema("name"),
  notes: optionalStringSchema("notes"),
  imageUrl: optionalStringSchema("imageUrl"),
  longDescription: optionalStringSchema("longDescription"),
  sets: optionalNonNegativeNumberSchema("sets"),
  reps: optionalNonNegativeNumberSchema("reps"),
  weight: optionalNonNegativeNumberSchema("weight"),
  restSeconds: optionalNonNegativeNumberSchema("restSeconds"),
});

const baseWorkoutSchema = z.object({
  description: optionalStringSchema("description"),
  difficulty: optionalStringSchema("difficulty"),
  duration: optionalNonNegativeNumberSchema("duration"),
  isPublic: optionalBooleanSchema("isPublic"),
  exercises: optionalArraySchema(workoutExerciseSchema, "exercises"),
});

const createWorkoutSchema = baseWorkoutSchema.extend({
  title: requiredStringSchema("title"),
});

const updateWorkoutSchema = baseWorkoutSchema.extend({
  title: optionalStringSchema("title"),
});

export const validateCreateWorkout =
  buildZodValidator<CreateWorkoutRequestBody>(createWorkoutSchema);

export const validateUpdateWorkout =
  buildZodValidator<UpdateWorkoutRequestBody>(updateWorkoutSchema);
