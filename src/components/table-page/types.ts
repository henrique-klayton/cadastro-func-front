import { DataTableProps } from "@components/data-table/types";
import {
	FormCreateData,
	FormData,
	FormUpdateData,
} from "@components/form-modal/types";
import { ActionsEnum } from "@enums/actions";
import { HaveId } from "@interfaces/have-id";
import { Optional } from "@interfaces/optional.type";
import { FormInstance } from "antd/lib";

// biome-ignore lint/suspicious/noExplicitAny: Impossible to know formatter return value beforehand
export type QueryDataParsers<T> = { [P in keyof T]: (value: T[P]) => any };
export type FormDataSerializer<T> = (data: FormData<T>) => T;

export type FormModalProps<C, U> =
	| FormModalCreateProps<C>
	| FormModalUpdateProps<U>;

export interface FormModalCreateProps<C> {
	action: ActionsEnum.CREATE;
	form: FormInstance<C>;
	initialData: C | undefined;
	currentId: undefined;
	onSubmit: (submit: FormCreateData<C>) => void;
}

export interface FormModalUpdateProps<U> {
	action: ActionsEnum.UPDATE;
	form: FormInstance<U>;
	initialData: U | undefined;
	currentId: string | number;
	onSubmit: (submit: FormUpdateData<U>) => void;
}

export interface TablePageProps<T extends HaveId, C extends U, U> {
	children: React.ReactNode;
	table: DataTableProps<T>;
	actions: ServerActions<T, C, U>;
	title: string;
	registerName: string;
	queryDataParsers?: QueryDataParsers<U>;
	createSerializer?: FormDataSerializer<C>;
	updateSerializer?: FormDataSerializer<U>;
}

export interface ServerActions<T extends HaveId, C, U> {
	tableQueryAction: () => Promise<T[]>;
	formQueryAction: (id: T["id"]) => Promise<U>;
	createAction: (data: C) => Promise<Optional<T>>;
	updateAction: (id: T["id"], data: U) => Promise<Optional<T>>;
	deleteAction: (id: T["id"]) => Promise<Optional<T>>;
}
