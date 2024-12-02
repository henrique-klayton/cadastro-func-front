"use client";
import { Button, Flex, Table, Tag, Tooltip } from "antd";
import { ColumnProps } from "antd/es/table";
import { AiOutlineDelete, AiOutlineForm } from "react-icons/ai";

import { HaveId } from "@interfaces/have-id";

export interface DataTableActions<T extends HaveId> {
	onUpdateClick: (id: T["id"]) => Promise<void>;
	onDeleteClick: (id: T["id"]) => Promise<void>;
}

export type TableColumn<T> = ColumnProps<T> & RequiredColumnProps<T>;

export interface RequiredColumnProps<T> {
	title: string;
	dataIndex: Extract<keyof T, string | number>;
	// biome-ignore lint/suspicious/noExplicitAny: Impossible to know formatter return value beforehand
	formatter?: (value: T[keyof T]) => any;
}

export interface DataTableProps<T extends HaveId> {
	data: T[];
	rowKey: keyof T;
	columns: Array<TableColumn<T>>;
	actions: DataTableActions<T>;
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
	const columns = columnsProps.map((column) => {
		const property = column.dataIndex;
		if (property === "status")
			column.render = renderStatus as () => React.ReactNode;
		if (column.align != null) column.align = "center";
		if (column.formatter) {
			const formatter = column.formatter;
			column.render = (_: unknown, obj: T) => {
				return formatter(obj[property]).format("HH:mm");
			};
		}
		return <Table.Column {...column} key={column.key ?? property} />;
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
