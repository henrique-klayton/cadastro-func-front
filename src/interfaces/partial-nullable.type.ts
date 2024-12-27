type PartialNullable<T> = { [P in keyof T]?: T[P] | null };
export default PartialNullable;
