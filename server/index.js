import express from 'express';
import { ApolloServer } from 'apollo-server-express';
// import { } from "./initial-data.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { resolvers } from "./graphql/resolvers/resolvers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const typeDefs = fs.readFileSync(
    path.join(__dirname, "graphql/schemas/schema.graphql"),
    "utf-8",
);

const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
    server.applyMiddleware({ app, path: '/graphql', cors: true });
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`GraphQL Server is running at http://localhost:${port}`);
});
