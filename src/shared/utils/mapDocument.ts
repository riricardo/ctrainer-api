type MongoDocument = {
  _id?: { toString: () => string } | string | number;
  id?: string;
  __v?: number;
  toObject?: (options?: { versionKey?: boolean }) => Record<string, unknown>;
};

const mapDocument = <T extends Record<string, unknown>>(
  doc: MongoDocument | null | undefined
): (T & { id: string }) | null => {
  if (!doc) {
    return null;
  }

  const plain = doc.toObject ? doc.toObject({ versionKey: false }) : doc;
  const id = plain._id ? String(plain._id) : (plain.id as string | undefined);
  const { _id, __v, ...rest } = plain as Record<string, unknown>;

  return {
    ...(rest as T),
    id: id || "",
  };
};

export default mapDocument;
