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

// type PropTypes =
// 	| { type: "text"; props: AntdInputProps }
// 	| { type: "select"; props: SelectProps }
// 	| { type: "date"; props: DatePickerProps }
// 	| { type: "time"; props: TimePickerProps };

// type PropTypeName = PropTypes["type"];
// type PropTypeValue = PropTypes["props"];
// type PropType<T extends PropTypeName> = PropTypeMap extends {
// 	type: T;
// }
// 	? Props[T]
// 	: never;
// type Select = PropType<"select">;

// type TypeOfProp = {
// 	[P in PropTypeName]: {
// 		key: string;
// 		inputType: P;
// 		inputProps: Props[P];
// 	};
// }[PropTypeName];

interface InputProps {
	text: AntdInputProps;
	select: SelectProps;
	date: DatePickerProps;
	time: TimePickerProps;
}

// type PropTypes = {
// 	[P in keyof InputProps]: { type: P; props: InputProps[P] };
// }[keyof InputProps];

// type PropTypeName = PropTypes["type"];
// type PropTypeValue = PropTypes["props"];

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

// export default interface FormItemConfig<
// 	CreateItem extends UpdateItem,
// 	UpdateItem,
// 	Props,
// 	PropKey,
// 	Key extends keyof UpdateItem,
// > {
// 	key: Key;
// 	formInput: Pick<FormItemProps, IncludedFormItemProps> &
// 		RequiredFormItemProps<Key>;
// 	inputType: PropKey;
// 	inputProps: PropType<PropKey>;
// }

// export const buildFormItemConfig = <C extends U, U>({
// 	key,
// 	formInput,
// 	inputType,
// 	inputProps,
// }: FormItemConfig<C, U, InputProps, keyof InputProps, keyof U>): Readonly<
// 	FormItemConfig<C, U, InputProps, typeof inputType, typeof key>
// > => {
// 	return {
// 		key,
// 		formInput,
// 		inputType,
// 		inputProps,
// 	} as const;
// };

// export const buildFormItemConfig = <
// 	C extends U,
// 	U,
// 	P extends T[K],
// 	K extends keyof InputProps = keyof InputProps,
// 	T extends InputProps = InputProps,
// >(
// 	key: keyof U,
// 	formInput: FormInput<typeof key>,
// 	inputType: keyof InputProps,
// 	inputProps: P,
// ): Readonly<FormItemConfig<C, U, InputProps, typeof inputType, typeof key>> => {
// 	return {
// 		key,
// 		formInput,
// 		inputType,
// 		inputProps,
// 	} as const;
// };

// export const buildFormItemConfig = <
// 	C extends U,
// 	U,
// 	PK extends keyof InputProps,
// 	PV extends PropTypeValue = InputProps[PK],
// 	P extends PropTypes = PropTypes,
// 	K extends keyof U = keyof U,
// >(
// 	key: K,
// 	formInput: FormInput<K>,
// 	inputType: PK,
// 	inputProps: InputProps[PK],
// ): FormItemConfig<K>[PK] => {
// 	return {
// 		key,
// 		formInput,
// 		inputType,
// 		inputProps,
// 	} as unknown as FormItemConfig<K>[PK];
// };

// export const buildFormItemConfig = <
// 	C extends U,
// 	U,
// 	PK extends keyof InputProps = keyof InputProps,
// 	PV extends PropTypeValue = InputProps[PK],
// 	P extends PropTypes = PropTypes,
// 	K extends keyof U = keyof U,
// >({
// 	key,
// 	formInput,
// 	inputType,
// 	inputProps,
// }: FormItemConfig<K>[PK]): FormItemConfig<K>[PK] => {
// 	return {
// 		key,
// 		formInput,
// 		inputType,
// 		inputProps,
// 	} as unknown as FormItemConfig<K>[PK];
// };
