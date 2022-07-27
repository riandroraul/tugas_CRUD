const User = require('../model/users')
const {validationResult} = require('express-validator')

const userRegister = (req, res) => {
    res.status(200)
    res.render('register', { title: 'Halaman Register', layout: 'register', })
}

const addUser = (req, res) => {
    const newUser = {
        nama: req.body.nama,
        email: req.body.email,
        password: req.body.password,
        role: 3
    }

    const errors = validationResult(req)
    if (!errors.isEmpty()) { // jika ada error request
        // return res.status(400).json({errors: errors.array()})
        res.status(400).render('register', {
            title: 'Halaman Register',
            layout: 'register',
            errors: errors.array()
        });
    } else{
        User.insertMany(newUser, () => {
            res.render('login', {errors: [{msg: 'Berhasil! Silahkan Login'}], title: 'Halaman Login', layout: 'login'})
            // req.flash('msg', 'Berhasil! silahkan login')
            res.status(200)
        })
    }
}

const login = async (req, res) => {
    const users = await User.find()
    res.status(200)
    res.render('login', { title: 'Halaman Login', layout: 'login', users })
}

module.exports = { userRegister, addUser, login }