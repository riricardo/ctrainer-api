import { WorkoutModel } from "../workouts.model";
import {
  WorkoutInput,
  WorkoutUpdate,
  WorkoutsRepository,
} from "./workouts.repository";
import escapeRegExp from "../../../shared/utils/escapeRegExp";

const MAX_PUBLIC_SEARCH_LENGTH = 100;

const createWorkoutsRepository = (): WorkoutsRepository => ({
  create: (data: WorkoutInput) => WorkoutModel.create(data),
  findById: (id: string) => WorkoutModel.findById(id).exec(),
  updateById: (id: string, data: WorkoutUpdate) =>
    WorkoutModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).exec(),
  deleteById: (id: string) => WorkoutModel.findByIdAndDelete(id).exec(),
  listByOwner: (ownerUserId: string) =>
    WorkoutModel.find({ ownerUserId }).sort({ createdAt: -1 }).exec(),
  listPublic: (search?: string) => {
    const query: Record<string, unknown> = { isPublic: true };
    if (search) {
      const sanitizedSearch = escapeRegExp(
        search.trim().slice(0, MAX_PUBLIC_SEARCH_LENGTH)
      );
      const regex = new RegExp(sanitizedSearch, "i");
      query.$or = [{ title: regex }, { description: regex }];
    }

    return WorkoutModel.find(query).sort({ createdAt: -1 }).exec();
  },
});

export { createWorkoutsRepository };
