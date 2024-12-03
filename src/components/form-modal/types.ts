import { ActionsEnum } from "@enums/actions";
import { FormInstance } from "antd";

export type FormModalActions = ActionsEnum.CREATE | ActionsEnum.UPDATE;

export interface FormModalProps<F> {
	action: FormModalActions;
	initialData: Partial<F> | undefined;
	form: FormInstance<F>;
	children: React.ReactNode;
	objectName: string;
	open: boolean;
	loading: boolean;
	onCancel: () => void;
	onSubmit: (data: F, id?: string | number) => void;
}
