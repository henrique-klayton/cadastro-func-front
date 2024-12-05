import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function timeSerialize(value: string): string {
	return value.substring(11);
}
