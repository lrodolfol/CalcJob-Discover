const express = require('express');
const server = express()
const port = 7000
const router = require('./router')
const path = require('path');

//ADICIONA O TEMPLATE ENGINE
server.set('view engine', 'ejs')

//JA ADICONA A PASTA VIEWS COMO PADRAO NO PROJETO INTEIRO
server.set('views', path.join(__dirname, 'views'))

server.use(express.urlencoded({ extended: true}))

server.use(express.static("public"))
server.use(router)

server.listen(port, () => { 
    console.log(`Server running on port ${port}`)
})