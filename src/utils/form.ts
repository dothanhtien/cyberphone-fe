export function getDirtyValues<T extends Record<string, unknown>>(
  dirtyFields: Partial<Record<keyof T, unknown>>,
  values: T,
): Partial<T> {
  return (Object.keys(dirtyFields) as Array<keyof T>).reduce((acc, key) => {
    const dirty = dirtyFields[key];
    if (!dirty) return acc;

    if (Array.isArray(dirty) && dirty.some(Boolean)) {
      acc[key] = values[key];
      return acc;
    }

    acc[key] = values[key];
    return acc;
  }, {} as Partial<T>);
}
