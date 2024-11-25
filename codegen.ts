import { CodegenConfig } from "@graphql-codegen/cli";
import graphqlConfig from "./graphql.config";

const config: CodegenConfig = {
	schema: graphqlConfig.schema,
	documents: graphqlConfig.documents,
	ignoreNoDocuments: true,
	generates: {
		"./src/graphql/types/": {
			preset: "client",
			config: {
				fragmentMasking: { unmaskFunctionName: "getFragmentData" },
				documentMode: "string"
			},
		},
	},
};

export default config;
