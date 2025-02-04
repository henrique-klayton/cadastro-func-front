import { FormModalActions } from "@components/form-modal/types";
import HaveId from "@interfaces/have-id";
import ActionTypeEnum from "./form-modal-action-type";

type FormModalAction<T extends HaveId, C, U> =
	| SetLoadingAction
	| OpenAction
	| DeleteAction<T>
	| CloseAction
	| LoadDataAction<T, C, U>;
export default FormModalAction;

export interface SetLoadingAction {
	type: ActionTypeEnum.LOADING;
	loading: boolean;
}

export interface OpenAction {
	type: ActionTypeEnum.OPEN;
	action: FormModalActions;
}

export interface DeleteAction<T extends HaveId> {
	type: ActionTypeEnum.DELETE;
	id: T["id"];
}

export interface CloseAction {
	type: ActionTypeEnum.CLOSE;
}

export interface LoadDataAction<T extends HaveId, C, U> {
	type: ActionTypeEnum.LOAD_DATA;
	data?: Partial<C> | Partial<U>;
	id?: T["id"];
}
