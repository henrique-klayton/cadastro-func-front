import StringKeyof from "@interfaces/string-keyof.type";
import TableColumn from "../types/table-column";

export default interface DataTableProps<T> {
	data: T[];
	rowKey: StringKeyof<T>;
	columns: Array<TableColumn<T>>;
}
