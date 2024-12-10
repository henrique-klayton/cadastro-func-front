import { ActionsEnum } from "@enums/actions";
import { Merge } from "@interfaces/merge.type";
import { FormInstance } from "antd";

export type FormModalActions = ActionsEnum.CREATE | ActionsEnum.UPDATE;

/* biome-ignore lint/suspicious/noExplicitAny:
Impossible to know data type, some fields could be formatted to another type
*/
export type FormData<T> = { [P in keyof T]: any };
export type FormSubmitData<C, U> = FormCreateData<C> | FormUpdateData<U>;
export type FormSubmitFunc<C, U> = (submit: FormSubmitData<C, U>) => void;
export type FormModalProps<C, U> = BaseFormModalProps &
	(FormModalCreateProps<C> | FormModalUpdateProps<U>);
export type FormOnSubmit<C, U> = ((submit: FormCreateData<C>) => void) &
	((submit: FormUpdateData<U>) => void);

export type MergedFormModalProps<C, U> = Merge<
	FormModalCreateProps<C>,
	FormModalUpdateProps<U>
>;

export interface FormCreateData<C> {
	action: ActionsEnum.CREATE;
	data: FormData<C>;
	id?: undefined;
}

export interface FormUpdateData<U> {
	action: ActionsEnum.UPDATE;
	data: FormData<U>;
	id: string | number;
}

export interface BaseFormModalProps {
	children: React.ReactNode;
	objectName: string;
	open: boolean;
	loading: boolean;
	submitDisabled: boolean;
	onFieldsChange: (changedFields: unknown[], allFields: unknown[]) => void;
	onCancel: () => void;
}

export interface FormModalCreateProps<C> {
	action: ActionsEnum.CREATE;
	initialData: Partial<C> | undefined;
	currentId?: undefined;
	form: FormInstance<C>;
	onSubmit: (submit: FormCreateData<C>) => void;
}

export interface FormModalUpdateProps<U> {
	action: ActionsEnum.UPDATE;
	initialData: Partial<U> | undefined;
	currentId: string | number;
	form: FormInstance<U>;
	onSubmit: (submit: FormUpdateData<U>) => void;
}
