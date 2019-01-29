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
        name:'studySys',
        children:[
            {
                path:'/r',
                redirect:'/r/reception_center',
                component:ReceptionPortal,
                name:'study protal',
                children:[
                    {
                        path:'/r/reception_center',
                        component:ReceptionCenter,
                        name:'node crud',
                        meta:{
                            leftMuen:true,
                            muenIndex:0
                        }
                    },
                    {
                        path:'/r/my_reception',
                        component:MyReception,
                        name:'pdf',
                        meta:{
                            leftMuen:true,
                            muenIndex:0
                        }
                    },
                    // {
                    //     path:'/r/pending_reception',
                    //     component:PendingReception,
                    //     name:'待审接待',
                    //     meta:{
                    //         leftMuen:true,
                    //         muenIndex:0
                    //     }
                    // },
                    // {
                    //     path:'/r/trial_reception',
                    //     component:TrialReception,
                    //     name:'已审接待',
                    //     meta:{
                    //         leftMuen:true,
                    //         muenIndex:0
                    //     }
                    // },
                    {
                        path:'/r/my_attend',
                        component:MyAttend,
                        name:'node chat room',
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
                name:'node new',
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
    window.scrollTo(0,0);
});

export default router;