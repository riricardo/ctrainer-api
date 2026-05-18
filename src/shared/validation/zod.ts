import { RequestHandler } from "express";
import { z } from "zod";
import mongoose from "mongoose";
import AppError from "shared/errors/AppError";

const formatPath = (path: readonly PropertyKey[]): string =>
  path.reduce<string>((formatted, segment) => {
    if (typeof segment === "number") {
      return `${formatted}[${segment}]`;
    }

    const key = String(segment);
    return formatted ? `${formatted}.${key}` : key;
  }, "");

export const formatZodErrors = (error: z.ZodError) =>
  error.issues.map((issue) => {
    const path = formatPath(issue.path);
    return path ? `${path}: ${issue.message}` : issue.message;
  });

export const buildZodValidator =
  <Body>(schema: z.ZodType<Body>): RequestHandler<Record<string, string>, unknown, Body> =>
  (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(AppError.validationFailed(formatZodErrors(result.error)));
    }

    return next();
  };

export const optionalStringSchema = (field: string) =>
  z.string({ error: `${field} must be a string` }).optional();

export const optionalBooleanSchema = (field: string) =>
  z.boolean({ error: `${field} must be a boolean` }).optional();

export const requiredStringSchema = (field: string) =>
  z
    .string({ error: `${field} must be a string` })
    .trim()
    .min(1, `${field} is required`);

export const optionalIsoDateTimeSchema = (field: string) =>
  z.iso
    .datetime({ error: `${field} must be a valid date string` })
    .optional();

export const enumSchema = <T extends Record<string, string>>(
  enumLike: T,
  field: string
) => {
  const values = Object.values(enumLike);
  return z.enum(values as [T[keyof T], ...T[keyof T][]], {
    error: `${field} must be one of: ${values.join(", ")}`,
  });
};

export const optionalArraySchema = <T extends z.ZodType>(
  itemSchema: T,
  field: string
) =>
  z
    .array(itemSchema, {
      error: `${field} must be an array`,
    })
    .optional();

export const mongoObjectIdSchema = z
  .string({ error: "must be a valid MongoDB id" })
  .refine((value) => mongoose.isValidObjectId(value), {
    message: "must be a valid MongoDB id",
  });

export const optionalNonNegativeNumberSchema = (field: string) =>
  z
    .number({ error: `${field} must be a number` })
    .nonnegative(`${field} must be a non-negative number`)
    .optional();
