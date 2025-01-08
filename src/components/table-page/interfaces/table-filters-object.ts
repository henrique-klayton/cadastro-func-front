import TableFilterConfig from "./table-filter-config";

type TableFiltersObject<T> = {
	[P in keyof T]?: TableFilterConfig<T, Extract<P, string>, number>;
};
export default TableFiltersObject;
