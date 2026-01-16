import mongoose, { Document, Model, Schema, SchemaDefinitionProperty } from "mongoose";
import { WorkoutExerciseInput } from "./workouts.dtos";

export type WorkoutFields = {
  ownerUserId: string;
  title: string;
  description: string;
  isPublic: boolean;
  exercises: WorkoutExerciseInput[];
};

export type WorkoutDocument = WorkoutFields &
  Document & {
    createdAt: Date;
    updatedAt: Date;
    __v?: number;
  };

const mixedArray = [Schema.Types.Mixed] as Array<typeof Schema.Types.Mixed>;

const workoutSchema = new Schema<WorkoutDocument>(
  {
    ownerUserId: { type: String, required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    isPublic: { type: Boolean, default: false },
    exercises: ({ type: mixedArray, default: [] } as unknown) as SchemaDefinitionProperty<
      WorkoutExerciseInput[],
      WorkoutDocument
    >,
  },
  {
    timestamps: true,
  }
);

export const WorkoutModel: Model<WorkoutDocument> =
  (mongoose.models.Workout as Model<WorkoutDocument>) ||
  mongoose.model<WorkoutDocument>("Workout", workoutSchema);
