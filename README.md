## webpack

> 基于webpack3.10+

### 模块化

#### javascript模块化

命名空间-->commonjs-->amd/cmd/umd-->es6 modules

##### 1. 命名空间

> 库名.类别名.方法名

```javascript
const namespace = {}
namespace.type = namespace.type || {}
```

##### 2. Commonjs

一个文件就是一个模块，通常使用`module.exports`来暴露模块的接口，通过`require`引入模块。**同步执行**。

```javascript
const events = require('events')
```

##### 3. AMD

异步模块定义，使用`define`来定义模块，使用`require`来引用模块。

```javascript
define('name', ['require1'], function(require, exports, beta) {
  exports.method = function() {}
})
```

##### 4. CMD

一个文件就是一个模块，使用`define`来定义模块，使用`require`来引用模块。代表作 `seajs`。尽可能的懒执行。

```javascript
define(function(require, exports, module) {
  var $ = require('jquery')
  
  exports.doSomething = ...
  
  module.exports = ...
})
```

##### 5. UMD

通用模块定义。三个步骤：判断是否支持amd，判断是否支持commonjs，如果都没有，直接定义为全局变量。

```javascript
(function(root, factory) {
  if(typeof define === 'function' && define.amd) {
    define([], factory)
  }else if(typeof exports === 'object') {
    module.exports = factory()
  }else {
    root.returnExports = factory()
  }
})(this, function() {
  return {}
})
```

##### 6. es module

一个文件就是一个模块，`export / import`。

#### webpack简介

##### webpack概述

webpack是一个javascript的打包器，将各种资源文件打包成一个个bundle。

##### webpack的版本更迭和功能的变化

版本1：编译、打包、hmr、代码分割、文件处理

版本2：tree shaking、es module、动态import函数(异步组件)

版本3：scope hosting（作用域提升）、magic comments（配合动态import使用）

### 核心概念

##### 1. Entry

`代码的入口`和`打包的入口`，可以是单个或者多个。多个入口的可能性有两个：`1. 多页面应用程序`，`2. 业务代码和框架页码的分离`。

`entry的写法`：

```javascript
// 单路口的两种写法
module.exports = {
  entry: 'index.js' // 绝对路径或者相对路径
}

module.exports = {
  entry: ['index.js', 'vendors.js']
}

// 多路口的写法
// key就是打包输出之后的chunk的名称
module.exports = {
  entry: {
    index: 'index.js'
  }
}
```

##### 2. output

对webpack打包生成的文件的bundle的描述，一个或多个，我们可以自定义规则。

```javascript
module.exports = {
  output: {
    filename: 'index.min.js' // 打包生成的文件的名称
  }
}

// 如果入口有多个，那么可以使用占位符来描述打包后生成的文件的名称
moduile.exports = {
  output: {
    filename: '[name].min.[hash:5].js'
  }
}
```

##### 3. loaders

用于转换非js类型的文件转换成不同的js模块。

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
				loader: 'css-loader'
      }
    ]
  }
}
```

常用的loader：

编译相关：babel-loader、ts-loader

样式相关：style-loader、css-loader、less-loader、postcss-loader

文件相关：

##### 4. plugins

插件，用于增强webpack功能，参与打包整个过程，打包优化和压缩，配置编译时的变量，极其灵活。

```javascript
module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}
```

常见的plugins：

优化相关：commonsChunkPlugin、UglifyJsPlugin

功能相关：ExtractTextWebpackPlugin、HtmlWebpackPlugin、HotModuleReplacementPlugin、CopyWebpackPlugin



##### 什么是Chunk?

在webpack中就是指代码块，比如动态懒加载的文件就是一个代码块、ExtractTextWebpackPlugin功能提取出来的文件也是一个代码块。

##### 什么是Bundle?

bundle就是指代码块的集合，比如打包生成的文件就是一个bundle

## 由浅入深学习webpack

#### 1.使用webpack

webpack命令

```javascript
webpack --config 配置文件 --watch  -p(压缩功能) --progress
```

webpack配置文件

第三方脚手架

#### 2. 打包JS

```javascript
webpack entry <entry> output

webpack --config 配置文件
```

```javascript
module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        filename: '[name].[hash:6].js'
    }
}
```

##### 3. 编译es6

webpack编译es6，需要使用`babel-loader`。

```javascript
npm install babel-loader babel-core --save-dev
npm install babel-preset-env --save-dev
```

`babel-polyfill`: 进行api层面的转换，babel默认处理语法，不进行api层面的转义。这个库应该全局使用，为应用准备的。
`babel-transform-runtime`: 局部使用，为开发框架准备的。不会在全局范围内生成新方法。

> 业务代码使用

```javascript
npm install babel-polyfill --save

import 'babel-polyfill'
```

> 组件库使用

```javascript
npm install babel-plugin-transform-runtime --save-dev
// 这个插件依赖babel-runtime 防止重复的编译
npm install babel-runtime --save

// 使用.babelrc文件进行配置
{
    "presets": [
        ["env", {
            "targets": {
                "browsers": ["last 2 versions"]
            }
        }]
    ],
    "plugins": [
        "transform-runtime"
    ]
}
```
##### 4. 提取公用代码(3-6)
提取公用代码可以减少代码的冗余，提高用户的加载速度。使用`CommonsChunkPlugin`

```javascript
{
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(options)
  ]
}
```
`options`有以下属性：

```javascript
{
  name: chunk的名称,
  filename: 打包公用代码之后生成的bundle的名称,
  minChunks: Number or function or 'infinity', 表示代码出现多少次后才会被提取到公用代码中,
  chunks: 指定提取的代码的范围,
  children: 在模块的所有子模块中查找公用的依赖,
  async: 创建一个异步的公共代码块
}
```

使用场景：

* 单页应用
* 单页应用 + 第三方依赖
* 多页应用 + 第三方依赖 + webpack生成代码

提取公用代码针对的是多入口的情况，如果只有一个入口的情况下，是不会把公用代码提取出来的。

##### 5. 代码分割 和 懒加载（3-7）
webpack可以通过两种方式实现：
1. webpack methods

* require.ensure
  * []: dependencies
  * callback
  * errorCallback
  * chunkName
* require.include: 可以在单页面的情况下提取公共代码

es2015的规范: 
* `import()` -> promise

代码分割：
* 分割业务代码 和 第三方依赖
* 分割业务代码 和 业务公共代码 和 第三方依赖
* 分离首次加载 和 访问后加载的代码

##### 6. 处理css(3-8)
处理css主要有以下几个方面：
* 引入
* css modules
* 配置less sass
* 提取css代码

主要用到以下loader：
* `css-loader`: 将css转换成转换成js
* `style-loader`: 动态生成style标签

```bash
npm install css-loader style-loader --save-dev
```

`style-loader`的options。
```javascript
{
  insertAt: 插入位置,
  insertInto: 插入到dom,
  singleton: 是否只是用一个style标签,
  transform: 转化，在浏览器环境下，插入页面前
}
```

`css-loader`的options
```javascript
{
  alias: 压缩,
  importLoader: 类似于@import的功能
  minimize: 是否压缩
  modules: 是否启用css-modules
}
```

`css modules`的基本语法
* 使用`:local`添加本地样式
* 使用`:global`添加全局样式
* 使用`compose`来继承一段样式
* 使用`compose ... from path`从某个文件中引入一段样式

##### 7. 配置less/sass(3-9)
```bash
npm install less node-sass less-loader sass-loader --save-dev
```

##### 8. 提取css(3-10)
提取css文件有两个方式：
* extract-loader
* ExtractTextWebpackPlugin

```bash
npm install extract-text-webpack-plugin --save-dev
```

##### 9. postcss in webpack(3-11)
安装
```bash
npm install postcss postcss-loader --save-dev
```

* autoprefixer: 自动添加前缀
* css-nano: 压缩css的
* css-next: 使用未来的css语法

```bash
npm install autoprefixer cssnano postcss-cssnext --save-dev
```

##### 10. Tree shaking（3-12）
`tree shaking`主要目的就是去除那些没有使用过的代码。主要有`js tree shaking`和`css tree shaking`。是常规优化的一个手段。尤其当我们引入第三方库中的某一个功能的时候。

项目的`tree shaking`，只需要使用`new webpack.optimize.UglifyJsPlugin()`插件即可。
第三方库的`tree shaking`，以方面需要第三方库对`tree shaking`的支持，另一方面，我们可以使用其他工具，比如常见的`lodash`的`tree shaking`可以使用`babel-plugin-lodash`来实现。

```bash
npm install babel-plugin-lodash --save-dev
```