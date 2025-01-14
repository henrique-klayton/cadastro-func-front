import HaveId from "@interfaces/have-id";
import HaveStatus from "@interfaces/have-status";
import StringKeyof from "@interfaces/string-keyof.type";
import ActionTypeEnum from "./table-data-action-type";

type TableDataAction<T extends HaveId & HaveStatus, F> =
	| ClearPageAction
	| ShowPageAction
	| ChangePageAction<T>
	| FilterChangeAction<F, number>;
export default TableDataAction;

export interface ClearPageAction {
	type: ActionTypeEnum.CLEAR_PAGE;
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
