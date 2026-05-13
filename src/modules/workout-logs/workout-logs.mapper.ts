import mapDocument from "../../shared/utils/mapDocument";
import { WorkoutLogResponse } from "./workout-logs.dtos";
import { WorkoutLogDocument } from "./workout-logs.model";

const mapWorkoutLog = (log: WorkoutLogDocument | null): WorkoutLogResponse | null => {
  const mapped = mapDocument<WorkoutLogResponse>(log);
  if (!mapped) {
    return null;
  }

  return {
    ...mapped,
    createdBy: mapped.ownerUserId,
    workoutId: mapped.workoutId ? String(mapped.workoutId) : undefined,
  };
};

export { mapWorkoutLog };
