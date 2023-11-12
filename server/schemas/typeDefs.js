const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
}

type Book {
    _id: ID!
    authors: String
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}

type Query {
    user: [User]
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): User
}
`;

module.exports = typeDefs;
