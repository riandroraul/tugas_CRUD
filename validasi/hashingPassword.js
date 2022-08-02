const bcrypt = require('bcrypt');

const hashPassword = async (plainText) => {
    const hash = await bcrypt.hash(plainText, 10);
    return hash;
}

const comparePassword = async (plainText, hash) => {
    const result = await bcrypt.compare(plainText, hash)
    return result
}

module.exports = { hashPassword, comparePassword }