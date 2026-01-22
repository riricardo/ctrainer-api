import { Document, Schema, SchemaDefinitionProperty } from "mongoose";

export type BaseDocument = Document & {
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
};

export const mixedArray = [Schema.Types.Mixed] as Array<typeof Schema.Types.Mixed>;

export const mixedArrayField = <T, Doc>() =>
  ({ type: mixedArray, default: [] } as unknown) as SchemaDefinitionProperty<T[], Doc>;
