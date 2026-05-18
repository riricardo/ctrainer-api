import { WorkoutLogModel } from "modules/workout-logs/workout-logs.model";
import {
  WorkoutLogInput,
  WorkoutLogsRepository,
} from "modules/workout-logs/repositories/workout-logs.repository";

const createWorkoutLogsRepository = (): WorkoutLogsRepository => ({
  create: (data: WorkoutLogInput) => WorkoutLogModel.create(data),
  listByOwner: (ownerUserId: string) =>
    WorkoutLogModel.find({ ownerUserId }).sort({ createdAt: -1 }).exec(),
});

export { createWorkoutLogsRepository };
