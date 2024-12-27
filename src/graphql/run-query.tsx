import { TypedDocumentString } from "@graphql/types/graphql";
import { CombinedError } from "urql";
import getUrqlClient from "./client";
import GraphQLError from "./graphql-error";

export default async function runQuery<R, V>(
	query: TypedDocumentString<R, V>,
	variables?: V,
	nextTag?: string,
): Promise<R> {
	try {
		const fetchOptions: RequestInit = {};
		if (nextTag) fetchOptions.next = { tags: [nextTag] };
		const { data: queryResult, error } = await getUrqlClient()
			.query(query.toString(), variables ?? {}, { fetchOptions })
			.toPromise();

		if (error) throw new Error("Query error", { cause: error });
		if (queryResult == null) throw new Error("Query null/undefined");
		return queryResult;
	} catch (err) {
		let message = "Query failed";
		let cause = err;
		if (err instanceof Error) cause = err.cause;
		if (cause instanceof CombinedError) {
			if (cause.graphQLErrors.length > 0)
				message = cause.graphQLErrors[0].message;
			if (cause.networkError) cause = cause.networkError;
			throw new GraphQLError(message, { cause });
		}
		throw new Error(message, { cause });
	}
}
