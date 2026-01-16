const mongoose = require("mongoose");

const { Schema } = mongoose;

const workoutSchema = new Schema(
  {
    ownerUserId: { type: String, required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    isPublic: { type: Boolean, default: false },
    exercises: { type: [Schema.Types.Mixed], default: [] },
  },
  {
    timestamps: true,
  }
);

const Workout =
  mongoose.models.Workout || mongoose.model("Workout", workoutSchema);

const createWorkoutsRepository = () => ({
  create: (data) => Workout.create(data),
  findById: (id) => Workout.findById(id),
  updateById: (id, data) =>
    Workout.findByIdAndUpdate(id, data, { new: true, runValidators: true }),
  deleteById: (id) => Workout.findByIdAndDelete(id),
  listByOwner: (ownerUserId) =>
    Workout.find({ ownerUserId }).sort({ createdAt: -1 }),
  listPublic: (search) => {
    const query = { isPublic: true };
    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [{ title: regex }, { description: regex }];
    }

    return Workout.find(query).sort({ createdAt: -1 });
  },
});

module.exports = {
  createWorkoutsRepository,
};
