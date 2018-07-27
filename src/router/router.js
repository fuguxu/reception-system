import Vue from 'vue';
import VueRouter from 'vue-router';
import app from '../pages/App/app.vue';
import NewReception from '../pages/NewReception/main.vue';

Vue.use(VueRouter);

const routesMap=[
    {
        path:'/',
        component:app,
        redirect:'/r',
        children:[
            {
                path:'/r',
                component:NewReception,
                name:'接待门户',
                children:[

                ]
            },
        ]
    },
]

/**路由配置**/
const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: routesMap
});

router.beforeEach((to, from, next) => {
    next()
});

router.afterEach(router => {
   
});

export default router;