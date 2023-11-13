const { User } = require("../models");
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
    login: async (parent, { email, password }) => {
      const loginUser = await User.findOne({ email });
      const token = signToken(loginUser);
      return { token, loginUser};
    },
    saveBook: async (parent, { books }, context) => {
      const userBook = await User.findOneAndUpdate({ _id: context.user._id }, {$addToSet: { savedBooks: books }}, { new: true });
      return userBook;
    },
    removeBook: async (parent, { bookId }, context) => {
      const removedBook = await User.findOneAndUpdate({ _id: context.user._id}, {$pull: { books: { bookId }}}, { new: true });
      return removedBook;
    }
  },
};

module.exports = resolvers;
