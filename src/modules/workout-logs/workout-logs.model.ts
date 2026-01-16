import mongoose, { Document, Model, Schema, SchemaDefinitionProperty } from "mongoose";
import { WorkoutLogExerciseInput } from "./workout-logs.dtos";

export type WorkoutLogFields = {
  ownerUserId: string;
  workoutId?: string;
  startedAt?: Date;
  endedAt?: Date;
  durationSeconds?: number;
  notes?: string;
  exercises?: WorkoutLogExerciseInput[];
};

export type WorkoutLogDocument = WorkoutLogFields &
  Document & {
    createdAt: Date;
    updatedAt: Date;
    __v?: number;
  };

const mixedArray = [Schema.Types.Mixed] as Array<typeof Schema.Types.Mixed>;

const workoutLogSchema = new Schema<WorkoutLogDocument>(
  {
    ownerUserId: { type: String, required: true, index: true },
    workoutId: { type: Schema.Types.ObjectId, ref: "Workout" },
    startedAt: { type: Date },
    endedAt: { type: Date },
    durationSeconds: { type: Number },
    notes: { type: String, trim: true, default: "" },
    exercises: ({ type: mixedArray, default: [] } as unknown) as SchemaDefinitionProperty<
      WorkoutLogExerciseInput[],
      WorkoutLogDocument
    >,
  },
  {
    timestamps: true,
  }
);

export const WorkoutLogModel: Model<WorkoutLogDocument> =
  (mongoose.models.WorkoutLog as Model<WorkoutLogDocument>) ||
  mongoose.model<WorkoutLogDocument>("WorkoutLog", workoutLogSchema);
