const bcrypt = require('bcrypt')
let password = "12345";


const hashPassword = async function() {
    console.log(bcrypt.hash(password, 10));
    const hashPwd = await bcrypt.hash(password, 10);
    // console.log(hashPwd);
    return hashPwd
}

const check = async(password) => {
    const match = await bcrypt.compare(password, hashPassword);

    if (match) {
        console.log('sama')
    }
}

check(password)
    // hashPassword();

    