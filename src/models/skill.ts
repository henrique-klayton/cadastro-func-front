import TableColumn from "@components/data-table/types/table-column";
import { FormDataSerializer } from "@components/table-page/types";
import { SkillFragmentType } from "@fragments/skill";
import { SkillCreateDto, SkillUpdateDto } from "@graphql/types/graphql";

export default interface Skill {
	id: number;
	description: string;
	status: boolean;
}

export const sKillTableColumns: Array<TableColumn<SkillFragmentType>> = [
	{
		dataIndex: "id",
		title: "Id",
	},
	{
		dataIndex: "description",
		title: "Descrição",
	},
	{
		dataIndex: "status",
		title: "Status",
	},
];

export const createSerializer: FormDataSerializer<SkillCreateDto> = (data) => {
	// console.log(data.birthDate);
	// data.birthDate = dateSerialize(data.birthDate);
	// console.log(data.birthDate);
	return data;
};

export const updateSerializer: FormDataSerializer<SkillUpdateDto> = (data) => {
	// if (data.birthDate) data.birthDate = dateSerialize(data.birthDate);
	return data;
};
