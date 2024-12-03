"use client";
import { App as AntdApp, ConfigProvider, theme } from "antd";

import ptBR from "antd/locale/pt_BR";

import "dayjs/locale/pt-br";
import dayjs from "dayjs";
dayjs.locale("pt-br");

export default function AppLayoutClient({
	children,
}: { children: React.ReactNode }) {
	return (
		<ConfigProvider
			locale={ptBR}
			theme={{
				algorithm: theme.darkAlgorithm,
			}}
		>
			<AntdApp className="flex w-full h-full">{children}</AntdApp>
		</ConfigProvider>
	);
}
