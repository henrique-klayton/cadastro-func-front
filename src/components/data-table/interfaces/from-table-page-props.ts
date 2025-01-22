import StringKeyof from "@interfaces/string-keyof.type";
import TableColumn from "../types/table-column";

export default interface FromTablePageProps<T> {
	rowKey: StringKeyof<T>;
	columns: Array<TableColumn<T>>;
}
