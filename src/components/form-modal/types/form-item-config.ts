import {
	FormItemProps as AntdFormItemProps,
	InputProps as AntdInputProps,
	DatePickerProps,
	SelectProps,
	TimePickerProps,
} from "antd/lib";

type IncludedFormItemProps =
	| "tooltip"
	| "dependencies"
	| "required"
	| "rules"
	| "hasFeedback"
	| "validateDebounce"
	| "validateFirst"
	| "validateStatus"
	| "validateTrigger";

interface RequiredFormItemProps<K> {
	name: K;
	label: string;
}

type FormItemProps<Key> = Pick<AntdFormItemProps, IncludedFormItemProps> &
	RequiredFormItemProps<Key>;

interface InputProps {
	text: AntdInputProps;
	select: SelectProps;
	date: DatePickerProps;
	time: TimePickerProps;
}

export type FormItemConfig<C extends U, U> = {
	[P in keyof InputProps]: {
		[K in keyof C]: {
			key: K;
			formItem: FormItemProps<K>;
			inputType: P;
			inputProps: InputProps[P];
		};
	}[keyof C];
}[keyof InputProps];

type SingleConfig<C extends U, U> = {
	[P in keyof C]: FormItemConfig<C, U>;
};
export type FormItemConfigArray<C extends U, U> = Array<
	SingleConfig<C, U>[keyof C]
>;
