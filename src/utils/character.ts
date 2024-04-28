export function capitalize(str?: string | null) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function lowercase(str?: string | null) {
  if (!str || typeof str !== "string") return str;
  return str.toLowerCase();
}

export function uppercase(str?: string | null) {
  if (!str || typeof str !== "string") return str;
  return str.toUpperCase();
}
