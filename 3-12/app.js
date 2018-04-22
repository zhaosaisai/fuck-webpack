import base from './src/css/base.less'
import { a } from './src/common/util'

const app = document.getElementById('app');
app.innerHTML = '<div class="'+base.box+'"></div>'

console.log(a())