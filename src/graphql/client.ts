import { registerUrql } from "@urql/next/rsc";
import { cacheExchange, createClient, fetchExchange } from "urql";
import graphqlConfig from "../../graphql.config";

const makeClient = () => {
	return createClient({
		url: graphqlConfig.schema,
		exchanges: [cacheExchange, fetchExchange],
	});
};

export default function getUrqlClient() {
	const { getClient } = registerUrql(makeClient);
	return getClient();
}
