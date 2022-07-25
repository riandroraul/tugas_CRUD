const express = require('express');
const expressLayout = require('express-ejs-layouts');
const { body, validationResult } = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')


const methodOverride = require('method-override')

require('./database')
const Book = require('./model/books');
const User = require('./model/users');
const userRoutes = require('./routes/user.route');

const app = express();
const port = 3000;

app.use(methodOverride('_method'))

app.use(flash())

// menggunakan view engine ejs
app.set('view engine', 'ejs');
app.use(expressLayout)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// konfigurasi flash
const oneDay = 1000 * 60 * 60 * 24;
app.use(cookieParser('secret'));
app.use(
    session({
        cookie: { maxAge: oneDay},
        // key: session,
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    })
)

app.use(flash())

app.use(userRoutes)

app.get('/', (req, res) => {
    res.status(200)
    res.render('index', { title: 'Halaman Home', layout: 'layouts/main-layout'})
})


app.post('/loginUser', [
        body('email').custom(async (value) => {
            const cekUser = await User.findOne({ email: value })
            if (!cekUser) { // jika ada user 
                throw new Error('email salah')
            }
            return true;
        }),
        body('password').custom(async(value) => {
            const cekPassword = await User.findOne({ password: value })
            if (!cekPassword) { // jika password benar
                throw new Error('Password Salah!')
            }
            return true;
        }),
    ],
    async (req, res) => {
        const session = req.session
        console.log(session)
        const errors = validationResult(req)
        const userLogin = await User.findOne({email: req.body.email})
        const books = await Book.find()
        if (!errors.isEmpty()) { // jika error request tidak kosong
            // return res.status(400).json({errors: errors.array()})
            res.render('login', {
                title: 'Halaman Login',
                layout: 'login',
                errors: errors.array()
            });
        } else {
            // req.flash('msg', 'Login Berhasil')
            const session = req.session
            session.email = req.body.email
            const userLogin = User.findOne({email: req.session.email})
            console.log(userLogin)
            res.status(200)
            // res.redirect('/books')
            res.render('books', {books, userLogin, title: 'Halaman Buku', layout: 'layouts/main-layout', msg: 'Login Berhasil'})
                // });
        }
    })

app.get('/books', async(req, res) => {
    const books = await Book.find()
    const users = await User.find()
    res.status(200)
    res.render('books', { title: 'Halaman Buku', layout: 'layouts/main-layout', books, users, msg: req.flash('msg') })
})


app.get('/users', async(req, res) => {
    const userLogin = await User.find()
    res.status(200)
    res.render('users', { title: 'Halaman User', layout: 'layouts/main-layout', userLogin, msg: req.flash('msg') })
})

// mengubah data buku
app.get('/ubah/:namaBuku', async(req, res) => {
    const book = await Book.findOne({ namaBuku: req.params.namaBuku })
    res.status(200)
    res.render('ubah', { title: 'Ubah Data Buku', layout: 'layouts/main-layout', book })
})

app.put('/ubah', [
        body('namaBuku').custom(async(value, { req }) => {
            const duplikat = await Book.findOne({ namaBuku: value })
                // console.log(value)
            if (value !== req.body.oldNamaBuku && duplikat) { // jika ada data nama buku yang sama
                throw new Error('Nama Buku Sudah Ada')
            }
            // console.log(value)
            return true;
        }),
    ],
    (req, res) => {
        // console.log(req.body)
        const errors = validationResult(req)
        if (!errors.isEmpty()) { // jika ada eror
            // return res.status(400).json({errors: errors.array()})
            res.render('ubah', {
                title: 'Ubah Data Buku',
                layout: 'layouts/main-layout',
                errors: errors.array(),
                book: req.body
            });
        } else {
            // console.log(req.body)
            Book.updateOne({ _id: req.body._id }, {
                $set: {
                    namaBuku: req.body.namaBuku,
                    penerbit: req.body.penerbit,
                    pengarang: req.body.pengarang
                }
            }).then((result) => {
                req.flash('msg', 'Data Buku Berhasil Diubah')
                res.redirect('/books')
            });
        }
    })

app.get('/tambah', async (req, res) => {
    const users = await User.find()
    // console.log(users)
    if(userLogin.role == 3){
        res.redirect('/books')
    } else{
        res.status(200)
        res.render('tambah', { title: 'Tambah Data Buku', layout: 'layouts/main-layout', users })
    }
})

// proses data buku melalui form 
app.post('/tambah', [
        body('namaBuku').custom(async(value) => {
            const duplikat = await Book.findOne({ namaBuku: value })
            if (duplikat) { // jika ada data nama buku yang sama
                throw new Error('Nama Buku Sudah Ada')
            }
            return true;
        }),
    ],
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) { // jika ada error request
            // return res.status(400).json({errors: errors.array()})
            res.render('tambah', {
                title: 'Tambah Data Buku',
                layout: 'layouts/main-layout',
                errors: errors.array()
            });
        } else {
            // console.log(req.body)
            Book.insertMany(req.body, (error, result) => {
                // kirimkan flash message
                req.flash('msg', 'Data Buku Berhasil Ditambahkan')
                res.status(200)
                res.redirect('/books')
            });
        }
    })

app.get('/about', (req, res) => {
    res.render('about', { title: 'Halaman About', layout: 'layouts/main-layout' })
})

// menghapus data buku opsi kedua
app.delete('/hapus', (req, res) => {
    // res.send(req.body)
    Book.deleteOne({ namaBuku: req.body.namaBuku }).then((result) => {
        req.flash('msg', 'Data Buku Berhasil Dihapus')
        res.status(200)
        res.redirect('/books')
    });
});

app.use('/', (req, res) => { // untuk menangkap url yang tidak ada
    res.status(404)
    res.render('page_error', { title: 'Halaman Tidak Ditemukan', layout: 'layouts/main-layout' })
})

app.listen(port, () => {
    console.log(`Books App | listening at http://localhost:${port}`)
});