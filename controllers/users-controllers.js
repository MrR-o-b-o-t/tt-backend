const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");

const DUMMY_USERS = [
  {
    id: "u1",
    creator: "Sam Kautz",
    email: "test@test.com",
    password: "test123",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const getUserByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const users = DUMMY_USERS.filter((u) => {
    return u.id === userId;
  });

  if (!users || users.length === 0) {
    return next(
      new Error("Could not find user for the provided user id.", 404)
    );
  }

  res.json({ users });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error("Invalid inputs passed, please check your data.", 422);
  }
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new Error("Could not create user, email already exists.", 422);
  }

  const createdUser = {
    id: uuid(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new Error(
      "Could not identify user, credentials seem to be wrong.",
      401
    );
  }

  res.json({ message: "Logged in!" });
};

exports.getUserByUserId = getUserByUserId
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
