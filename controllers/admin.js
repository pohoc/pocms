const admin = {}
admin.home = async (ctx, next) => {
    await ctx.render('admin/home')
}

admin.login = async (ctx, next) => {
    await ctx.render('admin/login')
}


module.exports = admin
