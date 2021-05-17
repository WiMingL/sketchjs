import { h } from 'snabbdom/build/h'
import attrsParser from '../parser/attrs-parser'

// rewrite the h function to fit the new architechture
export default function _h(
  type,
  key,
  attrs = {},
  children = null
) {
  /**
   * The attributes of attrs part may be object data type,
   * but it can't be recognized by H function, so attrs needs
   * to be processed into the content that h function can
   * recognize through parser
   */
  attrs = attrsParser(attrs)
  return h(type, {
    key,
    attrs
  }, children)
}