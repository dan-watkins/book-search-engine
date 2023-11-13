const { User, bookSchema } = require("../models");
const { signToken } = require("../utils/auth");

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
      const token = signToken(createdUser);
      return { token, createdUser };
    },
  },
};

module.exports = resolvers;
