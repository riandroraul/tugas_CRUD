const fs = require('fs');
const { resolve } = require('path');
const { stdout } = require('process')

// menuliskan string kedalam file secara synchrounous
// try{
    //     fs.writeFileSync('data/test.txt', 'Menuliskan string ke file secara synchrounous')
    // }catch(e){
        //     console.log(e)
        // }
        
// menuliskan string kedalam file secara Asynchronous

// fs.writeFile('data/test.txt', 'Menulis file secara asynchronous', (e) => console.log(e))

// membaca string dari file test txt

// const data = fs.readFileSync('data/test.txt')
// console.log(data.toString())


// fs.readFile('data/tes.txt', 'utf-8', (err, result) => {
//     if(err) throw err;
//     console.log(result.toString())
// })


// readline
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: stdout,
});

// membuat folder baru jika belum ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

// membuat file baru jika belum ada
const filePath = './data/books.json';
if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath, '[]', 'utf-8')
}

const pertanyaan1  = () => {
    return new Promise((resolve, reject) => {
        rl.question('masukkan nama buku: ', (namaBuku) => {
            resolve(namaBuku)
        })
    })
}

const pertanyaan2  = () => {
    return new Promise((resolve, reject) => {
        rl.question('masukkan nama penerbit: ', (penerbit) => {
            resolve(penerbit)
        })
    })
}

const pertanyaan3 = () => {
    return new Promise((resolve, reject) => {
        rl.question('masukkan nama pengarang: ', (pengarang) => {
            resolve(pengarang)
        });
    });
}

const main = async () => {
    const namaBuku = await pertanyaan1()
    const penerbit = await pertanyaan2()
    const pengarang = await pertanyaan3()

    const book = {namaBuku, penerbit, pengarang}

    const file = fs.readFileSync('data/books.json', 'utf-8')
    const books = JSON.parse(file)
    
    books.push(book)
    fs.writeFileSync('data/books.json', JSON.stringify(books))
    console.log('berhasil')
    rl.close();
}

main()

// rl.question('masukkan nama buku: ', (namaBuku) => {
//     rl.question('masukkan nama penerbit: ', (penerbit) => {
//         rl.question('masukkan nama pengarang: ', (pengarang) => {

//             const book = {namaBuku, penerbit, pengarang}
//             const file = fs.readFileSync('data/books.json', 'utf-8')
//             const books = JSON.parse(file)
            
//             books.push(book)
//             fs.writeFileSync('data/books.json', JSON.stringify(books))
//             console.log('berhasil')
//             rl.close();
//         })
//     })
// })
