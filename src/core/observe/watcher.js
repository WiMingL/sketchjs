class Watcher {
  constructor(options) {
    this.$options = options
    this.ly = options.layer
    this.cb = options.cb
  }

  update() {
    this.cb.call(this.ly)
  }
}

export default Watcher