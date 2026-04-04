import { WorkoutLogModel } from "../workout-logs.model";
import {
  WorkoutLogInput,
  WorkoutLogsRepository,
} from "./workout-logs.repository";

const createWorkoutLogsRepository = (): WorkoutLogsRepository => ({
  create: (data: WorkoutLogInput) => WorkoutLogModel.create(data),
  listByOwner: (ownerUserId: string) =>
    WorkoutLogModel.find({ ownerUserId }).sort({ createdAt: -1 }).exec(),
});

export { createWorkoutLogsRepository };
