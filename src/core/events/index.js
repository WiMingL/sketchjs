// Here is the method used to write the built-in event correlation in layer

import BasicEvent from "./basicEvent"
import DragEvent from "./dragEvent"

function cleanConfig(config) {
  Object.keys(config).forEach(key => {
    config[key] = null
  })
}

// bind basic events
function mixinBasicEvents(layer) {
  layer.$container.addEventListener('mousedown', (e) => {
    // 存储原始事件的 event
    layer.$emit('mousedown', new BasicEvent(e))
  })
  layer.$container.addEventListener('mousemove', (e) => {

    layer.$emit('mousemove', new BasicEvent(e))
  })
  layer.$container.addEventListener('mouseup', (e) => {
    layer.$emit('mouseup', new BasicEvent(e))
  })
  document.addEventListener('mousemove', (e) => {
    // 触发 moving 事件，具体执行由事件内部决定
    layer.$emit('_mousemove', new BasicEvent(e))
  })
  document.addEventListener('mouseup', (e) => {
    // 触发 moving 事件，具体执行由事件内部决定
    layer.$emit('_mouseup', new BasicEvent(e))
  })
}

// 混入自定义事件 拖拽
function mixinDragEvents(layer) {
  layer.$container.oncontextmenu = (e) => {
    e.preventDefault()
  }

  layer.$on('mousedown', (e, config) => {
    if (e.button === 0) {
      config.down = true
    } else if (e.button === 2) {
      config.cancel = true
    }
  })

  layer.$on('_mousemove', (e, config) => {
    // console.log('_move')
    if (config.down) {
      // console.log('down move')
      if (config.drag) {
        // console.log('draging')
        layer.$emit('drag', new DragEvent({
          ...e,
          type: 'drag'
        }))
      } else {
        config.drag = true
        layer.$emit('dragstart', new DragEvent({
          ...e,
          type: 'dragstart'
        }))
      }
    }
  })

  layer.$on('_mouseup', (e, config) => {
    if (!config.drag && config.down) {
      layer.$emit('click', new BasicEvent({
        ...e,
        type: 'click'
      }))
    }
    if (config.down && config.drag) {
      layer.$emit('dragend', new DragEvent({
        ...e,
        type: 'dragend'
      }))
    }
    if (config.cancel) {
      layer.$emit('cancel')
    }
    cleanConfig(config)
  })
}

export default function mixinEvents(layer) {
  mixinBasicEvents(layer)
  mixinDragEvents(layer)
}

