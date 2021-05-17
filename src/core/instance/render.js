/**
 * mixin render function into Layer
 */

import _h from "../vdom/h"
import patch from "../vdom/patch"

function initRender(Layer) {
  Layer.prototype.__patch__ = patch
  Layer.prototype._h = _h
  // The $mount method is to mount the graphics to the page when the layer instance is initialized
  Layer.prototype.$mount = function () {
    let layer = this
    layer.hooks.call('beforeMount')
    // insert dom to target element
    layer.$container.appendChild(layer.$canvas)
    layer.$wrapper.appendChild(layer.$container)
    layer._update()
    layer.hooks.call('mounted')
  }

  // The _render function parses geometry data into vnode
  Layer.prototype._render = function () {
    let layer = this
    let config = layer.config
    let h = layer._h
    let children = layer.$geometry.map(geo => {
      // parse the geometry data by parser
      // layer.parser(geo)
      // but parser have not code successfully that there is just return origin data
      return h(
        geo.type,
        geo.key,
        geo.attrs
      )
    })
    // this is retrun a vnode includes svg config
    return h(
      'svg.sketch-js-canvas',
      layer.id,
      {
        width: config.width,
        height: config.height
      },
      children
    )
  }

  // the _update function is to render vnode into pages
  Layer.prototype._update = function () {
    let layer = this
    layer.hooks.call('beforeUpdate')
    layer.$vnode = layer.__patch__(layer.$vnode, layer._render())
    layer.hooks.call('updated')
  }
}

export default initRender