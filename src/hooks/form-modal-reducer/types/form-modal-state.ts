import { FormInstance } from "antd/lib";

import FormActionsEnum from "@enums/form-actions.enum";
import HaveId from "@interfaces/have-id";

type FormModalState<T extends HaveId, C, U> =
	| ClosedState<T, C, U>
	| CreateState<T, C, U>
	| UpdateState<T, C, U>
	| DeleteState<T, C, U>;
export default FormModalState;

interface BaseState {
	action: FormActionsEnum | undefined;
	loading: boolean;
	open: boolean;
}

export interface ClosedState<T extends HaveId, C, U> extends BaseState {
	form: FormInstance<C> | FormInstance<U>;
	initialData: undefined;
	action: undefined;
	itemId: undefined;
	formReset: Partial<C> | Partial<U>;
}

export interface CreateState<T extends HaveId, C, U> extends BaseState {
	form: FormInstance<C>;
	initialData: Partial<C>;
	action: FormActionsEnum.CREATE;
	itemId: undefined;
	formReset: Partial<C>;
}

export interface UpdateState<T extends HaveId, C, U> extends BaseState {
	form: FormInstance<U>;
	initialData: Partial<U>;
	action: FormActionsEnum.UPDATE;
	itemId: T["id"];
	formReset: Partial<U>;
}

export interface DeleteState<T extends HaveId, C, U> extends BaseState {
	form: FormInstance<C> | FormInstance<U>;
	initialData: undefined;
	action: FormActionsEnum.DELETE;
	itemId: T["id"];
	formReset: Partial<C> | Partial<U>;
}
