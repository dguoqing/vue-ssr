// import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
    {
        path: '/',
        redirect: '/app',              //重定向，地址是/的时候，加载app组件
    },
    {
        // path: '/app/:id',               //挂载到params
        props: true,                        //将参数id已props的形式传到Todo组件
        // props: {
        //     id:456
        // },
        // props: route => ({id: route.query.b}),
        path: '/app/:id',
        // components: {               //路由视图
        //     default: Todo,
        //     a:Login
        // },
        component:() => import('../views/todo/todo.vue'),                 /// 异步加载组件，需要时采取加载,要是用babel-plugin-syntax-dynamic-import 插件,加快首屏加载速度
        name:'app',
        meta: {                 //用来保存路由里面的信息
            title:'this is app',
        },
        beforeEnter(to, from, next){
            console.log('app route beforeEnter')
            next()
        }
        // children: [
        //     {
        //         path: 'test',
        //         component: Login
        //     }
        // ]
    },
    {
        path: '/login',
        // components: {
        //     default: Login,
        //     a:Todo
        // },
        component:() => import('../views/login/login.vue')
    },
    // {            //router-link的class不同
    //     path: '/login/exact',
    //     component: Login
    // }
]