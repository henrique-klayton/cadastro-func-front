import { FloatButton } from "antd";
import { AiFillFileExcel } from "react-icons/ai";

import "./floating-button.css";

export interface ReportButtonProps {
	itemName: string;
	onClick: () => unknown;
}

export default function ReportButton({ itemName, onClick }: ReportButtonProps) {
	return (
		<FloatButton
			className="floating-button"
			type="primary"
			tooltip={`Gerar Relatório de ${itemName}`}
			icon={<AiFillFileExcel />}
			onClick={onClick}
		/>
	);
}
