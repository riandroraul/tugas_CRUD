const express = require('express');
const expressLayout = require('express-ejs-layouts');
const { body, validationResult,check } = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const methodOverride = require('method-override')

require('./database')
const Book = require('./model/books');
const User = require('./model/users');
const userRoutes = require('./routes/user.route');
const { bookValidate } = require('./validasi/validasiInput');

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

app.get('/', async (req, res) => {
    const userLogin = await User.find({email: req.session.email})
    if(req.session.email === undefined){
        res.redirect('login')
    }else{
        res.status(200)
        res.render('index', { title: 'Halaman Home', layout: 'layouts/main-layout', userLogin})
    }
})


app.get('/books', async(req, res) => {
    // const session = req.session
    const books = await Book.find()
    const userLogin = await User.find({email: req.session.email})
    // console.log(userLogin)
    if(req.session.email === undefined){
        res.redirect('/login')
    }else{
        res.status(200)
        res.render('books', { title: 'Halaman Buku', layout: 'layouts/main-layout', books, userLogin, msg: req.flash('msg') })
    }
})


// mengubah data buku
app.get('/ubah/:namaBuku', async(req, res) => {
    const book = await Book.findOne({ namaBuku: req.params.namaBuku })
    const userLogin = await User.find({email: req.session.email})
    if(req.session.email === undefined){
        res.redirect('/login')
    }else{
        if(userLogin[0].role === 3){
            res.redirect('/books')
        }else{
            res.status(200)
            res.render('ubah', { title: 'Ubah Data Buku', layout: 'layouts/main-layout', book, userLogin })
        }
    }
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
        bookValidate
    ],
    async(req, res) => {
        // console.log(req.body)
        const userLogin = await User.find({email: req.session.email})
        const errors = validationResult(req)
        console.log(userLogin);
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
                // res.render('books',{userLogin})
                {userLogin}
                req.flash('msg', 'Data Buku Berhasil Diubah')
                res.redirect('/books')
            });
        }
    })

app.get('/tambah', async (req, res) => {
    const userLogin = await User.find({email: req.session.email})
    if (req.session.email === undefined){
        res.redirect('/login')
    } else {
        if(userLogin[0].role === 3){
            res.redirect('/books')
        } else{
            res.status(200)
            res.render('tambah', { title: 'Tambah Data Buku', layout: 'layouts/main-layout', userLogin })
        }
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
        bookValidate
    ],
    async (req, res) => {
        const userLogin = await User.find({email: req.session.email})
        const errors = validationResult(req)
        // console.log(req.session.email);
        // console.log(228, userLogin, errors, req.flash("msg"))
        if (!errors.isEmpty()) { // jika ada error request
            // return res.status(400).json({errors: errors.array()})
            res.render('tambah', {
                title: 'Tambah Data Buku',
                layout: 'layouts/main-layout',
                errors: errors.array(),
                userLogin
            });
        } else {
            // console.log(req.body)
            Book.insertMany(req.body, (error, result) => {
                // kirimkan flash message
                res.status(200)
                req.flash('msg', 'Data Buku Berhasil Ditambahkan')
                // console.log(errors.array());
                res.redirect('/books')
            });
        }
    })

app.get('/about', async (req, res) => {
    const userLogin = await User.find({email: req.session.email})
    if(req.session.email === undefined){
        res.redirect('/login')
    }else{
        res.render('about', { title: 'Halaman About', layout: 'layouts/main-layout', userLogin })
    }
})

// menghapus data buku opsi kedua
app.delete('/hapus', async (req, res) => { //hapus?_method=DELETE
    const userLogin = await User.find({email: req.session.email})
    if(userLogin[0].role === 3){
        res.redirect('/books')
    } else{
    
        Book.deleteOne({ namaBuku: req.body.namaBuku }).then((result) => {
        req.flash('msg', 'Data Buku Berhasil Dihapus')
        res.status(200)
        res.redirect('/books')
    });
        // res.status(200)
        // res.render('books', {title: 'Halaman Buku', layout: 'layouts/main-layout', msg: 'Data Buku Berhasil Dihapus', userLogin, books})
    }
});

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.status(200)
    res.redirect('/login');
});

app.use('/', async (req, res) => { // untuk menangkap url yang tidak ada
    const userLogin = await User.find({email: req.session.email})
    // console.log(userLogin)
    if(req.session.email === undefined){
        res.redirect('/login')
    }else{
        res.status(404)
        res.render('page_error', { title: 'Halaman Tidak Ditemukan', layout: 'layouts/main-layout', userLogin })
        // res.redirect('/page_error')
    }
})

app.listen(port, () => {
    console.log(`Books App | listening at http://localhost:${port}`)
});