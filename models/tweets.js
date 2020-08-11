const { db } = require('.')

class Tweets {
    constructor() {
        const createTableSql = `
            CREATE TABLE IF NOT EXISTS tweets (
                tweet_id      INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                tweet_content    TEXT NOT NULL,
                tweet_expires   TEXT NOT NULL,
                user_id   INTEGER NOT NULL
            );
        `
        try {
            db.exec(createTableSql)
        } catch (error) {
            console.error(error)
        }
    }

    create({
        tweetContent,
        tweetExpires,
        userId
    }) {
        const stmt = db.prepare(`
            INSERT INTO tweets (
                tweet_id, tweet_content, tweet_expires, user_id
            )
            VALUES(
                NULL, @tweetContent, @tweetExpires, @userId
            );
        `)
        try {
            const result = stmt.run({
                tweetContent,
                tweetExpires,
                userId
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

    getAll(userId) {
        const stmt = db.prepare(`
            SELECT 
                tweet_id, tweet_content, tweet_expires, user_id
            FROM 
                tweets
            WHERE
                user_id = ?;
        `)
        try {
            const tweets = stmt.all(userId)
            console.log(tweets)
            return tweets
        } catch (error) {
            console.error(error)
        }
    }

    get(tweetId) {
        const stmt = db.prepare(`
            SELECT
                tweet_id, tweet_content, tweet_expires, user_id
            FROM 
                tweets
            WHERE
                tweet_id = ?;
        `)
        try {
            const user = stmt.get(tweetId)
            console.log(user)
            return user
        } catch (error) {
            console.error(error)
        }
    }

    update(tweetId, {
        tweetContent,
        tweetExpires,
        userId
    }) {
        const stmt = db.prepare(`
            UPDATE
                tweets
            SET
                tweet_content = @tweetContent,
                tweet_expires = @tweetExpires,
                user_id = @userId
            WHERE
                tweet_id = ?;
        `)
        try {
            const result = stmt.run(tweetId, {
                tweetContent,
                tweetExpires,
                userId
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

    delete(tweetId) {
        const stmt = db.prepare(`
            DELETE FROM
                tweets
            WHERE
                tweet_id = ?;
        `)
        try {
            const result = stmt.run(tweetId)
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

module.exports = Tweets