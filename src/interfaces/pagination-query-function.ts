type PaginationQueryFunction<T, F> = (
	filter: F,
	page?: number,
	pageSize?: number,
) => Promise<{ data: T[]; total: number }>;
export default PaginationQueryFunction;
