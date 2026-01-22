import mongoose, { Model, Schema } from "mongoose";
import { WorkoutLogExerciseInput } from "./workout-logs.dtos";
import { BaseDocument, mixedArrayField } from "../../shared/types/mongoose";

export type WorkoutLogFields = {
  ownerUserId: string;
  workoutId?: string;
  startedAt?: Date;
  endedAt?: Date;
  durationSeconds?: number;
  notes?: string;
  exercises?: WorkoutLogExerciseInput[];
};

export type WorkoutLogDocument = WorkoutLogFields & BaseDocument;

const workoutLogSchema = new Schema<WorkoutLogDocument>(
  {
    ownerUserId: { type: String, required: true, index: true },
    workoutId: { type: Schema.Types.ObjectId, ref: "Workout" },
    startedAt: { type: Date },
    endedAt: { type: Date },
    durationSeconds: { type: Number },
    notes: { type: String, trim: true, default: "" },
    exercises: mixedArrayField<WorkoutLogExerciseInput, WorkoutLogDocument>(),
  },
  {
    timestamps: true,
  }
);

export const WorkoutLogModel: Model<WorkoutLogDocument> =
  (mongoose.models.WorkoutLog as Model<WorkoutLogDocument>) ||
  mongoose.model<WorkoutLogDocument>("WorkoutLog", workoutLogSchema);
