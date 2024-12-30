import Flatten from "@interfaces/flatten.type";
import StringKeyof from "@interfaces/string-keyof.type";

type RelationData<T, K extends StringKeyof<T> = StringKeyof<T>> = Array<
	Flatten<T[K]>
>;
export default RelationData;
