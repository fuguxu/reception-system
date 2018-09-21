
import Vue from 'vue';
import App from '../app/main.vue';
import router from '../router/router';
import ElementUI from '../lib/el/main';
import  '../css/base.css';
import AppUtil from '../util/main';

Vue.prototype.AppUtil=AppUtil;

Vue.use(ElementUI);

window.Bus=global.Bus=new Vue();

new Vue({
    router:router,
    render: h => h(App),
}).$mount('#app');


if(__PROD__){
    Vue.config.devtools = false;
}else{
    Vue.config.devtools = true;
}
