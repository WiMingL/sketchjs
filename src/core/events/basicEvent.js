class BasicEvent {
  constructor(options) {
    this.type = options.type
    this.button = options.button
    this.target = options.target
    this.pageX = options.pageX
    this.pageY = options.pageY
    this.offsetX = options.offsetX
    this.offsetY = options.offsetY
  }
}

export default BasicEvent