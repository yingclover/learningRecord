const PENDING='pending'
const FULFILLED='fulfilled'
const REJECTED='rejected'

function MyPromise(executor) {
    let that=this
    that.state=PENDING
    that.value=undefined
    that.reason=undefined
    that.onFulfilledCbs=[]
    that.onRejectedCbs=[]

    function resolve(value) {
        if(value instanceof MyPromise){
            return value.then(resolve,reject)
        }
        // 调用resolve 回调对应onFulfilled函数
        setTimeout(()=>{
            if(that.state===PENDING){
                that.state=FULFILLED
                that.value=value
                that.onFulfilledCbs.forEach(cb=>cb(that.value))
            }
        })
    }
    // 调用reject 回调对应onRejected函数
    function reject(reason) {
        setTimeout(()=>{
            if(that.state===PENDING){
                that.state=REJECTED
                that.reason=reason
                that.onRejectedCbs.forEach(cb=>cb(that.reason))
            }
        })
    }

    try{
        executor(resolve,reject)
    }catch (e) {
        reject(e)
    }
}
/**
 * resolve中的值几种情况：
 * 1.普通值
 * 2.promise对象
 * 3.thenable对象/函数
 */

/**
 * 对resolve 进行改造增强 针对resolve中不同值情况 进行处理
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */
function resolvePromise(promise2,x,resolve,reject) {
    if(promise2===x){
        return reject(new TypeError('循环引用！'))
    }

    let called=false//避免多次调用
    if(x!=null&&((typeof x==='object')||(typeof x==='function'))){
        try{
            let then=x.then
            if(typeof then==='function'){
                then.call(x,y=>{
                    if(called)
                        return
                    called=true
                    resolvePromise(promise2,y,resolve,reject)
                },reason=>{
                    if(called)
                        return
                    called=true
                    reject(reason)
                })
            }else {
                resolve(x)
            }
        }catch (e) {
            if(called)
                return
            called=true
            reject(e)
        }
    }else{
        resolve(x)
    }
}
/**
 * [注册fulfilled状态/rejected状态对应的回调函数]
 * @param  {function} onFulfilled fulfilled状态时 执行的函数
 * @param  {function} onRejected  rejected状态时 执行的函数
 * @return {function} newPromsie  返回一个新的promise对象
 */
MyPromise.prototype.then=function (onFulfilled,onRejected) {
    const that=this
    let newPromise
    onFulfilled=
        typeof onFulfilled==='function'?onFulfilled:value=>value
    onRejected=
        typeof onRejected==='function'?onRejected:reason=>{throw reason}
    // then里面的FULFILLED/REJECTED状态时 为什么要加setTimeout ?
    // 原因:
    // 其一 2.2.4规范 要确保 onFulfilled 和 onRejected 方法异步执行(且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行) 所以要在resolve里加上setTimeout
    // 其二 2.2.6规范 对于一个promise，它的then方法可以调用多次.（当在其他程序中多次调用同一个promise的then时 由于之前状态已经为FULFILLED/REJECTED状态，则会走的下面逻辑),所以要确保为FULFILLED/REJECTED状态后 也要异步执行onFulfilled/onRejected

    // 其二 2.2.6规范 也是resolve函数里加setTimeout的原因
    // 总之都是 让then方法异步执行 也就是确保onFulfilled/onRejected异步执行

    // 如下面这种情景 多次调用p1.then
    // p1.then((value) => { // 此时p1.status 由pedding状态 => fulfilled状态
    //     console.log(value); // resolve
    //     // console.log(p1.status); // fulfilled
    //     p1.then(value => { // 再次p1.then 这时已经为fulfilled状态 走的是fulfilled状态判断里的逻辑 所以我们也要确保判断里面onFuilled异步执行
    //         console.log(value); // 'resolve'
    //     });
    //     console.log('当前执行栈中同步代码');
    // })
    // console.log('全局执行栈中同步代码');
    if(that.state===FULFILLED){
        return newPromise=new MyPromise((resolve,reject)=>{
            setTimeout(()=>{
                try{
                    let x=onFulfilled(that.value)
                    resolvePromise(newPromise,x,resolve,reject)
                }catch (e) {
                    reject(e)
                }
            })
        })
    }

    if(that.state===REJECTED){
        return newPromise=new MyPromise((resolve,reject)=>{
            setTimeout(()=>{
                try{
                    let x=onRejected(that.reason)
                    resolvePromise(newPromise,x,resolve,reject)
                }catch (e) {
                    reject(e)
                }
            })
        })
    }

    if(that.state===PENDING){
        return newPromise=new MyPromise((resolve,reject)=>{
            that.onFulfilledCbs.push((value)=>{
                try{
                    let x=onFulfilled(value)
                    resolvePromise(newPromise,x,resolve,reject)
                }catch(e){
                    reject(e)
                }
            })
            that.onRejectedCbs.push(reason=>{
                try{
                    let x=onRejected(reason)
                    resolvePromise(newPromise,x,resolve,reject)
                }catch (e) {
                    reject(e)
                }
            })
        })
    }
}
/**
 * Promise.all Promise进行并行处理
 * 参数: promise对象组成的数组作为参数
 * 返回值: 返回一个Promise实例
 * 当这个数组里的所有promise对象全部变为resolve状态的时候，才会resolve。
 */
MyPromise.all=function (promises) {
    return new Promise(((resolve, reject) => {
        let done=gen(promises.length,resolve)
        promises.forEach((promise,index)=>{
            promise.then((value)=>{
                done(index,value)
            },reject)
        })
    }))
}

function gen(length,resolve) {
    let count=0
    let values=[]
    return function (i,value) {
        values[i]=value
        if(++count===length)
            resolve(values)
    }
}
/**
 * Promise.race
 * 参数: 接收 promise对象组成的数组作为参数
 * 返回值: 返回一个Promise实例
 * 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理(取决于哪一个更快)
 */
MyPromise.prototype.race=function (promises) {
    return new MyPromise((resolve,reject)=>{
        promises.forEach((promise,index)=>{
            promise.then(resolve,reject)
        })
    })
}

// 用于promise方法链时 捕获前面onFulfilled/onRejected抛出的异常
MyPromise.prototype.catch=function (onRejected) {
    return this.then(null,onRejected)
}

MyPromise.resolve=function (value) {
    return new MyPromise(resolve=>{
        resolve(value)
    })
}

MyPromise.reject=function (reason) {
    return new MyPromise((resolve,reject)=>{
        reject(reason)
    })
}

/**
 * 基于Promise实现Deferred的
 * Deferred和Promise的关系
 * - Deferred 拥有 Promise
 * - Deferred 具备对 Promise的状态进行操作的特权方法（resolve reject）
 *
 *参考jQuery.Deferred
 *url: http://api.jquery.com/category/deferred-object/
 */
Promise.deferred = function() { // 延迟对象
    let defer = {};
    defer.promise = new Promise((resolve, reject) => {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
}

/**
 * Promise/A+规范测试
 * npm i -g promises-aplus-tests
 * promises-aplus-tests Promise.js
 */

try {
    module.exports = Promise
} catch (e) {
}
