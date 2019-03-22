
import createApp from './create-app'


export default context => {
    return new Promise((resolve, reject) => {
        const { app, router,  } = createApp()
        // console.log('context:',context)
        router.push(context.url)                //推一条路由记录

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()     //根据context。url去匹配组件
            // console.log('router',router)
            // console.log('matchedComponents',matchedComponents)
            if(!matchedComponents.length){
                return reject(new Error('no component matched'))
            }
            context.meta = app.$meta()
            resolve(app)
        })
    })
}


