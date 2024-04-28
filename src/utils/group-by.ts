export function groupBy<T, K extends keyof any>(
  arr: T[],
  key: (item: T) => K
): Record<K, T[]> {
  return arr.reduce((groups, item) => {
    const groupKey = key(item);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<K, T[]>);
}
