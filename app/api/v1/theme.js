const Router = require('koa-router')
const { Success } = require('../../../core/http-exception')
const { PositiveIntegerValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')
const { Theme } = require('@models/theme')

const router = new Router({
    prefix: '/v1/theme'
})

/**
 * @route   GET /
 * @desc    查询主题
 * @access  public
 */
router.get('/', async (ctx, next) => {
    const ids = ctx.query.ids.split(',')
    const theme = await Theme.getThemeList(ids)

    ctx.body = theme
})

/**
 * @route   GET /:id
 * @desc    查询主题和商品
 * @access  public
 */
router.get('/:id', async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx)
    const theme = await Theme.getThemeWithProduct(v.get('path.id'))

    ctx.body = theme
})

module.exports = router
