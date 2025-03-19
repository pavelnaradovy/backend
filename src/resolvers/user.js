const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) throw new Error('Потрібна авторизація');
      const user = await User.findById(context.user.id);
      if (!user) throw new Error('Користувача не знайдено');
      return user;
    },
  },
  Mutation: {
    register: async (parent, { name, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error('Email уже зайнятий');

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();

      const token = generateToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('Неправильний email або пароль');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Неправильний email або пароль');

      const token = generateToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;