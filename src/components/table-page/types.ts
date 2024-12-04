import { TableProps } from "@components/data-table/types";
import { HaveId } from "@interfaces/have-id";
import { Optional } from "@interfaces/optional.type";

// biome-ignore lint/suspicious/noExplicitAny: Impossible to know formatter return value beforehand
export type FormValueFormatters<T> = { [P in keyof T]: (value: T[P]) => any };
// biome-ignore lint/suspicious/noExplicitAny: Impossible to know data type, some props could be formatted to another value
export type FormDataParser<T> = (data: { [P in keyof T]?: unknown } | any) => T;

export interface TablePageProps<T extends HaveId, C extends U, U> {
	children: React.ReactNode;
	table: TableProps<T>;
	actions: ServerActions<T, C, U>;
	title: string;
	registerName: string;
	formatters?: FormValueFormatters<U>;
	createParser?: FormDataParser<C>;
	updateParser?: FormDataParser<U>;
}

export interface ServerActions<T extends HaveId, C, U> {
	queryAction: (id: T["id"]) => Promise<U>;
	createAction: (data: C) => Promise<Optional<T>>;
	updateAction: (id: T["id"], data: U) => Promise<Optional<T>>;
	deleteAction: (id: T["id"]) => Promise<Optional<T>>;
}
