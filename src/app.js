//import "./css/base.css"
import base from './css/base.css'

var flag = false

setInterval(function() {
    if (flag) {
        base.unuse()
    } else {
        base.use()
    }
    flag = !flag;
}, 500)
