function initLifecycle(Layer) {
  mixinHooks(Layer)
}

function mixinHooks(Layer) {
  Layer.prototype.hooks = Object.create(null)
  Layer.prototype.$callHook = function (hook) {
    let layer = this
    let callbacks = layer.hooks[hook]
    if (callbacks) {
      callbacks.forEach(callback => {
        typeof callback === 'function' && callback(layer)
      })
    }
  }
  Layer.prototype.$onHook = function (hook, callback) {
    let layer = this
    let hooks = layer.hooks
    if (hooks.hasOwnProperty(hook)) {
      hooks[hook].push(callback)
      return true
    }
    return false
  }
}


export default initLifecycle