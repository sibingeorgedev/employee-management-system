import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';
import { Employee } from './models/schema.js';
import { } from "./models/db.js";
// import { } from "./initial-data.js";

const app = express();

const typeDefs = `
  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int!
    dateOfJoining: String!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: Boolean!
  }

  type Query {
    getEmployees: [Employee]
  }

  type Mutation {
    createEmployee(
      firstName: String!,
      lastName: String!,
      age: Int!,
      dateOfJoining: String!,
      title: String!,
      department: String!,
      employeeType: String!
    ): Employee
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
        getEmployees: async () => await Employee.find({})
    },
    Mutation: {
        createEmployee: async (_, args) => {
            const newEmployee = new Employee(args);
            return await newEmployee.save();
        }
    }
    // Date: GQLDate
};

const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
    server.applyMiddleware({ app, path: '/graphql' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`GraphQL Server is running at http://localhost:${port}`);
});
