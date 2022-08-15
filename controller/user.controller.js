const User = require("../model/users");
const Book = require("../model/books");
const { validationResult } = require("express-validator");
const { hashPassword } = require("../validasi/hashingPassword");

const userRegister = (req, res) => {
  res.status(200);
  res.render("register", { title: "Halaman Register", layout: "register" });
};

const addUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).render("register", {
      title: "Halaman Register",
      layout: "register",
      errors: errors.array(),
    });
  } else {
    const newUser = {
      nama: req.body.nama,
      email: req.body.email,
      password: await hashPassword(req.body.password),
      role: 3,
    };
    User.insertMany(newUser, () => {
      res.render("login", {
        errors: [{ msg: "Berhasil! Silahkan Login" }],
        title: "Halaman Login",
        layout: "login",
      });
      res.status(200);
    });
  }
};

const cekUserLogin = async (req, res) => {
  const errors = validationResult(req);
  // console.log(cekUser);
  if (!errors.isEmpty()) {
    // jika error request tidak kosong
    // return res.status(400).json({errors: errors.array()})
    res.render("login", {
      title: "Halaman Login",
      layout: "login",
      errors: errors.array(),
    });
  } else {
    const books = await Book.find();
    const session = req.session;
    session.user = req.cekUser;
    const userLogin = session.user;
    // console.log(userLogin);
    res.status(200);
    if (userLogin === undefined) {
      res.redirect("/login"); // alihkan ke halaman login
    } else {
      res.render("books", {
        books,
        userLogin,
        title: "Halaman Buku",
        layout: "layouts/main-layout",
        msg: "Login Berhasil",
      });
    }
  }
};

const login = async (req, res) => {
  res.status(200);
  res.render("login", { title: "Halaman Login", layout: "login" });
};

const loginUser = (req, res) => {
  if (req.session.user === undefined) {
    res.redirect("/login");
  } else {
    res.redirect("/");
  }
};

const listUsers = async (req, res) => {
  const userLogin = req.session.user;
  if (userLogin === undefined) {
    res.redirect("/login");
  } else if (userLogin[0].role !== 1) {
    return res.redirect("/");
  } else {
    const users = await User.find();
    res.status(200);
    res.render("users", {
      title: "Halaman User",
      layout: "layouts/main-layout",
      userLogin,
      users,
      msg: req.flash("msg"),
    });
  }
};

const hapusUser = (req, res) => {
  const userLogin = req.session.user;
  if (userLogin[0].role !== 1) {
    res.redirect("/");
  } else {
    User.deleteOne({ nama: req.body.nama }).then((result) => {
      req.flash("msg", "Data User Berhasil Dihapus");
      res.status(200);
      res.redirect("/users");
    });
  }
};

const ubahUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  const userLogin = req.session.user;
  if (userLogin === undefined) {
    return res.redirect("/login");
  } else if (userLogin[0].role !== 1) {
    return res.redirect("/");
  }
  res.status(200);
  res.render("ubahRoleUser", {
    title: "Ubah Role User",
    layout: "layouts/main-layout",
    user,
    userLogin,
  });
};

const ubahRoleUser = (req, res) => {
  const userLogin = req.session.user;
  if (userLogin === undefined) {
    return res.redirect("/login");
  } else if (userLogin[0].role !== 1) {
    return res.redirect("/");
  }
  console.log(req.body.id);
  User.updateOne(
    { email: req.body.email },
    {
      $set: {
        role: req.body.role,
      },
    }
  )
    .then((result) => {
      // res.render('books',{userLogin})
      req.flash("msg", "role user berhasil diubah");
      res.redirect("/users");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  userRegister,
  addUser,
  login,
  listUsers,
  loginUser,
  cekUserLogin,
  hapusUser,
  ubahRoleUser,
  ubahUser,
};
