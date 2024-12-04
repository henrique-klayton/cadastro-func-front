import { Form, Modal } from "antd";

import { ActionsEnum } from "../../enums/actions";
import { FormModalProps } from "./types";

export default function FormModal<F>({
	children,
	action,
	objectName,
	initialData,
	form,
	open,
	loading,
	onCancel,
	onSubmit,
}: FormModalProps<F>) {
	form.setFieldsValue(initialData as object);
	return (
		<Modal
			title={`${action} ${objectName}`}
			open={open}
			loading={loading}
			okText="Salvar"
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
			afterClose={() => form.resetFields()}
		>
			<Form layout="vertical" form={form}>
				{children}
			</Form>
		</Modal>
	);
}
