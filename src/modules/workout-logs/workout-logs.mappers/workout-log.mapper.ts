import mapDocument from "../../../shared/utils/mapDocument";
import { WorkoutLogResponse } from "../workout-logs.dtos";
import { WorkoutLogDocument } from "../workout-logs.model";

const mapWorkoutLog = (log: WorkoutLogDocument | null): WorkoutLogResponse | null =>
  mapDocument<WorkoutLogResponse>(log);

export { mapWorkoutLog };
