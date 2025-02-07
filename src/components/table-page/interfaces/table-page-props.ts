import FromTablePageProps from "@components/data-table/interfaces/from-table-page-props";
import TableFilterConfigsObject from "@components/table-filter/types/table-filter-configs-object";
import HaveId from "@interfaces/have-id";
import HaveStatus from "@interfaces/have-status";
import PartialNullable from "@typings/partial-nullable";
import StringKeyof from "@typings/string-keyof";
import { QueryDataParsers } from "../types/query-data-parsers";
import RelationDataObject from "./relation-data-object";
import ServerActions from "./server-actions";

export default interface TablePageProps<
	TableItem extends HaveId & HaveStatus,
	CreateItem extends UpdateItem,
	UpdateItem extends PartialNullable<HaveId & HaveStatus>,
	FilterType,
> {
	children: React.ReactNode;
	table: FromTablePageProps<TableItem>;
	actions: ServerActions<TableItem, CreateItem, UpdateItem, FilterType>;
	title: string;
	itemName: string;
	queryDataParsers?: QueryDataParsers<UpdateItem>;
	relationsData?: Array<
		RelationDataObject<UpdateItem, StringKeyof<UpdateItem>>
	>;
	filters: TableFilterConfigsObject<FilterType>;
}
