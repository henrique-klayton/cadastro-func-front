import RelationTypeIds from "../interfaces/relation-type-ids.type";

type ServerActionRelations<T> = {
	[P in keyof T]?: RelationTypeIds<T>;
};
export default ServerActionRelations;
