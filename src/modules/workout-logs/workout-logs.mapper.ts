import mapDocument from "shared/utils/mapDocument";
import { WorkoutLogResponse } from "modules/workout-logs/workout-logs.dtos";
import { WorkoutLogDocument } from "modules/workout-logs/workout-logs.model";

const mapWorkoutLog = (log: WorkoutLogDocument | null): WorkoutLogResponse | null => {
  const mapped = mapDocument<WorkoutLogResponse>(log);
  if (!mapped) {
    return null;
  }

  return {
    ...mapped,
    createdBy: mapped.ownerUserId,
    workoutId: String(mapped.workoutId),
  };
};

export { mapWorkoutLog };
