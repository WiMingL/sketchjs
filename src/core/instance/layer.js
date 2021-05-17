/**
 * layer class is a layer to render svg sketch
 * 
 */

import initEvents from "./events"
import mixinInit from "./init"
import initLifecycle from "./lifecycle"
import initRender from "./render"
import initState from "./state"

class Layer {
  constructor(options) {
    this.$options = options
    this._init()
  }
}

Layer.uid = 1

// mixin prototype function into Layer
mixinInit(Layer)
initState(Layer)
initRender(Layer)
initLifecycle(Layer)
initEvents(Layer)

export default Layer