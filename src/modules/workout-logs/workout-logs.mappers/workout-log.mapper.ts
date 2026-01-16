import mapDocument from "../../../shared/utils/mapDocument";
import { WorkoutLogResponse } from "../workout-logs.dtos";

const mapWorkoutLog = (log: any): WorkoutLogResponse | null =>
  mapDocument<WorkoutLogResponse>(log);

export { mapWorkoutLog };
