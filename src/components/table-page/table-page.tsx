"use client";
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
	App,
	Card,
	Col,
	Flex,
	FloatButton,
	Form,
	ModalFuncProps,
	Row,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { FormInstance } from "antd/lib";
import { useEffect, useReducer, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import DataTable from "@components/data-table";
import DataTableActions from "@components/data-table/interfaces/data-table-actions";
import FormModal from "@components/form-modal";
import { FormModalActions, FormSubmitFunc } from "@components/form-modal/types";
import RelationSelectTable from "@components/relation-select-table";
import TableFilterComponent from "@components/table-filter";
import MIN_PAGE_SIZE from "@consts/min-page-size.const";
import FormActionsEnum from "@enums/form-actions.enum";
import relationTablesReducer from "@hooks/relation-tables-reducer";
import {
	createRelationTablesContext,
	createRelationTablesDispatchContext,
} from "@hooks/relation-tables-reducer/relation-tables-context";
import relationTablesInitializer from "@hooks/relation-tables-reducer/relation-tables-initializer";
import RelationActionEnum from "@hooks/relation-tables-reducer/types/relation-tables-action-type";
import TableDataInitializerConfig from "@hooks/table-data-reducer/interfaces/table-data-intializer-config";
import tableDataInitializer from "@hooks/table-data-reducer/table-data-initializer";
import tableDataReducer from "@hooks/table-data-reducer/table-data-reducer";
import TableDataActionEnum from "@hooks/table-data-reducer/types/table-data-action-type";
import HaveId from "@interfaces/have-id";
import HaveStatus from "@interfaces/have-status";
import PartialNullable from "@typings/partial-nullable";
import StringKeyof from "@typings/string-keyof";
import serializeFilterValues from "@utils/serialize-filter-values";
import RelationTypeIds from "./interfaces/relation-type-ids.type";
import {
	FormModalStateProps,
	ServerActionRelations,
	TablePageFormModalProps,
	TablePageProps,
} from "./types";

import "./table-page.css";

export default function TablePageComponent<
	T extends HaveId & HaveStatus,
	C extends U,
	U extends PartialNullable<HaveId & HaveStatus>,
	F,
>({
	children,
	table: tableProps,
	title,
	itemName,
	actions: {
		tableQueryAction,
		formQueryAction,
		createAction,
		updateAction,
		deleteAction,
	},
	queryDataParsers: parsers,
	relationsData,
	filters: filterConfig,
}: TablePageProps<T, C, U, F>) {
	const formReset = { status: false } as Partial<U>;
	const [action, setAction] = useState(FormActionsEnum.CREATE);
	const [formOpen, setFormOpen] = useState(false);
	const [formLoading, setFormLoading] = useState(false);
	const [formData, setFormData] = useState<Partial<C> | Partial<U>>(formReset);
	const [formId, setFormId] = useState<T["id"] | undefined>(undefined);
	const [form] = useForm() as [FormInstance<C> | FormInstance<U>];

	// Relation Tables Reducer & Context
	const [relationTablesState, relationsDispatch] = useReducer(
		relationTablesReducer<U>,
		relationsData ?? [],
		relationTablesInitializer<U>,
	);
	const { loaded: relationTablesLoaded, config: relationTablesProps } =
		relationTablesState;

	const RelationTablesContext = createRelationTablesContext<U>();
	const RelationTablesDispatchContext =
		createRelationTablesDispatchContext<U>();

	// Delete Confirm Modal
	const { modal: confirmModal, message } = App.useApp();
	const confirmQuestion = `Tem certeza que deseja remover esse(a) ${itemName}?`;

	// DataTable Component States & Functions
	const loadTableData = async (page?: number, pageSize?: number) => {
		tableDispatcher({
			type: TableDataActionEnum.SET_LOADING,
			loading: true,
		});
		return tableQueryAction(
			serializeFilterValues(table.filterValues, table.filterConfig),
			page,
			pageSize,
		).catch((err: unknown) => {
			message.error("Erro ao atualizar a tabela!");
			tableDispatcher({
				type: TableDataActionEnum.SHOW_CLEAN_PAGE,
			});
			throw err;
		});
	};

	const reloadTableData = async (page?: number, pageSize?: number) => {
		loadTableData(page, pageSize).then(({ data, total }) => {
			tableDispatcher({
				type: TableDataActionEnum.CHANGE_PAGE,
				page: page ?? table.pagination.page ?? 1,
				pageSize: pageSize ?? table.pagination.pageSize ?? MIN_PAGE_SIZE,
				data,
				total,
			});
		});
	};

	const [table, tableDispatcher] = useReducer(
		tableDataReducer<T, F>,
		{
			paginationChangeHandler: reloadTableData,
			filterConfig,
		} satisfies TableDataInitializerConfig<T, F>,
		tableDataInitializer<T, F>,
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Must be called once
	useEffect(() => {
		loadTableData().then(({ data, total }) => {
			return tableDispatcher({
				type: TableDataActionEnum.INIT,
				data,
				total,
			});
		});
	}, []);

	const dataTableActions: DataTableActions<T> = {
		onUpdateClick: async (id: T["id"]) => {
			setFormId(id);
			const item = formQueryAction(id).then((obj) => {
				if (parsers) {
					for (const key in parsers) {
						obj[key] = parsers[key](obj[key]);
					}
				}
				return obj;
			});
			openFormModal(FormActionsEnum.UPDATE, item as Promise<U>);
		},
		onDeleteClick: async (id: T["id"]) => {
			const confirmModalProps: ModalFuncProps = {
				icon: <ExclamationCircleFilled />,
				okText: "Remover",
				okType: "danger",
				title: confirmQuestion,
				onOk: () => {
					return handleDeleteConfirm(id, true)
						.then(() => {
							message.success(`${itemName} removido(a) com sucesso!`);
							reloadTableData();
						})
						.catch((err: Error) => {
							message.error(err.message);
						});
				},
			};
			await confirmModal.confirm(confirmModalProps);
		},
	};

	// Form Modal Functions
	const formSubmit: FormSubmitFunc<C, U> = ({ action, data, id }) => {
		form.validateFields().then(() => {
			const relations: ServerActionRelations<U> = {};
			if (relationsData) {
				for (const relation of relationsData) {
					const key = relation.key;
					relations[key] = relationTablesProps[key].selectedDataKeys;
				}
			}

			switch (action) {
				case FormActionsEnum.CREATE:
					createAction(data, relations)
						.then((item) => {
							message.success(`${itemName} criado(a) com sucesso!`);
							reloadTableData();
						})
						.catch((err: Error) => {
							closeFormModal();
							message.error(err.message);
						});
					break;

				case FormActionsEnum.UPDATE:
					updateAction(id, data, relations)
						.then((item) => {
							message.success(`${itemName} atualizado(a) com sucesso!`);
							reloadTableData();
						})
						.catch((err: Error) => {
							closeFormModal();
							message.error(err.message);
						});
					break;
			}
			closeFormModal();
		});
	};

	const openFormModal = async (
		action: FormModalActions,
		initialData: Promise<U | undefined> = Promise.resolve(undefined),
	) => {
		try {
			setAction(action);
			setFormLoading(true);
			setFormOpen(true);
			// Render tables before form load
			renderRelationTables();

			const data = await initialData;
			if (data) setFormData(data);
			else setFormData(formReset);
			setFormLoading(false);

			await loadRelationsListData(data);
		} catch (err) {
			const error =
				err instanceof Error ? err : new Error(String(err), { cause: err });
			console.error(error);
			console.error(error.message);
			message.error("Erro ao carregar formulário!");
			closeFormModal();
		}
	};

	const closeFormModal = () => {
		setFormOpen(false);
		setFormData(formReset);
		relationsDispatch({ type: RelationActionEnum.RESET_ALL });
	};

	const handleFormModalCancel = () => {
		closeFormModal();
	};

	// Relation Tables Functions
	const renderRelationTables = () => {
		if (!relationTablesLoaded) {
			const elements: React.ReactNode[] = [];
			for (const key in relationTablesProps) {
				console.log(`Render ${key} relation table`);
				const relation = relationTablesProps[key];
				const element = (
					<Row key={relation.dataKey}>
						<Col span={24}>
							<Form.Item
								name={relation.dataKey as string}
								key={relation.dataKey}
							>
								<RelationSelectTable dataKey={relation.dataKey} />
							</Form.Item>
						</Col>
					</Row>
				);
				elements.push(element);
			}
			relationsDispatch({
				type: RelationActionEnum.RENDER_ALL,
				elements,
			});
		}
	};

	const loadRelationsListData = async (formData?: U) => {
		console.log("Preparing to load relation tables");
		for (const key in relationTablesProps) {
			console.log(`Getting data to load ${key} table`);
			const relation = relationTablesProps[key];
			const { data, total } = await relation.queryRelatedAction({
				status: true,
			});
			let relatedData: RelationTypeIds<U> = [];
			if (formData && Array.isArray(formData[key])) {
				relatedData = formData[key].map(
					(item) => item.id,
				) as RelationTypeIds<U>;
			}
			relationsDispatch({
				type: RelationActionEnum.INITIAL_LOAD,
				dataKey: key,
				data,
				total,
				selectedDataKeys: relatedData,
				dispatcher: relationsDispatch,
			});
		}
	};

	// Delete Confirm Modal Functions
	const handleDeleteConfirm = async (id: T["id"], confirm: boolean) => {
		setAction(FormActionsEnum.DELETE);
		if (confirm) return deleteAction(id);
	};

	// TableFilter Functions
	const handleFilterChanges = (key: StringKeyof<F>, value: number) => {
		tableDispatcher({
			type: TableDataActionEnum.FILTER_CHANGED,
			key,
			value,
		});
		table.filterValues[key] = value;
		reloadTableData();
	};

	// Form Modal Props
	const formModalStates = {
		action: action as FormModalActions,
		form: form,
		initialData: formData,
		currentId: formId,
		onSubmit: formSubmit,
		onFieldsChange: undefined,
	} satisfies FormModalStateProps<C, U> as TablePageFormModalProps<C, U>;

	return (
		<RelationTablesContext.Provider value={relationTablesState}>
			<RelationTablesDispatchContext.Provider value={relationsDispatch}>
				<FormModal<C, U>
					{...formModalStates}
					objectName={itemName}
					loading={formLoading}
					open={formOpen}
					onCancel={handleFormModalCancel}
				>
					{children}
				</FormModal>
				<Card title={title}>
					<Flex className="w-full h-full" vertical>
						<TableFilterComponent
							filters={table.filterConfig}
							onFilterChange={handleFilterChanges}
						/>
						<DataTable<T>
							{...tableProps}
							data={table.tableData}
							loading={table.tableLoading}
							actions={dataTableActions}
							pagination={table.pagination}
							registerName={itemName}
						/>
						{/* TODO Create component */}
						<FloatButton
							className="create-button"
							type="primary"
							tooltip={`Criar ${itemName}`}
							icon={<AiOutlinePlus />}
							onClick={() => {
								openFormModal(FormActionsEnum.CREATE);
							}}
						/>
					</Flex>
				</Card>
			</RelationTablesDispatchContext.Provider>
		</RelationTablesContext.Provider>
	);
}
