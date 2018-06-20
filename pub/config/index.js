/**
 * 配置文件
 */
//发布配置
const production = {

    //服务器端口
    SERVER_PORT : 9998,

    //REDIS配置
    REDIS: {
        host: 'localhost',            
        port: '6379',
        password: '123456',
        maxAge: 3600000
    },

    //MYSQL数据库配置
    MYSQL: {
        host: "localhost",
        user: "root",
        password: "abcd",
        port: "3306",
        database: "nodesample",
        supportBigNumbers: true,
        multipleStatements: true,
        timezone: 'utc'
    }

}

//开发配置
const development = {

    //服务器端口
    SERVER_PORT : 9998,

    //REDIS配置
    REDIS: {
        host: 'localhost',            
        port: '6379',
        password: "abcd",
        maxAge: 3600000
    },

    //MYSQL数据库配置
    MYSQL: {
        host: "localhost",
        user: "root",
        password: "root",
        port: "3306",
        database: "nodesample",
        supportBigNumbers: true,
        multipleStatements: true,
        timezone: 'utc'
    }

}

const config = development

module.exports = config