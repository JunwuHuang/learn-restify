const path = require('path')
const Database = require('better-sqlite3')
const DB_NAME = 'DATABASE'
const db = new Database(path.resolve(__dirname, `../${DB_NAME}.db`))

module.exports = {
    DB_NAME,
    db
}