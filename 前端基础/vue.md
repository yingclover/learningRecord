# VUE基础

### template最上层节点只能有一个

###  常用指令

> v-text:元素的innerText
>
> v-html:元素的innerHTML，能解析HTML标签
>
> v-if:判断是否插入，移除节点（在dom树上移除插入）
>
> v-else-if
>
> v-else
>
> v-show:判断是否隐藏display:none
>
> v-for:数组item,index  ( v-for='(item,index) in list'  )  对象value,key,index     

### 数据绑定

vue**单向数据**流绑定属性值 v-bind: (属性)    简写 `:(属性)` 

例子：\<input v-bind:value="name" v-bind:class="name"> 
单向数据绑定内存改变影响页面改变 v-bind就是对属性的简单赋值,当内存中值改变，还是会触发重新渲染 

vue**双向数据流 v-model** 只作用于有value属性的元素

 例子：\<input v-model="name" v-bind:class="name"> 
双向数据绑定 页面对于input的value改变，能影响内存中name变量 内存js改变name的值，会影响页面重新渲染最新值 

事件绑定v-on:事件名="表达式||函数名"    简写 `@事件名="表达式||函数名"` 

### 过滤器

过滤器就是可以对我们的数据进行添油加醋然后再显示 

过滤器有全局过滤器和组件内的过滤器 

全局过滤器Vue.filter('过滤器名',过滤方式fn ); 注意单引号

组件内的过滤器 filters:{ '过滤器名',过滤方式fn } 

```vue
<div>
    输入：<input type="text" v-model='instring'/>
    输出：{{instring|reversal}}
</div>
<script>
	new Vue({
        filters:{
            reversal(val){
                //         字符串转数组  翻转  数组转字符串
                return val.split('').reverse().join('')
            }
        }
    })
</script>
```



{{ msg | 过滤器名}} 

最终都是在过滤方式fn里面return产出最终你需要的数据 vue中的this是vue封装好给我们使用的，跟平常方法里面的this是不同的 

### 数据监听watch计算属性computed

**计算属性computed :** 

1. 支持缓存，只有依赖数据发生改变，才会重新进行计算
2. 支持异步，当computed内有异步操作时无效，无法监听数据的变化
3. computed 属性值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data中声明过的数据通过计算得到的
4. 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一或者一对一，一般用computed
5. 如果computed属性属性值是函数，那么默认会走get方法；函数的返回值就是属性的属性值；在computed中的，属性都有一个get和一个set方法，当数据变化时，调用set方法。

![img](https://img2018.cnblogs.com/blog/1402448/201908/1402448-20190809154932198-1444047098.png)

**侦听属性watch：**

1. 不支持缓存，数据变，直接会触发相应的操作；
2. watch支持异步；
3. 监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值；
4. 当一个属性发生变化时，需要执行对应的操作；一对多；

![img](https://img2018.cnblogs.com/blog/1402448/201908/1402448-20190809160441362-1201017336.png)

监听的对象也可以写成字符串的形式

![img](https://img2018.cnblogs.com/blog/1402448/201908/1402448-20190809160648619-505189772.png)

当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。这是和computed最大的区别，请勿滥用。

### 组件化开发

**创建组件**的两种方式

```javascript
var Header = { template:'模板' , data是一个函数,methods:功能,components:子组件们 }//局部声明
Vue.component('组件名',组件对象);//全局注册 等于注册加声明了
```

**组件类型** 

通用组件（例如表单、弹窗、布局类等) 

业务组件（抽奖、机器分类） 

页面组件（单页面开发程序的每个页面的都是一个组件、只完成功能、不复用） 

组件开发三步曲：声明、注册、使用

**注意：声明要在注册前面，否则会报错**

### slot插槽和ref,$parent

**slot插槽** 

slot就是子组件里给DOM留下的坑位 

<子组件>DOM</子组件> 

slot是动态的DOM 

```javascript
var Parent={
    template:`<div>我是父组件
				<slot name='hello'></slot>
				</div>`
}
new Vue({
    components:{
        Parent
    },
    template:`<div>
			<parent>
				<div slot='hello'>我是插槽内容</div>
			</parent>	
			</div>`
})
```



**ref获取子组件实例** 

识别：在子组件或元素上使用属性ref="xxxx" 

获取：this.$refs.xxxx 获取元素 

$el 是拿其DOM 

```javascript
var Child={
    template:`<div>我是子组件</div>`
}
var Parent={
    template:`<div>我是父组件
				<slot name='hello'></slot>
				<child ref='childs'></child>
				</div>`,
    components:{Child},
    mounted(){//生命周期钩子函数
        console.log(this.$refs.childs)
    }
}
new Vue({
    components:{
        Parent
    },
    template:`<div>
			<parent>
				<div slot='hello'>我是插槽内容</div>
			</parent>	
			</div>`
})
```

**$parent获取父组件实例**（可在子组件直接使用this.$parent即可）

1. 父子组件的通信

   **父传子**
   父用子的时候通过属性传递 

   子要声明props:['属性名'] 来接收 

   收到就是自己的了，随便你用 

   ​	在template中 直接用 

   ​	在js中 this.属性名 用

   ```javascript
    //子组件通过props数组接收对应属性
               var Child={
                   template:`<div>我是子组件{{sendToChild}}</div>`,
                   props:['sendToChild']
               }
               //父组件通过属性传递数据给子组件
               var Parent = {
                   template: `<div>我是父组件
                                <child sendToChild="父亲给你的"></child>
                              </div>`,
                   components: {Child}
               }
   ```

   

   **子传父**
   子组件里通过$emit('自定义事件名',变量1，变量2)触发 

   父组件@自定义事件名=‘事件名’监听
   `子组件方法里this.$emit('sendfather',val1,val2)触发自定义事件 `

   `父组件里<child @sendfather='mymethods'></child>`

   ```javascript
   //子组件通过this.$emit()传递数据
    var Child={
         template:`<div><button @click="sendToParent">子传父</button></div>`,
         methods:{
            sendToParent(){
              this.$emit('father','this msg is from son!')
            }
         }
   }
   //父组件通过对应的名字接收，并在函数里面对接收到的变量做处理
   var Parent = {
        template: `<div>我是父组件{{msg}}
                        <child @father="receive"></child>
                   </div>`,
        components: {Child},
        data() {
           return {
               msg:''
           }
        },
        methods: {
            receive(val){
               this.msg=val;
            }
        }
   }
   ```

### 非父子组件的通信

创建一个空实例（bus中央事件总线也可以叫中间组件）

利用$emit $on的触发和监听事件实现非父子组件的通信

```javascript
Vue.prototype.$bus=new Vue()//在vue上面挂载一个$bus作为中央处理组件,bus名字自定义
this.$bus.$emit('自定义事件名','传递的数据')//触发自定义事件传递数据
this.$bus.$on('自定义事件名',fn)//监听自定义事件获取数据
```

解决方案还有vuex,provide/inject是解决同根往下派发，本地存储也可以进行非父子组件之间的通信

```javascript
Vue.prototype.$bus=new Vue()
var MyHeader={
    template: `<div>我是头部{{headerMsg}}</div>`,
    data() {
       return {
           headerMsg:'我是头部信息'
       };
    },
    created(){
       // var self=this如果不做该处理，下面一个this指向bus，而bus是空实例，当然也可用箭头函数代替
       // this.$bus.$on('toHead',function (val) {
       //     self.headerMsg=val
       // })
       this.$bus.$on('toHead',val=>{
           this.headerMsg=val
       })
    }
}
var MyFooter={
    template: `<div>我是尾部<button @click="sendToHead">我要跟头部通信</button></div>`,
    methods:{
         sendToHead(){
            this.$bus.$emit('toHead','我是底部的数据')
         }
    }
}
```

### Vue的生命周期

![1563939098277](C:\Users\Ying\AppData\Roaming\Typora\typora-user-images\1563939098277.png)

![2019-06-23-05-03-43](https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/d1279e6d6327d23f2e97bb0bf4950b47.png)

- 需要频繁的创建和销毁组件 

  比如页面中部分内容显示与隐藏，但是用的是v-if 

- 组件缓存

  内置组件中 需要用<keep-alive></keep-alive>包裹组件

  被其包裹的组件，在v-if=false的时候，**不会销毁，而是停用** 

  v-if="true" 不会创建,而是激活 

  避免频繁创建组件对象的性能损耗 

  组件的激活和停用 activated 和 deactivated 

- 成对比较

  created 和 beforeCreate ：A 可以操作数据 B 数据没有初始化 

  mounted 和 beforeMount ：A 可以操作DOM B 还未生成DOM 

  updated 和 beforeUpdate ：A 可以获取最终数据 B 可以二次修改 

  destroyed 和 beforeDestroy ：性能调优：频繁销毁创建的组件使用内置组件包裹

  ```html
   <script>
              var Test={
                  template: `<div>我是Test组件{{msg}}<br>
                               <button @click="msg+='1'">数据更新</button>
                             </div>`,
                  data() {
                      return {
                          msg:'Hello vue!'
                      }
                  },
                  //组件创建前
                  beforeCreate(){
                      console.log('组件创建前')
                      console.log(this.msg)
                  },
                  //组件创建后
                  created(){
                      console.log('组件创建后')
                      console.log(this.msg)
                  },
                  //dom挂载前
                  beforeMount(){
                      console.log('dom挂载前')
                      console.log(document.body.innerHTML)
                  },
                  //dom挂载后
                  mounted(){
                      console.log('dom挂载后')
                      console.log(document.body.innerHTML)
                  },
                  //基于数据更新前
                  beforeUpdate(){
                      console.log('数据更新前')
                      console.log(document.body.innerHTML)
                  },
                  //基于数据更新后
                  updated(){
                      console.log('数据更新后')
                      console.log(document.body.innerHTML)
                  },
                  //销毁前
                  beforeDestroy(){
                      console.log('销毁前')
                  },
                  //销毁后
                  destroyed(){
                      console.log('销毁后')
                  },
                  //组件停用
                  deactivated(){
                      console.log('组件停用')
                  },
                  //组件激活
                  activated(){
                      console.log('组件激活')
                  }
              }
              new Vue({
                  el:'#app',
                  components:{
                    Test,
                  },
                  template: `
                      <div>
                          <keep-alive><test v-if="testShow"></test></keep-alive><br>
                          <button @click="clickBtn">销毁组件</button>
                      </div>
                  `,
                  data(){
                      return {
                          testShow:true
                      }
                  },
                  methods:{
                      clickBtn(){
                          this.testShow=!this.testShow
                      }
                  }
              })
          </script>
  ```

### 路由的跳转原理

单页应用的路由模式有两种 

 #### 哈希模式（利用hashchange 事件监听 url的hash 的改变）

不会刷新页面！

```HTML
<a href="#/login">登录</a>
<a href="#/register">注册</a>
    <div id="app">   </div>
        <script src="vue.js"></script>
        <script>
            var appDiv=document.getElementById('app')
            window.addEventListener('hashchange', function(e) {
                console.log(location.hash)
                switch (location.hash) {
                    case '#/login':
                        appDiv.innerHTML='我是登录页面' ;
                        break;
                    case '#/register':
                        appDiv.innerHTML='我是注册页面';
                        break;
                }
            })
        </script>
```



#### history模式（使用此模式需要后台配合把接口都打到我们打包后的index.html上）

利用了 HTML5 History Interface 中新增的 `pushState()` 和 `replaceState()`方法。

这两个方法应用于浏览器的历史记录栈，在当前已有的 `back`、`forward`、`go` 的基础之上，它们提供了对历史记录进行修改的功能。只是当它们执行修改时，虽然改变了当前的 URL，但**浏览器不会立即向后端发送请求**。

#### 比较

history优势：

1. `pushState()` 设置的新 URL 可以是与当前 URL 同源的任意 URL；而 `hash` 只可修改 `#` 后面的部分，因此只能设置与当前 URL 同文档的 URL；
2. `pushState()` 设置的新 URL 可以与当前 URL 一模一样，这样也会把记录添加到栈中；而 `hash` 设置的新值必须与原来不一样才会触发动作将记录添加到栈中；
3. `pushState()` 通过 `stateObject` 参数可以添加任意类型的数据到记录中；而 `hash` 只可添加短字符串；
4. `pushState()` 可额外设置 `title` 属性供后续使用。

history劣势：

1. `hash` 模式下，仅 `hash` 符号之前的内容会被包含在请求中，如 `http://www.abc.com`，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误。

2. `history` 模式下，前端的 URL 必须和实际向后端发起请求的 URL 一致，**因为怕刷新**。如 `http://www.abc.com/book/id`。如果后端缺少对 `/book/id` 的路由处理，将返回 404 错误。[Vue-Router 官网](https://link.juejin.im?target=https%3A%2F%2Frouter.vuejs.org%2Fzh-cn%2Fessentials%2Fhistory-mode.html)里如此描述：**“不过这种模式要玩好，还需要后台配置支持……所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。”**

   pushState,replaceState两个方法,这两个方法接收三个参数:stateObj,title,url


路由守卫

5. 主要是简单介绍一下，路由守卫主要用于检验是否登录了，没登录就跳转到登录页面不让他 在其他页面停留，但是现在这种处理主要的都用请求的全局拦截(通过后台的状态码)来做了。大致了解一下路由 守卫即可

   ```javascript
const router = new VueRouter({ ... } 
   //前置的钩子函数 最后要执行next（）才会跳转 
   router.beforeEach((to, from, next) => {  
       // ... 
   }) 
   //后置的钩子函数 已经跳转了不需要
   next router.afterEach((to, from) => {  
       // ... 
   })
   ```
   
   ```javascript
mounted(){
      router.beforeEach((to,from,next)=>{
      console.log(to)
      if(to.path=='/nav.index'){
         next()
      }else{
         setTimeout(function () {
              next()
         },2000)
      }
      })
   }
   ```

### vue的异步更新

在vue里面，如果改变一个值后立即去打印它，那么打印得到的不是更新的值，还是以前的值，因为DOM还没有更新，vue中提供nextTick()方法，可是实现实时获取新的值。

![img](https://user-gold-cdn.xitu.io/2018/8/29/165821ca4d06f6c1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

模拟实现

```javascript
// 存储nextTick
let callbacks = [];
let pending = false;

function nextTick (cb) {
    callbacks.push(cb);

    if (!pending) {
        // 代表等待状态的标志位
        pending = true;
        setTimeout(flushCallbacks, 0);
    }
}

function flushCallbacks () {
    pending = false;
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
        copies[i]();
    }
}
```



### 面试提问

#### 1.对MVVM开发模式的理解

- MVVM分为Model、View、ViewModel三者 

  - Model：代表数据模型，数据和业务逻辑都是在Model层中定义 
  - View：代表UI视图，负责对数据的展示 
  - ViewModel：负责监听Model中数据的改变并控制视图的更新，处理用户交互操作 

  Model和View并无直接关联，而是通过ViewModel来进行联系的，Model和ViewModel之间有着双向数据绑定 的联系。因此当Model中的数据改变时会触发View层的刷新，View中由于用户交互操作而改变的数据也会在 Model中同步。 

  这种模式实现了Model和View的数据自动同步，因此开发者只需要专注对数据的维护操作即可，而不需要自己 操作dom。 

- 优缺点

  优点:

  1. **分离视图（View）和模型（Model）,降低代码耦合，提高视图或者逻辑的重用性**: 比如视图（View）可以独立于Model变化和修改，一个ViewModel可以绑定不同的"View"上，当View变化的时候Model不可以不变，当Model变化的时候View也可以不变。你可以把一些视图逻辑放在一个ViewModel里面，让很多view重用这段视图逻辑
  2. 提高可测试性: ViewModel的存在可以帮助开发者更好地编写测试代码
  3. **自动更新dom**: 利用双向绑定,数据更新后视图自动更新,让开发者从繁琐的手动dom中解放

  缺点:

  1. **Bug很难被调试**: 因为使用双向绑定的模式，当你看到界面异常了，有可能是你View的代码有Bug，也可能是Model的代码有问题。数据绑定使得一个位置的Bug被快速传递到别的位置，要定位原始出问题的地方就变得不那么容易了。另外，数据绑定的声明是指令式地写在View的模版当中的，这些内容是没办法去打断点debug的
  2. 一个大的模块中model也会很大，虽然使用方便了也很容易保证了数据的一致性，当时长期持有，不释放内存就造成了花费更多的内存
  3. 对于大型的图形应用程序，视图状态较多，ViewModel的构建和维护的成本都会比较高

#### 2.关于组件通信了解多少，怎么完成组件通信

- 父传子用 props传递 
- 子传父用$emit传递 
- 非父子之间的传值 建立一个空实例进行传值，中央事件总线机制 
- 祖孙之间的传值可以利用provide inject模式 
- vuex可以处理上述每一种情况

#### 3.单页面应用

- 单页面应用首屏加载速度慢，出现白屏时间过长问题怎么处理
  - 将公用的JS库通过script标签在index.html进行外部引入，减少我们打包出来的js文件的大小，让浏览 器并行下载资源文件，提高下载速度 
  - 在配置路由的时候进行路由的懒加载，在调用到改路由时再加载次路由相对应的js文件 
  - 加一个首屏loading图或骨架屏，提高用户的体验 
  - 尽可能使用CSS Sprites和字体图标库 
  - 图片的懒加载等 
- 从输入网址到网页渲染完成经历了什么
  - 输入网址按回车键或点击跳转 
  - 发送到DNS服务器进行DNS解析，获取到我们对应web服务器对应的ip地址 
  - 与Web服务器建立TCP连接 
  - 浏览器向web服务器发送http请求 
  - Web服务器进行响应请求并返回指定的url数据（当然这里也可能是错误信息或者重定向到新的url地址 等） 
  - 浏览器下载web服务器返回的数据及解析html源文件 
  - 根据文件生成DOM树和样式树合成我们的渲染树，解析js，最后渲染我们的页面然后显示出来 

#### 4.修改数据视图试图不更新情况该怎么处理和如何监听数据

- 关于修改了数据，视图不更新的理解和处理方式 

  **Vue中给data中的对象属性添加一个新的属性时会发生什么**

  经过打印发现数据是已经改变了，但是由于在Vue实例创建时， 新添加的属性并未声明，因此就没有 被Vue转换为响应式的属性，自然就不会触发视图的更新，这时就需要使用Vue的全局api——> $set() 。$set()使用方法： $set(需要修改的对象，"对象的属性",值) 

  ```html
  <!DOCTYPE html>
  <html>
  <head>
  	<title>更改数据视图不更新</title>
  </head>
  <body>
  	<div id="app">
  		<ul>
  			<li v-for="(item,index) in obj" :key='index'>{{item}}</li>
  		</ul>
  		<button @click='add'>添加新属性d</button>
  	</div>
  
  
  	<script type="text/javascript" src="vue.js"></script>
  	<script type="text/javascript">
  		
  		new Vue({
  			el:'#app',
  			data(){
  				return {
  					obj:{
  						'a':'我是a',
  						'b':'我是b',
  						'c':'我是c',
  					}
  				}
  			},
  			methods:{
  				add(){
  					// this.obj.d='我是d'//这样写当点击按钮时，数据更新，但视图不更新，需要下面这种写法才可
  					this.$set(this.obj,'d','我是d')
  					console.log(this.obj)
  				}
  			}
  		})
  	</script>
  </body>
  </html>
  ```

  

- 在vue里面你如何做数据的监听 

  - watch里面监听 

    第一种写法

    ```vue
    watch:{   
    	obj(newval,oldval){
           console.log(newval,oldval) 
        },   
    } 
    ```

    第二种写法可设置deep为true对数据进行深层遍历监听

    ```javascript
    watch:{   
        obj:{   
            handler(newval,oldval){   	                     console.log(222)                             console.log(newval,oldval)   
            },  deep:true  
         }   
    } 
    ```

  - computed 里面监听

    computed里面的依赖改变时，所计算的属性或作出事实的改变

#### 5.angular和vue更喜欢哪个，为什么？

- vue简单易学,而angular的上手较高；

- vue专注于View层，主打的是快速便捷，而angularJS功能则比较全面，当然体量也较大，相对没有vue那么便捷；

- angularJS的所有指令和方法都是绑定在$scope上的，而vueJS是new出来一个实例，所有的方法和指令都在这个实例上，一个页面上可以有多个vue实例，但是angularJS的对象只能有一个；

- vueJS一般用于移动端的开发，而angularJS一般应用于大型的项目

#### 6.angular 的数据绑定采用什么机制？详述原理

采用了**脏检查**机制。双向数据绑定是 AngularJS 的核心机制之一。当 view 中有任何一个数据变化时，都会更新到 model 中。如果 model 中的数据有变化时，view 也会同步更新，显然，这需要一个监控。

**原理**：Angular 在 scope 模型上设置了一个监听队列，这个监听队列可以用来监听数据变化并更新 view 。每次绑定一个东西到 view 上时， AngularJS 就会往 $watch 队列里插入一条 $watch ，用来检测它监视的 model 里是否有变化的东西。当浏览器接收到可以被 angular context 处理的事件时， $digest 循环就会触发，遍历所有的 $watch ，最后更新 dom。

#### 7.typescript优势？

- 类型检查

  在Typescript里面是运行为变量指定类型的，如果类型不匹配，编译时就会报错，然后可以看到具体的错误，在开发阶段减少犯错误的几率。

- 语法提示

  在IDE里面去编写TypeScript的代码时，IDE会根据你当前的上下文，在编辑器的支持下，有智能提示，不必担心方法、属性、参数被拼错，这个特性会大大提升你的开发效率

- 重构

  重构是说你可以很方便的去修改你的变量或者方法的名字或者是文件的名字，当你做出这些修改的时候，IDE在使用到该变量的地方给出提示，不用怕忘记改哪，这个特性一个是会提高你的开发效率，另一个是可以很容易的提升你的代码质量

代码补全、接口提示、跳转到定义、重构等

- 可以使用最新的 ES2017 语言特性
- 非常精准的代码提示
- 编辑代码时具有即时错误检查功能，可以避免诸如输错函数名这种明显的错误
- 非常精准的代码重构功能
- 非常方便的断点调试功能
- 编辑器集成调试功能

#### 8.轮播图组件实现原理



#### 9.为什么要使用vuex有什么好处，可不可以不用vuex

![img](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190409153301.jpg)

**vuex的属性**：

只用来读取的状态集中放在store中； 改变状态的方式是提交mutations，这是个同步的事物； 异步逻辑应该封装在action中。

- state

  - Vuex就是一个仓库，仓库里面放了很多对象。其中state就是数据源存放地，对应于一般Vue对象里面的data
  - state里面存放的数据是响应式的，Vue组件从store中读取数据，若是store中的数据发生改变，依赖这个数据的组件也会发生更新
  - 它通过mapState把全局的 state 和 getters 映射到当前组件的 computed 计算属性中

- mutation

  mutations定义的方法动态修改Vuex 的 store 中的状态或数据。

- getter

  - getters 可以对State进行计算操作，它就是Store的计算属性

  - 虽然在组件内也可以做计算属性，但是getters 可以在多组件之间复用

  - 如果一个状态只在一个组件内使用，是可以不用getter

- action

  actions可以理解为通过将mutations里面处里数据的方法变成可异步的处理数据的方法，简单的说就是异步操作数据。action提交的是mutation

- module

  Module 可以让每一个模块拥有自己的state、mutation、action、getters,使得结构非常清晰，方便管理。

**好处：**

- 多层嵌套的组件、兄弟组件间的状态会更好管理维护。
- 缓存一些当前要使用请求远程或本地的数据集（刷新后会自己销毁）。
- 有了第二条，就可以减少向服务器的请求，节省资源。如果你的用户足够多，那么每多出一个请求，对公司来说，都是一大笔钱。
- 对开发者来说，如果你的项目足够复杂，团队的规模也不仅是一个人，数据集中处理更利于程序的稳定和维护。

**不用vuex？**

对于简单的项目，可以不用vuex，用vue提供的事件总线机制就可以。

#### 10.vue-router原理

https://zhuanlan.zhihu.com/p/37730038

**hash模式：**在浏览器中符号“#”，#以及#后面的字符称之为hash，用window.location.hash读取；
特点：hash虽然在URL中，但不被包括在HTTP请求中；用来指导浏览器动作，对服务端安全无用，hash不会重加载页面。
hash 模式下，仅 hash 符号之前的内容会被包含在请求中，如 [http://www.xxx.com](http://www.xxx.com/)，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误。

**history模式：**history采用HTML5的新特性；且提供了两个新方法：pushState（），replaceState（）可以对浏览器历史记录栈进行修改，以及popState事件的监听到状态变更。
history 模式下，前端的 URL 必须和实际向后端发起请求的 URL 一致，如 http://www.xxx.com/items/id。后端如果缺少对 /items/id 的路由处理，将返回 404 错误。**Vue-Router 官网里如此描述：**“不过这种模式要玩好，还需要后台配置支持……所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。”

路由钩子函数

**beforeEach**主要有3个参数to，from，next：

**to**：route即将进入的目标路由对象，

**from**：route当前导航正要离开的路由

**next**：function一定要调用该方法resolve这个钩子。执行效果依赖next方法的调用参数。可以控制网页的跳转。

#### 11.自适应布局是什么？跟响应式布局有什么区别？

自适应：自适应是为了解决如何才能在不同大小的设备上呈现相同的网页

响应式：每个屏幕分辨率下面会有一个布局样式，即元素位置和大小都会变

流式布局：屏幕分辨率变化时，页面里元素的大小会变化而但布局不变

响应式与自适应的原理是相似的，都是检测设备，根据不同的设备采用不同的css，而且css都是采用的百分比的，而不是固定的宽度，不同点是响应式的模板在不同的设备上看上去是不一样的，会随着设备的改变而改变展示样式，它可以自动识别屏幕宽度、并做出相应调整的网页设计，布局和展示的内容可能会有所变动。而自适应不会，所有的设备看起来都是一套的模板，不过是长度或者图片变小了，不会根据设备采用不同的展示样式。

#### 12.预处理语言的好处

- 变量：和其他语言一样，可避免多处修改

- 嵌套：选择器之间的嵌套可以使代码更加简洁，层级关系清晰

- 运算：对变量的操控更加灵活值和值建立关联

- 函数：比如颜色的运算函数，类型判断函数，数值计算函数等

- mixin混合：将通用属性集为一个选择器，然后再另一个选择器里去调用这些属性，class之间可以轻松引入和继承，解决代码复用

- 扩展@import指令的能力，通过编译环节将切分后的文件重新合并为一个大文件，只产出一个css文件。这一方面解决了大文件不便维护的问题，另一方面也解决了一堆小文件在加载时的性能问题。

- 模块化：不仅更利于代码复用，同时也提高了源码的可维护性。

  ![1563957386264](C:\Users\Ying\AppData\Roaming\Typora\typora-user-images\1563957386264.png)

#### 13.常用的webpack插件，loader

https://juejin.im/post/5c6cffde6fb9a049d975c8c1

#### 14.为什么要使用easy-mock

首先，在前后端分离的现在，为了提高开发效率，前端在后台接口给出之前需要自己mock数据调试，当然可以在本地mock数据，比如vue的配置文件里，但是每当修改接口就要重启服务，很费时间，效率低下，而easy-mock是一个在线mock平台，可视化，并且能快速生成模拟数据，写法跟mock.js一样，能在线编辑，格式化数据，也支持函数，能获取全部请求头，可以像js里面一样写逻辑，支持动态响应，同时，接口写好之后，能马上在线测试

#### 15.其他问题

**css只在当前组件起作用**
答：在style标签中写入**scoped**即可 例如：<style scoped></style>

**v-if 和 v-show 区别**
答：v-if按照条件是否渲染，即是否创建dom节点，而v-show是创建dom节点，但是display的block或none；

**$route和$router的区别**
答：$route是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。而$router是“路由实例”对象包括了路由的跳转方法，钩子函数等。

**vue.js的两个核心是什么？**
答：数据驱动、组件系统

**vue几种常用的指令**
答：v-for 、 v-if 、v-bind、v-on、v-show、v-else、v-model

**vue常用的修饰符？**
答：.prevent: 提交事件不再重载页面；.stop: 阻止单击事件冒泡；.self: 当事件发生在该元素本身而不是子元素的时候会触发；.capture: 事件侦听，事件发生的时候会调用

**v-on 可以绑定多个方法吗？**
答：可以

**vue中 key 值的作用？**
答：当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。key的作用主要是为了高效的更新虚拟DOM。

**什么是vue的计算属性？**
答：在模板中放入太多的逻辑会让模板过重且难以维护，在需要对数据进行复杂处理，且可能多次使用的情况下，尽量采取计算属性的方式。好处：①使得数据处理结构清晰；②依赖于数据，数据更新，处理结果自动更新；③计算属性内部this指向vm实例；④在template调用时，直接写计算属性名即可；⑤常用的是getter方法，获取数据，也可以使用set方法改变数据；⑥相较于methods，不管依赖的数据变不变，methods都会重新计算，但是依赖数据不变的时候computed从缓存中获取，不会重新计算。

**vue等单页面应用及其优缺点**
答：优点：Vue 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件，核心是一个响应的数据绑定系统。MVVM、数据驱动、组件化、轻量、简洁、高效、快速、模块友好。
缺点：不支持低版本的浏览器，最低只支持到IE9；不利于SEO的优化（如果要支持SEO，建议通过服务端来进行渲染组件）；第一次加载首页耗时相对长一些；不可以使用浏览器的导航按钮需要自行实现前进、后退。

**怎么定义 vue-router 的动态路由? 怎么获取传过来的值**
答：在 router 目录下的 index.js 文件中，对 path 属性加上 /:id，使用 router 对象的 params.id 获取。

### 项目难点

#### 1.首屏加载慢

- 首先考虑到的是路由懒加载，访问到当前页面才加载

  >  component: () => import('./views/Nav.vue')

- 对于导航分类页的小图标，采用雪碧图，减少http请求

  雪碧图利用在线生成器生成，对每一个li下的span标签利用伪类设置图片定位

  ```stylus
  span
      background url('tab.png') no-repeat
  li:first-child>span
  	background-position -10px -283px
  li:nth-child(2)>span
  	background-position -10px -190px
  li:nth-child(3)>span
  	background-position -10px -10px
  li:nth-child(4)>span
  	background-position -10px -55px
  li:nth-child(5)>span
  	background-position -10px -236px
  li:nth-child(6)>span
  	background-position -10px -100px
  li:nth-child(7)>span
  	background-position -10px -145px
  ```

#### 2

#### 3.

#### 4



