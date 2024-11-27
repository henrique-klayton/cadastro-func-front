"use client";
import { Button, Flex, Table, Tag, Tooltip } from "antd";
import { ColumnProps } from "antd/es/table";
import { ReactNode } from "react";
import { AiOutlineDelete, AiOutlineForm } from "react-icons/ai";

export interface DataTableActions<T> {
	create?: (data: T) => Promise<unknown>;
	update?: (data: T) => Promise<unknown>;
	delete?: (data: T) => Promise<unknown>;
	onUpdateClick: () => unknown;
	onDeleteClick: () => unknown;
}

export type TableColumn<T> = ColumnProps<T> & RequiredColumnProps<T>;
export interface RequiredColumnProps<T> {
	title: string;
	dataIndex: Extract<keyof T, string | number>;
}

export interface DataTableProps<T> {
	data: T[];
	rowKey: keyof T;
	columns: Array<TableColumn<T>>;
	actions?: DataTableActions<T>;
}

const renderStatus = (_: unknown, { status }: { status: boolean }) => {
	const color = status ? "green" : "red";
	return <Tag color={color}>{status ? "Ativo" : "Inativo"}</Tag>;
};

export default function DataTable<T extends object>({
	data,
	rowKey,
	columns: columnsProps,
	actions,
}: DataTableProps<T>) {
	const columns = columnsProps.map((item) => {
		if (item.dataIndex === "status")
			item.render = renderStatus as () => ReactNode;
		if (item.align != null) item.align = "center";
		return <Table.Column {...item} key={item.key ?? item.dataIndex} />;
	});

	const renderActions = () => {
		return (
			<>
				<Flex
					justify="flex-start"
					align="center"
					gap="0.5rem"
					// className="text-2xl"
				>
					<Tooltip title="Editar">
						<Button
							icon={<AiOutlineForm />}
							size="large"
							color="primary"
							variant="outlined"
							// className="text-blue-600"
							// onClick={actions.onUpdateClick}
						/>
					</Tooltip>
					<Tooltip title="Remover">
						<Button
							danger
							icon={<AiOutlineDelete />}
							size="large"
							variant="outlined"
							// className="text-red-600"
							// onClick={actions.onDeleteClick}
						/>
					</Tooltip>
				</Flex>
			</>
		);
	};

	columns.push(
		<Table.Column title="Ações" key="actions" render={renderActions} />,
	);

	return (
		<Table<T> dataSource={data} rowKey={rowKey}>
			{columns}
		</Table>
	);
}
