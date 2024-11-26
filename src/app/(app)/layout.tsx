import Sidebar from "@components/sidebar";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Layout>
			<Sider width="20%">
				<Sidebar />
			</Sider>
			<Content className="m-2">{children}</Content>
		</Layout>
	);
}
