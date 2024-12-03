"use client";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import timeParse from "./time-parse";

dayjs.extend(customParseFormat);

export default function timeTableFormat(value: string): string {
	return timeParse(value).format("HH:mm");
}
