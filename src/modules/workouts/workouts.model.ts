import mongoose, { Model, Schema } from "mongoose";
import { WorkoutExerciseInput } from "./workouts.dtos";
import { BaseDocument, mixedArrayField } from "../../shared/types/mongoose";

export type WorkoutFields = {
  ownerUserId: string;
  title: string;
  description: string;
  isPublic: boolean;
  exercises: WorkoutExerciseInput[];
};

export type WorkoutDocument = WorkoutFields & BaseDocument;

const workoutSchema = new Schema<WorkoutDocument>(
  {
    ownerUserId: { type: String, required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    isPublic: { type: Boolean, default: false },
    exercises: mixedArrayField<WorkoutExerciseInput, WorkoutDocument>(),
  },
  {
    timestamps: true,
  }
);

export const WorkoutModel: Model<WorkoutDocument> =
  (mongoose.models.Workout as Model<WorkoutDocument>) ||
  mongoose.model<WorkoutDocument>("Workout", workoutSchema);
