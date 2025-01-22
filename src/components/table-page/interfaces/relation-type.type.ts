import Flatten from "@typings/flatten";
import StringKeyof from "@typings/string-keyof";

type RelationType<T, K extends StringKeyof<T> = StringKeyof<T>> = Flatten<T[K]>;
export default RelationType;
