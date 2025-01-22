import HaveId from "@interfaces/have-id";
import HaveStatus from "@interfaces/have-status";
import StringKeyof from "@typings/string-keyof";
import ActionTypeEnum from "./table-data-action-type";

type TableDataAction<T extends HaveId & HaveStatus, F> =
	| InitAction<T>
	| SetLoadingAction
	| ShowCleanPageAction
	| ShowPageAction
	| ChangePageAction<T>
	| FilterChangeAction<F, number>;
export default TableDataAction;

export interface InitAction<T> {
	type: ActionTypeEnum.INIT;
	data: T[];
	total: number;
}

export interface SetLoadingAction {
	type: ActionTypeEnum.SET_LOADING;
	loading: boolean;
}

export interface ShowCleanPageAction {
	type: ActionTypeEnum.SHOW_CLEAN_PAGE;
}

export interface ShowPageAction {
	type: ActionTypeEnum.SHOW_PAGE;
}

export interface ChangePageAction<T> {
	type: ActionTypeEnum.CHANGE_PAGE;
	data: T[];
	page: number;
	pageSize: number;
	total: number;
}

export interface FilterChangeAction<F, O> {
	type: ActionTypeEnum.FILTER_CHANGED;
	key: StringKeyof<F>;
	value: O;
}
