import { TypedDocumentString } from "@graphql/types/graphql";
import getUrqlClient from "./client";

export default async function runMutation<R, V extends object>(
	mutation: TypedDocumentString<R, V>,
	variables: V,
): Promise<R> {
	try {
		const { data: mutationResult } = await getUrqlClient()
			.mutation(mutation.toString(), variables ?? {})
			.toPromise();

		if (mutationResult == null) throw new Error("Mutation null/undefined");
		return mutationResult;
	} catch (err) {
		throw new Error("Mutation failed", { cause: err });
	}
}
