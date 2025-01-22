import FromTablePageProps from "@components/data-table/interfaces/from-table-page-props";
import TableColumn from "@components/data-table/types/table-column";
import {
	FormData,
	FormModalCreateProps,
	FormModalUpdateProps,
	MergedFormModalProps,
} from "@components/form-modal/types";
import TableFilterConfigsObject from "@components/table-filter/table-filter-configs-object";
import RelationTableComponentProps from "@hooks/relation-tables-reducer/types/relation-table-component-props";
import HaveId from "@interfaces/have-id";
import HaveStatus from "@interfaces/have-status";
import PaginationQueryFunction from "@interfaces/pagination-query-function";
import Flatten from "@typings/flatten";
import PartialNullable from "@typings/partial-nullable";
import StringKeyof from "@typings/string-keyof";
import RelationTypeIds from "./interfaces/relation-type-ids.type";

// biome-ignore lint/suspicious/noExplicitAny: Impossible to know formatter return value beforehand
export type QueryDataParsers<T> = { [P in keyof T]: (value: T[P]) => any };
export type FormDataSerializer<T> = (data: FormData<T>) => T;

export type TablePageFormModalProps<CreateItem, UpdateItem> =
	| FormModalCreateProps<CreateItem>
	| FormModalUpdateProps<UpdateItem>;

export type FormModalStateProps<CreateItem, UpdateItem> = MergedFormModalProps<
	CreateItem,
	UpdateItem
>;

export interface TablePageProps<
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

export type ServerActionRelations<T> = {
	[P in keyof T]?: RelationTypeIds<T>;
};

export interface ServerActions<
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
}

export interface RelationDataObject<
	Item,
	Key extends StringKeyof<Item> = StringKeyof<Item>,
	RelationType = Flatten<Item[Key]>,
	RelationData = Array<RelationType>,
> {
	key: Key;
	columns: Array<TableColumn<RelationType>>;
	queryRelatedAction: PaginationQueryFunction<RelationType, { status: true }>;
	component: React.FunctionComponent<RelationTableComponentProps<Item>>;
}
