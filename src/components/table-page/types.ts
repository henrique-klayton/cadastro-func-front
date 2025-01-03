import { DataTableProps, TableColumn } from "@components/data-table/types";
import {
	FormData,
	FormModalCreateProps,
	FormModalUpdateProps,
	MergedFormModalProps,
} from "@components/form-modal/types";
import { RelationTableComponentProps } from "@hooks/relation-tables-reducer/types";
import Flatten from "@interfaces/flatten.type";
import HaveId from "@interfaces/have-id";
import HaveStatus from "@interfaces/have-status";
import Optional from "@interfaces/optional.type";
import PaginationQueryFuncType from "@interfaces/pagination-query-type";
import PartialNullable from "@interfaces/partial-nullable.type";
import StringKeyof from "@interfaces/string-keyof.type";
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
> {
	children: React.ReactNode;
	table: DataTableProps<TableItem>;
	totalCount: number;
	actions: ServerActions<TableItem, CreateItem, UpdateItem>;
	title: string;
	itemName: string;
	queryDataParsers?: QueryDataParsers<UpdateItem>;
	relationsData?: Array<
		RelationDataObject<UpdateItem, StringKeyof<UpdateItem>>
	>;
}

export type ServerActionRelations<T> = {
	[P in keyof T]?: RelationTypeIds<T>;
};

export interface ServerActions<
	TableItem extends HaveId,
	CreateItem,
	UpdateItem,
> {
	tableQueryAction: PaginationQueryFuncType<TableItem>;
	formQueryAction: (id: TableItem["id"]) => Promise<UpdateItem>;
	createAction: (
		data: CreateItem,
		relations?: ServerActionRelations<UpdateItem>,
	) => Promise<Optional<TableItem>>;
	updateAction: (
		id: TableItem["id"],
		data: UpdateItem,
		relations?: ServerActionRelations<UpdateItem>,
	) => Promise<Optional<TableItem>>;
	deleteAction: (id: TableItem["id"]) => Promise<Optional<TableItem>>;
}

export interface RelationDataObject<
	Item,
	Key extends StringKeyof<Item> = StringKeyof<Item>,
	RelationType = Flatten<Item[Key]>,
	RelationData = Array<RelationType>,
> {
	key: Key;
	columns: Array<TableColumn<RelationType>>;
	queryRelatedAction: PaginationQueryFuncType<RelationType>;
	component: React.FunctionComponent<RelationTableComponentProps<Item>>;
}
