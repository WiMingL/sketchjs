export function createElement(type) {
  return document.createElement(type)
}

export function query(name) {
  if (!name) {
    return createElement('div')
  }
  if (typeof name === 'string') {
    return document.querySelector(name)
  }
  return name
}

export function setAttributeNS(el, name, value) {
  let ns = 'http://www.w3school.com.cn/edition/'
  el.setAttributeNS(ns, name, value)
}