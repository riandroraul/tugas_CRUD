const {check } = require('express-validator')

const bookValidate = [
    check('namaBuku')
    // .matches('[a-z]').withMessage('nama buku field must content letter or number')
    // .matches('[A-Z]').withMessage('nama buku field must content letter or number')
    .matches('[a-z]').matches('')
    .withMessage('nama buku field must content letter or number'),

    check('pengarang')
    .matches('[a-z]')
    .withMessage('pengarang field must content letter or number').escape(),
    // .matches('[a-z]').withMessage('pengarang field must content letter or number')
    // .matches('[A-Z]').withMessage('pengarang field must content letter or number')

    check('penerbit')
    .matches('[a-z]')
    .withMessage('penerbit field must content letter or number')
    // .matches('[A-Z]').withMessage('penerbit field must content letter or number')
    // .matches('[0-9]').withMessage('penerbit field must content letter or number')

];

module.exports = {bookValidate}