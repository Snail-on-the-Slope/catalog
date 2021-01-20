import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: function() {
            return import ('../views/Home.vue')
        }
    },
    {
        path: '/lib/:id',
        name: 'lib',
        component: function() {
            return import ('../views/Lib.vue')
        }
    }
]

const router = new VueRouter({
    routes
})

export default router