"use client";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export default function timeParse(value: string): string {
	return value.substring(0, 5);
}
