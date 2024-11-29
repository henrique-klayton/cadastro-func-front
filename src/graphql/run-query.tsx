import { TypedDocumentString } from "@graphql-types/graphql";
import getUrqlClient from "./client";

export default async function runQuery<R, V>(
	query: TypedDocumentString<R, V>,
	variables?: V,
): Promise<R> {
	const { data: queryResult } = await getUrqlClient()
		.query(query.toString(), variables ?? {})
		.toPromise();

	if (queryResult === undefined) throw new Error("Query failed");
	return queryResult;
}
