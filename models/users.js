const { db } = require('.')

class Users {
    constructor() {
        const createTableSql = `
            CREATE TABLE IF NOT EXISTS users (
                user_id      INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                user_name    TEXT UNIQUE NOT NULL,
                ip_address   TEXT,
                avatar_url   TEXT
            );
        `
        try {
            db.exec(createTableSql)
        } catch (error) {
            console.error(error)
        }
    }

    create({
        userName,
        ipAddress = '',
        avatarUrl = ''
    }) {
        const stmt = db.prepare(`
            INSERT INTO users (
                user_id, user_name, ip_address, avatar_url
            )
            VALUES(
                NULL, @userName, @ipAddress, @avatarUrl
            );
        `)
        try {
            const result = stmt.run({
                userName,
                ipAddress,
                avatarUrl
            })
            console.log(result)
            return result
        } catch (error) {
            console.error(error)
            return {
                changes: 0,
                errMsg: error.message
            }
        }
    }

    getAll() {
        const stmt = db.prepare(`
            SELECT 
                user_name, ip_address, avatar_url
            FROM 
                users;
        `)
        try {
            const users = stmt.all()
            console.log(users)
            return users
        } catch (error) {
            console.error(error)
        }
    }

    get(userName) {
        const stmt = db.prepare(`
            SELECT
                user_name, ip_address, avatar_url
            FROM 
                users
            WHERE
                user_name = ?;
        `)
        try {
            const user = stmt.get(userName)
            console.log(user)
            return user
        } catch (error) {
            console.error(error)
        }
    }

    update(oldUserName, {
        userName,
        ipAddress = '',
        avatarUrl = ''
    }) {
        console.log(oldUserName, {
            userName,
            ipAddress,
            avatarUrl
        })
        const stmt = db.prepare(`
            UPDATE
                users
            SET
                user_name = @userName,
                ip_address = @ipAddress,
                avatar_url = @avatarUrl
            WHERE
                user_name = ?;
        `)
        try {
            const result = stmt.run(oldUserName, {
                userName,
                ipAddress,
                avatarUrl
            })
            console.log(result)
            return result
        } catch (error) {
            console.error(error)
            return {
                changes: 0,
                errMsg: error.message
            }
        }
    }

    delete(userName) {
        const stmt = db.prepare(`
            DELETE FROM
                users
            WHERE
                user_name = ?;
        `)
        try {
            const result = stmt.run(userName)
            console.log(result)
            return result
        } catch (error) {
            console.error(error)
            return {
                changes: 0,
                errMsg: error.message
            }
        }
    }
}

module.exports = Users