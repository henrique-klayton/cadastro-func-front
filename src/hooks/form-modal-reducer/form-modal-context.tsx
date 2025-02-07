import { createContext, useContext } from "react";

import HaveId from "@interfaces/have-id";
import FormModalAction from "./types/form-modal-action";
import FormModalState from "./types/form-modal-state";

export const FormModalContext = createContext(
	{} as FormModalState<HaveId, object, object>,
);
export const FormModalDispatchContext = createContext(
	null as unknown as React.Dispatch<FormModalAction<HaveId, object, object>>,
);

export const createFormModalContext = <T extends HaveId, C, U>() =>
	FormModalContext as unknown as React.Context<FormModalState<T, C, U>>;
export const createFormModalDispatchContext = <T extends HaveId, C, U>() =>
	FormModalDispatchContext as React.Context<
		React.Dispatch<FormModalAction<T, C, U>>
	>;

export function useFormModal<T extends HaveId, C, U>() {
	return useContext(FormModalContext) as unknown as FormModalState<T, C, U>;
}

export function useFormModalDispatch<T extends HaveId, C, U>() {
	// FIXME Could be null
	return useContext(FormModalDispatchContext) as React.Dispatch<
		FormModalAction<T, C, U>
	>;
}

export default function useFormModalReducer<T extends HaveId, C, U>(): [
	ReturnType<typeof useFormModal<T, C, U>>,
	ReturnType<typeof useFormModalDispatch<T, C, U>>,
] {
	return [useFormModal<T, C, U>(), useFormModalDispatch<T, C, U>()];
}
