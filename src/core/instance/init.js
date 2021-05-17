/**
 * mixin _init function to Layer
 * _init function is to initial Layer instance
 */

import mixinEvents from "../events"
import observe from "../observe"
import Watcher from "../observe/watcher"
import defaultPlugins from "../plugins"
import { createElement, query } from "../util/web-dom-api"

function mixinInit(Layer) {
  Layer.prototype._init = function () {
    let layer = this
    // uid ++
    layer.id = Layer.uid++
    layer.config = layer.$options.config
    layer.__watcher__ = new Watcher({
      layer,
      cb() {
        this._update()
      }
    })
    initHooks(layer)
    installPlugin(layer)
    layer.hooks.call('beforeCreate')
    // init layer element
    initLayerElement(layer)
    initEvents(layer)
    initGeometry(layer)
    observeGeometry(layer)
    layer.hooks.call('created')
    // mount canvas
    layer.$mount()
  }
}

// init layer inside element
function initLayerElement(layer) {
  layer.$wrapper = query(layer.$options.el)
  createLayerContainer(layer)
  layer.$vnode = layer.$canvas = createCanvas()
}
// create a container to place layer
function createLayerContainer(layer) {
  let container = createElement('div')
  container.classList.add('sketch-js-container')
  let config = layer.config
  let width = (typeof config.width === 'string') ? config.width : (config.width + 'px')
  let height = (typeof config.height === 'string') ? config.height : (config.height + 'px')
  container.style.width = width
  container.style.height = height
  layer.$container = container
  return container
}

// create a canvas to place sketch
// in the futrue, this el will be replace by vnode. so, this function just to create a occupying element
function createCanvas() {
  let canvas = createElement('div')
  canvas.classList.add('sketch-js-canvas')
  return canvas
}

// transfer normal geometry to geometry module
function initGeometry(layer) {
  const geometryModule = []
  layer.$options.geometry.forEach(geo => {
    // use Layer prototype function geometryModuleFactory to create moudel
    let module = layer.geometryModuleFactory(geo)
    if (module) {
      geometryModule.push(module)
    }
  })
  layer.$geometry = geometryModule
}


function observeGeometry(layer) {
  let $geometry = layer.$geometry.map(geo => {
    geo.attrs = observe(geo.attrs, layer.__watcher__, true)
    return geo
  })
  layer.$geometry = observe($geometry, layer.__watcher__)
}

function initHooks(layer) {
  layer.hooks = {}
  layer.hooks.beforeMount = []
  layer.hooks.mounted = []
  layer.hooks.beforeUpdate = []
  layer.hooks.updated = []
  layer.hooks.beforeCreate = []
  layer.hooks.created = []
  Object.defineProperty(layer.hooks, 'on', {
    get() {
      return function (hook, callback) {
        layer.$onHook(hook, callback)
      }
    },
    set() {
      return false
    }
  })
  Object.defineProperty(layer.hooks, 'call', {
    get() {
      return function (hook) {
        layer.$callHook(hook)
      }
    },
    set() {
      return false
    }
  })
  // install custom hook
  if (layer.life = layer.$options.life) {
    Object.keys(layer.life).forEach(key => {
      if (key === 'on' || key === 'call') {
        return
      }
      if (layer.hooks[key]) {
        layer.hooks.on(key, layer.life[key])
      }
    })
  }
}

function initEvents(layer) {
  let events = Object.create(null)
  layer.$on = layer.__proto__.$on
  layer.$emit = layer.__proto__.$emit
  // _e is a variable used for interworking parameters between events
  layer._e = Object.create(null)
  Object.defineProperty(layer, 'events', {
    enumerable: true,
    configurable: true,
    get() {
      return events
    },
    set() {
      console.log('events can not be set')
    }
  })
  mixinEvents(layer)

}

function installPlugin(layer) {
  let defaultPlugins = layer.__proto__._options.plugins
  if (defaultPlugins) {
    Object.keys(defaultPlugins).forEach(key => {
      const Plugin = defaultPlugins[key]
      new Plugin().install(layer)
    })
  }
  if (layer.$options.plugins) {
    layer.$options.plugins.forEach(plugin => {
      plugin.install(layer)
    })
  }
}

export default mixinInit