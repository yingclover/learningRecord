## Webpack

#### 1.什么是webpack，与grunt和gulp有什么不同？

webpack是一个模块打包工具，在webpack里面一切皆模块通过loader转换文件，通过plugin注入钩子，最后输出有多个模块组合成的文件。
WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到Js模块以及其它的一些浏览器不能直接运行的拓展语言，并将其打包为合适的格式以供浏览器使用。

Gulp/Grunt是一种能够优化前端的开发流程的工具，而WebPack是一种模块化的解决方案，不过Webpack的优点使得在很多场景下可以替代Gulp/Grunt类的工具。

Grunt和Gulp的工作方式是：在一个配置文件中，指明对某些文件进行类似编译，组合，压缩等任务的具体步骤，工具之后可以自动替你完成这些任务。

webpack的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个（或多个）浏览器可识别的JavaScript文件。

gulp和grunt需要开发者将整个前端构建过程拆分成多个Task，并合理控制所有Task的调用关系。webpack需要开发者找到入口，并需要清楚对于不同的资源应该使用什么Loader做何种解析和加工。

#### 2. webpack的优缺点

优点：
　　1）专注于处理模块化的项目，能做到开箱即用，一步到位
　　2）可通过plugin扩展，方便、灵活　　
　　3）社区庞大活跃，经常引入新特性
　　4）良好的开发体验
缺点：webpack的缺点是只能用于采用模块化开发的项目

#### 3.分别介绍bundle，chunk，module是什么

bundle:是由webpack打包出来的文件
chunk:代码块，一个chunk由多个模块组合而成，用于代码的合并和分割
module:是开发中的单个模块，一个模块对应一个文件，webpack会从配置的entry中递归开始找出所有依赖的模块

#### 4.什么是loader，plugin，两者区别

loader：模块转换器，用于把模块原内容按照需求转换成新内容，通过使用不同的Loader，Webpack可以要把不同的文件都转成JS文件,比如CSS、ES6/7、JSX等

plugin：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情
　　一个插件是含有apply方法的一个对象，通过这个方法可以参与到整个webpack打包的各个流程

loader是用来对模块的源代码进行转换,而插件目的在于解决 loader 无法实现的其他事，因为plugin可以在任何阶段调用,能够跨Loader进一步加工Loader的输出。

#### 5.什么是模块热更新

模块热更新是webpack的一个功能，他可以使得代码修改过后不用刷新浏览器就可以更新，是高级版的自动刷新浏览器。devServer中通过hot属性可以空时模块的热替换。

```javascript
//通过配置文件
        const webpack = require('webpack');
        const path = require('path');
        let env = process.env.NODE_ENV == "development" ? "development" : "production";
        const config = {
          mode: env,
         devServer: {
             hot:true
         }
        }
          plugins: [
             new webpack.HotModuleReplacementPlugin(), //热加载插件
          ],
        module.exports = config;
```

#### 6.几个常见的plugin和常见的loader

plugin:
　　html-webpack-plugin 为html文件中引入的外部资源，可以生成创建html入口文件
　　mini-css-extract-plugin 分离css文件
　　clean-webpack-plugin 删除打包文件
　　HotModuleReplacementPlugin 热更新应用
　　copy-webpack-plugin 拷贝静态文件
　　terser-webpack-plugin 通过TerserPlugin压缩ES6代码

loader:
　　css-loader 加载 CSS，支持模块化、压缩、文件导入等特性
　　image-loader 加载并且压缩图片文件
　　babel-loader 把 ES6 转换成 ES5
　　style-loader 把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS
　　file-loader 把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
　　source-map-loader 加载额外的 Source Map 文件，以方便断点调试

#### 7.如何自动生成webpack配置

webpack-cli /vue-cli /etc ...脚手架工具

#### 8.webpack-dev-server和http服务器如nginx有什么区别

webpack-dev-server使用内存来存储webpack开发环境下的打包文件,并且可以使用模块热更新，他比传统的http服务对开发更加简单高效。

#### 9.webpack构建过程

从entry里配置的module开始递归解析entry依赖的所有module
每找到一个module，就会根据配置的loader去找对应的转换规则
对module进行转换后，再解析出当前module依赖的module
这些模块会以entry为单位分组，一个entry和其所有依赖的module被分到一个组Chunk
最后webpack会把所有Chunk转换成文件输出
在整个流程中webpack会在恰当的时机执行plugin里定义的逻辑

#### 10.什么是entry，output

entry入口，告诉webpack要使用哪个模块作为构建项目的起点，默认为./src/index.js

output出口，告诉webpack在哪里输出它打包好的代码以及如何命名，默认为./dist

#### 11.webpack如何配置单页面和多页面的应用程序

```
//单个页面
        module.exports = {
            entry: './path/to/my/entry/file.js'
        }
        //多页面应用程序
        module.entrys = {
            entry: {
                pageOne: './src/pageOne/index.js',
                pageTwo: './src/pageTwo/index.js'
            }
        }
```



#### 12.什么是长缓存，在webpack中如何做到长缓存优化

浏览器在用户访问页面的时候，为了加快加载速度会对用户访问的静态资源进行存储，但是每一次代码升级或更新都需要浏览器下载新的代码，最简单方便的方式就是引入新的文件名称
webpack中可以在output中指定chunkhash，并且分离经常更新的代码和框架代码。通过NameModulesPlugin或HashedModuleIdsPlugin使再次打包文件名不变

#### 13.提取公共代码

```javascript
module.exports = {
    optimization: {
        splitChunks: {
            common: {
                // 抽离公共代码
                chunks: 'initial',
                name: 'common', // 打包后的文件名
                minChunks: 2, // 最小引用2次
                minSize: 0 // 超出0字节就生成一个新包
            },
            styles: {
                // 抽离公用代码
                name: 'styles',
                test: /\.css$/,
                chunks: 'all',
                minChunks: 2,
                enforce: true
            },
            vender: {
                // 抽离第三方插件
                test: /node_modules/,
                chunks: 'initial',
                name: 'vendor', // 打包后的文件名
                priority: 10 // 设置优先级，防止与自定义公共代码提取时被覆盖，不进行打包
            }
        }
    }
}

```

## Git

#### 1.Git和SVN的区别

　　git是分布式版本控制，svn是集中式版本控制（核心区别）

　　git相对于svn的优势就是不需要网络即可版本控制

　　git把内容按数据方式存储，而SVN是按文件

　　git可以是公用的，可以分享，svn基本是公司内部才能访问，网外不方便访问

　　git不依赖中央服务器，即使服务器有问题也不受影响，svn依赖服务器，一旦服务器有问题就会受影响

　　git没有一个全局的版本号，svn有

#### 2.Git工作流程

1）在工作目录中修改某些文件

2）对修改后的文件进行快照，然后保存到暂存区域

3）提交更新，将保存在暂存区域的文件快照永久转储到Git目录中

#### 3.fetch,merge,pull的区别

pull相当于git fetch 和git merge，即更新远程仓库的代码到本地仓库，然后将内容合并到当前分支

git fetch：相当于是从远程获取最新版本到本地，不会自动merge

git merge：将内容合并到当前分支

git pull：相当于是从远程获取最新版本并merge到本地

#### 4.分支的相关命令

创建分支：git branch 分支名
查看分支：git branch
切换分支：git checkout 分支名
创建并切换分支：git checkout -b 分支名
合并分支：git merge
查看已经合并的分支/未合并的分支：git branch --merge / git branch --no-merge
删除的已合并的分支/未合并的分支：git branch -d 分支名 / git branch -D 分支名

#### 5.git merge和git rebase的区别

两个都代表合并。

git merge操作会在当前分支上生成一个新的commit节点，并保留所有的操作历史节点,会按照commit时间顺序排列

rebase操作后的历史并不会按commit时间顺序排列， 一旦分支中的提交对象发布到公共仓库，就不要对该分支进行rebase操作

#### 6.解决分支冲突合并

分支提交冲突：当分支对某文件某句话进行修改后，切换到主分支也对该文件该句话进行修改，使用git merge进行合并，需要将两个修改进行合并。此时合并产生冲突　　

　　解决方法：
　　1）git status查看冲突文件
　　2）编辑器打开冲突文件，查看内容。Git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容
　　3）修改文件内容
　　4）提交 git add file ; git commit -m ""
　　查看分支合并图 git log –graph

#### 7.Git配置相关

#### 8.Git常用命令

```
　　　　 1）从远程库中克隆项目
        git clone 项目地址

        2）工作区到暂存区
        git add 文件名字、git add . 多个文件操作

        3）暂存区到版本区
        git commit -m"注释信息"

        4）把版本区文件上传到远程仓库
        git push origin master

        5）将远程仓库的文件拉取/下载下来
        git pull origin master

        6）查看当前历史记录、查看所有的操作记录
        git log、git reflog

        7）查看文件状态
        git status

        8）查看版本信息
        git version

        9）查看配置信息
        git config --list

        10）在当前目录新建一个Git代码库（生成隐藏.git文件）
        git init

        11）版本回退
        git reset --hard 版本id

        12）查看xx文件修改了哪些内容
        git diff xx

        13）删除文件名
        git rm 文件名

        14）恢复一个文件
        git checkout

        15）关联一个远程库
        git remote add [远程仓库git地址]

        16）移除关联一个远程库
        git remote remove [远程仓库git地址]

        17）创建分支
        git branch 分支名

        18）查看分支数量
        git branch

        19）切换分支
        git checkout 分支名

        20）创建并切换分支
        git checkout -b 分支名

        21）当文件修改时切换分支
        git stash 暂存文件

        22）合并分支
        git merge

        23）合并指定分支到当前分支
        git merge [branch]

        24）查看已合并的分支
        git branch --merge

        25）查看未合并的分支
        git branch --no-merge

        26）查看远程分支
        git branch -r
       
        27）删除未合并的分支
        git branch -D 分支名

        28）删除已合并的分支
        git branch --

        29）删除远程分支
        git branch -d 分支名

        30）生成一个可供发布的压缩包
        git archive
```

#### 9.什么是fork?fork、分支、克隆之间有什么区别

fork是对存储仓库进行拷贝

clone克隆是个对某个远程仓库的本地拷贝，实际上是拷贝整个源存储仓库，包括所有历史记录和分支

branch分支是一种机制，用于处理单一存储仓库中的变更，并最终目的是用于与其他部分代码合并

#### 10.什么时候应使用“git stash”

git stash 命令把你未提交的修改保存以供后续使用，以后就可以从工作副本中进行还原

