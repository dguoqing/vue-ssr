const autoprefixer = require('autoprefixer')//处理编译后的css，比如一些带有浏览器前缀的-webkit-的css，不需要我们手动去加-webkit-

module.exports = {
    plugins: [
        autoprefixer()
    ]
}