import mapDocument from "../../../shared/utils/mapDocument";
import { WorkoutResponse } from "../workouts.dtos";
import { WorkoutDocument } from "../workouts.model";

const mapWorkout = (workout: WorkoutDocument | null): WorkoutResponse | null =>
  mapDocument<WorkoutResponse>(workout);

export { mapWorkout };
