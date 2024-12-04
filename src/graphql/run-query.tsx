import { TypedDocumentString } from "@graphql/types/graphql";
import getUrqlClient from "./client";

export default async function runQuery<R, V>(
	query: TypedDocumentString<R, V>,
	variables?: V,
): Promise<R> {
	try {
		const { data: queryResult, error } = await getUrqlClient()
			.query(query.toString(), variables ?? {})
			.toPromise();

		// TODO Log error object if exists
		if (queryResult == null) throw new Error("Query null/undefined");
		return queryResult;
	} catch (err) {
		throw new Error("Query failed", { cause: err });
	}
}
