import { FormInstance, FormItemProps } from "antd/lib";
import { FieldData } from "rc-field-form/lib/interface";

import { ActionsEnum } from "@enums/actions";
import { Merge } from "@interfaces/merge.type";

export type FormModalActions = ActionsEnum.CREATE | ActionsEnum.UPDATE;

/* biome-ignore lint/suspicious/noExplicitAny:
Impossible to know data type, some fields could be formatted to another type
*/
export type FormData<T> = { [P in keyof T]: any };
export type FormSubmitData<C, U> = FormCreateData<C> | FormUpdateData<U>;
export type FormSubmitFunc<C, U> = (submit: FormSubmitData<C, U>) => void;
export type FormField<T> = FieldData<T>;
export type FormFieldList<T> = FormField<T>[];

export type FormModalProps<C, U> = BaseFormModalProps &
	(FormModalCreateProps<C> | FormModalUpdateProps<U>);
export type FormOnSubmit<C, U> = ((submit: FormCreateData<C>) => void) &
	((submit: FormUpdateData<U>) => void);

export type MergedFormModalProps<C, U> = Merge<
	FormModalCreateProps<C>,
	FormModalUpdateProps<U>
> & {
	onFieldsChange?: (
		changedFields: FormFieldList<C> | FormFieldList<U>,
		allFields: FormFieldList<C> | FormFieldList<U>,
	) => void;
};

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
	onCancel: () => void;
}

export interface FormModalCreateProps<C> {
	action: ActionsEnum.CREATE;
	initialData: Partial<C>;
	currentId?: undefined;
	form: FormInstance<C>;
	onSubmit: (submit: FormCreateData<C>) => void;
	onFieldsChange?: (
		changedFields: FormFieldList<C>,
		allFields: FormFieldList<C>,
	) => void;
}

export interface FormModalUpdateProps<U> {
	action: ActionsEnum.UPDATE;
	initialData: Partial<U>;
	currentId: string | number;
	form: FormInstance<U>;
	onSubmit: (submit: FormUpdateData<U>) => void;
	onFieldsChange?: (
		changedFields: FormFieldList<U>,
		allFields: FormFieldList<U>,
	) => void;
}

type IncludedFormItemProps =
	| "name"
	| "label"
	| "tooltip"
	| "dependencies"
	| "required"
	| "rules"
	| "hasFeedback"
	| "validateDebounce"
	| "validateFirst"
	| "validateStatus"
	| "validateTrigger";

export interface FormItemConfig<C, U, P>
	extends Partial<Pick<FormItemProps, IncludedFormItemProps>> {
	key: keyof C | U;
	input: React.ReactElement<P>;
	inputProps: P;
}
