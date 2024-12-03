"use client";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function timeTableFormat(value: Dayjs): string {
	return value.format("HH:mm");
}
