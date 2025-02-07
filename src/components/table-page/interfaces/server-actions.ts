import HaveId from "@interfaces/have-id";
import PaginationQueryFunction from "@interfaces/pagination-query-function";
import ServerActionRelations from "../types/server-action-relations";

export default interface ServerActions<
	TableItem extends HaveId,
	CreateItem,
	UpdateItem,
	FilterType,
> {
	tableQueryAction: PaginationQueryFunction<TableItem, FilterType>;
	formQueryAction: (id: TableItem["id"]) => Promise<UpdateItem>;
	createAction: (
		data: CreateItem,
		relations?: ServerActionRelations<UpdateItem>,
	) => Promise<TableItem>;
	updateAction: (
		id: TableItem["id"],
		data: UpdateItem,
		relations?: ServerActionRelations<UpdateItem>,
	) => Promise<TableItem>;
	deleteAction: (id: TableItem["id"]) => Promise<TableItem>;
	reportAction: () => Promise<string>;
}
