import mapDocument from "shared/utils/mapDocument";

const mapEntity = <T extends Record<string, unknown>>(doc: unknown): T | null =>
  mapDocument<T>(doc as Parameters<typeof mapDocument<T>>[0]);

const mapEntities = <T extends Record<string, unknown>>(docs: unknown[]): T[] =>
  docs
    .map((doc) => mapEntity<T>(doc))
    .filter((entity): entity is T => entity !== null);

const createEntityMapper = <T extends Record<string, unknown>>() => ({
  toEntity: (doc: unknown): T | null => mapEntity<T>(doc),
  toEntities: (docs: unknown[]): T[] => mapEntities<T>(docs),
});

export { createEntityMapper, mapEntities, mapEntity };
