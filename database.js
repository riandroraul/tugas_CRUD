const mongoose = require('mongoose');
const run = require('nodemon/lib/monitor/run');

mongoose.connect('mongodb://127.0.0.1:27017/perpus', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// const book1 = new book({
//     namaBuku: 'Belajar Git & Github',
//     penerbit: 'Course NET',
//     pengarang: 'Stefan William'
// });

// book1.save().then((book) => console.log(book))

