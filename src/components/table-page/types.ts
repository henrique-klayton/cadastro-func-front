import { DataTableProps } from "@components/data-table/types";
import {
	FormData,
	FormModalCreateProps,
	FormModalUpdateProps,
	MergedFormModalProps,
} from "@components/form-modal/types";
import { HaveId } from "@interfaces/have-id";
import { Optional } from "@interfaces/optional.type";

// biome-ignore lint/suspicious/noExplicitAny: Impossible to know formatter return value beforehand
export type QueryDataParsers<T> = { [P in keyof T]: (value: T[P]) => any };
export type FormDataSerializer<T> = (data: FormData<T>) => T;

export type TablePageFormModalProps<C, U> =
	| FormModalCreateProps<C>
	| FormModalUpdateProps<U>;

export type FormModalStateProps<C, U> = MergedFormModalProps<C, U>;

export interface TablePageProps<T extends HaveId, C extends U, U> {
	children: React.ReactNode;
	table: DataTableProps<T>;
	totalCount: number;
	actions: ServerActions<T, C, U>;
	title: string;
	registerName: string;
	queryDataParsers?: QueryDataParsers<U>;
}

export interface ServerActions<T extends HaveId, C, U> {
	tableQueryAction: (
		page: number,
		pageSize: number,
	) => Promise<{ data: T[]; total: number }>;
	formQueryAction: (id: T["id"]) => Promise<U>;
	createAction: (data: C) => Promise<Optional<T>>;
	updateAction: (id: T["id"], data: U) => Promise<Optional<T>>;
	deleteAction: (id: T["id"]) => Promise<Optional<T>>;
}
