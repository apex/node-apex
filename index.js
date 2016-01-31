
// much λ, much UX.
module.exports = function λ(fn) {
  return function(e, ctx) {
    try {
      var v = fn(e, ctx)

      if (v && typeof v.then == 'function') {
        v.then(ctx.succeed).catch(ctx.fail)
        return
      }

      ctx.succeed(v)
    } catch (err) {
      ctx.fail(err)
    }
  }
}
