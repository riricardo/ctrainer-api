import { WorkoutLogFields, WorkoutLogDocument } from "../workout-logs.model";

export type WorkoutLogInput = WorkoutLogFields;

export type WorkoutLogsRepository = {
  create: (data: WorkoutLogInput) => Promise<WorkoutLogDocument>;
  listByOwner: (ownerUserId: string) => Promise<WorkoutLogDocument[]>;
};
