import HaveId from "@interfaces/have-id";
import FormModalState from "../form-modal-state";
import TableDataAction from "./table-data-action";

export type State<T extends HaveId, C, U> = FormModalState<T, C, U>;
export type Action<T extends HaveId, C, U> = TableDataAction<T, C, U>;
