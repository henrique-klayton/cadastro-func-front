type PaginationQueryFuncType<RelationType> = (
	page?: number,
	pageSize?: number,
) => Promise<{ data: RelationType[]; total: number }>;
export default PaginationQueryFuncType;
