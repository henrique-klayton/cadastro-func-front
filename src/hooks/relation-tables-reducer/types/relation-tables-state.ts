import { RelationTablesConfigsObject } from "@hooks/relation-tables-reducer/types";

export default interface RelationTablesState<Item> {
	tables: React.ReactNode[];
	loaded: boolean;
	config: RelationTablesConfigsObject<Item>;
}
