//webpack是基于node开发的，所以在里面使用node语言是没有问题的
const path = require('path')

//3.为了页面减少二次请求，不推荐页面上引入任何 文件。
//  所以我们选择安装一个 html-webpack-plugin 插件
//  在内存中，根据指定的模板页面，生成一份内存中的首页，同时自动把打包好的bundle注入到页面底部  
//    3.1 引入插件：
//    3.2 配置插件，需要在导出对象中，挂载一个plugins
var htmlWebpackPlugin = require('html-webpack-plugin')

//vue 3.5 vue-loader 15版本 伴生VueLoaderPlugin的配置
const VueLoaderPlugin = require('vue-loader/lib/plugin');

//对外暴露配置。
module.exports= { 
    //1.配置 入口 出口 , 把main.js通过webpack/webpack-dev-server打包处理
     //入口
     entry: path.join(__dirname,'./src/main.js'),
     //出口
     output: {
            path: path.join(__dirname,'./dist'),
            filename: 'bundle.js'
     },

     //所有的webpack配置插件节点
     plugins: [
         //3.2 使用插件，内存中生成一份首页。
         new htmlWebpackPlugin({
             //指定模板文件路径
             template: path.join(__dirname,'./src/index.html'),
             //设置生成的内存页面名称。
             filename: 'index.html'
         }),

         //vue 3.5 配置
         new VueLoaderPlugin()

     ],

     //4.2配置所有的第三方loader模块
     module: {
         //第三方模块的匹配规则
         rules: [
             //这是处理CSS的文件的loader
             {test: /\.css$/, use: ['style-loader','css-loader']},

             //这是处理less文件的loader
             {test: /\.less$/,use: ['style-loader','css-loader','less-loader'] },

             //5.2这是处理图片路径的loader
             {test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=70683&name=[hash:8]-[name].[ext]' },
            /*问题1：发现页面上加上的图片地址变成了Base64格式的字符串了，不是我们引入的地址
                    如何把地址不变成base64格式字符串？
                答：我们可以在 url-loader后面进行?传参，使用一个 limit值，代表是图片的大小，单位是字节byte
                    如果引用的图片 大于或者等于给定的limit值，就不会被转成base64。
                    如果 图片小于给定的 limit值就会转成base64
              
              问题2：给定limit值后，但发现图片名字不在是当初引用的图片名字？
                答：是因为webpack防止图片重名，但如果要进行改名，则继续在limit后 进行传参
                    &name =[name].[ext]   
              
              问题3：改成当初的引用图片名字，如何防止重复？
                答： 我们可以 [name]前面加 -[hash],因为hash值是32位的，我们可以定义一个8位的hash值保证图片不一样              
             */    

            //6.3处理字体图标文件的loader
             { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },

            //7.2处理 class 的loader
            //报错的 是在我们mian.js中，所以匹配JS，但是要排除我们node_modules文件中的JS文件。
             { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},

            //3.3 处理 .vue 文件的loader 
            { test: /\.vue$/, use: 'vue-loader' }

         ]   
     },

     //vue 2.5.3 修改 Vue 被导入的时候包的路径
     resolve: {
         alias: {
            // "vue$": "vue/dist/vue.js"
         }
     }
}

//2.每次更写内容 ，都需重新输入webpack指令重新打包，所以我们可以 下载一个 npm i webpack-dev-server 
//  它可以帮助我们 自动打包，并且还可以 自动打开浏览器，设置端口，热更新,指定托管目录。
//  下载完毕后，我们在到 package.json 中的scripts中 写一个运行脚本
//    "dev" : "webpack-dev-server --open --port 3000 --contentBase src --hot" 
//    完成之后，直接到打印台 npm run dev

//2.1 输出npm run dev 会出现问题
//      1.需要安装 本地webpack包
//      2.webpack包新版本和 webpack-cli分开了。还需要安装 webpack-cli
//      3.webpack-dev-server是从 设置的托管文件根目录下 访问的，
//        所以 index.html之前引入的 bundle.js 路径就只能变为根路径下。