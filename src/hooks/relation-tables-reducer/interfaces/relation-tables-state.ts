import RelationTablesConfigsObject from "../types/relation-tables-configs-object";

export default interface RelationTablesState<Item> {
	tables: React.ReactNode[];
	loaded: boolean;
	config: RelationTablesConfigsObject<Item>;
}
