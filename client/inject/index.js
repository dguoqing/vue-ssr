
class Test {
    constructor() {
        this.methods = {
            ck: this.ck
        }
    }
    ck() {
        console.log(this.$options.ddd)
        console.log('mixin ck')
    }

}

class UserExtends{
    constructor(){
      this.methods = {
        
      }
    }
    data = () => {
      return {
        UserExtends:'UserExtends'
      }
    }
    
    mounted = () => {
      // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>UserExtends mounted')
    }
  }

const inject = () => {
    let ccc = '../views'
    const ctx = require.context('../views', true, /\.vue$/)

    // console.dir(ctx)
    ctx.keys().forEach(cp => {
        // console.log(cp)
        let cpInstance = ctx(cp).default
        // console.log(cpInstance)
        cpInstance.extends = {

            mounted() {
                // console.log('inject mounted')
            },
            ...new UserExtends()
        }


        if (!cpInstance.mixins) cpInstance.mixins = []
        cpInstance.mixins = [...cpInstance.mixins, new Test()]
    });
}

inject()