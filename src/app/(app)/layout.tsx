import Sidebar from "@components/sidebar";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

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
			<Content>{children}</Content>
		</Layout>
	);
}
