import Layer from "./core/instance/layer";
import './core/css/index.css'

let layer = new Layer({
  el: '#app',
  config: {
    width: 200,
    height: 200,
    zoom: 1
  },
  life: {
    mounted(e) {
      console.log('mounted')
      console.log(e)
    }
  },
  geometry: [{
    type: 'rect',
    name: 'rect',
    attrs: {
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      fill: '#fff'
    }
  }, {
    type: 'rect',
    name: 'rect',
    attrs: {
      x: 90,
      y: 50,
      width: 50,
      height: 30,
      fill: 'green'
    }
  }]
})