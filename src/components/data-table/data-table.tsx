import { App, Button, Flex, Table, Tag, Tooltip } from "antd";
import { useEffect } from "react";
import { AiOutlineDelete, AiOutlineForm } from "react-icons/ai";

import serializeFilterValues from "@functions/serialize-filter-values";
import useTableDataReducer from "@hooks/table-data-reducer/table-data-context";
import TableDataActionEnum from "@hooks/table-data-reducer/types/table-data-action-type";
import HaveId from "@interfaces/have-id";
import HaveStatus from "@interfaces/have-status";
import DataTableProps from "./interfaces/data-table-props";

const renderStatus = (_: unknown, { status }: { status: boolean }) => {
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

	const heightCalc =
		16 + // Difference between view height and content height
		(56 + 1) + // Card header + -1px margin-bottom
		(945 - 56 - 841) + // Difference between ant-card and ant-card-body (discarding ant-card-header)
		86 + // Table filters
		(755 - (636 + 16)); // Discarding table header and (footer + footer margin-y) from table height

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
		if (property === "status")
			column.render = renderStatus as () => React.ReactNode;
		if (column.align != null) column.align = "center";
		if (column.formatter) {
			const formatter = column.formatter;
			column.render = (_: unknown, obj: T) => {
				return formatter(obj[property]);
			};
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
			title="Ações"
			key="actions"
			align="center"
			width={120}
			render={renderActions}
		/>,
	);

	return (
		<Table<T>
			className={className}
			scroll={{
				scrollToFirstRowOnChange: true,
				y: `calc(100vh - ${heightCalc}px)`,
			}}
			rowKey={rowKey}
			dataSource={table.tableData}
			pagination={{ ...table.pagination, className: "mr-12" }}
			loading={table.tableLoading}
		>
			{columns}
		</Table>
	);
}
