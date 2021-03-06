import Vue from 'vue';
import App from '../app/main.vue';
import router from '../router/router';
import store from '../store/store';
import ElementUI from '../lib/el/main';
import '../css/base.css';
import AppUtil from '../util/main';
require('es6-promise').polyfill();
// import VueSocketio from 'vue-socket.io';//使用后 ie无法打开 猜测无法编译其中语法

import vueNpmStudy from 'vue-npm-study';

let {addFunc,fuButton} = vueNpmStudy;
Vue.use(addFunc);
Vue.use(fuButton);

Vue.prototype.AppUtil = AppUtil;

// Vue.use(new VueSocketio({   //实时通讯 聊天室
//     debug: true,
//     connection: 'http://localhost:8001',
// })); 

// Vue.use(ElementUI);
window.Bus = global.Bus = new Vue();

new Vue({
    router:router,
    store,
    render: h => h(App),
}).$mount('#app');

window.console.log('prod',window.__PROD__);
if (window.__PROD__){
    Vue.config.devtools = false;
} else {
    Vue.config.devtools = true;
}
