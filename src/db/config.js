const sqlite3 = require('sqlite3')
const { open } = require('sqlite') // AUI IMPORTA SOMENTE A FUNÇÃO OPEN DO SQLITE

module.exports = () => 
    open({
        filename: './database.sqlite',
        driver: sqlite3.Database,
    })