import { createSchema } from "graphql-yoga";

import { GraphQLContext } from "../context";
import { login, register } from "../../../domain/services/user";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Ping {
      ping: String!
      timestamp: String!
    }

    type Token {
      token: String!
      timestamp: String!
    }

    type User {
      email: String!
      pass: String!
      role: String!
    }

    type Query {
      ping: Ping
      private: String
      privateAdmin: String
    }

    type Mutation {
      register(email: String!, pass: String!): User
      login(email: String!, pass: String!): Token
    }
  `,
  resolvers: {
    Query: {
      ping: () => ({
        ping: "pong",
        timestamp: new Date().getTime().toString(),
      }),

      private: (parent: unknown, args: unknown, context: GraphQLContext) => {
        const user = context.currentUser;
        if (!user) return null;
        return "private";
      },
      privateAdmin: (
        parent: unknown,
        args: unknown,
        context: GraphQLContext,
      ) => {
        const user = context.currentUser;
        if (!user) return null;
        if (user.role != "ADMIN") return null;
        return "private admin";
      },
    },
    Mutation: {
      register: async (
        parent: unknown,
        args: { email: string; pass: string },
      ) => {
        const { email, pass } = { ...args };
        const user = await register({ email, pass });
        return user;
      },
      login: async (parent: unknown, args: { email: string; pass: string }) => {
        const { email, pass } = { ...args };
        const token = await login({ email, pass });
        return {
          token,
          timestamp: new Date().getTime().toString(),
        };
      },
    },
  },
});
