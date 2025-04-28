const ErrorHandling = require("../error/ErrorHandling");

class PaperController {
  async fetchAll(req, res, next) {
    try {
      return res.status(200).json({
        data: [
          {
            id: 1,
            title: "Paper 1",
            description: "Description of Paper 1",
            author: "Author 1",
            date: "2023-01-01",
          },
          {
            id: 2,
            title: "Paper 2",
            description: "Description of Paper 2",
            author: "Author 2",
            date: "2023-02-01",
          },
          {
            id: 3,
            title: "Paper 3",
            description: "Description of Paper 3",
            author: "Author 3",
            date: "2023-03-01",
          },
          {
            id: 4,
            title: "Paper 4",
            description: "Description of Paper 4",
            author: "Author 4",
            date: "2023-04-01",
          },
          {
            id: 5,
            title: "Paper 5",
            description: "Description of Paper 5",
            author: "Author 5",
            date: "2023-05-01",
          },
          {
            id: 6,
            title: "Paper 6",
            description: "Description of Paper 6",
            author: "Author 6",
            date: "2023-06-01",
          },
          {
            id: 7,
            title: "Paper 7",
            description: "Description of Paper 7",
            author: "Author 7",
            date: "2023-07-01",
          },
          {
            id: 8,
            title: "Paper 8",
            description: "Description of Paper 8",
            author: "Author 8",
            date: "2023-08-01",
          },
          {
            id: 9,
            title: "Paper 9",
            description: "Description of Paper 9",
            author: "Author 9",
            date: "2023-09-01",
          },
          {
            id: 10,
            title: "Paper 10",
            description: "Description of Paper 10",
            author: "Author 10",
            date: "2023-10-01",
          },
        ],
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
}

module.exports = new PaperController();
