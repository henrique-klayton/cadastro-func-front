import FormActionsEnum from "@enums/form-actions.enum";
import HaveId from "@interfaces/have-id";
import { Action, State } from "./types/aliases";
import {
	DeleteAction,
	LoadDataAction,
	OpenAction,
	SetLoadingAction,
} from "./types/form-modal-action";
import ActionTypeEnum from "./types/form-modal-action-type";
import { DeleteState } from "./types/form-modal-state";

export default function formModalReducer<T extends HaveId, C, U>(
	state: State<T, C, U>,
	action: Action<T, C, U>,
): State<T, C, U> {
	switch (action.type) {
		case ActionTypeEnum.LOADING:
			setLoading<T, C, U>(state, action.loading);
			break;
		case ActionTypeEnum.OPEN:
			handleOpen<T, C, U>(state, action.action);
			break;
		case ActionTypeEnum.DELETE:
			return handleDelete<T, C, U>(state, action);
		case ActionTypeEnum.CLOSE:
			handleClose(state);
			break;
		case ActionTypeEnum.LOAD_DATA:
			handleLoadData(state, action);
			break;
		default:
			return action satisfies never;
	}
	return { ...state };
}

function setLoading<T extends HaveId, C, U>(
	state: State<T, C, U>,
	loading: SetLoadingAction["loading"],
) {
	state.loading = loading;
}

function handleOpen<T extends HaveId, C, U>(
	state: State<T, C, U>,
	action: OpenAction["action"],
) {
	state.action = action;
	state.open = true;
	state.loading = true;
}

function handleDelete<T extends HaveId, C, U>(
	state: State<T, C, U>,
	action: DeleteAction<T>,
): DeleteState<T, C, U> {
	return {
		...state,
		initialData: undefined,
		action: FormActionsEnum.DELETE,
		itemId: action.id,
	} satisfies DeleteState<T, C, U>;
}

function handleClose<T extends HaveId, C, U>(state: State<T, C, U>) {
	state.action = undefined;
	state.open = false;
	state.itemId = undefined;
	state.loading = true; // TODO Maybe separate into another function
}

function handleLoadData<T extends HaveId, C, U>(
	state: State<T, C, U>,
	action: LoadDataAction<C, U>,
) {
	state.initialData = action.data;
	state.loading = false;
}
