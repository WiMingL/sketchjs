/**
 * mixin initState function into Layer
 *
 * this file is order to set layer prototype initial state params
 * 这个文件是用于设置 Layer 原型上的初始状态成员变量
 */

import defaultGeometryModules from '../modules/index'
import defaultPlugins from '../plugins'

function initState(Layer) {
  // _options is to store built in varabales for instance to use
  Layer.prototype._options = Object.create(null)

  initModule(Layer)

  Layer.prototype.isGeometry = function (target) {
    let isGeometry = target.getAttribute('geometry')
    return !!isGeometry
  }

  Layer.prototype.isCanvas = function (el) {
    return el === this.$vnode.elm
  }

  Layer.prototype._options.plugins = defaultPlugins

  // 注册示例的 api 操作，作为示例的方法
  Layer.prototype.$installApi = function (api, callback) {
    let layer = this
    if (layer.apis[api]) {
      console.warn('this api has been install!')
      return false
    }
    if (typeof callback !== 'function') {
      console.warn('callback must be a function')
      return false
    }
    layer.apis[api] = callback
    return true
  }

  Layer.prototype.$uninstallApi = function (api) {
    this.apis[api] ? this.apis[api] = undefined : null
    return true
  }
}

// init geometry modules related function
function initModule(Layer) {
  let modules = Layer.prototype._options.geometryModules = {
    ...defaultGeometryModules
  }

  Layer.prototype.getGeometryModule = function (type) {
    let layer = this
    let modules = layer._options.geometryModules
    return modules[type] || modules['geometry']
  }

  Layer.prototype.geometryModuleFactory = function (data) {
    let layer = this
    let Module = layer.getGeometryModule(data.type)
    if (Module) {
      return new Module(data)
    }
    return null
  }

  Layer.prototype.getGeometryById = function (id) {
    return this.$geometry.find(geo => geo.key == id)
  }
}


export default initState