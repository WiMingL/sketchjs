import { setAttributeNS } from "../util/web-dom-api";
import Geometry from "./geometry";

class Rect extends Geometry {
  constructor(options) {
    super(options)
  }

  moveTo(x, y) {
    this.attrs.x = x
    this.attrs.y = y
  }

  move(state, mx, my) {
    this.attrs.x = state.attrs.x - mx
    this.attrs.y = state.attrs.y - my
  }

  get getResize() {
    let {
      x, y, width, height
    } = this.getArea
    return [{
      x: x,
      y: y,
      cursor: 'nw-resize',
      event: (state, mx, my) => {
        let { attrs, position } = state
        let {
          x, y, width, height
        } = this.resizeHandle(position, mx, my, mx, my)
        this.resize(x, y, width, height)
      }
    }, {
      x: x + 1 / 2 * width,
      y: y,
      cursor: 'n-resize',
      event: (state, mx, my) => {
        let { attrs, position } = state
        let {
          x, y, width, height
        } = this.resizeHandle(position, undefined, my, undefined, my)
        this.resize(x, y, width, height)
      }
    }, {
      x: x + width,
      y: y,
      cursor: 'ne-resize',
      event: (state, mx, my) => {
        let { attrs, position } = state
        let {
          x, y, width, height
        } = this.resizeHandle(position, undefined, my, -1 * mx, my)
        this.resize(x, y, width, height)
      }
    }, {
      x: x + width,
      y: y + 1 / 2 * height,
      cursor: 'e-resize',
      event: (state, mx, my) => {
        let { attrs, position } = state
        let {
          x, y, width, height
        } = this.resizeHandle(position, undefined, undefined, -1 * mx, undefined)
        this.resize(x, y, width, height)
      }
    }, {
      x: x + width,
      y: y + height,
      cursor: 'se-resize',
      event: (state, mx, my) => {
        let { attrs, position } = state
        let {
          x, y, width, height
        } = this.resizeHandle(position, undefined, undefined, -1 * mx, -1 * my)
        this.resize(x, y, width, height)
      }
    }, {
      x: x + 1 / 2 * width,
      y: y + height,
      cursor: 's-resize',
      event: (state, mx, my) => {
        let { attrs, position } = state
        let {
          x, y, width, height
        } = this.resizeHandle(position, undefined, undefined, undefined, -1 * my)
        this.resize(x, y, width, height)
      }
    }, {
      x: x,
      y: y + height,
      cursor: 'sw-resize',
      event: (state, mx, my) => {
        let { attrs, position } = state
        let {
          x, y, width, height
        } = this.resizeHandle(position, mx, undefined, mx, -1 * my)
        this.resize(x, y, width, height)
      }
    }, {
      x: x,
      y: y + 1 / 2 * height,
      cursor: 'w-resize',
      event: (state, mx, my) => {
        let { attrs, position } = state
        let {
          x, y, width, height
        } = this.resizeHandle(position, mx, undefined, mx, undefined)
        this.resize(x, y, width, height)
      }
    }]
  }

  get getControlPoint() {
    let {
      x, y, width, height
    } = this.getArea
    let { rx = 0 } = this.attrs
    return [{
      x: x,
      y: y,
      type: 'resize',
      class: 'operator-resize-point',
      cursor: 'nw-resize',
      event: (state, mx, my) => {
        let { attrs, position } = state
        let {
          x, y, width, height
        } = this.resizeHandle(position, mx, my, mx, my)
        this.resize(x, y, width, height)
      }
    }, {
      x: x + 1 / 2 * width,
      y: y,
      type: 'resize',
      class: 'operator-resize-point',
      cursor: 'n-resize',
      event: (state, mx, my) => {
        let { attrs, position } = state
        let {
          x, y, width, height
        } = this.resizeHandle(position, undefined, my, undefined, my)
        this.resize(x, y, width, height)
      }
    }, {
      x: x + width,
      y: y,
      type: 'resize',
      class: 'operator-resize-point',
      cursor: 'ne-resize',
      event: (state, mx, my) => {
        let { attrs, position } = state
        let {
          x, y, width, height
        } = this.resizeHandle(position, undefined, my, -1 * mx, my)
        this.resize(x, y, width, height)
      }
    }, {
      x: x + width,
      y: y + 1 / 2 * height,
      type: 'resize',
      class: 'operator-resize-point',
      cursor: 'e-resize',
      event: (state, mx, my) => {
        let { attrs, position } = state
        let {
          x, y, width, height
        } = this.resizeHandle(position, undefined, undefined, -1 * mx, undefined)
        this.resize(x, y, width, height)
      }
    }, {
      x: x + width,
      y: y + height,
      type: 'resize',
      class: 'operator-resize-point',
      cursor: 'se-resize',
      event: (state, mx, my) => {
        let { attrs, position } = state
        let {
          x, y, width, height
        } = this.resizeHandle(position, undefined, undefined, -1 * mx, -1 * my)
        this.resize(x, y, width, height)
      }
    }, {
      x: x + 1 / 2 * width,
      y: y + height,
      type: 'resize',
      class: 'operator-resize-point',
      cursor: 's-resize',
      event: (state, mx, my) => {
        let { attrs, position } = state
        let {
          x, y, width, height
        } = this.resizeHandle(position, undefined, undefined, undefined, -1 * my)
        this.resize(x, y, width, height)
      }
    }, {
      x: x,
      y: y + height,
      type: 'resize',
      class: 'operator-resize-point',
      cursor: 'sw-resize',
      event: (state, mx, my) => {
        let { attrs, position } = state
        let {
          x, y, width, height
        } = this.resizeHandle(position, mx, undefined, mx, -1 * my)
        this.resize(x, y, width, height)
      }
    }, {
      x: x,
      y: y + 1 / 2 * height,
      type: 'resize',
      class: 'operator-resize-point',
      cursor: 'w-resize',
      event: (state, mx, my) => {
        let { attrs, position } = state
        let {
          x, y, width, height
        } = this.resizeHandle(position, mx, undefined, mx, undefined)
        this.resize(x, y, width, height)
      }
    }, {
      x: x + width - rx,
      y: y,
      type: 'control',
      class: 'operator-control-point',
      cursor: 'pointer',
      event: (state, mx, my) => {
        let {
          attrs
        } = state
        let r = (attrs.rx || 0) + (mx || 0)
        r < 0 ? r = 0 : null
        r > 1 / 2 * this.attrs.width ? r = 1 / 2 * this.attrs.width : null
        this.attrs.rx = r
      }
    }]
  }

  resize(x, y, width, height) {
    let rx = this.attrs.rx
    rx > 1 / 2 * width ? rx = 1 / 2 * width : null
    this.moveTo(x, y)
    this.attrs.width = width
    this.attrs.height = height
    this.attrs.rx = rx
  }
}

export default Rect