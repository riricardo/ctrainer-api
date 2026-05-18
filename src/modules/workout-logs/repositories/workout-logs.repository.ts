import { WorkoutLogFields, WorkoutLogDocument } from "modules/workout-logs/workout-logs.model";

export type WorkoutLogInput = WorkoutLogFields;

export interface WorkoutLogsRepository {
  create(data: WorkoutLogInput): Promise<WorkoutLogDocument>;
  listByOwner(ownerUserId: string): Promise<WorkoutLogDocument[]>;
}
