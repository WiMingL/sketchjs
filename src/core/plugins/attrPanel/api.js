import { isObject } from '../../util/method'

function mixinApis(Panel) {
  Panel.prototype.isSettable = function () {
    if (this.status !== 'active' || this.selected.length < 1) {
      console.warn('there is no selected geometry')
      return false
    }
    return true
  }

  Panel.prototype.moveTo = function (x, y) {
    if (!this.isSettable()) return false
    let geometry = this.selected[0]
    geometry.moveTo && geometry.moveTo(x, y)
  }

  Panel.prototype.resize = function (width, height) {
    if (!this.isSettable()) return false
    let geometry = this.selected[0]
    let { x, y } = geometry.getArea
    width < 0 ? width = 0 : null
    height < 0 ? height = 0 : null
    geometry.resize && geometry.resize(x, y, width, height)
  }

  // 关于设置图形样式相关的 api
  Panel.prototype.style = function (style, value) {
    if (!this.isSettable()) return false
    let selected = this.selected
    if (selected[0].hasOwnAttribute(style)) {
      selected[0].attrs[style] = value
    }
  }

  mixinPublicStyleApis(Panel)

  mixinSpecialApis(Panel)

}

function mixinPublicStyleApis(Panel) {
  const publicStyles = [
    'fill',
    'stroke',
    'stroke-width',
    'stroke-linecap',
    'stroke-linejoin'
  ]
  publicStyles.forEach(style => {
    Panel.prototype[style] = function (value) {
      this.style(style, value)
    }
  })
}

function mixinSpecialApis(Panel) {
  const styles = [{
    name: 'radius',
    style: 'rx',
    attr: 'rx'
  }]
  styles.forEach(config => {
    let style = name = config
    if (isObject(config)) {
      style = config.style
      name = config.name
    }
    Panel.prototype[name] = function (value) {
      this.style(style, value)
    }
  })
}

export default mixinApis
