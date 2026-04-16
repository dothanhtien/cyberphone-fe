interface GetDisplayNameParams {
  firstName: string | undefined;
  lastName: string | undefined;
  fallbackName?: string;
}

export const getDisplayName = ({
  firstName,
  lastName,
  fallbackName = "Anonymous",
}: GetDisplayNameParams) => {
  return [firstName, lastName].filter(Boolean).join(" ") || fallbackName;
};

export const getAvatarFallback = (displayName: string) => {
  return displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
};
