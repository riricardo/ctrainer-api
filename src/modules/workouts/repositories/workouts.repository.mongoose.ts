import mongoose from "mongoose";
import { WorkoutModel } from "../workouts.model";
import {
  WorkoutInput,
  WorkoutUpdate,
  WorkoutsRepository,
} from "./workouts.repository";
import escapeRegExp from "../../../shared/utils/escapeRegExp";
import { createEntityMapper } from "../../../shared/utils/mapEntity";
import { Workout } from "../workouts.types";

const MAX_PUBLIC_SEARCH_LENGTH = 100;

const { toEntity: toWorkout, toEntities: toWorkouts } =
  createEntityMapper<Workout>();

const isValidMongoId = (id: string) => mongoose.isValidObjectId(id);

const createWorkoutsRepository = (): WorkoutsRepository => ({
  create: async (data: WorkoutInput) => toWorkout(await WorkoutModel.create(data))!,
  findById: async (id: string) =>
    isValidMongoId(id) ? toWorkout(await WorkoutModel.findById(id).exec()) : null,
  updateById: (id: string, data: WorkoutUpdate) => {
    if (!isValidMongoId(id)) {
      return Promise.resolve(null);
    }

    return WorkoutModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
      .exec()
      .then((doc) => toWorkout(doc));
  },
  deleteById: (id: string) => {
    if (!isValidMongoId(id)) {
      return Promise.resolve(null);
    }

    return WorkoutModel.findByIdAndDelete(id)
      .exec()
      .then((doc) => toWorkout(doc));
  },
  listByOwner: (ownerUserId: string) =>
    WorkoutModel.find({ ownerUserId })
      .sort({ createdAt: -1 })
      .exec()
      .then((docs) => toWorkouts(docs)),
  listPublic: async (search?: string) => {
    const query: Record<string, unknown> = { isPublic: true };
    if (search) {
      const sanitizedSearch = escapeRegExp(
        search.trim().slice(0, MAX_PUBLIC_SEARCH_LENGTH)
      );
      const regex = new RegExp(sanitizedSearch, "i");
      query.$or = [{ title: regex }, { description: regex }];
    }

    const docs = await WorkoutModel.find(query).sort({ createdAt: -1 }).exec();
    return toWorkouts(docs);
  },
});

export { createWorkoutsRepository };
