import { ActionsEnum } from "@enums/actions";
import { FormInstance } from "antd";

export interface FormModalProps<F> {
	action: ActionsEnum.CREATE | ActionsEnum.UPDATE;
	initialData: Partial<F> | undefined;
	form: FormInstance<F>;
	children: React.ReactNode;
	objectName: string;
	openState: boolean;
	onCancel: () => void;
	onSubmit: (data: F, id?: string | number) => void;
}
