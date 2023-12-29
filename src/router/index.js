import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/layout/layout.vue'

Vue.use(VueRouter)

export const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/login/register.vue'),
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue'),
    }
]

const router = new VueRouter({
    routes: routes,
    mode: 'history'
})

//重置路由方法
export const resetRouter = () => {
    router.matcher = new VueRouter({
        mode: 'history',
        routes: routes
    })
}

//刷新页面会重置路由
export const setRoutes = () => {
    const storeMenus = sessionStorage.getItem("menus");
    if (storeMenus) {
        //拼装动态路由
        const asyncRouterMap =
            {
                path: '',
                name: 'Manage',
                component: layout,
                children: []
            }
        const menus = JSON.parse(storeMenus)
        menus.forEach(item => {
            if (item.path) {//当且仅当path不为空的时候才去设置路由
                let itemMenu = {
                    path: item.path.replace("/", ""),
                    name: item.name,
                    component: () => import('@/views/' + item.pagePath + '.vue')
                }
                asyncRouterMap.children.push(itemMenu)
            } else if (item.children.length) {
                item.children.forEach(item => {
                    if (item.path) {
                        let itemMenu = {
                            path: item.path.replace("/", ""),
                            name: item.name,
                            component: () => import('@/views/' + item.pagePath + '.vue')
                        }
                        asyncRouterMap.children.push(itemMenu)
                    }
                })
            }
        })
        //获取当前的路由对象名称数组
        const currentRouteNames = router.getRoutes().map(v => v.name)
        if (!currentRouteNames.includes('Manage')) {
            //动态加载到想在的路由对象
            router.addRoute(asyncRouterMap)
        }
    }
}


export default router
