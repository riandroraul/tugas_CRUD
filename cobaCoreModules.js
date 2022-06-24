const fs = require('fs')
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

rl.question('masukkan nama anda: ', (nama) => {
    console.log(`Terima kasih ${nama}`);
    rl.close();
})
