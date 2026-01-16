import mongoose from "mongoose";

const { Schema } = mongoose;

const workoutLogSchema = new Schema(
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

const WorkoutLog: any =
  mongoose.models.WorkoutLog || mongoose.model("WorkoutLog", workoutLogSchema);

const createWorkoutLogsRepository = () => ({
  create: (data: unknown) => WorkoutLog.create(data),
  listByOwner: (ownerUserId: string) =>
    WorkoutLog.find({ ownerUserId } as any).sort({ createdAt: -1 }),
});

export { createWorkoutLogsRepository };
