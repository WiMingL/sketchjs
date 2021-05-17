// But the style parser is the same for all types of graphics

import { toFixed } from "../../util/method"

const styleParser = {
  fill(value) {
    return value
  },
  stroke(value) {
    return value
  },
  'stroke-width': function (value) {
    return toFixed(value, 0)
  },
  'stroke-linejoin': function (value) {
    return value
  },
  'stroke-linecap': function (value) {
    return value
  }
}

export default styleParser