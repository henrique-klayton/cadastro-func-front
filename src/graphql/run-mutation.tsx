import { TypedDocumentString } from "@graphql/types/graphql";
import { CombinedError } from "urql";
import getUrqlClient from "./client";
import GraphQLError from "./graphql-error";

export default async function runMutation<R, V extends object>(
	mutation: TypedDocumentString<R, V>,
	variables: V,
): Promise<R> {
	try {
		const { data: mutationResult, error } = await getUrqlClient()
			.mutation(mutation.toString(), variables ?? {})
			.toPromise();

		if (error) throw new Error("Mutation error", { cause: error });
		if (mutationResult == null) throw new Error("Mutation null/undefined");
		return mutationResult;
	} catch (err) {
		let message = "Mutation failed";
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
