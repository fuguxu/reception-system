import Vue from 'vue';
import VueRouter from 'vue-router';
import app from '../pages/App/app.vue';

import ReceptionPortal from '../pages/ReceptionPortal/main.vue';
import ReceptionCenter from '../pages/ReceptionCenter/main.vue';
import MyReception from '../pages/MyReception/main.vue';
import PendingReception from '../pages/PendingReception/main.vue';
import TrialReception  from '../pages/TrialReception/main.vue';
import MyAttend  from '../pages/MyAttend/main.vue';

import CreateReception  from '../pages/CreateReception/main.vue';

Vue.use(VueRouter);

const routesMap=[
    {
        path:'/',
        component:app,
        redirect:'/r',
        name:'接待系统',
        children:[
            {
                path:'/r',
                redirect:'/r/reception_center',
                component:ReceptionPortal,
                name:'接待门户',
                children:[
                    {
                        path:'/r/reception_center',
                        component:ReceptionCenter,
                        name:'接待中心',
                        meta:{
                            leftMuen:true,
                            muenIndex:0
                        }
                    },
                    {
                        path:'/r/my_reception',
                        component:MyReception,
                        name:'我的接待',
                        meta:{
                            leftMuen:true,
                            muenIndex:0
                        }
                    },
                    {
                        path:'/r/pending_reception',
                        component:PendingReception,
                        name:'待审接待',
                        meta:{
                            leftMuen:true,
                            muenIndex:0
                        }
                    },
                    {
                        path:'/r/trial_reception',
                        component:TrialReception,
                        name:'已审接待',
                        meta:{
                            leftMuen:true,
                            muenIndex:0
                        }
                    },
                    {
                        path:'/r/my_attend',
                        component:MyAttend,
                        name:'需我参与',
                        meta:{
                            leftMuen:true,
                            muenIndex:0
                        }
                    },
                ]
            },
            {
                path:'r/create_reception',
                component:CreateReception,
                name:'新建接待',
            }
        ]
    },
]

/**路由配置**/
const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: routesMap,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

router.beforeEach((to, from, next) => {
    next()
});

router.afterEach(router => {
   
});

export default router;