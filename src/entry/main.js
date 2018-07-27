
import Vue from 'vue';
import App from '../app/main.vue';
import router from '../router/router';
import ElementUI from '../lib/el/main';
import  '../css/base.css';

Vue.use(ElementUI);

new Vue({
    router:router,
    render: h => h(App),
}).$mount('#app');


if(__PROD__){
    Vue.config.devtools = false;
}else{
    Vue.config.devtools = true;
}
