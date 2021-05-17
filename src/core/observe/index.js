import { isArray, isObject } from "../util/method"

function observe(data, watcher, deep) {
  // is object type data
  if (typeof data !== 'object' || data === null) {
    return data
  }

  if (isObject(data)) {
    // object
    return proxyObject(data, watcher, deep)
  } else if (isArray(data)) {
    // array
    return proxyArray(data, watcher, deep)
  } else {
    return data
  }
}

function proxyObject(data, watcher, deep = false) {
  let $data = Object.create(null)
  if (deep) {
    Object.keys(data).forEach(key => {
      $data[key] = observe(data[key], watcher, deep)
    })
  }
  let proxy = new Proxy(data, {
    get(target, key) {
      return target[key]
    },
    set(target, key, value) {
      if (target[key] !== value) {
        target[key] = observe(value)
        watcher.update()
      }
      return true
    }
  })
  return proxy
}

function proxyArray(data, watcher, deep = false) {
  let $data = data.forEach(item => observe(item))
  let proxy = new Proxy(data, {
    get(target, key) {
      return target[key]
    },
    set(target, key, value) {
      if (target[key] !== value && key !== 'length') {
        target[key] = observe(value)
        watcher.update()
      }
      return true
    }
  })
  return proxy
}

export default observe