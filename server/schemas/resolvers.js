const { User } = require("../models");

const resolvers = {
  Query: {
    user: async (parent, args) => {
      const matchedUser = await User.find(args);
      return matchedUser;
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const createdUser = await User.create({ username, email, password });
      return createdUser;
    },
  },
};

module.exports = resolvers;
