"use client";
import { Menu, MenuProps } from "antd";
import { useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
	{
		key: "home",
		label: "Home",
	},
	{
		key: "employee",
		label: "Funcionários",
	},
	{
		key: "schedule",
		label: "Escalas",
	},
	{
		key: "skill",
		label: "Habilidades",
	},
];

export default function Sidebar() {
	const router = useRouter();
	const onClick = (ev: { key: string }) => {
		router.push(`/${ev.key}`);
	};

	return (
		<nav className="w-100 h-100">
			<Menu onClick={onClick} mode="inline" items={items} />
		</nav>
	);
}
