const User = require('../model/users')
const flash = require('connect-flash')


const userRegister = (req, res) => {
    // res.send('hello world')
    // res.sendFile('./index.html', {root: __dirname})
    res.status(200)
    res.render('register', { title: 'Halaman Register', layout: 'register', })
}

const addUser = async(req, res) => {
    const newUser = {
        nama: req.body.nama,
        email: req.body.email,
        password: req.body.password,
        role: 3
    }
    User.insertMany(newUser, () => {
        req.flash('msg', 'Berhasil! silahkan login')
        res.status(200)
        res.redirect('/login')
    })
}

module.exports = { userRegister, addUser }