import HaveId from "@interfaces/have-id";
import StringKeyof from "@typings/string-keyof";
import RelationType from "./relation-type.type";

type RelationTypeIds<
	T,
	K extends StringKeyof<T> = StringKeyof<T>,
> = RelationType<T, K> extends HaveId
	? Array<RelationType<T, K>["id"]>
	: never[];
export default RelationTypeIds;
