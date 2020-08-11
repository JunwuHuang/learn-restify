# restify练习项目
为了更加熟悉客户端与服务端的交互流程,使用基于nodejs实现的技术框架开发一个简单的推特站点

## @TODO
description | done
- | -
tweets model | not yet
tweets routes | not yet

## 暂定产品规则
- 不收集用户的密码
- 可选的推特时效：1天、3天、1周、1月、1季度
- 利用第三方API作内容审核
- 每天只能发言 n 次 (尚未确定限制次数,不希望用户无限制次数发言)
- 产品名称未定

## 项目依赖
- restify
- better-sqlite3

## 数据表

### users
column name | description
- | -
user_id | 用户id
user_name | 用户名称
ip_address | ip地址
avatar_url | 用户头像

### tweets
column name | description
- | -
tweet_id | 推特id
tweet_content | 推特内容
tweet_expires | 推特时效
user_id | 用户id
