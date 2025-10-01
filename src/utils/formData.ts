export function toFormData<T extends object>(data: T): FormData {
  const formData = new FormData();

  (Object.entries(data) as [keyof T, T[keyof T]][]).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (value instanceof File) {
      formData.append(String(key), value);
    } else {
      formData.append(String(key), String(value));
    }
  });

  return formData;
}
