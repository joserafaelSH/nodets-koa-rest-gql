import { YogaInitialContext } from "graphql-yoga";
import { User } from "../user/user";
import { authenticateUser } from "../auth/auth";

export type GraphQLContext = {
  currentUser: User | null;
};

export async function createContext(
  initialContext: YogaInitialContext,
): Promise<GraphQLContext | undefined> {
  return {
    currentUser: await authenticateUser(initialContext.request),
  };
}
