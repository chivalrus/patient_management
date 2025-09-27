import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const patients = [
    {id: "1", email: "john@ymail.com", name: "John", age: 25},
    {id: "2", email: "pete@hotmail.com", name: "Peter", age: 28},
    {id: "3", email: "luke@gmail.com", name: "Luke", age: 30},
    {id: "4", email: "sample@gmail.com", name: "Luke", age: 30},
    {id: "5", email: "sample@gmail.com", name: "Luke", age: 30},
    {id: "6", email: "sample@gmail.com", name: "Luke", age: 30},
    {id: "7", email: "sample@gmail.com", name: "Luke", age: 30},
    {id: "8", email: "sample@gmail.com", name: "Luke", age: 30},
    {id: "9", email: "sample@gmail.com", name: "Luke", age: 30},
    {id: "10", email: "sample@gmail.com", name: "Luke", age: 30},
    {id: "11", email: "sample@gmail.com", name: "Luke", age: 30},
];

const typeDefs = `
    type Query {
        getPatients: [Patient]
        getPatientById(id: ID!): Patient
    }

    type Mutation {
        registerPatient(email: String!, name: String!, age: Int!): Patient
    }

    type Patient {
        id: ID
        email: String
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
            const { email, name, age } = args;
            const newPatient = {
                id: (patients.length + 1).toString(),
                email,
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