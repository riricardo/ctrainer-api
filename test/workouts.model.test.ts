import assert from "node:assert/strict";
import { after, before, beforeEach, describe, it } from "node:test";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { WorkoutModel } from "../src/modules/workouts/workouts.model";

let mongoServer: MongoMemoryServer;

describe("Workout model", () => {
  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await WorkoutModel.deleteMany({});
  });

  it("requires ownerUserId and title", async () => {
    await assert.rejects(
      async () => {
        await new WorkoutModel({}).validate();
      },
      (err: mongoose.Error.ValidationError) => {
        return Boolean(err?.errors?.ownerUserId) && Boolean(err?.errors?.title);
      }
    );
  });

  it("applies defaults for optional fields", () => {
    const workout = new WorkoutModel({
      ownerUserId: "user-1",
      title: "Leg day",
    });

    assert.equal(workout.description, "");
    assert.equal(workout.isPublic, false);
    assert.deepEqual(workout.exercises, []);
  });

  it("saves and retrieves a workout", async () => {
    const created = await WorkoutModel.create({
      ownerUserId: "user-2",
      title: "Push day",
      description: "Chest and triceps",
      isPublic: true,
      exercises: [{ name: "Bench press", sets: 4 }],
    });

    const fetched = await WorkoutModel.findById(created.id).lean();

    assert.ok(fetched);
    assert.equal(fetched.ownerUserId, "user-2");
    assert.equal(fetched.title, "Push day");
    assert.equal(fetched.description, "Chest and triceps");
    assert.equal(fetched.isPublic, true);
    assert.deepEqual(fetched.exercises, [{ name: "Bench press", sets: 4 }]);
  });
});
