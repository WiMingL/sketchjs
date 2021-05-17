// init canvas events
function initEvents(Layer) {
  Layer.prototype.$on = function (event, callback) {
    let layer = this
    layer.events[event] = layer.events[event] || []
    layer.events[event].push(callback)
  }

  Layer.prototype.$emit = function (event, payload) {
    let layer = this
    let fns = layer.events[event]
    if (!fns) {
      return false
    }
    fns.forEach(fn => {
      if (typeof fn === 'function') {
        fn(payload, layer._e, layer)
      }
    })
    return true
  }
}

function mixinEvents() {

}

export default initEvents