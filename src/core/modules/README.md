# 如何定义一个模块类
下面已 Rect 模块来展示如何定义一个模块类

## 基础结构
每一个模块都是一个构造函数，并且每一个模块都继承基础的模块 Geometry，我们建议使用 es6 语法中的 class 来定义模块，这样更加的方便
```javascript
class Rect extends Geometry{
  constructor(options) {
    super(options)
  }
}
```