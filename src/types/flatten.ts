type Flatten<T> = T extends Array<infer V> ? V : T;
export default Flatten;
