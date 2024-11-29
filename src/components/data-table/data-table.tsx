"use client";
import { Button, Flex, Table, Tag, Tooltip } from "antd";
import { ColumnProps } from "antd/es/table";
import { ReactNode } from "react";
import { AiOutlineDelete, AiOutlineForm } from "react-icons/ai";
import { HaveId } from "../../app/interfaces/have-id";

export interface DataTableActions<T extends HaveId> {
	create?: (data: T) => Promise<unknown>;
	update?: (data: T) => Promise<unknown>;
	delete?: (data: T) => Promise<unknown>;
	onUpdateClick: (id: T["id"]) => unknown;
	onDeleteClick: (id: T["id"]) => unknown;
}

export type TableColumn<T> = ColumnProps<T> & RequiredColumnProps<T>;
export interface RequiredColumnProps<T> {
	title: string;
	dataIndex: Extract<keyof T, string | number>;
}

export interface DataTableProps<T extends HaveId> {
	data: T[];
	rowKey: keyof T;
	columns: Array<TableColumn<T>>;
	actions?: DataTableActions<T>;
}

const renderStatus = (_: unknown, { status }: { status: boolean }) => {
	const color = status ? "green" : "red";
	return (
		<Tag className="leading-6" color={color}>
			{status ? "ATIVO" : "INATIVO"}
		</Tag>
	);
};

export default function DataTable<T extends HaveId>({
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

	const renderActions = (_: unknown, { id }: T) => {
		return (
			<>
				<Flex justify="flex-start" align="center" gap="0.5rem">
					<Tooltip title="Editar">
						<Button
							icon={<AiOutlineForm />}
							color="primary"
							variant="outlined"
							onClick={() => actions?.onUpdateClick(id)}
						/>
					</Tooltip>
					<Tooltip title="Remover">
						<Button
							danger
							icon={<AiOutlineDelete />}
							variant="outlined"
							onClick={() => actions?.onDeleteClick(id)}
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
		<Table<T> className="flex-auto" dataSource={data} rowKey={rowKey}>
			{columns}
		</Table>
	);
}
