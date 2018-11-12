// import "./css/base.css"
import base from './css/base.less'
import common from './css/common.less'

$('div').addClass('new')

var app = document.getElementById('app')
// app.innerHTML = `<div class="${base.box}"></div>`

$.get('/comments/hotflow', {
    id: '4300473404209484',
    mid: '4300473404209484',
    max_id_type: 0
}, function (data) {
    console.log(data)
})

if (module.hot) {
    // 检测是否有模块热更新
    module.hot.accept()
}

import(/* webpackChunkName:'a' */ './components/a').then(function (a) {
    console.log(a)
})

// var flag = false
//
// setInterval(function() {
//     if (flag) {
//         base.unuse()
//     } else {
//         base.use()
//     }
//     flag = !flag;
// }, 500)
