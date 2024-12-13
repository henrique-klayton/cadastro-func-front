type UndoPartial<T> = T extends Partial<infer P> ? P : T;
export default UndoPartial;
