import Vue from 'vue';
import Vuex from 'vuex';

import modules from './modules/index';

Vue.use(Vuex);

let store = new Vuex.Store({
    modules
});

export default store;
