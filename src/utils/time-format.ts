import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function timeFormat(value: Dayjs): string {
	return value.format("HH:mm:ss.SSSZ");
}
