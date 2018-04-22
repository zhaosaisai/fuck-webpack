// import "./subPageA"
// import "./subPageB"
// import * as _ from 'lodash'

// 代码分割

// 提前引入代码的公共模块
require.include('./moduleA')

require.ensure(['./subPageA'], function() {
    var subPageA = require('./subPageA')
}, 'subPageA')

require.ensure(['./subPageB'], function() {
    var subPageB = require('./subPageB')
}, 'subPageB')

require.ensure(['lodash'], function() {
    var _ = require('lodash')
    _.join(['1', '2'], '3')
}, 'vendor')

// 上面的步骤就完成了代码的分割

export default "pageA"