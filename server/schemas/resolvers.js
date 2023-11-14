const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  // Include CONTEXT for the me query //
  Query: {
    me: async (parent, args) => {
      const matchedUser = await User.findById(args.meId).select(
        "-__v -password"
      );
      return matchedUser;
    },
    user: async (parent, args) => {
      const allUsers = await User.find();
      return allUsers;
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const createdUser = await User.create({ username, email, password });
      const token = signToken(createdUser);
      return { token, createdUser };
    },
    login: async (parent, { email, password }) => {
      const loginUser = await User.findOne({ email });
      const token = signToken(loginUser);
      return { token, loginUser };
    },
    // include CONTEXT on the SAVE and REMOVE Mutations //
    removeBook: async (parent, { bookId }, context) => {
      const removedBook = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { books: { bookId } } },
        { new: true }
      );
      return removedBook;
    },
  },
};

module.exports = resolvers;
