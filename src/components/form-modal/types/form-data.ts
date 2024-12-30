/* biome-ignore lint/suspicious/noExplicitAny:
Impossible to know data type, some fields could be formatted to another type
*/
type FormData<T> = { [P in keyof T]: any };
export default FormData;
