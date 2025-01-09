import FormActionsEnum from "@enums/form-actions.enum";
import FormData from "./form-data";

export type FormSubmitData<C, U> = FormCreateData<C> | FormUpdateData<U>;

export type FormSubmitFunc<C, U> = (submit: FormSubmitData<C, U>) => void;

export type FormOnSubmit<C, U> = ((submit: FormCreateData<C>) => void) &
	((submit: FormUpdateData<U>) => void);

export interface FormCreateData<C> {
	action: FormActionsEnum.CREATE;
	data: FormData<C>;
	id?: undefined;
}

export interface FormUpdateData<U> {
	action: FormActionsEnum.UPDATE;
	data: FormData<U>;
	id: string | number;
}
