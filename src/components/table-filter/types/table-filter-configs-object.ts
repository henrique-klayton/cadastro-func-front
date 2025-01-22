import TableFilterConfig from "../interfaces/table-filter-config";

type TableFilterConfigsObject<T> = {
	[P in keyof T]?: TableFilterConfig<T, Extract<P, string>, number>;
};
export default TableFilterConfigsObject;
