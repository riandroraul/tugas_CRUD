const express = require ('express');
const expressLayout = require ('express-ejs-layouts');
const { body, validationResult } = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

require('./database')
const Book = require('./model/books');
const { CURSOR_FLAGS } = require('mongodb');

const app = express();
const port = 3000;

app.use(flash())  

// menggunakan view engine ejs
app.set('view engine', 'ejs');
app.use(expressLayout)
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(
    session({
        cookie: {maxAge: 6000},
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);

app.use(flash())

app.get('/', (req, res) => {
    // res.send('hello world')
    // res.sendFile('./index.html', {root: __dirname})
    res.render('index', {title: 'Halaman Home', layout: 'layouts/main-layout'});
})

// proses data buku melalui form 
app.post('/tambah',
    [
        body('namaBuku').custom( async (value) => {
            const duplikat = await Book.findOne({namaBuku: value})
            if(duplikat){
                throw new Error('Nama Buku Sudah Ada')
            }
            return true;
        }),
    ],
    (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){ 
            res.render('tambah', {
                title: 'Tambah Data Buku',
                layout: 'layouts/main-layout',
                errors: errors.array()
            });
        }else{
            console.log(req.body, 61)
            Book.insertMany(req.body, (error, result) => {
                req.flash('msg', 'Data Buku Berhasil Ditambahkan')
                res.redirect('/books')
            });
        }
})

app.get('/about', (req, res) => {
    // res.send('ini adalah halaman about')
    // res.sendFile('./about.html', {root: __dirname})
    res.render('about', {title: 'Halaman About', layout: 'layouts/main-layout'})
})
app.get('/books', async (req, res) => {
    const books =  await Book.find()
    res.render('books', {title: 'Halaman Buku',layout: 'layouts/main-layout', books})
})
// app.get('/product/:id', (req, res) => {
//     res.send(`Product id : ${req.params.id} <br> category: ${req.query.category}`)
// })

app.get('/tambah', (req, res) => {
    res.render('tambah', {title: 'Tambah Data Buku', layout: 'layouts/main-layout'})
})

app.get('/ubah', (req, res) => {
    res.render('ubah', {title: 'Ubah Data Buku', layout: 'layouts/main-layout'})
})

app.use('/', (req, res) => { // untuk menangkap url yang tidak ada
    res.status(404)
    res.send('Halaman tidak ditemukan')
})
app.listen(port, () => {
    console.log(`Books App | listening at http://localhost:${port}`)
});

