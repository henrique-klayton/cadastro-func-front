"use client";
import { Menu, MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";

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
	const path = usePathname();
	const routeName = path.split("/")[1];
	const onClick = (ev: { key: string }) => {
		router.push(`/${ev.key}`);
	};

	return (
		<nav className="contents">
			<Menu
				className="h-full"
				onClick={onClick}
				selectedKeys={[routeName]}
				mode="inline"
				items={items}
			/>
		</nav>
	);
}
