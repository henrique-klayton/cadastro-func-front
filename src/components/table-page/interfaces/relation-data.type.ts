import Flatten from "@typings/flatten";
import StringKeyof from "@typings/string-keyof";

type RelationData<T, K extends StringKeyof<T> = StringKeyof<T>> = Array<
	Flatten<T[K]>
>;
export default RelationData;
