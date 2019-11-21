### NodeJS介绍

基于Chrome v8的javascript运行时，事件驱动，非阻塞I/O

### 调试&项目初始化

**模块规范：commonjs**

- 每个文件是一个模块，有自己的作用域
- 在模块内部module变量代表模块本身
- module.exports属性代表模块对外接口



**require规则**

- /表示绝对路径，./表示相对于当前文件的
- 支持js,json,node拓展名，不写依次尝试
- 不写路径则认为是build-in模块或者各级node_modules内的第三方模块

**require特性**

- module被加载的时候执行，加载后缓存
- 一旦出现某个模块被循环加载，就只输出以及执行的部分，还未执行的部分不会输出

```javascript
//node_01.js
module.exports.test='A'

const modB=require('./node_02')
console.log('modA',modB.test)

module.exports.test='AA'
//node_02.js
module.exports.test='B'

const modA=require('./node_01')
console.log('modB:',modA.test)

module.exports.test='BB'
//node_00.js
const modA=require('./node_01')
const modB=require('./node_02')

console.log(modA.test)
console.log(modB.test)
//输出
modB: A
modA BB
AA
BB
```

**引用系统内置模块**

```javascript
const fs = require('fs')
const result = fs.readFile('./node_1.js', (err, data) => {
    if (err) {
        console.log(err)

    } else {
        console.log(data.toString())
    }
})
```

**exports和module.exports**

exports是module.exports的快捷方式，但是记住不能改变exports的指向

```javascript
//node_1.js
//1.此时能够读到test的值
exports.test = 100
//2.此时不能
exports = {
    a: 1,
    b: 2,
    test: 100
}
//node_2.js
const mod = require('./node_1')
console.log(mod.test)
```

**global**

- CommonJS
- Buffer，process，console
- timer

**process进程**

比如与参数相关argv（与启动参数有关）,argv0,  execArgv,  execPath



```javascript
setImmediate(() => {
    console.log('setTmmediate');
})//下一次事件队列队头

setTimeout(() => {
    console.log('timeout');
})

process.nextTick(() => {
    console.log('nextTick');
//该事件队列队尾
})
//输出顺序
nextTick
timeout
setTmmediate
```

**调试**

- Inspector

   [chrome://inspect/#devices](chrome://inspect/#devices) 

- VSCode

  添加断点，调试

### 基础API

#### path

 该模块提供用于处理文件路径和目录路径的实用工具 

```javascript
/*
normalize join resolve
basename extname dirname
parse format
sep delimiter win32 posix
*/
```

```javascript
//1.normalize规范路径名
const {
    normalize
} = require('path')

console.log(normalize('/usr//local//bin'));
//\usr\local\bin

//2.join拼接
const {
    join
} = require('path')

console.log(join('/usr//local//bin', 'my'));
//\usr\local\bin\my

//3.resolve将相对路径解析成绝对路径
const {
    resolve
} = require('path')

console.log(resolve('./'));
//e:\VueProjects\node

//4.文件名、文件夹路径、拓展名
const {
    basename,
    dirname,
    extname
} = require('path')
const filePath = '/usr/local/bin/no.txt'
console.log(basename(filePath));
console.log(dirname(filePath));
console.log(extname(filePath));
// no.txt
// /usr/local/bin
// .txt
//5.parse format,format方法会从一个对象返回一个路径字符串，与parse相反，注意format有优先级,dir高于root,base高于ext和name
const {
    parse,
    format
} = require('path') 
const filePath = '/usr/local/node_modules/n/package.json'
const ret = parse(filePath)
console.log(ret);
console.log(format(ret));
/*
{ root: '/',
  dir: '/usr/local/node_modules/n',
  base: 'package.json',
  ext: '.json',
  name: 'package' }
  
/usr/local/node_modules/n\package.json
*/

//6.sep,delimiter,win32,posix
//sep提供平台特定的路径片段分隔符,win上是‘\’,posix上是‘/’
//delimiter提供平台特定的路径定界符，win上是‘；’，posix上是‘：’
const {
    sep,
    delimiter,
    win32,
    posix
} = require('path')
console.log('sep:', sep);
console.log('sep posix:', posix.sep);

console.log('PATH:', process.env.PATH);
console.log('delimiter:', delimiter);
console.log('delimiter posix:', posix.delimiter);
/*
sep: \
sep posix: /
PATH: F:\programs\Xshell 6\;C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem;C:\WINDOWS\System32\WindowsPowerShell\v1.0\
delimiter: ;
delimiter posix: :
*/
```

**关于文件路径**

- _dirname,\_filename总是返回文件的绝对路径
- process.cwd()总是返回执行node命令所在文件夹
- ./在require方法中总是相对当前文件所在文件夹，在其他地方和process.cwd()一样，相对node启动文件夹

#### buffer

- buffer用于处理二进制数据流
- 实例类似整数数组，大小固定
- C++代码在V8堆外分配物理内存

```javascript
console.log(Buffer.alloc(10));//初始化值为0大小为10的内存
console.log(Buffer.alloc(5, 1));
console.log(Buffer.allocUnsafe(5, 1));//不安全的内存，值随机，需要清空
console.log(Buffer.from([1, 2, 3]));
console.log(Buffer.from('abc'));
console.log(Buffer.from('test', 'base64'));
```

```javascript
/*
Buffer.byteLength
Buffer.isBuffer()
Buffer.concat()
*/
console.log(Buffer.byteLength('test'));
console.log(Buffer.byteLength('测试'));
console.log(Buffer.isBuffer({}));
console.log(Buffer.isBuffer(Buffer.from([1, 2, 3])));

const buf1 = Buffer.from('this ')
const buf2 = Buffer.from('is ')
const buf3 = Buffer.from('a ')
const buf4 = Buffer.from('test ')
const buf5 = Buffer.from('!')

const buf = Buffer.concat([buf1, buf2, buf3, buf4, buf5])
console.log(buf.toString());

//输出
4
6
false
true
this is a test !
```

```javascript
/*
buf.length
buf.toString()
buf.fill()
buf.equals()
buf.indexOf()
buf.copy()
*/
const buf = Buffer.from('This is a test!')

console.log(buf.length);
console.log(buf.toString('base64'));

const buf2 = Buffer.allocUnsafe(10)
console.log(buf2);
console.log(buf2.fill(10, 2, 6));
const buf3 = Buffer.from('test')
const buf4 = Buffer.from('test')
const buf5 = Buffer.from('test!')
console.log(buf3.equals(buf4));
console.log(buf3.equals(buf5));
console.log(buf3.indexOf('es'));
//
15
VGhpcyBpcyBhIHRlc3Qh
<Buffer 50 a7 68 62 5b 01 00 00 20 d1>
<Buffer 50 a7 0a 0a 0a 0a 00 00 20 d1>
true
false
1

//copy与中文乱码问题
const StringDecoder = require('string_decoder').StringDecoder
const decoder = new StringDecoder('utf8')

const buf = Buffer.from('中文字符串! ')

for (let i = 0; i < buf.length; i += 5) {
    const b = Buffer.allocUnsafe(5)
    buf.copy(b, 0, i)//拷贝buf中i开始到b中0开始
    console.log(b.toString());
}

for (let i = 0; i < buf.length; i += 5) {
    const b = Buffer.allocUnsafe(5)
    buf.copy(b, 0, i)
    console.log(decoder.write(b));
}
//输出
中�
�字�
��串
! �֨
中
文字
符串
! 
```

#### event

```javascript
const EventEmitter = require('events')
class CustomEvent extends EventEmitter {
}
const ce = new CustomEvent()
ce.on('test', () => {//注册一个事件
    console.log('this is a test!');
})
ce.emit('test')//触发一个事件
```

```javascript
const EventEmitter = require('events')
class CustomEvent extends EventEmitter {}

const ce = new CustomEvent()

ce.on('error', (err, time) => {
    console.log(err);
    console.log(time);
})
ce.emit('error', new Error('oops!'), Date.now())
//
Error: oops!
    at Object.<anonymous> (e:\VueProjects\node\node_2.js:14:18)
    at Module._compile (internal/modules/cjs/loader.js:778:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
    at Module.load (internal/modules/cjs/loader.js:653:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
    at Function.Module._load (internal/modules/cjs/loader.js:585:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:831:12)
    at startup (internal/bootstrap/node.js:283:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:622:3)
1573806073617
```

```javascript
setTimeout(() => {
    ce.removeAllListeners('test')//移除监听
}, 1000);
```

#### fs

```javascript
//读文件
const fs = require('fs')

fs.readFile('./node_2.js', 'utf8', (err, data) => {
    if (err)
        throw err
    console.log(data);
})
//写文件
const fs = require('fs')

fs.writeFile('./node.md', 'this is a test', {
    encoding: 'utf8'
}, err => {
    if (err)
        throw err
    console.log('done');

})
//fs.Stats 对象提供了关于文件的信息
const fs = require('fs')

fs.stat('./node_2.js', (err, stats) => {
    if (err)
        throw err
    console.log(stats.isFile());
    console.log(stats.isDirectory());
    console.log(stats);
})
//fs.rename重命名，fs.unlink删除，fs.readdir
//fs.mkdir创建文件，fs.rmdir删除文件
//fs.watch监视文件变化

//fs.createReadStream
const fs = require('fs')

const rs = fs.createReadStream('./node_2.js')

rs.pipe(process.stdout)
//fs.createWriteStream
const fs = require('fs')

const ws = fs.createWriteStream('./test.txt')

const tid = setInterval(() => {
    const num = parseInt(Math.random() * 10)
    console.log(num);

    if (num < 7) {
        ws.write(num + '')
    } else {
        clearInterval(tid)
        ws.end()
    }
}, 200);

ws.on('finish', () => {
    console.log('done');
})
//
2
2
7
done
```

解决回调地狱

```java
const fs = require('fs')

const promisify = require('util').promisify

const read = promisify(fs.readFile)

// read('./node_2.js').then(data => {
//     console.log(data.toString());

// }).catch(ex => {
//     console.log(ex);

// })

async function test() {
    try {
        const content = await read('./node_2.js')
        console.log(content.toString());
    } catch (ex) {
        console.log(ex);

    }
}
test()
```
