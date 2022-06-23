const express = require ('express')
const app = express()
const port = 3000

app.get('/', function( req, res){
    res.send('berhasil')
})

app.listen(3000, function() {
    console.log('app berjalan pada http://localhost:'+port)
})