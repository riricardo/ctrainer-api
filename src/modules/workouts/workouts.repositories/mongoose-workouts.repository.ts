import mongoose from "mongoose";

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

const Workout: any =
  mongoose.models.Workout || mongoose.model("Workout", workoutSchema);

const createWorkoutsRepository = () => ({
  create: (data: unknown) => Workout.create(data),
  findById: (id: string) => Workout.findById(id),
  updateById: (id: string, data: unknown) =>
    Workout.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }),
  deleteById: (id: string) => Workout.findByIdAndDelete(id),
  listByOwner: (ownerUserId: string) =>
    Workout.find({ ownerUserId }).sort({ createdAt: -1 }),
  listPublic: (search?: string) => {
    const query: any = { isPublic: true };
    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [{ title: regex }, { description: regex }];
    }

    return Workout.find(query).sort({ createdAt: -1 });
  },
});

export { createWorkoutsRepository };
