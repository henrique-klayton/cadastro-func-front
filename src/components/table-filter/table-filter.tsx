import StringKeyof from "@typings/string-keyof";
import { Col, Form, Row, Select, Typography } from "antd";
import TableFilterProps from "./interfaces/table-filter-props";

export default function TableFilterComponent<F>({
	filters,
	onFilterChange,
}: TableFilterProps<F>) {
	const { Title } = Typography;
	const elements: React.ReactNode[] = Object.keys(filters).map((stringKey) => {
		const key = stringKey as StringKeyof<F>;
		const props = filters[key];
		if (!props) return;

		return (
			<Col key={props.name} span={props.colSpan}>
				<Form.Item label={props.label} name={props.name as string}>
					<Select
						defaultValue={props.initialValue}
						options={props.options}
						onChange={(option: number) => onFilterChange(key, option)}
					/>
				</Form.Item>
			</Col>
		);
	});

	return (
		<Form layout="vertical">
			<Row gutter={24} justify="end" align="middle">
				<Col span={2}>
					<Title className="text-end" level={5}>
						Filtros:
					</Title>
				</Col>
				{elements}
			</Row>
		</Form>
	);
}
