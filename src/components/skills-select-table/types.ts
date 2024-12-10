import Skill from "@models/skill";

export interface SkillsSelectTableProps {
	skills: Skill[];
	enabledSkills: Skill["id"][];
}
