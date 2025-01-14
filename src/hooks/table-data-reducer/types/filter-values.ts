type FilterValues<T> = {
	[P in keyof T]?: number;
};
export default FilterValues;
