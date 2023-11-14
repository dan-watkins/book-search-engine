const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  // Include CONTEXT for the me query //
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError();
      }

      return await User.findById(context.user._id);
    },
    user: async (parent, args) => {
      const allUsers = await User.find();
      return allUsers;
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await User.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token };
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
