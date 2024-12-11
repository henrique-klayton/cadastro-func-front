import { RelationKeyObject, RelationTableProps } from "./types";

export default function createRelationsList<UpdateItem>(
	relationsKeys: RelationKeyObject<UpdateItem>[],
	data: RelationTableProps<UpdateItem, keyof UpdateItem>["data"],
	selectedDataKeys: RelationTableProps<
		UpdateItem,
		keyof UpdateItem
	>["selectedDataKeys"],
) {
	return relationsKeys?.map(({ key: dataKey, component }) => ({
		data,
		dataKey: dataKey,
		component,
		selectedDataKeys,
	}));
}
