"use client";
import { Form, Modal } from "antd";

export interface FormModalProps {
	title: string;
	openState: boolean;
	onOk?: () => unknown;
	onCancel?: () => unknown;
	onSubmit?: () => unknown;
}

export default function FormModal({
	title,
	openState,
	onOk,
	onCancel,
	onSubmit,
}: FormModalProps) {
	return (
		<Modal open={openState} onOk={onOk} onCancel={onCancel}>
			<Form></Form>
		</Modal>
	);
}
