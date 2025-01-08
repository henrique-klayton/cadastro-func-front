import { FormItemProps } from "antd/lib";

type IncludedFormItemProps =
	| "name"
	| "label"
	| "tooltip"
	| "dependencies"
	| "required"
	| "rules"
	| "hasFeedback"
	| "validateDebounce"
	| "validateFirst"
	| "validateStatus"
	| "validateTrigger";

export default interface FormItemConfig<C, U, P>
	extends Partial<Pick<FormItemProps, IncludedFormItemProps>> {
	key: keyof C | U;
	input: React.ReactElement<P>;
	inputProps: P;
}
