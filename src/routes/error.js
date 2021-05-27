const router = require('koa-router')()

router.get('*', async (etx, next) => {
    await ctx.render('404')
})

module.exports = router
