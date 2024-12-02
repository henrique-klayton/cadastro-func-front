import { TypedDocumentString } from "@graphql/types/graphql";
import getUrqlClient from "./client";

export default async function runMutation<R, V extends object>(
	mutation: TypedDocumentString<R, V>,
	variables: V,
): Promise<R> {
	const { data: mutationResult } = await getUrqlClient()
		.query(mutation.toString(), variables ?? {})
		.toPromise();

	if (mutationResult === undefined) throw new Error("Mutation failed");
	return mutationResult;
}
