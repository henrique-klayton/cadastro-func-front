import buildPaginationConfig from "@components/table-page/build-pagination-config";
import HaveId from "@interfaces/have-id";
import HaveStatus from "@interfaces/have-status";
import { Action, State } from "./types/aliases";
import {
	ChangePageAction,
	FilterChangeAction,
} from "./types/table-data-action";
import ActionTypeEnum from "./types/table-data-action-type";

export default function tableDataReducer<T extends HaveId & HaveStatus, F>(
	state: State<T, F>,
	action: Action<T, F>,
): State<T, F> {
	switch (action.type) {
		case ActionTypeEnum.CLEAR_PAGE:
			handleClearPage<T, F>(state);
			break;
		case ActionTypeEnum.SHOW_PAGE:
			handleShowPage<T, F>(state);
			break;
		case ActionTypeEnum.CHANGE_PAGE:
			handleChangePage<T, F>(state, action);
			break;
		case ActionTypeEnum.FILTER_CHANGED:
			handleFilterChanges<T, F>(state, action);
			break;
		default:
			return action satisfies never;
	}
	return { ...state };
}

function handleClearPage<T, F>(state: State<T, F>) {
	state.tableData = [];
	state.tableLoading = true;
}

function handleShowPage<T, F>(state: State<T, F>) {
	state.tableLoading = false;
}

function handleChangePage<T, F>(
	state: State<T, F>,
	{ page, pageSize, data, total }: ChangePageAction<T>,
) {
	state.tableData = data;
	state.tableLoading = false;
	state.pagination = buildPaginationConfig({
		...state.pagination,
		page,
		pageSize,
		total,
	});
}

function handleFilterChanges<T, F>(
	state: State<T, F>,
	{ key, value }: FilterChangeAction<F, number>,
) {
	state.filterValues[key] = value;
}
