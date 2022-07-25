const User = require('../model/users')
const flash = require('connect-flash')

const userRegister = (req, res) => {
    res.status(200)
    res.render('register', { title: 'Halaman Register', layout: 'register', })
}

const addUser = async (req, res) => {
    const newUser = await {
        nama: req.body.nama,
        email: req.body.email,
        password: req.body.password,
        role: 3
    }
    const emailDuplikat = await User.findOne({email: newUser.email})
    if (emailDuplikat) {
        res.render('register', {
            title: 'Halaman Register',
            layout: 'register',
            msg: req.flash('email sudah digunakan')
            // userLogin
        });
        console.log
        return;
    }
    
    User.insertMany(newUser, () => {
        req.flash('msg', 'Berhasil! silahkan login')
        res.status(200)
        res.redirect('/login')
    })
}

const login = async (req, res) => {
    const users = await User.find()
    res.status(200)
    res.render('login', { title: 'Halaman Login', layout: 'login', users })
}

module.exports = { userRegister, addUser, login }