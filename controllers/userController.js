const ErrorHandling = require("../error/ErrorHandling");
const User = require("../models/User");
const crypto = require("crypto");
class UserController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new ErrorHandling("Need input", "Input missing", 422);
      }
      const token = crypto.randomBytes(32).toString("hex");

      await User.updateOne({ email }, { $set: { token } });

      User.findOne({ email, password })
        .then(async (user) => {
          if (!user) {
            throw new ErrorHandling("User not found", "User not found", 404);
          }
          // const token = crypto.randomBytes(32).toString("hex");

          // await User.updateOne({ email }, { $set: { token } });
          res.status(200).json({ ...user });
        })
        .catch((err) => {
          next(err);
        });
    } catch (e) {
      next(e);
    }
  }

  async signup(req, res, next) {
    try {
      const { email, password, name } = req.body;
      if (!email || !password) {
        throw new ErrorHandling("Need input", "Input missing", 422);
      }

      User.insertOne({
        email,
        password,
        name,
      })
        .then((user) => {
          res.status(201).json(user);
        })
        .catch((err) => {
          next(err);
        });
    } catch (e) {
      next(e);
    }
  }

  async addToHistory(req, res, next) {
    try {
      const { query } = req.body;
      const userId = req.user.id;
      if (!query) {
        throw new ErrorHandling("Need input", "Input missing", 422);
      }

      const user = await User.findOne({ _id: userId });
      let userHistory = user.history;
      if (userHistory.length > 0) {
        userHistory.push(query);
      } else {
        userHistory = [query];
      }
      await User.updateOne(
        { _id: userId },
        { $set: { history: userHistory } },
        { new: true }
      )
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => {
          next(err);
        });
    } catch (e) {
      next(e);
    }
  }

  async fetchHistory(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await User.findOne({ _id: userId });
      if (!user) {
        throw new ErrorHandling("User not found", "User not found", 404);
      }
      res.status(200).json(user.history);
    } catch (e) {
      next(e);
    }
  }

  async fetchUser(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await User.findOne({ _id: userId });
      if (!user) {
        throw new ErrorHandling("User not found", "User not found", 404);
      }
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }
  async updateUser(req, res, next) {
    try {
      const userId = req.user.id;
      const { name, email } = req.body;
      if (!name || !email) {
        throw new ErrorHandling("Need input", "Input missing", 422);
      }
      await User.updateOne(
        { _id: userId },
        { $set: { name, email } },
        { new: true }
      )
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => {
          next(err);
        });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
