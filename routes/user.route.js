const userRoutes = require("express").Router();
const {
  userRegister,
  addUser,
  login,
  listUsers,
  loginUser,
  cekUserLogin,
  hapusUser,
  ubahUser,
  ubahRoleUser,
} = require("../controller/user.controller");
const flash = require("connect-flash");
const { body, validationResult } = require("express-validator");
const User = require("../model/users");
const { comparePassword } = require("../validasi/hashingPassword");

userRoutes.use(flash());

userRoutes.get("/register", userRegister);

userRoutes.use(async (req, res, next) => {
  req.cekUser = await User.find({ email: req.body.email });
  next();
});

userRoutes.post(
  "/tambahUser",
  body("email").custom(async (value, { req }) => {
    if (req.cekUser) {
      // jika ada user
      throw new Error("email sudah digunakan");
    }
    return true;
  }),
  addUser
);

userRoutes.post(
  "/loginUser",
  [
    body("email").custom(async (valueEmail, { req }) => {
      if (valueEmail === "" || req.body.password === "") {
        throw new Error("email dan password harus diisi");
      } else if (!req.cekUser[0]) {
        // jika tidak ada user
        throw new Error("email dan password salah");
      }
      return true;
    }),
    body("password").custom(async (valuePassword, { req }) => {
      if (req.cekUser[0]) {
        // jika email dan password tidak cocok
        const matchPass = await comparePassword(
          valuePassword,
          req.cekUser[0].password
        );
        if (!matchPass) {
          throw new Error("email dan password Salah!");
        }
      }
      return true;
    }),
  ],
  cekUserLogin
);
userRoutes.get("/login", login);
userRoutes.get("/users", listUsers);
userRoutes.get("/loginUser", loginUser);
userRoutes.get("/ubahUser/:id", ubahUser);
userRoutes.delete("/hapusUser", hapusUser);
userRoutes.put("/ubahRoleUser", ubahRoleUser);

module.exports = userRoutes;
