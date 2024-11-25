import { cacheExchange, Client, createClient, fetchExchange } from "urql";
import graphqlConfig from "../../graphql.config";

declare global {
	var urqlClient: Client | undefined;
}

export default function getUrqlClient() {
	if (!global.urqlClient) {
		global.urqlClient = createClient({
			url: graphqlConfig.schema,
			exchanges: [cacheExchange, fetchExchange],
		});
	}
	return global.urqlClient;
}
