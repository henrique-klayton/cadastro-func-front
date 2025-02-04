import { FormModalActions } from "@components/form-modal/types";
import FormActionsEnum from "@enums/form-actions.enum";
import HaveId from "@interfaces/have-id";
import ActionTypeEnum from "./form-modal-action-type";

type FormModalAction<T extends HaveId, C, U> =
	| SetLoadingAction
	| OpenAction
	| OpenCreateAction<C>
	| OpenUpdateAction<U>
	| DeleteAction<T>
	| CloseAction
	| LoadDataAction<C, U>;
export default FormModalAction;

export interface SetLoadingAction {
	type: ActionTypeEnum.LOADING;
	loading: boolean;
}

export interface OpenAction {
	type: ActionTypeEnum.OPEN;
	action: FormModalActions;
}

export interface OpenCreateAction<C> {
	type: ActionTypeEnum.OPEN;
	action: FormActionsEnum.CREATE;
}

export interface OpenUpdateAction<U> {
	type: ActionTypeEnum.OPEN;
	action: FormActionsEnum.UPDATE;
	data: U;
}

export interface DeleteAction<T extends HaveId> {
	type: ActionTypeEnum.DELETE;
	id: T["id"];
}

export interface CloseAction {
	type: ActionTypeEnum.CLOSE;
}

export interface LoadDataAction<C, U> {
	type: ActionTypeEnum.LOAD_DATA;
	data: Partial<C> | Partial<U>;
}
