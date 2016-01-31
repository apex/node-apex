
// much λ, much UX.
module.exports = function λ(fn) {
  return function(e, ctx) {
    try {
      fn(e, ctx)
        .then(ctx.succeed)
        .catch(ctx.fail)
    } catch (err) {
      ctx.fail(err)
    }
  }
}
