import { FormInstance } from "antd/lib";

import FormActionsEnum from "@enums/form-actions.enum";
import Merge from "@typings/merge";
import { FormFieldList } from "./form-field";
import { FormCreateData, FormUpdateData } from "./form-submit";

export type FormModalProps<C, U> = BaseFormModalProps &
	(FormModalCreateProps<C> | FormModalUpdateProps<U>);

export type MergedFormModalProps<C, U> = Merge<
	FormModalCreateProps<C>,
	FormModalUpdateProps<U>
> & {
	onFieldsChange?: (
		changedFields: FormFieldList<C> | FormFieldList<U>,
		allFields: FormFieldList<C> | FormFieldList<U>,
	) => void;
};

export interface BaseFormModalProps {
	children: React.ReactNode;
	objectName: string;
	open: boolean;
	loading: boolean;
	onCancel: () => void;
}

export interface FormModalCreateProps<C> {
	action: FormActionsEnum.CREATE;
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
	action: FormActionsEnum.UPDATE;
	initialData: Partial<U>;
	currentId: string | number;
	form: FormInstance<U>;
	onSubmit: (submit: FormUpdateData<U>) => void;
	onFieldsChange?: (
		changedFields: FormFieldList<U>,
		allFields: FormFieldList<U>,
	) => void;
}
