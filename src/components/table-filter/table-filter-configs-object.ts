import TableFilterConfig from "./table-filter-config";

type TableFilterConfigsObject<T> = {
	[P in keyof T]?: TableFilterConfig<T, Extract<P, string>, number>;
};
export default TableFilterConfigsObject;
