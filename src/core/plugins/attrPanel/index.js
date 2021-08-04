// 属性面板，用于操作元素的属性值

import mixinApis from "./api"

class AttrPanel {
  constructor(options) {
    this.$options = options
    this.selected = []
    this.status = 'free'
  }

  install(layer) {
    this.$layer = layer
    layer.$attrPanel = this
    layer.hooks.on('beforeMount', (layer) => {
      // 这里需要注意，由于插件是在实例初始化开始的时候插入，因此对于一些操作和实例变量，要在对于的钩子中才能获取
      this.installEventListener()

      // 将示例中的方法混入到 layer 中的 apis 中方便其操作

    })
  }

  installEventListener() {
    let layer = this.$layer
    layer.$on('focus', (options) => {
      this.active(options.selected)
    })
    layer.$on('blur', () => {
      this.release()
    })
  }

  active(selected) {
    this.status = 'active'
    this.selected = selected
  }

  release() {
    this.status = 'free'
  }
}

mixinApis(AttrPanel)

export default AttrPanel