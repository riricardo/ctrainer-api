import mapDocument from "../../../shared/utils/mapDocument";
import { WorkoutResponse } from "../workouts.dtos";

const mapWorkout = (workout: any): WorkoutResponse | null =>
  mapDocument<WorkoutResponse>(workout);

export { mapWorkout };
