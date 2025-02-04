import { FormInstance } from "antd/lib";

import FormActionsEnum from "@enums/form-actions.enum";
import HaveId from "@interfaces/have-id";

interface TypeMap<C, U> {
	C: C;
	U: U;
}

interface ActionTypeMap<C, U> {
	C: FormActionsEnum.CREATE;
	U: FormActionsEnum.UPDATE;
}

export type FormModalStates<T extends HaveId, C, U> = {
	[P in keyof TypeMap<C, U>]: {
		form: FormInstance<TypeMap<C, U>[P]>;
		itemId: T["id"] | undefined;
		data: Partial<TypeMap<C, U>[P]> | undefined;
		loading: boolean;
		open: boolean;
		action: ActionTypeMap<C, U>[P];
		formReset: Partial<TypeMap<C, U>[P]>;
	};
}[keyof TypeMap<C, U>];
