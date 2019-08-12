## JS异步解决方案

### 前言

#### 单线程

JS是单线程的，即一次只能完成一个任务，若有多个任务则需排队逐个执行，前一个任务完成，再执行后一个任务，异步编程对JS来说十分重要，所谓异步，就是一个任务不是连续完成的，可以理解为该任务被分成两段，先执行第一段，然后再执行其他任务，等做好准备之后再回过头执行第二段。

同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

#### 事件循环(Event Loop)

（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

（4）主线程不断重复上面的第三步，这就是事件循环。

### 1.回调函数

回调函数时最基本的一种异步实现。

回调函数就是一个参数，将这个函数作为参数传到另一个函数里面，当那个函数执行完之后，再执行传进去的这个函数。这个过程就叫做回调。

```javascript
//定义主函数，回调函数作为参数
function A(callback) {
    callback();  
    console.log('我是主函数');      
}
//定义回调函数
function B(){
    setTimeout("console.log('我是回调函数')", 3000);//模仿耗时操作  
}
//调用主函数，将函数B传进去
A(B);
//输出结果
我是主函数
我是回调函数
```

主函数不用等待回调函数执行完，可以接着执行自己的代码。所以一般回调函数都用在耗时操作上面。比如ajax请求，比如处理文件,图片加载等。

缺点是整个程序都要变成事件驱动型，运行流程会变得很不清晰，容易出现回调地狱(回调函数之间有依赖性，多个嵌套)

### 2.事件监听

采用事件驱动模式，异步任务的执行不取决于代码的顺序，而取决于某个事件是否发生。

首先，为f1绑定一个事件（这里采用的jQuery的写法）。

`f1.on('done', f2);`

上面这行代码的意思是，当f1发生done事件，就执行f2。然后，对f1进行改写：

```javascript
function f1(){
　　　　setTimeout(function () {
　　　　　　// f1的任务代码
　　　　　　f1.trigger('done');
　　　　}, 1000);

　　}
```

f1.trigger('done')表示，执行完成后，立即触发done事件，从而开始执行f2。

这种方法的优点是比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，而且可以"去耦合"，有利于实现模块化，缺点是整个程序都要变成事件驱动型，运行流程会变得很不清晰。

### 3.发布/订阅

我们假定，存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"（publish）一个信号，其他任务可以向信号中心"订阅"（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做"**发布/订阅模式**"（publish-subscribe pattern），又称"**观察者模式**")（observer pattern）。、

首先，f2向"信号中心"jQuery订阅"done"信号。

jQuery.subscribe("done", f2);

然后，f1进行如下改写：

```javascript
function f1(){
　　　　setTimeout(function () {
　　　　　　// f1的任务代码
　　　　　　jQuery.publish("done");
　　　　}, 1000);
　　}
```

jQuery.publish("done")的意思是，f1执行完成后，向"信号中心"jQuery发布"done"信号，从而引发f2的执行。

此外，f2完成执行后，也可以取消订阅（unsubscribe）。　　jQuery.unsubscribe("done", f2);

这种方法的性质与"事件监听"类似，但是明显优于后者。因为我们可以通过查看"消息中心"，了解存在多少信号、每个信号有多少订阅者，从而监控程序的运行。

### 4.Promise

Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。
`then`方法是Promise原型上的方法，Promise.prototype.then()，then方法接受两个参数，第一个参数是Resolved状态的回调函数，第二个参数（可选）是Rejected状态的回调函数

![img](https://user-gold-cdn.xitu.io/2019/1/6/16821592df2d2d58?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**链式调用**

- 每次调用返回的都是一个新的Promise实例(这就是then可用链式调用的原因)

- 如果then中返回的是一个结果的话会把这个结果传递下一次then中的成功回调

- 如果then中出现异常,会走下一个then的失败回调

- **在 then中使用了return，那么 return 的值会被Promise.resolve() 包装**

- then中可以不传递参数，如果不传递会透到下一个then中

- catch 会捕获到没有捕获的异常

##### Promise的使用

在使用Promise实现有序执行异步的基本格式如下：

```javascript
//defined Promise async function
function asyncFun(){
    return new Promise((reslove,reject)=>{
        if(reslove){
            reslove(/*reslove parameter*/);
        }else{
            reject(new Error(/*Error*/));
        }
    })
}

//use Promise&then
asyncFun().then(/*function*/).then(/*function*/)...
```

`reslove`方法的参数就是要传给回调函数的参数，即`resolve`将运行得到的结果传出来，而`then`接受该参数给回调继续执行后面的，如果这个`then`的中的函数还会返回Promise，则会重复执行该步骤直到结束。

`reject`方法的参数一般是包含了reject原因的Error对象。`reject`和`resolve`一样，也会将自己的参数传出去，接收该参数的是`then`的第二个fun或者是`catch`。其实`.catch`只是`Promise.then(onFulfilled,onRejected)`的别名而已。

##### 快捷创建Promise

一般情况下我们会使用`new Promise`来创建prmise对象，除此之外我们也可以使用`Promise.reslove`和`Promise.reject`来直接创建，例如`Promise.resolve(42)`可以认为是以下代码的语法糖

```javascript
new Promise((reslove)=>{
    reslove(42);
});
```

这段代码可以让这个Promise对象立即进入resolve状态，并将42传递给后面then里所指定的`onFulfilled`函数。此外`Promise.resolve`还有一个作用，就是将非Promise对象转换为Promise对象。

`Promise.reject(value)`与之类似。

##### Promise链式调用

###### 各个任务独立

如果想实现Promise的链式调用，要求每次链式调用都返回Promise。所以**每个异步执行都需要使用Promise包装**，这里有一个**误区：**每个`then`，`catch`会返回也会反回一个新的Promise，但是**这仅仅实现了链式调用**，如果不将异步操作用Promise进行包装，依然不行。下面的例子就是**错误的**。

```javascript
function pro1(){
    return new Promise((reslove,reject)=>{
        if(reslove){
            setTimeout(()=>{console.log(1000)},1000);
            reslove();
        }
    })
}

function pro2(){
    setTimeout(()=>{console.log(2000)},2000);
}

function pro3(){
    setTimeout(()=>{console.log(3000)},3000);
}

pro1().then(pro2).then(pro3);
//or
function pro1(){
    setTimeout(()=>{console.log(1000)},1000);
}

Promise.resolve().then(pro1).then(pro2).then(pro3);
```

上面的写法有两处错误：

1. 虽然在第一个函数返回了一个Promise，但是由于后面的异步操作并没有被Promise包装，所以并不会起任何作用，**正确的做法是每一个异步操作都要被Promise包装**
2. `resolve()`调用的时机不对，`resolve`需要在异步操作执行完成后调用，所以**需要写在异步操作内部**，如果像上面那样写在异步操作外面，则不会起作用。

所以正确写法如下：

```javascript
//直接返回Promise
function pro1(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{console.log(1000);resolve();},1000);
        
    })
}
function pro2(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{console.log(5000);resolve();},5000);
        
    });
}
function pro3(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{console.log(500);resolve();},500);
    })
}
pro1().then(pro2).then(pro3);

//or使用Promise.reslove()

function pro1(cb){setTimeout(()=>{console.log(1000);cb()},1000)};
function pro2(cb){setTimeout(()=>{console.log(3000);cb()},3000)};
function pro3(cb){setTimeout(()=>{console.log(500);cb()},500)};


Promise.resolve()
       .then(()=>new Promise(resolve=>pro1(resolve)))
       .then(()=>new Promise(resolve=>pro2(resolve)))
       .then(()=>new Promise(resolve=>pro3(resolve)));
```

###### 任务之间需要参数传递

在Promise的链式调用中，有可能各个task之间存在相互依赖，例如TaskA想给TaskB传递一个参数，像下面这样：

```javascript
/*例1.使用Promise.resolve()启动*/
let task1 = (value1)=>value1+1;
let task2 = (value2)=>value2+2;
let task3 = (value3)=>{console.log(value3+3)};

Promise.resolve(1).then(task1).then(task2).then(task3);//console => 7


/*例2.普通的返回一个Promise*/
function task1(value1){
  return new Promise((resolve,reject)=>{
    if(resolve){
      resolve(value1+1);
    }else{
      throw new Error("throw Error @ task1");
    }
  });
}

function task2(value2){
  return new Promise((resolve,reject)=>{
    if(resolve){
      resolve(value2+2);
    }else{
      throw new Error("throw Error @ task1");
    }
  });
}
function task3(value3){
  return new Promise((resolve,reject)=>{
    if(resolve){
      console.log(value3+3);
    }else{
      throw new Error("throw Error @ task1");
    }
  });
}

task1(1).then(task2).then(task3);//console => 7
```

关于`reslove`与`reject`有以下两点说明：

- `reslove`函数的作用是将Promise对象的状态从“未完成”变为“成功”（即从Pending变为Resolved），在异步操作成功时调用，并将**异步操作的结果作为参数传递出去**；
- `reject`函数的作用是将Promise对象状态从“未完成”变为“失败”（即从Pending变为Rejected），在异步操作失败时候调用，并将**异步操作报出的错误作为参数传递出去**；

所以从上面的例子和它们的用法可以看出，如果想要传递给后面task有两种方法：

- 如果使用`Promise.resolve()`启动Promise，则像例1中那样在需要传递的参数前面加`return`即可。
- 如果是利用Promise包装了任务，则把想要传递给下一个task的参数传入`resolve()`即可。

**特别说明：如果需要resolve()往后传递多个参数，不能直接写resolve(a1,a2,a3)，这样只能拿到第一个要传的参数，需要以数组或对象去传递**

如果用Promise，会使得代码量加大，因为每一个异步都要被Promise封装，但是这样换来的却是更加容易的维护，所以还是值得的，当代码写完后，我们很容易就能看出代码的执行过程，相对于原来用嵌套去写要直观许多，而如果想要解决Promise的代码量过大的问题，我们可以使用**Generator函数**，另外，在ES7标准中推出了更加牛的异步解决方案**Async/Await**

### 5.Generator

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同，Generator 最大的特点就是可以控制函数的执行。

- 语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。
- **Generator 函数除了状态机，还是一个遍历器对象生成函数**。
- **可暂停函数, yield可暂停，next方法可启动，每次返回的是yield后的表达式结果**。
- yield表达式本身没有返回值，或者说总是返回undefined。**next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值**。

栗子：

```javascript
function *foo(x) {
  let y = 2 * (yield (x + 1))
  let z = yield (y / 3)
  return (x + y + z)
}
let it = foo(5)
console.log(it.next())   // => {value: 6, done: false}
console.log(it.next(12)) // => {value: 8, done: false}
console.log(it.next(13)) // => {value: 42, done: true}
```

##### 自动执行

###### Promise对象

**将异步操作包装成 Promise 对象，用 then 方法交回执行权。**

```javascript
function *gen(){
    //异步代码
    var r1 = yield fetchData('https://api.github.com/users/github');//返回的是一个遍历器对象
    ...
}
function run(gen){
    var g=gen();
    function next(data){
        var result=g.next(data);
        if(result.done) return;
        result.value.then(function(data){
            next(data);
        })
    }
    next();
}
run(gen)
```

只要 yield 后跟着一个 Promise 对象，我们就可以利用这个 run 函数将 Generator 函数自动执行。

###### 回调函数

**将异步操作进行包装，暴露出回调函数，在回调函数里面交回执行权。**

该自动执行方法的前提是每一个异步操作都要是Thunk函数，也就是说跟在yield后面的必须是Thunk函数。

```javascript
//模拟异步请求
function fetchData(url) {
    return function(cb){
        setTimeout(function(){
            cb({status: 200, data: url})
        }, 1000)
    }
}
//
function run(gen) {
    var g = gen();
    function next(data) {//Thunk回调函数
        var result = g.next(data);
        if (result.done) return;
        result.value(next);
    }
    next();
}
run(gen);
```

结合上面两种方法，支持 yield 后跟回调函数或者 Promise 对象,启动器函数如下：

```javascript
function run(gen) {
    var gen = gen();
//判断 result.value 是否是 Promise，是就添加 then 函数，不是就直接执行
    function next(data) {
        var result = gen.next(data);
        if (result.done) return;

        if (isPromise(result.value)) {
            result.value.then(function(data) {
                next(data);
            });
        } else {
            result.value(next)
        }
    }

    next()
}

function isPromise(obj) {
    return 'function' == typeof obj.then;
}

module.exports = run;
```

###### co

co是一个用于自动执行Generator函数的模块

```javascript
// yield 后是一个 Promise
var fetch = require('node-fetch');
var co = require('co');

function* gen() {
    var r1 = yield fetch('https://api.github.com/users/github');
    var json1 = yield r1.json();
    var r2 = yield fetch('https://api.github.com/users/github/followers');
    var json2 = yield r2.json();
    var r3 = yield fetch('https://api.github.com/users/github/repos');
    var json3 = yield r3.json();

    console.log([json1.bio, json2[0].login, json3[0].full_name].join('\n'));
}

co(gen);
// yield 后是一个回调函数
var co = require('co');

function fetchData(url) {
    return function(cb) {
        setTimeout(function() {
            cb(null, { status: 200, data: url })
        }, 1000)
    }
}

function* gen() {
    var r1 = yield fetchData('https://api.github.com/users/github');
    var r2 = yield fetchData('https://api.github.com/users/github/followers');

    console.log([r1.data, r2.data].join('\n'));
}

co(gen);
```

### 6.Async/await

ES2017 标准引入了 async 函数，使得异步操作变得更加方便。

- 在function前面加async关键字表示这是一个async函数
- async的返回值是一个Promise对象，你可以用then方法添加回调函数
- await后面跟着的应该是一个promise对象，如果不是，会被转成一个立即resolve的Promise对象
- await表示在这里等待promise返回结果了，再继续执行。

在异步处理上，async 函数就是 Generator 函数的语法糖。async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

```javascript
async function fn(args) {
  // ...
}
// 等同于
function fn(args) {
  return spawn(function* () {//spawn是自动执行器
    // ...
  });
}
```

`async` 函数内部就是被编译为 `Generator` 执行的。`run` 函数本身会返回一个 `Promise`，用于使主调函数得知 `run` 函数什么时候执行完毕。所以 `run()` 后面也可以 `.then(xxx)`，甚至直接 `await run()`。

#### 代码更加简洁

```javascript
/**
 * 示例一
 */
function fetch() {
  return (
    fetchData()
    .then(() => {
      return "done"
    });
  )
}

async function fetch() {
  await fetchData()
  return "done"
};
/**
 * 示例二
 */
function fetch() {
  return fetchData()
  .then(data => {
    if (data.moreData) {
        return fetchAnotherData(data)
        .then(moreData => {
          return moreData
        })
    } else {
      return data
    }
  });
}

async function fetch() {
  const data = await fetchData()
  if (data.moreData) {
    const moreData = await fetchAnotherData(data);
    return moreData
  } else {
    return data
  }
};
/**
 * 示例三
 */
function fetch() {
  return (
    fetchData()
    .then(value1 => {
      return fetchMoreData(value1)
    })
    .then(value2 => {
      return fetchMoreData2(value2)
    })
  )
}

async function fetch() {
  const value1 = await fetchData()
  const value2 = await fetchMoreData(value1)
  return fetchMoreData2(value2)
};
```

#### 错误处理

```javascript
function fetch() {
  try {
    fetchData()
      .then(result => {
        const data = JSON.parse(result)
      })
      .catch((err) => {
        console.log(err)
      })
  } catch (err) {
    console.log(err)
  }
}
```

在这段代码中，try/catch 能捕获 fetchData() 中的一些 Promise 构造错误，但是不能捕获 JSON.parse 抛出的异常，如果要处理 JSON.parse 抛出的异常，需要添加 catch 函数重复一遍异常处理的逻辑。

在实际项目中，错误处理逻辑可能会很复杂，这会导致冗余的代码。

```javascript
async function fetch() {
  try {
    const data = JSON.parse(await fetchData())
  } catch (err) {
    console.log(err)
  }
};
```

async/await 的出现使得 try/catch 就可以捕获同步和异步的错误，但是当捕获多个错误且处理不同时，代码会很杂乱。

#### 继发与并发

**问题：给定一个 URL 数组，如何实现接口的继发和并发？**

async 继发实现：

```javascript
// 继发一
async function loadData() {
  var res1 = await fetch(url1);
  var res2 = await fetch(url2);
  var res3 = await fetch(url3);
  return "whew all done";
}
// 继发二
async function loadData(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}
```

async 并发实现：

```javascript
// 并发一
async function loadData() {
  var res = await Promise.all([fetch(url1), fetch(url2), fetch(url3)]);
  return "whew all done";
}
// 并发二
async function loadData(urls) {
  // 并发读取 url
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
```

#### 注意点

1. await后面的Promise对象的运行结果可能是rejected，最好把await命令放在try catch中，否则后面的await命令不会执行。

   ```javascript
   //写法一
   async function f1(){
       try{
           await f2()
       }catch(err){
           console.log(err)
       }
   }
   //写法二
   async function f1(){
       await f2()
       .catch(err=>{
           console.log(err)
       })
   }
   ```

2. 多个await命令后面的异步操作如果不存在继发关系，最好让他们同时触发。

   ```javascript
   //写法一
   let [foo,bar]=await Promise.all([getFoo(),getBar()])
   //写法二
   let fooPromise=await getFoo()
   let barPromise=await getBar()
   let foo=await fooPromise
   let bar=await barPromise
   ```

### async 会取代 Generator 吗？

Generator 本来是用作生成器，使用 Generator 处理异步请求只是一个比较 hack 的用法，在异步方面，async 可以取代 Generator，但是 async 和 Generator 两个语法本身是用来解决不同的问题的。

### async 会取代 Promise 吗？

1. async 函数返回一个 Promise 对象
2. 面对复杂的异步流程，Promise 提供的 all 和 race 会更加好用
3. Promise 本身是一个对象，所以可以在代码中任意传递
4. async 的支持率还很低，即使有 Babel，编译后也要增加 1000 行左右。

### 7.应用

- 每隔1s输出一个数字

  ```javascript
  for (let i = 1; i < 10; ++i) {
    setTimeout(() => { // 错误！
      console.log(i);
    }, 1000);
  }
  //1s后一次性输出所有结果
  //因为这里的循环是同时启了 10 个定时器，每个定时器都等待 1 秒，结果当然是所有定时器在 1 秒后同时超时，触发回调函数。
  //解法1：用递归
  let i = 1;
  function next() {
    console.log(i);
    if (++i < 10) {
      setTimeout(next, 1000);
    }
  }
  setTimeout(next, 1000);
  //解法2：Generator
  let iter;
  
  function* run() {
    for (let i = 1; i < 10; ++i) {
      setTimeout(() => iter.next(), 1000);
      yield; // 等待上面 setTimeout 执行完毕
      console.log(i);
    }
  }
  
  iter = run();
  iter.next();
  //解法3：async,await
  function timeout(delay) {
    return new Promise(resolve => {
      setTimeout(resolve, delay);
    });
  }
  
  async function run() {
    for (let i = 1; i < 10; ++i) {
      await timeout(1000);
      console.log(i);
    }
  }
  run();
  ```

- 红绿灯循环输出

  ```javascript
  function red(){
      console.log('red');
  }
  function green(){
      console.log('green');
  }
  function yellow(){
      console.log('yellow');
  }
  
  var light = function(timer, cb){
      return new Promise(function(resolve, reject) {
          setTimeout(function() {
              cb();
              resolve();
          }, timer);
      });
  };
  
  var step =async function() {
      await light(1000,red);
      await light(2000,green);
      await light(1000,yellow);
      step()
  }
  step();
  ```

  