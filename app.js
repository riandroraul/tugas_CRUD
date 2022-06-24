const express = require ('express');
const expresslayout = require ('express-ejs-layouts');
const fs = require('fs')

const app = express();
const port = 3000;


app.get('/', (req, res) => {
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
    res.render('index', {
        layout: 'layouts/main-layout',
        nama: 'riandroraul',
        books, 
        title: 'Halaman Home'
    });
    console.log('ini halaman home')
})

app.listen(port, () => {
    console.log(`Books App | listening at http://localhost:${port}`)
});