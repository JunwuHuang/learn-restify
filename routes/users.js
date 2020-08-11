const Model = require('../models/users')

const users = new Model()

const USERS_ROUTES = {
    register(server) {

        // 获取所有用户信息
        server.get('/users', function(req, res, next) {
            res.send(users.getAll())
            next()
        })

        // 获取用户信息
        server.get('/users/:userName', function(req, res, next) {
            res.send(users.get(req.params.userName))
            next()
        })

        // 创建用户
        server.post('/users', function(req, res, next) {
            res.send(users.create(req.body))
            next()
        })

        // 更改用户状态
        server.patch('/users/:userName', function(req, res, next) {
            const user = users.get(req.params.userName)
            const newUser = {
                userName: user.user_name,
                ipAddress: user.ip_address,
                avatarUrl: user.avatar_url,
                ...req.body
            }
            res.send(users.update(req.params.userName, newUser))
            next()
        })

        // 编辑用户信息
        server.put('/users/:userName', function(req, res, next) {
            const user = users.get(req.params.userName)
            const newUser = {
                userName: user.user_name,
                ipAddress: user.ip_address,
                avatarUrl: user.avatar_url,
                ...req.body
            }
            res.send(users.update(req.params.userName, newUser))
            next()
        })

        // 删除用户
        server.del('/users/:userName', function(req, res, next) {
            res.send(users.delete(req.params.userName))
            next()
        })

    }
}

module.exports = USERS_ROUTES