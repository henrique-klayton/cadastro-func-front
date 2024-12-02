"use client";
import { Modal } from "antd";
import { ConfirmModalProps } from "./types";

export default function ConfirmModal({
	handleOk,
	handleCancel,
}: ConfirmModalProps) {
	return <Modal onOk={handleOk}>Texto</Modal>;
}
