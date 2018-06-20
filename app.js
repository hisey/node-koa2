const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const config = require('./pub/config');
const session = require('koa-session');
// const RedisStore = require('koa2-session-redis');

const index = require('./routes/index')
const reg = require('./routes/reg')
const login = require('./routes/login')
const logout = require('./routes/logout')

app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// app.use(session({
//   key: "SESSIONID",   //default "koa:sid" 
//   expires:3, //default 7 
//   path:"/" //default "/" 
// }));
// app.keys = ['Porschev'];
// const redis_conf = {  
//   key: 'Porschev',
//   maxAge: config.REDIS.maxAge,
//   overwrite: true,
//   httpOnly: true,  
//   rolling: false,
//   sign: true,
//   store: new RedisStore({
//     host: config.REDIS.host,
//     port: config.REDIS.port,    
//     password: config.REDIS.password    
//   })
// };

// app.use(session(redis_conf, app));

// routes
app.use(index.routes(), index.allowedMethods())
app.use(login.routes(), login.allowedMethods())
app.use(logout.routes(), logout.allowedMethods())
app.use(reg.routes(), reg.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


app.listen(config.SERVER_PORT, () => {
  console.log(`Starting at port ${config.SERVER_PORT}!`)
});

module.exports = app