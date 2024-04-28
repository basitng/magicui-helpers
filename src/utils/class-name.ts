type ClassValue =
  | string
  | number
  | ClassDictionary
  | ClassArray
  | undefined
  | null
  | boolean;

interface ClassDictionary {
  [id: string]: any;
}

interface ClassArray extends Array<ClassValue> {}

export function cn(...classes: ClassValue[]): string {
  const result: string[] = [];

  for (const arg of classes) {
    if (!arg) continue;

    const argType = typeof arg;

    if (argType === "string" || argType === "number") {
      result.push(arg.toString());
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        const inner = cn(...arg);
        if (inner) {
          result.push(inner);
        }
      }
    } else if (argType === "object") {
      const objectArg = arg as ClassDictionary;
      for (const key in objectArg) {
        if (objectArg[key]) {
          result.push(key);
        }
      }
    }
  }

  return result.join(" ");
}
