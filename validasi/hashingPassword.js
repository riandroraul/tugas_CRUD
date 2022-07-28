const User = require('../model/users')
const bcrypt = require('bcrypt');
const res = require('express/lib/response');


const hashPassword = async (plainText) => {
    const hash = await bcrypt.hash(plainText, 10);
    return hash;
}

const comparePassword = async (plainText, hash) => {
    const result = await bcrypt.compare(plainText, hash)
    return result
}

const text = '123'
const cek = async () => {
    const users = await User.find({email: 'coba@gmail.com'})
    const cekpass = comparePassword(text, users.password)

    console.log( cekpass)
}

const compareResult = async () => {
    const result = await comparePassword(text, '$2b$10$NS1.st3dukkcz9QBhBSNoe73IrY1D1eSqmpv1/Y82w9q/J6mwjIOm')

    return result
}

let hasil = compareResult().then( result => result)

// console.log(hasil);

module.exports = { hashPassword, comparePassword }