
// much λ, much UX.
module.exports = function λ(fn) {
  return function(e, ctx, cb) {
    try {
      var v = fn(e, ctx, cb)

      if (v && typeof v.then == 'function') {
        v.then(function (val) {
          process.nextTick(function () {
            cb(null, val)
          })
        }).catch(function (err) {
          process.nextTick(function () {
            cb(err)
          })
        })
        return
      }

      cb(null, v)
    } catch (err) {
      cb(err)
    }
  }
}
