// operator is a plugin that let user operate the geometry more convenient
// each plugin must own a install function to let layer to call

import { deepClone, isArray, isObject } from "../util/method"
import { createElement, setAttributeNS } from "../util/web-dom-api"
import patch from "../vdom/patch"
import { h } from 'snabbdom/build/h'
import '../css/operator.css'

class Operator {
  constructor(options) {
    this.$options = options
    // 当前的状态
    this.status = 'free'
    // 存储选中的 geometry，目前默认只有一个
    this.geometry = []
  }

  // install 方法用于注册插件时自动执行
  install(layer) {
    this.$layer = layer
    // 在画布挂载前挂载当前页面到容器中
    layer.hooks.on('beforeMount', () => {
      // console.log('install operator')
      // 注册事件监听，对 layer 中的部分事件进行监听
      this.installEventListener()
      // 挂载元素
      this.$mount()
    })
    layer.hooks.on('beforeUpdate', () => {
      Promise.resolve().then(() => {
        this._update()
      })
    })
  }

  installEventListener() {
    let layer = this.$layer
    layer.$on('mousedown', (e) => {
      // console.log('down')
      if (layer.isGeometry(e.target)) {
        // 选中某个元素，激活操作容器
        let id = e.target.getAttribute('id')
        this.active(layer.getGeometryById(id))
      } else if (layer.isCanvas(e.target)) {
        // 点击画布，释放当前容器
        this.release()
      } else {
        // 其他
        // console.log('other')
      }
    })

    layer.$on('dragstart', (e) => {
      this.startPosition = this.getPosition()
      this.initialState = this.getInitialState()
    })

    layer.$on('drag', (e) => {
      if (this.type === 'move') {
        this.moveGeometry(e)
      } else if (this.type === 'resize') {
        this.resizeGeometry(e)
      } else if (this.type = 'control') {
        this.controlGeometry(e)
      }
    })

    layer.$on('dragend', () => {
      this.type = ''
      this.cursor = ''
      this._update()
    })
  }

  setCursorMask(cursor) {
    this.cursor = cursor
  }

  active(geometry) {
    if (isArray(geometry)) {
      this.geometry = geometry
    } else if (isObject(geometry)) {
      this.geometry = [geometry]
    }

    if (this.geometry.length === 1) {
      this.type = 'move'
      this.status = 'active'
      this.geometry[0].foucs()
      this._update()
    }
  }

  moveGeometry(e) {
    if (this.cursor !== 'move') {
      this.setCursorMask('move')
    }
    this.geometry.forEach((geo, i) => {
      let state = this.initialState[i]
      geo.move(state, e.moveX, e.moveY)
    })
  }

  resizeGeometry(e) {
    if (this.event) {
      this.event(this.initialState[0], e.moveX, e.moveY)
    }
  }

  controlGeometry(e) {
    if (this.event) {
      this.event(this.initialState[0], e.moveX, e.moveY)
    }
  }

  release() {
    this.status = 'free'
    this.type = ''
    this.event = null
    if (this.geometry.length === 1) {
      this.geometry[0].blur()
    }
    this.geometry = []
    this._update()
  }

  render() {
    let children = []
    let cursorMask = this._renderCursorMask()
    cursorMask && children.push(cursorMask)
    let area = this._renderArea()
    area && children.push(area)
    let points = this._renderControlPoint()
    children = children.concat(points)
    return h('div.sketch-js-operator', children)
  }

  _update() {
    this.$vnode = patch(this.$vnode, this.render())
  }

  // 挂载容器
  $mount() {
    this.$vnode = createElement('div')
    this.$layer.$container.appendChild(this.$vnode)
    this._update()
  }

  // 获取位置信息 x y width height
  getPosition() {
    // 目前默认返回首个 geometry 的位置信息
    return this.geometry[0]?.getArea
  }

  getInitialState() {
    let state = []
    this.geometry.forEach(geo => {
      let obj = {}
      obj.attrs = deepClone(geo.attrs)
      obj.position = geo.getArea || {}
      state.push(obj)
    })
    // console.log(state)
    return state
  }

  _renderCursorMask() {
    if (this.cursor) {
      return h('div.operator-cursor-mask', {
        style: {
          cursor: this.cursor || 'pointer'
        }
      })
    }
    return null
  }

  // 渲染操作容器区域
  _renderArea() {
    if (this.status === 'active') {
      let position = this.getPosition()
      return h('div.operator-area', {
        style: {
          top: position.y + 'px',
          left: position.x + 'px',
          width: position.width + 'px',
          height: position.height + 'px'
        }
      })
    }
    return null
  }

  // 渲染 resize 点，已废弃，未来所有的控制点都由 _renderControlPoint 来进行渲染
  _renderResize() {
    let geometry = this.geometry[0]
    let self = this
    if (this.status === 'active' && geometry) {
      return geometry.getResize?.map(item => {
        return h('div.operator-resize-point', {
          style: {
            top: item.y + 'px',
            left: item.x + 'px',
            cursor: item.cursor
          },
          on: {
            mousedown() {
              self.type = 'resize'
              self.event = item.event
              self.setCursorMask(item.cursor)
            }
          }
        })
      })
    }
    return null
  }

  // 已废弃，未来所有的控制点都由 _renderControlPoint 来进行渲染
  _renderControl() {
    let geometry = this.geometry[0]
    let self = this
    if (this.status === 'active' && geometry) {
      return geometry.getControl?.map(item => {
        return h('div.operator-control-point', {
          style: {
            top: item.y + 'px',
            left: item.x + 'px',
            cursor: item.cursor
          },
          on: {
            mousedown() {
              self.type = 'control'
              self.event = item.event
              self.setCursorMask(item.cursor)
            }
          }
        })
      })
    }
    return null
  }

  _renderControlPoint() {
    let geometry = this.geometry[0]
    let self = this
    if (this.status === 'active' && geometry) {
      return geometry.getControlPoint?.map(item => {
        return h(`div.${item.class}`, {
          style: {
            top: item.y + 'px',
            left: item.x + 'px',
            cursor: item.cursor
          },
          on: {
            mousedown() {
              self.type = item.type
              self.event = item.event
              self.setCursorMask(item.cursor)
            }
          }
        })
      })
    }
    return []
  }
}

export default Operator