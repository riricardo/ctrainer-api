import assert from "node:assert/strict";
import { describe, it } from "node:test";
import copyWorkoutUseCase from "modules/workouts/use-cases/copy-workout.usecase";
import { WorkoutInput, WorkoutsRepository } from "modules/workouts/repositories/workouts.repository";

const createRepository = (
  overrides: Partial<WorkoutsRepository> = {}
): WorkoutsRepository => ({
  create: async () => {
    throw new Error("not implemented");
  },
  findById: async () => null,
  updateById: async () => null,
  deleteById: async () => null,
  listByOwner: async () => [],
  listPublic: async () => [],
  ...overrides,
});

describe("copyWorkoutUseCase", () => {
  it("copies a public workout into the current user's private library", async () => {
    const createdPayloads: WorkoutInput[] = [];
    const sourceWorkout = {
      id: "source-workout-id",
      ownerUserId: "user-1",
      title: "Push day",
      description: "Chest and triceps",
      difficulty: "intermediate",
      duration: 45,
      isPublic: true,
      exercises: [{ name: "Bench press", sets: 4, reps: 8 }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const {
      id: sourceWorkoutId,
      ownerUserId: _sourceOwnerUserId,
      createdAt: _sourceCreatedAt,
      updatedAt: _sourceUpdatedAt,
      isPublic: _sourceIsPublic,
      ...copyableWorkoutFields
    } = sourceWorkout;
    const useCase = copyWorkoutUseCase({
      workoutsRepository: createRepository({
        findById: async () => sourceWorkout,
        create: async (payload) => {
          createdPayloads.push(payload);
          return {
            id: "copied-workout-id",
            description: payload.description ?? "",
            isPublic: payload.isPublic ?? false,
            exercises: payload.exercises ?? [],
            ...payload,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
        },
      }),
    });

    const copiedWorkout = await useCase({
      id: sourceWorkout.id,
      ownerUserId: "user-2",
    });

    assert.equal(copiedWorkout.id, "copied-workout-id");
    assert.deepEqual(createdPayloads, [
      {
        ownerUserId: "user-2",
        ...copyableWorkoutFields,
        isPublic: false,
        copiedFromWorkoutId: sourceWorkoutId,
      },
    ]);
  });
});
