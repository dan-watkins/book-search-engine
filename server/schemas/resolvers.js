const { User } = require("../models");

const resolvers = {
  Query: {
    user: async (parent, args) => {
      const matchedUser = await User.find(args);
      return matchedUser;
    },
  },
};

module.exports = resolvers;
