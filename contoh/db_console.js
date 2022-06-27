const res = require('express/lib/response');
const {MongoClient, ObjectId} = require('mongodb');
const url = "mongodb://127.0.0.1:27017";
const dbName = 'perpus'
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect( (error, client) => {
  if( error){
    return console.log('koneksi gagal')
  }
  // pilih database
  const db = client.db(dbName);
  // menambah 1 data kedalam collection1
  // db.collection('collection1').insertOne(
  //   {
  //     buku2: 'one piece'
  //   },
  //   (error, result) => {
  //     if (error){
  //       return console.log('data gagal ditambahkan')
  //     }
  //     console.log(result)
  //   }
  // );

  // menambahkan data lebih dari satu
  // db.collection('books').insertMany(
  //   [
  //     {
  //         namaBuku: 'Belajar MongoDB',
  //         penerbit: 'Dicoding',
  //         pengarang: 'Doddy Satria'
  //     },
  //     {
  //         namaBuku: 'Belajar NodeJS',
  //         penerbit: 'Pijar Camp',
  //         pengarang: 'Bagus Pratama'
  //     },
  //     {
  //         namaBuku: 'Belajar Github',
  //         penerbit: 'Babastudio',
  //         pengarang: 'Dennis Eka Putra'
  //     }
  //   ],
    // (error, result) => {
    //   if (error){
    //     return console.log('data gagal ditambahkan')
    //   }
    //   console.log(result)
    // }
  // ).then((result) => console.log(result))
  // .catch((error) => console.log(error))

  // menampilkan semua data pada collection1
  
  // db.collection('collection1')
  // .find()
  // .toArray( (error, result) => {
  //   console.log(result)
  // })

    // menampilkan data berdasarkan id pada collection1
  
    // db.collection('collection1')
    // .find(
      // {
        // _id: ObjectId('62b52dd204fcfd7f1f02a9d1')
      // }
    // )
    // .toArray( (error, result) => {
    //   console.log(result)
    // })

    // mengubah satu data pada collection1

    // const updatePromise = db.collection('collection1').updateOne(
    //   {
    //     _id: ObjectId('62b52dd204fcfd7f1f02a9d1')
    //   },
    //   {
    //     $set: {
    //         buku4: 'Dragon Ball vs freeza'
    //     }
    //   }
    // ) 
    // updatePromise
    // .then(result => console.log(result))
    // .catch(error => console.log(error))

    // mengubah lebih dari satu data pada collection1
    // db.collection('collection1').updateMany(
    //   {
    //     buku: 'Doraemon',
    //   },
    //   {
    //     $set: {
    //       buku: 'naruto',
    //     }
    //   }
    // ).then((result) => console.log(result))
    // .catch((error) => console.log(error))

    // menghapus satu data buku pada collection1

    // db.collection('books').deleteOne(
    //   {
    //     _id: ObjectId('62b53bdc3ea42f3ae884948b'),
    //   }
    // ).then((result) => console.log(result))
    // .catch((error) => console.log(error))

    // menghapus lebih dari satu data pada collection1

    // db.collection('collection1').deleteMany(
    //   {
        // _id: ObjectId('62b52baae33f7080eebb2b43')
    //     buku: 'naruto'
    //   }
    // ).then((result) => console.log(result))
    // .catch((error) => console.log(error))
});
