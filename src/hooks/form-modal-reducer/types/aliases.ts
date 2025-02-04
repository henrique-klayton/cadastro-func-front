import HaveId from "@interfaces/have-id";
import FormModalAction from "./form-modal-action";
import FormModalState from "./form-modal-state";

export type State<T extends HaveId, C, U> = FormModalState<T, C, U>;
export type Action<T extends HaveId, C, U> = FormModalAction<T, C, U>;
