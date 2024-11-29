import { Form, Modal } from "antd";
import { ReactNode } from "react";
import { Actions } from "../../enums/actions";

export type FormModalProps<C, U> =
	| CreateModalProps<C, U>
	| UpdateModalProps<C, U>;
export interface BaseModalProps<C, U> {
	children: ReactNode;
	objectName: string;
	initialData: C | U | undefined;
	openState: boolean;
	onCancel: () => void;
}
export interface CreateModalProps<C, U> extends BaseModalProps<C, U> {
	action: Actions.CREATE;
	onSubmit: (data: C) => void;
}
export interface UpdateModalProps<C, U> extends BaseModalProps<C, U> {
	action: Actions.UPDATE;
	onSubmit: (data: U, id: string | number) => void;
}

export default function FormModal<C, U>({
	children,
	action,
	objectName,
	initialData,
	openState,
	onCancel,
	onSubmit,
}: FormModalProps<C, U>) {
	return (
		<Modal
			title={`${action} ${objectName}`}
			open={openState}
			onOk={() => {
				switch (action) {
					case Actions.CREATE:
						onSubmit({} as C);
						break;
					case Actions.UPDATE:
						onSubmit({} as U, "data.id");
						break;

					default:
						break;
				}
			}}
			onCancel={onCancel}
		>
			<Form>{children}</Form>
		</Modal>
	);
}
