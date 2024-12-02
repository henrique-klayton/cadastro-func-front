import { Form, FormInstance, Modal } from "antd";

import { ActionsEnum } from "../../enums/actions";

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

export interface UpdateModalProps<F> extends FormModalProps<F> {}

export default function FormModal<F>({
	children,
	action,
	objectName,
	initialData,
	form,
	openState,
	onCancel,
	onSubmit,
}: FormModalProps<F>) {
	return (
		<Modal
			title={`${action} ${objectName}`}
			open={openState}
			onOk={() => {
				switch (action) {
					case ActionsEnum.CREATE:
						onSubmit(form.getFieldsValue());
						break;
					case ActionsEnum.UPDATE:
						onSubmit(form.getFieldsValue(), "data.id");
						break;

					default:
						break;
				}
			}}
			onCancel={onCancel}
		>
			<Form layout="vertical" form={form} initialValues={initialData}>
				{children}
			</Form>
		</Modal>
	);
}
