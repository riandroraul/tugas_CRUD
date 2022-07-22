const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/perpus', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const User = require('./model/users')

// const user1 = new User({
//     nama: 'riandroraul',
//     email: 'asusaku037@gmail.com',
//     password: '1234',
//     role: 1
// });

// user1.save().then((user) => console.log(user))

