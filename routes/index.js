const router = require('koa-router')()
const title = '首页'

router.get('/', async (ctx, next) => {  
  //判断登录
  if(!ctx.session || !ctx.session.id){
    await ctx.redirect('/login')  
  }else{    
    const id = ctx.session.id;
    await ctx.render('index', { title, id })
  }  
})

module.exports = router