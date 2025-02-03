import { Form, Modal } from "antd";
import { FormInstance } from "antd/lib";

import FormActionsEnum from "@enums/form-actions.enum";
import { useRelationTables } from "@hooks/relation-tables-reducer/relation-tables-context";
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
	queryAction,
}: FormModalProps<C, U>) {
	form.setFieldsValue(initialData as object);
	const state = useRelationTables<U>();
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
				{state.tables}
			</Form>
		</Modal>
	);
}
