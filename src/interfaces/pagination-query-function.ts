type PaginationQueryFunction<T> = (
	page?: number,
	pageSize?: number,
) => Promise<{ data: T[]; total: number }>;
export default PaginationQueryFunction;
