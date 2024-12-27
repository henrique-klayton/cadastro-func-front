export type Merge<X, Y> = {
	[K in keyof X | keyof Y]:
		| (K extends keyof X ? X[K] : never)
		| (K extends keyof Y ? Y[K] : never);
};
export default Merge;
