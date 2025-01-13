import StringKeyof from "@interfaces/string-keyof.type";
import { Col, Form, Row, Select, Typography } from "antd";
import TableFilterProps from "./table-filter-props";

export default function TableFilterComponent<T, F>({
	filters: filtersProps,
	tableData,
	onFilterChange,
}: TableFilterProps<T, F>) {
	const { Title } = Typography;
	const filters: React.ReactNode[] = Object.keys(filtersProps).map(
		(stringKey) => {
			const key = stringKey as StringKeyof<F>;
			const props = filtersProps[key];
			if (!props) return;
			const onChange = (option: number) => {
				// props.initialValue = option;
				// FIXME Missing filter
				// onFilterChange(
				// 	key,
				// 	option,
				// 	tableData.filter((value) =>
				// 		props.filterFunction(value[key], value, option),
				// 	),
				// );
			};
			return (
				<Col key={props.name} span={props.colSpan}>
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
			<Row gutter={24} justify="end" align="middle">
				<Col span={2}>
					<Title className="text-end" level={5}>
						Filtros:
					</Title>
				</Col>
				{filters}
			</Row>
		</Form>
	);
}
