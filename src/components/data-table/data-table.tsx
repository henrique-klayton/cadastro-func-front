import { App, Button, Flex, Table, Tag, Tooltip } from "antd";
import { useEffect } from "react";
import { AiOutlineDelete, AiOutlineForm } from "react-icons/ai";

import serializeFilterValues from "@functions/serialize-filter-values";
import useTableDataReducer from "@hooks/table-data-reducer/table-data-context";
import TableDataActionEnum from "@hooks/table-data-reducer/types/table-data-action-type";
import HaveId from "@interfaces/have-id";
import HaveStatus from "@interfaces/have-status";
import DataTableProps from "./interfaces/data-table-props";

import "./data-table.css";

const statusRender = (_: unknown, { status }: { status: boolean }) => {
	const color = status ? "green" : "red";
	return (
		<Tag className="leading-6" color={color}>
			{status ? "ATIVO" : "INATIVO"}
		</Tag>
	);
};

export default function DataTable<T extends HaveId & HaveStatus, F>({
	className,
	rowKey,
	columns: columnsProps,
	actions,
	registerName,
	reloadEvent,
	queryAction,
}: DataTableProps<T, F>) {
	// Messages const
	const tableLoadError = "Erro ao carregar a tabela!";
	const tableReloadError = "Erro ao atualizar a tabela!";

	const [table, tableDispatch] = useTableDataReducer<T, F>();
	const { message } = App.useApp();

	const loadTableData = async (page?: number, pageSize?: number) => {
		tableDispatch({
			type: TableDataActionEnum.SET_LOADING,
			loading: true,
		});
		return queryAction(
			serializeFilterValues(table.filterValues, table.filterConfig),
			page,
			pageSize,
		);
	};

	const firstTableDataLoad = async () => {
		try {
			const { data, total } = await loadTableData();
			return tableDispatch({
				type: TableDataActionEnum.INIT,
				data,
				total,
				paginationChangeHandler: reloadTableData,
			});
		} catch (err) {
			message.error(tableLoadError);
			tableDispatch({
				type: TableDataActionEnum.SHOW_CLEAN_PAGE,
			});
		}
	};

	const reloadTableData = async (page: number, pageSize: number) => {
		try {
			const { data, total } = await loadTableData(page, pageSize);
			return tableDispatch({
				type: TableDataActionEnum.CHANGE_PAGE,
				page,
				pageSize,
				data,
				total,
			});
		} catch (err) {
			message.error(tableReloadError);
			tableDispatch({
				type: TableDataActionEnum.SHOW_CLEAN_PAGE,
			});
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: Ignore functions
	useEffect(() => {
		reloadEvent
			? reloadTableData(reloadEvent.page, reloadEvent.pageSize)
			: firstTableDataLoad();
	}, [reloadEvent]);

	const columns = columnsProps.map((column) => {
		const property = column.dataIndex;

		if (property === "status") {
			if (column.align != null) column.align = "center";
			if (column.width == null && column.formatter == null) column.width = 100;
			column.render = statusRender as () => React.ReactNode;
		}

		if (column.formatter) {
			const formatter = column.formatter;
			column.render = (_: unknown, obj: T) => formatter(obj[property]);
		}

		return <Table.Column {...column} key={column.key ?? property} />;
	});

	const renderActions = (_: unknown, { id }: T) => {
		return (
			<Flex justify="center" align="center" gap="1rem">
				<Tooltip title={`Editar ${registerName}`}>
					<Button
						icon={<AiOutlineForm />}
						color="primary"
						variant="outlined"
						onClick={() => actions.onUpdateClick(id)}
					/>
				</Tooltip>
				<Tooltip title={`Remover ${registerName}`}>
					<Button
						danger
						icon={<AiOutlineDelete />}
						variant="outlined"
						onClick={() => actions.onDeleteClick(id)}
					/>
				</Tooltip>
			</Flex>
		);
	};

	columns.push(
		<Table.Column
			className="actions-column"
			title="Ações"
			key="actions"
			align="center"
			width={120}
			render={renderActions}
		/>,
	);

	return (
		<Flex className="flex-table-wrapper" vertical>
			<Table<T>
				sticky
				className={className}
				rowKey={rowKey}
				dataSource={table.tableData}
				pagination={{ ...table.pagination, className: "mr-12" }}
				loading={table.tableLoading}
			>
				{columns}
			</Table>
		</Flex>
	);
}
