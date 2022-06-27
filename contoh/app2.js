const express = require ('express');
const expressLayout = require ('express-ejs-layouts');

require('./db_console')
const Book = require('../model/books')

const app = express();
const port = 3000;

// menggunakan view engine ejs
app.set('view engine', 'ejs');
app.use(expressLayout)

app.get('/', (req, res) => {
    // res.send('hello world')
    // res.sendFile('./index.html', {root: __dirname})
    res.render('index', {title: 'Halaman Home', layout: 'layouts/main-layout'});
})

app.post('/tambah', (req, res) => {
    console.log(req.body)
    res.send('data berhasil dikirim')
})

app.get('/about', (req, res) => {
    // res.send('ini adalah halaman about')
    // res.sendFile('./about.html', {root: __dirname})
    res.render('about', {title: 'Halaman About', layout: 'layouts/main-layout'})
})
app.get('/books', (req, res) => {
    // res.send('ini adalah halaman buku')
    // res.sendFile('./books.html', {root: __dirname})
    const books = [
        {
            namaBuku: 'Belajar MongoDB',
            penerbit: 'Dicoding',
            pengarang: 'Doddy Satria'
        },
        {
            namaBuku: 'Belajar NodeJS',
            penerbit: 'Pijar Camp',
            pengarang: 'Bagus Pratama'
        },
        {
            namaBuku: 'Belajar Github',
            penerbit: 'Babastudio',
            pengarang: 'Dennis Eka Putra'
        }
    ];
    // Book.find().then( (book) => {
    //     res.send(book)
    // })
    res.render('books', {title: 'Halaman Buku',layout: 'layouts/main-layout', books})
})
app.get('/product/:id', (req, res) => {
    res.send(`Product id : ${req.params.id} <br> category: ${req.query.category}`)
})

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

