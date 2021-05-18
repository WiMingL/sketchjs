/**
 * geometry class is this basis of  geometry module class 
 */

class Geometry {
  constructor(options) {
    this.$options = options
    this.key = Geometry.uid++
    this.type = options.type
    this.name = options.name || options.type
    this.attrs = {
      ...options.attrs,
      id: this.key,
      geometry: 'true'
    }
  }

  get elm() {
    return document.getElementById(this.key)
  }

  get getArea() {
    return this.elm.getBBox()
  }

  moveTo(x, y) {
    console.log(x, y)
  }

  resizeHandle(position, dx, dy, mx, my) {
    let box = {}
    dx === undefined ? box.x = position.x : box.x = position.x - dx
    dy === undefined ? box.y = position.y : box.y = position.y - dy
    mx === undefined ? box.width = position.width : box.width = position.width + mx || 0
    my === undefined ? box.height = position.height : box.height = position.height + my || 0
    if (box.width < 0) {
      box.width = 0
      if (dx !== undefined) {
        box.x = position.x + position.width
      }
    }
    if (box.height < 0) {
      box.height = 0
      if (dy !== undefined) {
        box.y = position.y + position.height
      }
    }
    return box
  }

  foucs() {
    this.isFoucs = true
    this.attrs.style = 'cursor:move;'
  }

  blur() {
    this.isFoucs = false
    this.attrs.style = ''
  }

  get getControl() {
    return []
  }
}

Geometry.uid = 1

export default Geometry