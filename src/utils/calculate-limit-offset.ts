export default function calculateLimitOffset(page?: number, pageSize?: number) {
	return {
		limit: pageSize ? pageSize : undefined,
		offset: page && pageSize ? pageSize * (page - 1) : undefined,
	};
}
