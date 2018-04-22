import base from './src/css/base.less'
import { a } from './src/common/util'
// 这样会把整个lodash都打包到项目的代码中
// 我们可以安装一个lodash-es模块，来引入单一模块
import { chunk } from 'lodash-es'

const app = document.getElementById('app');
app.innerHTML = '<div class="'+base.box+'"></div>'

console.log(a())

console.log(chunk([1, 2, 3, 4, 5]))