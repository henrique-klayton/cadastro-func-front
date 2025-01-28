import FormActionsEnum from "@enums/form-actions.enum";
import { FloatButton } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import "./floating-button.css";

export interface CreateButtonProps {
	itemName: string;
	onClick: (action: FormActionsEnum.CREATE) => unknown;
}

export default function CreateButton({ itemName, onClick }: CreateButtonProps) {
	return (
		<FloatButton
			className="floating-button"
			type="primary"
			tooltip={`Criar ${itemName}`}
			icon={<AiOutlinePlus />}
			onClick={() => onClick(FormActionsEnum.CREATE)}
		/>
	);
}
