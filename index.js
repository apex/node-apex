
// much λ, much UX.
module.exports = function λ(fn) {
  return function(e, ctx, cb) {
    var succeed, fail;
    // cb will be defined for node 4.3 on lambda
    if (cb) {
      succeed = function(result) {
        cb(null, result)
      }
      fail = function(err) {
        cb(err)
      }
    } else {
      succeed = ctx.succeed, fail = ctx.fail;
    }

    try {
      var v = fn(e, ctx, cb)

      if (v && typeof v.then == 'function') {
        v.then(succeed).catch(fail)
        return
      }

      succeed(v)
    } catch (err) {
      fail(err)
    }
  }
}
