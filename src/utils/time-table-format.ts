"use client";
import timeParse from "./time-parse";

export default function timeTableFormat(value: string): string {
	return timeParse(value).format("HH:mm");
}
