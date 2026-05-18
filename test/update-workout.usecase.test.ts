import assert from "node:assert/strict";
import { describe, it } from "node:test";
import updateWorkoutUseCase from "modules/workouts/use-cases/update-workout.usecase";
import AppError from "shared/errors/AppError";
import { AppErrorCode } from "shared/errors/error-codes";
import { WorkoutsRepository } from "modules/workouts/repositories/workouts.repository";

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

describe("updateWorkoutUseCase", () => {
  it("rejects updates for missing workouts", async () => {
    const useCase = updateWorkoutUseCase({
      workoutsRepository: createRepository(),
    });

    await assert.rejects(
      () =>
        useCase({
          id: "workout-1",
          ownerUserId: "user-1",
          updates: { title: "New title" },
        }),
      (err: AppError) => err.code === AppErrorCode.WorkoutNotFound
    );
  });

  it("rejects updates from non-owners", async () => {
    const useCase = updateWorkoutUseCase({
      workoutsRepository: createRepository({
        findById: async () =>
          ({
            ownerUserId: "user-2",
          }) as never,
      }),
    });

    await assert.rejects(
      () =>
        useCase({
          id: "workout-1",
          ownerUserId: "user-1",
          updates: { title: "New title" },
        }),
      (err: AppError) => err.code === AppErrorCode.Forbidden
    );
  });

  it("guards against races where the document disappears before update", async () => {
    const useCase = updateWorkoutUseCase({
      workoutsRepository: createRepository({
        findById: async () =>
          ({
            ownerUserId: "user-1",
          }) as never,
        updateById: async () => null,
      }),
    });

    await assert.rejects(
      () =>
        useCase({
          id: "workout-1",
          ownerUserId: "user-1",
          updates: { title: "New title" },
        }),
      (err: AppError) => err.code === AppErrorCode.WorkoutNotFound
    );
  });

  it("passes exercises array updates through to the repository", async () => {
    const exercises = [
      {
        name: "Squat",
        sets: 5,
        reps: 5,
        weight: 100,
        restSeconds: 120,
        notes: "Keep braced",
        imageUrl: "https://example.com/squat.png",
        longDescription: "Controlled descent and powerful drive.",
      },
    ];
    const receivedUpdates: unknown[] = [];
    const useCase = updateWorkoutUseCase({
      workoutsRepository: createRepository({
        findById: async () =>
          ({
            ownerUserId: "user-1",
          }) as never,
        updateById: async (_id, updates) => {
          receivedUpdates.push(updates);
          return {
            id: "workout-1",
            ownerUserId: "user-1",
            title: "Strength",
            description: "",
            isPublic: false,
            exercises,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
        },
      }),
    });

    await useCase({
      id: "workout-1",
      ownerUserId: "user-1",
      updates: { exercises },
    });

    assert.deepEqual(receivedUpdates, [{ exercises }]);
  });
});
