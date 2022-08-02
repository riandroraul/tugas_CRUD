const User = require('../model/users')
const Book = require('../model/books')

const { validationResult } = require('express-validator')
const { hashPassword, comparePassword } = require('../validasi/hashingPassword')


const userRegister = (req, res) => {
    res.status(200)
    res.render('register', { title: 'Halaman Register', layout: 'register', })
}


const addUser = async(req, res) => {
    const newUser = {
        nama: req.body.nama,
        email: req.body.email,
        password: await hashPassword(req.body.password),
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
    } else {
        User.insertMany(newUser, () => {
            res.render('login', { errors: [{ msg: 'Berhasil! Silahkan Login' }], title: 'Halaman Login', layout: 'login' })
                // req.flash('msg', 'Berhasil! silahkan login')
            res.status(200)
        })
    }
}

const cekUSerLogin = async (req, res) => {
    const errors = validationResult(req)
    // const userLogin = await User.findOne({email: req.body.email})
    if (!errors.isEmpty()) { // jika error request tidak kosong
        // return res.status(400).json({errors: errors.array()})
        res.render('login', {
            title: 'Halaman Login',
            layout: 'login',
            errors: errors.array()
        });
    } else {
        const books = await Book.find()
        // req.flash('msg', 'Login Berhasil')
        const session = req.session
        // console.log(session);
        session.email = req.body.email
        // console.log(session.email);
        
        const userLogin = await User.find({email: req.session.email})
        console.log(userLogin)

        res.status(200)
        // res.redirect('/books')
        if(req.session.email === undefined){
            res.redirect('/login')
        }else{
            res.render('books', {books, userLogin, title: 'Halaman Buku', layout: 'layouts/main-layout', msg: 'Login Berhasil',})
        }
            // });
    }
}

const login = async(req, res) => {
    const users = await User.find()
    res.status(200)
    res.render('login', { title: 'Halaman Login', layout: 'login', users })
}

const loginUser = (req, res) => {
    if(req.session.email === undefined){
        res.redirect('/login')
    }else{
        res.redirect('/')
    }
}

const listUsers = async (req, res) => {
    const userLogin = await User.find({email: req.session.email})
    const users = await User.find()
    if(userLogin[0].role !== 1){
        res.redirect('/')
    } else if(req.session.email === undefined){
            res.redirect('/login')
    } else{
        res.status(200)
        res.render('users', { title: 'Halaman User', layout: 'layouts/main-layout', userLogin, users, msg: req.flash('msg') })
    }
}


module.exports = { userRegister, addUser, login, listUsers, loginUser, cekUSerLogin}