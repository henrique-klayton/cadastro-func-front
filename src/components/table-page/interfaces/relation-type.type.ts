import Flatten from "@interfaces/flatten.type";
import StringKeyof from "@interfaces/string-keyof.type";

type RelationType<T, K extends StringKeyof<T> = StringKeyof<T>> = Flatten<T[K]>;
export default RelationType;
