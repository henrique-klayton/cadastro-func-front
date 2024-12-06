import { Form, Modal } from "antd";

import { FormInstance } from "antd/lib";
import { ActionsEnum } from "../../enums/actions";
import { FormModalProps } from "./types";

export default function FormModal<C, U>({
	children,
	action,
	objectName,
	initialData,
	currentId,
	form,
	open,
	loading,
	onCancel,
	onSubmit,
}: FormModalProps<C, U>) {
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
						onSubmit({
							action,
							data: form.getFieldsValue(),
						});
						break;
					case ActionsEnum.UPDATE:
						onSubmit({
							action,
							data: form.getFieldsValue(),
							id: currentId,
						});
						break;

					default:
						break;
				}
			}}
			onCancel={onCancel}
			afterClose={() => form.resetFields()}
		>
			<Form layout="vertical" form={form as FormInstance}>
				{children}
			</Form>
		</Modal>
	);
}
