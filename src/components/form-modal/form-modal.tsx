import { Form, Modal } from "antd";

import { ActionsEnum } from "../../enums/actions";
import { FormModalProps } from "./types";

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
