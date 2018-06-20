const router = require('koa-router')()
const userBll = require('./../pub/control/userinfo.js')
const title = '注册'

router.prefix('/reg')

router.get('/', async (ctx, next) => {
  await ctx.render('reg', { title })
})

router.post('/', async (ctx, next) => {

  let result = await userBll.register(ctx)

  ctx.response.body = result;

})

module.exports = router