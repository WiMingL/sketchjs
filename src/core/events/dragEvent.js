import BasicEvent from "./basicEvent";

function calcArea(x1, y1, x2, y2) {
  let obj = Object.create(null)
  obj.x = x1 > x2 ? x2 : x1
  obj.y = y1 > y2 ? y2 : y1
  obj.width = Math.abs(x1 - x2)
  obj.height = Math.abs(y1 - y2)
  return obj
}

class DragEvent extends BasicEvent {
  constructor(options) {
    super(options)
    this.drag = true
    if (options.type === 'dragstart') {
      DragEvent.start(options.pageX, options.pageY)
    } else if (options.type === 'dragend') {
      DragEvent.end()
    }
    this.dragStartX = DragEvent.startX
    this.dragStartY = DragEvent.startY
    this.area = calcArea(this.dragStartX, this.dragStartY, options.pageX, options.pageY)
    this.moveX = this.dragStartX - this.pageX
    this.moveY = this.dragStartY - this.pageY
  }
}

DragEvent.start = function (x, y) {
  DragEvent.startX = x
  DragEvent.startY = y
}

DragEvent.end = function () {
  DragEvent.startX = undefined
  DragEvent.startY = undefined
}

export default DragEvent