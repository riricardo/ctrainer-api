import mongoose, { Model } from "mongoose";
import {
  WorkoutInput,
  WorkoutRecord,
  WorkoutUpdate,
  WorkoutsRepository,
} from "./workouts.repository";

const { Schema } = mongoose;

type WorkoutDocument = WorkoutRecord & mongoose.Document;

const workoutSchema = new Schema<WorkoutDocument>(
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

const Workout: Model<WorkoutDocument> =
  (mongoose.models.Workout as Model<WorkoutDocument>) ||
  mongoose.model<WorkoutDocument>("Workout", workoutSchema);

const createWorkoutsRepository = (): WorkoutsRepository => ({
  create: (data: WorkoutInput) => Workout.create(data),
  findById: (id: string) => Workout.findById(id).exec(),
  updateById: (id: string, data: WorkoutUpdate) =>
    Workout.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).exec(),
  deleteById: (id: string) => Workout.findByIdAndDelete(id).exec(),
  listByOwner: (ownerUserId: string) =>
    Workout.find({ ownerUserId }).sort({ createdAt: -1 }).exec(),
  listPublic: (search?: string) => {
    const query: Record<string, unknown> = { isPublic: true };
    if (search) {
      const regex = new RegExp(search, "i");
      (query as any).$or = [{ title: regex }, { description: regex }];
    }

    return Workout.find(query).sort({ createdAt: -1 }).exec();
  },
});

export { createWorkoutsRepository };
