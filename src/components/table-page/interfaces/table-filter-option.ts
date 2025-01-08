import { DefaultOptionType } from "antd/es/select";

export default interface TableFilterOption<O extends number>
	extends DefaultOptionType {
	label: string;
	value: O;
}
