/**
 * for parser attrs
 */

import { toFixed } from "../util/method"
import rectParser from "./attrs-modules/rect-parser"
import styleParser from "./attrs-modules/style-parser"

// testing part
// appoint prop of attrs how to parser the value
// In fact, the attribute parser of each type of graph is different,
// so we can design it in modules
// but In the process of development, 
// it is found that not all attributes need to be parsed by parser.
//  Only for some special attributes, they need to be parsed
const parserFns = {
  ...rectParser,
  ...styleParser
}

function attrsParser(attrs) {
  let parser_attrs = Object.create(null)
  Object.keys(attrs).forEach(key => {
    let value = attrs[key]
    let fn = parserFns[key]
    if (fn) {
      parser_attrs[key] = fn(value)
      return
    }
    if (!value) {
      parser_attrs[key] = undefined
    }
    // if value type is no a Common data type, it needs to be adjusted by JSON.stringify()
    if (typeof vlaue !== 'string' || typeof vlaue !== 'number') {
      parser_attrs[key] = JSON.stringify(value)
    }
    parser_attrs[key] = value
  })
  return parser_attrs
}

export default attrsParser