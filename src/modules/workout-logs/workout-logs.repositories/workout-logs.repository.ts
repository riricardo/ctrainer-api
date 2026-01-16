import { WorkoutLogExerciseInput } from "../workout-logs.dtos";

export type WorkoutLogInput = {
  ownerUserId: string;
  workoutId?: string;
  startedAt?: string | Date;
  endedAt?: string | Date;
  durationSeconds?: number;
  notes?: string;
  exercises?: WorkoutLogExerciseInput[];
};

export type WorkoutLogRecord = WorkoutLogInput & {
  _id?: unknown;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  toObject?: (options?: unknown) => Record<string, unknown>;
};

export type WorkoutLogsRepository = {
  create: (data: WorkoutLogInput) => Promise<WorkoutLogRecord>;
  listByOwner: (ownerUserId: string) => Promise<WorkoutLogRecord[]>;
};
