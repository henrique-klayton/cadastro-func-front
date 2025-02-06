import HaveId from "@interfaces/have-id";
import PaginationInfo from "@interfaces/pagination-info";
import PaginationQueryFunction from "@interfaces/pagination-query-function";
import DataTableActions from "./data-table-actions";
import FromTablePageProps from "./from-table-page-props";

export default interface DataTableProps<T extends HaveId, F>
	extends FromTablePageProps<T> {
	className?: string;
	actions: DataTableActions<T>;
	registerName: string;
	reloadEvent: PaginationInfo | undefined;
	queryAction: PaginationQueryFunction<T, F>;
}
