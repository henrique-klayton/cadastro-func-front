import { CodegenConfig } from "@graphql-codegen/cli";
import { addTypenameSelectionDocumentTransform } from "@graphql-codegen/client-preset";
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
				documentMode: "string",
				namingConvention: {
					enumValues: "change-case-all#upperCase",
				},
			},
			documentTransforms: [addTypenameSelectionDocumentTransform],
		},
	},
};

export default config;
