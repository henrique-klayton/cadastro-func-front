import StringKeyof from "@interfaces/string-keyof.type";
import TableColumn from "../types/table-column";

// TODO Rename to FromTablePageProps
// TODO Drop data field
export default interface DataTableProps<T> {
	data: T[];
	rowKey: StringKeyof<T>;
	columns: Array<TableColumn<T>>;
}
