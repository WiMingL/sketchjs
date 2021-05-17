import { toFixed } from "../../util/method"

const rectParser = {
  x(value) {
    return toFixed(value, 2)
  },
  y(value) {
    return toFixed(value, 2)
  },
  width(value) {
    return toFixed(value, 2)
  }
}

export default rectParser