const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [bookSchema]
}

type bookSchema {
    _id: ID!
    authors: String
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}

type Auth {
    token: ID!
    user: User
}

type Query {
    user: [User]
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, email: String!, password: String!): Auth
    saveBook(books: bookSchema!): User
    removeBook(bookId: ID!): User
}
`;

module.exports = typeDefs;
