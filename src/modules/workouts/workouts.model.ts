import mongoose, { Model, Schema } from "mongoose";
import { WorkoutExerciseInput } from "modules/workouts/workouts.dtos";
import { BaseDocument } from "shared/types/mongoose";

export type WorkoutFields = {
  ownerUserId: string;
  title: string;
  description: string;
  difficulty?: string;
  duration?: number;
  isPublic: boolean;
  copiedFromWorkoutId?: mongoose.Types.ObjectId | string;
  exercises: WorkoutExerciseInput[];
};

export type WorkoutDocument = WorkoutFields & BaseDocument;

const workoutExerciseSchema = new Schema<WorkoutExerciseInput>(
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

const workoutSchema = new Schema<WorkoutDocument>(
  {
    ownerUserId: { type: String, required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    difficulty: { type: String, trim: true },
    duration: { type: Number, min: 0 },
    isPublic: { type: Boolean, default: false },
    copiedFromWorkoutId: { type: Schema.Types.ObjectId, ref: "Workout" },
    exercises: { type: [workoutExerciseSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

export const WorkoutModel: Model<WorkoutDocument> =
  (mongoose.models.Workout as Model<WorkoutDocument>) ||
  mongoose.model<WorkoutDocument>("Workout", workoutSchema);
