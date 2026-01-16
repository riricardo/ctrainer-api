const mongoose = require("mongoose");

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

const WorkoutLog =
  mongoose.models.WorkoutLog || mongoose.model("WorkoutLog", workoutLogSchema);

const createWorkoutLogsRepository = () => ({
  create: (data) => WorkoutLog.create(data),
  listByOwner: (ownerUserId) =>
    WorkoutLog.find({ ownerUserId }).sort({ createdAt: -1 }),
});

module.exports = {
  createWorkoutLogsRepository,
};
