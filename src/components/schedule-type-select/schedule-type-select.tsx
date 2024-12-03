import { Select } from "antd";
import loadScheduleTypeSelect from "./load-select-action";

export default async function ScheduleTypeSelect() {
	const types = await loadScheduleTypeSelect();
	return <Select options={types} />;
}
