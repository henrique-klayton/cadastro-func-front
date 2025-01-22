import TablePaginationConfig from "@components/table-page/interfaces/table-pagination-config";
import HaveId from "@interfaces/have-id";
import DataTableActions from "./data-table-actions";
import FromTablePageProps from "./from-table-page-props";

export default interface DataTablePageProps<T extends HaveId>
	extends FromTablePageProps<T> {
	actions: DataTableActions<T>;
	pagination: TablePaginationConfig;
	registerName: string;
	loading: boolean;
}
