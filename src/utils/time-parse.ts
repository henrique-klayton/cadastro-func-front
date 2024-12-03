"use client";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function timeParse(value: string): Dayjs {
	return dayjs(value, "HH:mm:ss.SSSZ");
}
