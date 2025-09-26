import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const patients = [
    {id: "1", name: "John", age: 25},
    {id: "2", name: "Peter", age: 28},
    {id: "3", name: "Luke", age: 30},
];

const typeDefs = `
    type Query {
        getPatients: [Patient]
        getPatientById(id: ID!): Patient
    }

    type Mutation {
        registerPatient(name: String!, age: Int!): Patient
    }

    type Patient {
        id: ID
        name: String
        age: Int
    }
`

const resolvers = {
    Query: {
        getPatients: () => {
            return patients;
        },
        getPatientById: (parent, args) => {
            const id = args.id;
            // TODO: Add more condition field
            return patients.find((patient) => patient.id === id);
        }
    },
    Mutation: {
        registerPatient: (parent, args) => {
            const { name, age } = args;
            const newPatient = {
                id: (patients.length + 1).toString(),
                name,
                age
            };
            patients.push(newPatient)
        }
    }
}

const server = new ApolloServer({
    typeDefs, resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`server running at: ${url}`);