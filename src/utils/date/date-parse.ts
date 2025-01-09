"use client";
import dayjs, { Dayjs } from "dayjs";

export default function dateParse(value: string): Dayjs {
	return dayjs(value);
}
