import { GraphQLError } from "@graphql/graphql-error";

export default function catchQueryError(
	err: unknown,
	defaultMsg: string,
): never {
	if (err instanceof GraphQLError) throw err;
	if (err instanceof Error) {
		err.message = defaultMsg;
		throw err;
	}
	throw new Error(defaultMsg);
}
