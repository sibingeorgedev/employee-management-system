import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';

const app = express();

const typeDefs = `
type Query {
    hello: String
}
`;

const GQLDate = new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
        if (typeof value === 'string') {
            return new Date(value); // Convert incoming integer to Date
        }
        throw new Error('GraphQL Date Scalar parser expected a `number`');
    },
    serialize(value) {
        return value
            .toISOString()
            .slice(0, 10)
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return new Date(ast.value)
        }
        // Invalid hard-coded value (not an integer)
        return null;
    },
})

const resolvers = {
    Query: {
        hello: () => 'Hello World!'
    }
};
const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
    server.applyMiddleware({ app, path: '/graphql' });
});

const port = process.env.PORT || 3001;
// Start listening
app.listen(port, () => {
    console.log(`GraphQL Server is running at http://localhost:${port}`);
});
