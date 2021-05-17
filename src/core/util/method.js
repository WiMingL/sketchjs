export function toFixed(number, fix = 0) {
  return (number * 1).toFixed(fix) * 1
}

export function isArray(data) {
  return Array.isArray(data)
}

export function isObject(data) {
  return (data !== null) && (typeof data === 'object') && !isArray(data)
}


export function deepClone(tar) {
  var obj = {};
  var arr = [];
  var type = typeof (tar);
  if (type == 'object') {
    if (Array.isArray(tar)) {
      var len = tar.length;
      for (let i = 0; i < len; i++) {
        arr[i] = deepClone(tar[i])
      }
      return arr;
    } else {
      Object.keys(tar).forEach(key => {
        obj[key] = deepClone(tar[key])
      })
      return obj;
    }
  } else {
    return tar;
  }
}