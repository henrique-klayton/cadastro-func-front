import { TableProps } from "@components/data-table/types";
import { ActionsEnum } from "@enums/actions";
import { HaveId } from "@interfaces/have-id";

export type FormModalActions = ActionsEnum.CREATE | ActionsEnum.UPDATE;
// biome-ignore lint/suspicious/noExplicitAny: Impossible to know formatter return value beforehand
export type FormValueFormatters<T> = { [P in keyof T]: (value: T[P]) => any };

export interface TablePageProps<T extends HaveId, C extends U, U> {
	children: React.ReactNode;
	table: TableProps<T>;
	actions: ServerActions<T, C, U>;
	title: string;
	registerName: string;
	formatters: FormValueFormatters<U>;
}

export interface ServerActions<T extends HaveId, C, U> {
	queryAction: (id: T["id"]) => Promise<C | U>;
	createAction: (data: C) => Promise<T>;
	updateAction: (id: T["id"], data: U) => Promise<T>;
	deleteAction: (id: T["id"]) => Promise<T>;
}
