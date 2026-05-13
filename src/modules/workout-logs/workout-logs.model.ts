import mongoose, { Model, Schema } from "mongoose";
import { WorkoutLogExerciseInput } from "./workout-logs.dtos";
import { WorkoutLogStatus } from "./workout-logs.constants";
import { BaseDocument } from "../../shared/types/mongoose";

export type WorkoutLogFields = {
  ownerUserId: string;
  workoutId?: string;
  startedAt?: Date;
  completedAt?: Date;
  durationSeconds?: number;
  status?: WorkoutLogStatus;
  notes?: string;
  exercises?: WorkoutLogExerciseInput[];
};

export type WorkoutLogDocument = WorkoutLogFields & BaseDocument;

const workoutLogExerciseSchema = new Schema<WorkoutLogExerciseInput>(
  {
    name: { type: String, required: true, trim: true },
    sets: { type: Number, min: 0 },
    reps: { type: Number, min: 0 },
    weight: { type: Number, min: 0 },
    restSeconds: { type: Number, min: 0 },
    notes: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
    longDescription: { type: String, trim: true },
  },
  { _id: false }
);

const workoutLogSchema = new Schema<WorkoutLogDocument>(
  {
    ownerUserId: { type: String, required: true, index: true },
    workoutId: { type: Schema.Types.ObjectId, ref: "Workout" },
    startedAt: { type: Date },
    completedAt: { type: Date },
    durationSeconds: { type: Number, min: 0 },
    status: {
      type: String,
      enum: Object.values(WorkoutLogStatus),
      default: WorkoutLogStatus.Completed,
    },
    notes: { type: String, trim: true, default: "" },
    exercises: { type: [workoutLogExerciseSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

export const WorkoutLogModel: Model<WorkoutLogDocument> =
  (mongoose.models.WorkoutLog as Model<WorkoutLogDocument>) ||
  mongoose.model<WorkoutLogDocument>("WorkoutLog", workoutLogSchema);
