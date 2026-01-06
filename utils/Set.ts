export function mergeSets<T>(a: Set<T>, b: Set<T>) {
  addMultiple(a, ...b.values());
}

export function addMultiple<T>(set: Set<T>, ...items: T[]) {
  for (let item of items) {
    set.add(item);
  }
}
