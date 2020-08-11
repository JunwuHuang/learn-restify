const Model = require('../models/tweets')

const tweets = new Model()

const TWEETS_ROUTES = {
    register(server) {

        // 获取用户所有推特
        server.get('/tweets', function(req, res, next) {
            res.send(tweets.getAll(req.query.userId))
            next()
        })

        // 获取推特内容
        server.get('/tweets/:tweetId', function(req, res, next) {
            res.send(tweets.get(req.params.tweetId))
            next()
        })

        // 创建推特
        server.post('/tweets', function(req, res, next) {
            res.send(tweets.create(req.body))
            next()
        })

        // 更改推特状态
        server.patch('/tweets/:tweetId', function(req, res, next) {
            const tweet = tweets.get(req.params.tweetId)
            if (!tweet) {
                next(403)
                return
            }
            const result = {
                tweetContent: req.body.tweetContent || tweet.tweet_content,
                tweetExpires: req.body.tweetExpires || tweet.tweet_expires,
                userId: tweet.user_id
            }
            res.send(tweets.update(req.params.tweetId, result))
            next()
        })

        // 编辑推特信息
        server.put('/tweets/:tweetId', function(req, res, next) {
            const tweet = tweets.get(req.params.tweetId) || {}
            if (!tweet) {
                next(403)
                return
            }
            const result = {
                tweetContent: req.body.tweetContent || tweet.tweet_content,
                tweetExpires: req.body.tweetExpires || tweet.tweet_expires,
                userId: tweet.user_id
            }
            res.send(tweets.update(req.params.tweetId, result))
            next()
        })

        // 删除推特
        server.del('/tweets/:tweetId', function(req, res, next) {
            res.send(tweets.delete(req.params.tweetId))
            next()
        })

    }
}

module.exports = TWEETS_ROUTES