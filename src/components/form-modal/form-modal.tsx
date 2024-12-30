import { Form, Modal } from "antd";
import { FormInstance } from "antd/lib";

import FormActionsEnum from "@enums/form-actions";
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
	onFieldsChange,
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
					case FormActionsEnum.CREATE:
						onSubmit({
							action,
							data: form.getFieldsValue(),
						});
						break;
					case FormActionsEnum.UPDATE:
						onSubmit({
							action,
							data: form.getFieldsValue(),
							id: currentId,
						});
						break;
				}
			}}
			onCancel={onCancel}
			afterClose={() => form.resetFields()}
		>
			<Form
				layout="vertical"
				form={form as FormInstance}
				onFieldsChange={onFieldsChange}
			>
				{children}
			</Form>
		</Modal>
	);
}
