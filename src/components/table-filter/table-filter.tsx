import StringKeyof from "@interfaces/string-keyof.type";
import { Col, Form, Row, Select } from "antd";
import TableFilterProps from "./table-filter-props";

export default function TableFilterComponent<T>({
	filters: filtersProps,
	tableData,
	onFilterChange,
}: TableFilterProps<T>) {
	const filters: React.ReactNode[] = Object.keys(filtersProps).map(
		(stringKey) => {
			const key = stringKey as StringKeyof<T>;
			const props = filtersProps[key];
			if (!props) return;
			const onChange = (option: number) => {
				// props.initialValue = option;
				onFilterChange(
					key,
					option,
					tableData.filter((value) =>
						props.filterFunction(value[key], value, option),
					),
				);
			};
			return (
				<Col key={props.name} span={4}>
					<Form.Item label={props.label} name={props.name as string}>
						<Select
							defaultValue={props.initialValue}
							options={props.options}
							onChange={onChange}
						/>
					</Form.Item>
				</Col>
			);
		},
	);

	return (
		<Form layout="vertical">
			<Row gutter={24}>{filters}</Row>
		</Form>
	);
}
