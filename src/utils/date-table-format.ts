"use client";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dateParse from "./date-parse";

dayjs.extend(localizedFormat);

export default function dateTableFormat(value: string): string {
	return dateParse(value).format("L");
}
