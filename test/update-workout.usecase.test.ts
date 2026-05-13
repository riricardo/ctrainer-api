import assert from "node:assert/strict";
import { describe, it } from "node:test";
import updateWorkoutUseCase from "../src/modules/workouts/use-cases/update-workout.usecase";
import AppError from "../src/shared/errors/AppError";
import { AppErrorCode } from "../src/shared/errors/error-codes";
import { WorkoutsRepository } from "../src/modules/workouts/repositories/workouts.repository";

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
});
