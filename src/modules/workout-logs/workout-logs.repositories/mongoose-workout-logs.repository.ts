import mongoose, { Model } from "mongoose";
import {
  WorkoutLogInput,
  WorkoutLogRecord,
  WorkoutLogsRepository,
} from "./workout-logs.repository";

const { Schema } = mongoose;

type WorkoutLogDocument = WorkoutLogRecord & mongoose.Document;

const workoutLogSchema = new Schema<WorkoutLogDocument>(
  {
    ownerUserId: { type: String, required: true, index: true },
    workoutId: { type: Schema.Types.ObjectId, ref: "Workout" },
    startedAt: { type: Date },
    endedAt: { type: Date },
    durationSeconds: { type: Number },
    notes: { type: String, trim: true, default: "" },
    exercises: { type: [Schema.Types.Mixed], default: [] },
  },
  {
    timestamps: true,
  }
);

const WorkoutLog: Model<WorkoutLogDocument> =
  (mongoose.models.WorkoutLog as Model<WorkoutLogDocument>) ||
  mongoose.model<WorkoutLogDocument>("WorkoutLog", workoutLogSchema);

const createWorkoutLogsRepository = (): WorkoutLogsRepository => ({
  create: (data: WorkoutLogInput) => WorkoutLog.create(data),
  listByOwner: (ownerUserId: string) =>
    WorkoutLog.find({ ownerUserId }).sort({ createdAt: -1 }).exec(),
});

export { createWorkoutLogsRepository };
