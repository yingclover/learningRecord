# 基础排序

#### 快速排序c++实现

```c++
//先从右边找比基准小的，再从左边找比基准大的
void quickSort(int a[],int m,int n)
{
        if(m<n)
        {
            int i=m,j=n,mark=a[m];
            while(i<j)
            {
                while(a[j]>mark&&i<j)
                    j--;
                if(i<j)
                    a[i++]=a[j];
                while(a[i]<mark&&i<j)
                    i++;
                if(i<j)
                    a[j--]=a[i];
            }
            a[i]=mark;
            quickSort(a,m,i-1);
            quickSort(a,i+1,n);
        }
}
```

### JS中的各种排序实现

##### 插入排序(稳定)

以第一个元素作为有序数组，其后的元素通过在这个已有序的数组中找到合适的位置并插入。

最好： `O(n)`，原数组已经是升序的。
最坏： `O(n²)`
平均： `O(n²)`

```javascript
function insertSort(arr) {
    for(let i=1,len=arr.length;i<len;i++){
        let temp = arr[i],j=i;
        while (j>0&&temp<arr[j-1]){
            arr[j]=arr[j-1];
            j--;
        }
        arr[j]=temp;
    }
}
```

##### 冒泡排序(稳定)

通过相邻元素的比较和交换，使得每一趟循环都能找到未有序数组的最大值或最小值。

最好： `O(n)`，只需要冒泡一次数组就有序了。
最坏： `O(n²)`
平均： `O(n²)`

```javascript
function bubbleSort(arr) {
    for(let i=0,len=arr.length;i<len;i++){
        let mark=true;
        for(let j=1;j<len-i;j++){
            if(arr[j]<arr[j-1]){
                [arr[j-1],arr[j]]=[arr[j],arr[j-1]];
                mark=false;
            }
        }
        if(mark) return;
    }
}
```

##### 选择排序

和冒泡排序相似，区别在于选择排序是将每一个元素和它后面的元素进行比较和交换。每一趟（例如第i趟），在后面n-i+1个待排序元素中选取关键字最小的元素，作为有序子序列的第i个元素，直到n-1趟做完

最好： `O(n²)`
最坏： `O(n²)`
平均： `O(n²)`

```javascript
function selectSort(arr) {
    for(let i=0,len=arr.length;i<len-1;i++){
        var min=i;
        for(let j=i+1;j<len;j++){
            if(arr[j]<arr[min]){
                min=j;
            }
        }
        if(min!=i)
            [arr[i],arr[min]]=[arr[min],arr[i]];
    }
}
```

##### 归并排序(稳定)

递归将数组分为两个序列，有序合并这两个序列。

最好： `O(n * logn)`
最坏： `O(n * logn)`
平均： `O(n * logn)`

```javascript
// 融合两个有序数组，这里实际上是将数组 arr 分为两个数组
function mergeArray(arr, first, mid, last, temp) {
    let i = first;
    let m = mid;
    let j = mid+1;
    let n = last;
    let k = 0;
    while(i<=m && j<=n) {
        temp[k++] = arr[i] < arr[j]?arr[i++]: arr[j++];
    }
    while(i<=m) {
        temp[k++] = arr[i++];
    }
    while(j<=n) {
        temp[k++] = arr[j++];
    }
    for(let l=0; l<k; l++) {
        arr[first+l] = temp[l];
    }
    return arr;
}
// 递归实现归并排序
function mergeSort(arr, first, last, temp) {
    if(first<last) {
        let mid = Math.floor((first+last)/2);
        mergeSort(arr, first, mid, temp);    // 左子数组有序
        mergeSort(arr, mid+1, last, temp);   // 右子数组有序
        arr = mergeArray(arr, first, mid, last, temp);
    }
    return arr;
}

// example
let arr = [10, 3, 1, 5, 11, 2, 0, 6, 3];
let temp = new Array();
let SortedArr = mergeSort(arr, 0 ,arr.length-1, temp);
console.log(SortedArr)
```

##### 快速排序

选择一个元素作为基数（通常是第一个元素），把比基数小的元素放到它左边，比基数大的元素放到它右边（相当于二分），再不断递归基数左右两边的序列。

最好： `O(n * logn)`，所有数均匀分布在基数的两边，此时的递归就是不断地二分左右序列。
最坏： `O(n²)`，所有数都分布在基数的一边，此时划分左右序列就相当于是插入排序。
平均： `O(n * logn)`

```javascript
function quickSort(arr ,m,n) {
    if(m<n){
        let i=m,j=n,mark=arr[m];
        while (i<j){
            while (mark<arr[j]&&i<j){
                j--;
            }
            if(i<j){
                arr[i++]=arr[j];
            }
            while (mark>arr[i]&&i<j){
                i++;
            }
            if(i<j){
                arr[j--]=arr[i];
            }
        }
        arr[i]=mark;
        quickSort(arr,m,i-1);
        quickSort(arr,i+1,n);
    }
}
```

递归与迭代

迭代:利用变量的原值推算出变量的一个新值.如果递归是自己调用自己的话,迭代就是A不停的调用B.

递归中一定有迭代,但是迭代中不一定有递归,大部分可以相互转换.能用迭代的不用递归,递归调用函数,浪费空间,并且递归太深容易造成堆栈的溢出.

```c++
//这是递归
int funcA(int n)
{
    if(n > 1)
       return n+funcA(n-1);
    else 
       return 1;
}
//这是迭代
int funcB(int n)
{
    int i,s=0;
    for(i=1;i<n;i++)
       s+=i;
    return s;
}
```



# JS基础

## 数据类型与判断方法

#### 1.数据类型

5种基本数据类型和1种复杂数据类型，可以通过`typeof`操作符判断

##### 基本（简单）数据类型

**Undefined**：使用var声明变量但未初始化时，变量值就是undefined

**Null**：空对象指针，使用typeof会返回Object

**Boolean**：值有true和false，

**Number**：支持整数和浮点数，注意浮点数计算时会产生舍入误差，若产生一个超过JavaScript数值范围的值，将自动转换为+/-Infinity

数值转换：

Number():布尔值转换为0,1，null转换为0，undefined转换为NaN

parseInt():空字符转换为0，小数点会省略，其余进制默认转换为10进制，为了避免错误，通常添加第二个参数10作为基数

parseFloat():第一个小数点不省略

**String**：转换为字符串有两种方式，第一种toString()，也可以通过传入基数获取对应的进制结果。第二种String(),转换规则，若该值有toString()方法就调用这个方法，如果是null则返回null，如果是undefined就返回undefined

##### 复杂数据类型

Object：实质上是一组数据和功能的集合，可以通过执行new操作符后跟要创建的对象类型的名称来创建。

#### 2.判断类型

##### 1. typeof

typeof是javascript原生提供的判断数据类型的运算符，它会返回一个表示参数的数据类型的字符串.

| 类型                                        | 结果                       |
| :------------------------------------------ | :------------------------- |
| Undefined                                   | `"undefined"`              |
| Null                                        | `"object"`                 |
| Boolean                                     | `"boolean"`                |
| Number                                      | `"number"`                 |
| String                                      | `"string"`                 |
| Symbol （ECMAScript 6 新增）                | `"symbol"`                 |
| 宿主对象（由JS环境提供）                    | *Implementation-dependent* |
| 函数对象（[[Call]] 在ECMA-262条款中实现了） | `"function"`               |
| 任何其他对象                                | `"object"`                 |

typeof无法判断null和Array对象。

##### 2.instanceof

instanceof运算符可以用来判断某个构造函数的prototype属性所指向的對象是否存在于另外一个要检测对象的原型链上。在使用的时候语法如下：

就是object的原型链上是否能找到b的构造函数

```javascript
object instanceof b
```

```javascript
const a = [];
const b = {};
console.log(a instanceof Array);//true
console.log(a instanceof Object);//true,在数组的原型链上也能找到Object构造函数
console.log(b instanceof Array);//false
```

instanceof可以区分数组和对象

##### 3.constructor

实例化的数组有一个constructor属性，指向生成这个数组的方法

```javascript
const a = [];
console.log(a.constructor);//function Array(){ [native code] }
```

但是如果改写constructor属性就无法判断了。

##### 4.Object的toString

每一个继承自Object的对象都拥有toString的方法。如果一个对象的toString方法没有被重写过的话，那么toString方法将会返回"[object *type*]"，其中的*type*代表的是对象的类型，根据type的值，我们就可以判断这个疑似数组的对象到底是不是数组了。

```javascript
const a = ['Hello','Howard'];
const b = {0:'Hello',1:'Howard'};
const c = 'Hello Howard';
Object.prototype.toString.call(a);//"[object Array]"
Object.prototype.toString.call(b);//"[object Object]"
Object.prototype.toString.call(c);//"[object String]"
```

如果直接调用toString方法，直接返回字符串内容。

在JS中，可以通过`Object.prototype.toString`方法，判断某个对象之属于哪种内置类型。
分为`null`、`string`、`boolean`、`number`、`undefined`、`array`、`function`、`object`、`date`、`math`。**几乎可以识别所有类型**。

##### 5.Array对象的isArray（jQuery方法）

Array.isArray(a)

除非重写该方法本身，否则不影响判断。

#### undefined,null,0,"",false,[],{}

typeof：undefined,object,number,string,boolean,object,object,
Number()：NaN,0,0,0,0,0,NaN,
！：true,true,true,true,true,false,false

将空数组与true进行比较时，结果是false。因为，任意值与布尔值进行比较的时候都会转换为数值进行比较,布尔值true为1， false为0，空数组转换为数字的话是0，所以二者并不相等。
如果将两个数组进行比较, 返回值是false， 因为二者是不同的两个对象。
new Array(1)同样因为虽然长度为1，但值为undefined，转换为数字仍未0。
console.log(a == true) //  false
console.log([] == [])  //  false

console.log(new Array(1) == false))  // true

```javascript
console.log(0 == ''); //true
console.log(0 == false); //true
console.log(0==[]); //true 
console.log(0==NaN);//false
console.log(0==undefined);//false
console.log(0==null);//false，该情况下，null在相等运算符上不转型
console.log(0=={});//false 
 
console.log(null == undefined); //true
console.log(false == null); //false
console.log(false == undefined);//false

console.log('' == false); //true
console.log(''==[]);//true
console.log(''==undefined);//false
console.log(''==null);//false
console.log(''==NAN);//false
console.log(''=={});//false
```



#### setTimeout函数

返回值是一个number类型的数字，用clearTimeout取消执行，该数字值不改变

```javascript
var i=0;
var timer=setTimeout(function () {
    console.log("hh");
},1000)
console.log(timer)
container.onclick=function(){
    clearTimeout(timer)
    console.log(timer)
}
//在1s之内点击container，hh不会输出，此时timer值还是1。
```

## new调用原理

### 栗子

#### 1. 无 return 语句

构造函数最后没有 `return` 语句，这也是使用构造函数时默认情况，最后会返回一个新对象，如下：

```javascript
function Foo(age) {
  this.age = age;
}

var o = new Foo(111);
console.log(o);
```

这是常见的使用构造函数创建对象的过程，打印出来的是 `{age: 111}`。

#### 2. return 对象类型数据

构造函数最后 `return` 对象类型数据：

```javascript
function Foo(age) {
  this.age = age;

  return { type: "我是显式返回的" };
}

var o = new Foo(222);
console.log(o);
```

打印出来的是 `{type: '我是显式返回的'}`，也就是说，`return` 之前的工作都白做了，最后返回 `return` 后面的对象。

#### 3.return 基本类型数据

那是不是只要构造函数体内最后有 `return`，返回都是 `return` 后面的数据呢？

我们看下返回基本类型数据的情况：

```javascript
function Foo(age) {
  this.age = age;

  return 1;
}

var o = new Foo(333);
console.log(o);
```

打印出来的是 `{age: 333}`，和没有 `return` 时效果一样。

### 原理

**如果构造函数显式返回对象类型，则直接返回这个对象，而不是返回最开始创建的对象。**

**如果构造函数没有显式返回对象类型（显式返回基本数据类型或者直接不返回），则返回最开始创建的对象。**

PS：箭头函数中没有 `[[Construct]]` 方法，不能使用 `new` 调用，会报错。

> 若执行 `new Foo()`，过程如下：
>
> 1）创建新对象 `o`；
>  2）给新对象的内部属性赋值，关键是给`[[Prototype]]`属性赋值，构造原型链（如果构造函数的原型是 Object 类型，则指向构造函数的原型；不然指向 Object 对象的原型）；
>  3）执行函数 `Foo`，执行过程中内部 `this` 指向新创建的对象 `o`；
>  4）如果 `Foo` 内部显式返回对象类型数据，则，返回该数据，执行结束；不然返回新创建的对象 `o`。

关于第二步：

```javascript
function Foo(name) {
  this.name = name;
}

var o1 = new Foo("xiaoming");
console.log(o1.__proto__ === Foo.prototype); // true

// 重写构造函数原型属性为非对象类型，实例内部 [[Prototype]] 属性指向 Object 原型对象
// 因为实例是一个对象类型的数据，默认会继承内建对象的原型，
// 如果构造函数的原型不满足形成原型链的要求，那就跳过直接和内建对象原型关联
Foo.prototype = 1;
var o2 = new Foo("xiaohong");
console.log(o2.__proto__ === Foo.prototype); // false
console.log(o2.__proto__ === Object.prototype); // true
```

```javascript
var o=new Foo()

var o=new Object()
o._proto_=Foo.prototype
Foo.call(o)
```

### 判断是否是 Object 类型

关于一个数据是否是 `Object` 类型，可以通过 `instanceof` 操作符进行判断：如果 `x instanceof Object` 返回 `true`，则 `x` 为 `Object` 类型。

由上可知，`null instanceof Object` 返回 `false`，所以 `null` 不是 `Object` 类型，尽管`typeof null` 返回 "Object"。

#### instanceof 原理

**instanceof 的工作原理是：在表达式 x instanceof Foo 中，如果 Foo 的原型（即 Foo.prototype）出现在 x 的原型链中，则返回 true，不然，返回 false**。

因为函数的原型可以被改写，所以会出现在 `x` 通过 `Foo` new 出来**之后**完全改写 `Foo` 的原型 `x instanceof Foo` 返回 `false` 的情况。因为实例创建之后重写构造函数原型，实例指向的原型已经不是构造函数的新的原型了，见下面代码：

```javascript
const Foo = function() {};

const o = new Foo();

o instanceof Foo; // true

// 重写 Foo 原型
Foo.prototype = {};
o instanceof Foo; // false
```

## 遍历对象属性

### for in

主要用于遍历对象的可枚举属性，包括自有属性、继承自原型的属性

### Object.keys

返回一个数组，元素均为对象自有的可枚举属性

### Object.getOwnProperty

用于返回对象的自有属性，包括可枚举和不可枚举的

### 栗子

```javascript
function F(name) {
    this.name=name;
}
F.prototype.age=12
var f=new F('me')
Object.defineProperty(f,'sex',{value:1,enumerable:false})


for(var key in f){
    if(f.hasOwnProperty(key))
        console.log("实例属性："+key)
    else
        console.log("原型属性："+key)
}
//实例属性：name
// 原型属性：age
console.log(Object.keys(f))
// [ 'name' ]
console.log(Object.getOwnPropertyNames(f))
//[ 'name', 'sex' ]
```



## 数组去重

### 1.双层循环

最外层循环 array，里面循环 res，如果 array[i] 的值跟 res[j] 的值相等，就跳出循环，如果都不等于，说明元素是唯一的，这时候 j 的值就会等于 res 的长度，根据这个特点进行判断，将值添加进 res。

```javascript
var arr=[1,1,"1","1"];
function unique(arr) {
    var res=[];
    for(var i=0,len1=arr.length;i<len1;i++){
        for(var j=0,len2=res.length;j<len2;j++){
            if(arr[i]===res[j])
                break;
        }
        if(j==len2)
            res.push(arr[i]);
    }
    return res;
}

var result=unique(arr)
console.log(result)//[1,"1"]
```

### 2.indexOf

可以用indexOf简化内层循环

```javascript
function unique(arr) {
    var res=[];
    for(var i=0,len=arr.length;i<len;i++){
        if(res.indexOf(arr[i])===-1)
            res.push(arr[i])
    }
    return res;
}
```

### 3.排序后去重

```javascript
function unique(arr) {
    var res=[];
    var sortArr=arr.concat().sort();
    for(var i=0,len=sortArr.length;i<len;i++){
        //第一个或者相邻两个值不相等
        if(!i||seen!==sortArr[i])
            res.push(sortArr[i])
        seen=sortArr[i]
    }
    return res;
}
```

### 4.filter

```javascript
//简化外层循环
function unique(arr) {
    var res=arr.filter(function (v,i,arr) {
        return arr.indexOf(v)===i;
    })
    return res;
}

function unique(arr) {
    var res=arr.concat().sort().filter(function (v,i,arr) {
        return !i||v!==arr[i-1]
    })
    return res;
}
```

### 5.Object键值对

```javascript
//把数组的值存成 Object 的 key 值，比如 Object[value1] = true，在判断另一个值的时候，如果 Object[value2]存在的话，就说明该值是重复的。
function unique(arr) {
    var obj={};
    return arr.filter(function (v,i,arr) {
        return obj.hasOwnProperty(v)?false:(obj[v]=true)
    })
}
//我们可以发现，是有问题的，因为 1 和 '1' 是不同的，但是这种方法会判断为同一个值，这是因为对象的键值只能是字符串，所以我们可以使用 typeof item + item 拼成字符串作为 key 值来避免这个问题：
function unique(arr) {
    var obj={};
    return arr.filter(function (v,i,arr) {
        return obj.hasOwnProperty(typeof v+v)?false:(obj[typeof v+v]=true)
    })
}
//然而，即便如此，我们依然无法正确区分出两个对象，比如 {value: 1} 和 {value: 2}，因为 typeof item + item 的结果都会是 object[object Object]，不过我们可以使用 JSON.stringify 将对象序列化：
function unique(arr) {
    var obj={};
    return arr.filter(function (v,i,arr) {
        return obj.hasOwnProperty(typeof v+JSON.stringify(v))?false:(obj[typeof v+JSON.stringify(v)]=true)
    })
}
```

### 6.ES6

```javascript
//ES6方法
function unique(arr) {
    return [...new Set(arr)];//[a,b,c]
    //return Array.from(new Set(arr));//[a,b,c]
}
//还可以简化如下
var unique=(a)=>[...new Set(a)]
```

### 比较

对于这样一个数组`var array = [1, 1, '1', '1', null, null, undefined, undefined, new String('1'), new String('1'), /a/, /a/, NaN, NaN];`ps:正则 表达式也是对象

| 方法               | 结果                                                         | 说明                              |
| ------------------ | ------------------------------------------------------------ | --------------------------------- |
| for循环            | [1, "1", null, undefined, String, String, /a/, /a/, NaN, NaN] | 对象和 NaN 不去重                 |
| indexOf            | [1, "1", null, undefined, String, String, /a/, /a/, NaN, NaN] | 对象和 NaN 不去重                 |
| sort               | [/a/, /a/, "1", 1, String, 1, String, NaN, NaN, null, undefined] | 对象和 NaN 不去重 数字 1 也不去重 |
| filter + indexOf   | [1, "1", null, undefined, String, String, /a/, /a/]          | 对象不去重 NaN 会被忽略掉         |
| filter + sort      | [/a/, /a/, "1", 1, String, 1, String, NaN, NaN, null, undefined] | 对象和 NaN 不去重 数字 1 不去重   |
| 优化后的键值对方法 | [1, "1", null, undefined, String, /a/, NaN]                  | 全部去重                          |
| Set                | [1, "1", null, undefined, String, String, /a/, /a/, NaN]     | 对象不去重 NaN 去重               |

## call和apply，bind

apply：方法调用一个函数, 其具有一个指定的this值。例如：B.apply(A, arguments);即A对象应用B方法。

call：方法调用一个函数, 其具有一个指定的this值。例如：B.call(A, args1,args2);即A对象调用B方法。

bind：除了**返回是函数**以外，它的参数和call一样。返回的函数不会马上执行

### 原生js实现

arguments

类数组对象，拥有一个length属性和落干索引属性的对象，可以读写，获取长度，可遍历，有callee属性可以调用自身。不可以使用Array的方法。

### 1.call

```javascript
Function.prototype.call2 = function (context) {
    var context = context || window;
    context.fn = this;

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
      	//args=["arguments[0]","arguments[1]"...]
        //如果直接push(arguments[i]),下面执行的时候，每个参数会当做变量而不是字符串，导致报变量未定的错误
    }

    var result = eval('context.fn(' + args +')');//args自动调用toString()方法

    delete context.fn
    return result;
}
```

### 2.apply

```javascript
Function.prototype.apply2 = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}
//ES6实现
    Function.prototype.call2 = function(context, ...args) {
        context = context || window;
        let fn = Symbol()
        context[fn] = this;
        var result =  context[fn](...args)
        Reflect.deleteProperty(context, fn)
        return result;
    }
```

### 3.bind

bind是Function原型链上的一个属性，他修改了this指向，合并参数传递给原函数，返回值是一个新函数，这个函数还以作为构造函数调用，this会指向new的新对象

```javascript
Function.prototype.bind2 = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }
    fNOP.prototype = this.prototype;//这里的this是self
    fBound.prototype = new fNOP();
    return fBound;
}
```

### 4.new

new的person实例

- 可以访问到Person构造函数里的属性
- 可以访问到Person.prototype中的属性

```javascript
function Otaku () {
    ……
}

// 使用 new
var person = new Otaku(……);
// 使用 objectFactory
var person = objectFactory(Otaku, ……)
```

因为 new 的结果是一个新对象，所以在模拟实现的时候，我们也要建立一个新对象，假设这个对象叫 obj，因为 obj 会具有 Otaku 构造函数里的属性，想想经典继承的例子，我们可以使用 Otaku.apply(obj, arguments)来给 obj 添加新的属性。

```javascript
function objectFactory() {

    var obj = new Object(),

    Constructor = [].shift.call(arguments);//取得外部传入的构造器

    var F=function(){};
    F.prototype=Constructor.prototype;
    obj=new F();//指向正确的原型，用一个中间过渡，避免改变obj原型的时候也改变Constructor的原型
    //上面三行也可以用obj.__proto__ = Constructor.prototype;代替

    var ret = Constructor.apply(obj, arguments);//obj可以访问到构造函数中的属性

    return typeof ret === 'object' ? ret||obj : obj;//判断返回的值是不是一个对象，如果是一个对象，我们就返回这个对象(该对象可能为null，再做一个判断)，如果没有，我们该返回什么就返回什么。

};
//获取原型方法用ES6可以实现如下
var obj=Object.create(Constructor.prototype);
```

## 闭包

> 简单讲，闭包就是指有权访问另一个函数作用域中变量的函数，由函数以及创建该函数的环境构成，理解闭包的关键在于，外部函数调用之后其变量对象本应该被销毁，但闭包的存在使我们任然可以访问外部函数的变量对象，这是闭包的重要概念。
>
> 闭包就是能够读取其他函数内部变量的函数，或者子函数在外调用，子函数所在的父函数的作用域不会被释放。

```javascript
//栗子
function outer(){
    var a=1;
    return function(){
        return a;
    };
}
var b=outer();
console.log(b());//结果为1
```

创建闭包：在一个函数内部创建另一个函数就创建了闭包。闭包的作用域链包含着它自己的作用域，以及包含它的函数的作用域和全局作用域。

```javascript
//栗子
function func(){
    var a= 1,b=2;
    function closure(){//闭包
        return a+b;
    }
    return closure;//返回闭包函数
}
```

闭包的**注意事项**：`书P192页`

通常，函数的作用域及其所有变量都会在函数执行结束后被销毁。但是，在创建了一个闭包以后，这个函数的作用域就会一直保存到闭包不存在为止。

闭包只能取得包含函数中的任何变量的最后一个值。

闭包中的this对象

闭包的应用：设计私有方法和变量

```javascript
//问号所在行输出
function fun(n,o){
    console.log(o);
    return {
        fun: function(m){
            return fun(m,n);
        }
    };
}
var a = fun(0);?
a.fun(1);?
a.fun(2);?
a.fun(3);?
var b= fun(0).fun(1).fun(2).fun(3);?
var c = fun(0).fun(1);?
c.fun(2);?
c.fun(3)?
//输出
undefined
0
0
0
undefined
0
1
2
undefined
0
1
1

```

## 设计模式

### 1. 工厂模式

```javascript
function createPerson(name) {
    var o = new Object();
    o.name = name;
    o.getName = function () {
        console.log(this.name);
    };
    return o;
}
var person1 = createPerson('kevin');
```

缺点：对象无法识别，因为所有的实例都指向一个原型

### 2. 构造函数模式

```javascript
function Person(name) {
    this.name = name;
    this.getName = function () {
        console.log(this.name);
    };
}
var person1 = new Person('kevin');
```

优点：实例可以识别为一个特定的类型

缺点：每次创建实例时，每个方法都要被创建一次

#### 2.1 构造函数模式优化

```javascript
function Person(name) {
    this.name = name;
    this.getName = getName;
}

function getName() {
    console.log(this.name);
}

var person1 = new Person('kevin');
```

优点：解决了每个方法都要被重新创建的问题

缺点：这叫啥封装……

### 3. 原型模式

```javascript
function Person(name) {

}

Person.prototype.name = 'keivn';
Person.prototype.getName = function () {
    console.log(this.name);
};

var person1 = new Person();
```

优点：方法不会重新创建

缺点：1. 所有的属性和方法都共享 2. 不能初始化参数

#### 3.1 原型模式优化

```javascript
function Person(name) {

}

Person.prototype = {
    name: 'kevin',
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();
```

优点：封装性好了一点

缺点：重写了原型，丢失了constructor属性

#### 3.2 原型模式优化

```javascript
function Person(name) {

}

Person.prototype = {
    constructor: Person,
    name: 'kevin',
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();
```

优点：实例可以通过constructor属性找到所属构造函数

缺点：原型模式该有的缺点还是有

### 4. 组合模式

构造函数模式与原型模式双剑合璧。

```javascript
function Person(name) {
    this.name = name;
}

Person.prototype = {
    constructor: Person,
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();
```

优点：该共享的共享，该私有的私有，使用最广泛的方式

缺点：有的人就是希望全部都写在一起，即更好的封装性

#### 4.1 动态原型模式

只在初次调用的时候执行if里面的语句，此后，原型已经完成初始化。

```javascript
function Person(name) {
    this.name = name;
    if (typeof this.getName != "function") {//通过检查某该某个存在的方法是否有效来决定是否初始化原型
        Person.prototype.getName = function () {
            console.log(this.name);
        }
    }
}

var person1 = new Person();
```

注意：使用动态原型模式时，不能用对象字面量重写原型

解释下为什么：

```javascript
function Person(name) {
    this.name = name;
    if (typeof this.getName != "function") {
        Person.prototype = {
            constructor: Person,
            getName: function () {
                console.log(this.name);
            }
        }
    }
}

var person1 = new Person('kevin');
var person2 = new Person('daisy');

// 报错 并没有该方法
person1.getName();

// 注释掉上面的代码，这句是可以执行的。
person2.getName();
```

为了解释这个问题，假设开始执行`var person1 = new Person('kevin')`。

如果对 new 和 apply 的底层执行过程不是很熟悉，可以阅读底部相关链接中的文章。

我们回顾下 new 的实现步骤：

1. 首先新建一个对象
2. 然后将对象的原型指向 Person.prototype
3. 然后 Person.apply(obj)
4. 返回这个对象

注意这个时候，回顾下 apply 的实现步骤，会执行 obj.Person 方法，这个时候就会执行 if 语句里的内容，注意构造函数的 prototype 属性指向了实例的原型，使用字面量方式直接覆盖 Person.prototype，并不会更改实例的原型的值，person1 依然是指向了以前的原型，而不是 Person.prototype。而之前的原型是没有 getName 方法的，所以就报错了！

如果你就是想用字面量方式写代码，可以尝试下这种：

```javascript
function Person(name) {
    this.name = name;
    if (typeof this.getName != "function") {
        Person.prototype = {
            constructor: Person,
            getName: function () {
                console.log(this.name);
            }
        }
        return new Person(name);
    }
}

var person1 = new Person('kevin');
var person2 = new Person('daisy');

person1.getName(); // kevin
person2.getName();  // daisy
```

### 5.寄生构造函数

#### 5.1 寄生构造函数模式

```javascript
function Person(name) {

    var o = new Object();
    o.name = name;
    o.getName = function () {
        console.log(this.name);
    };

    return o;

}

var person1 = new Person('kevin');
console.log(person1 instanceof Person) // false
console.log(person1 instanceof Object)  // true
```

寄生构造函数模式，我个人认为应该这样读：

寄生-构造函数-模式，也就是说寄生在构造函数的一种方法。

也就是说打着构造函数的幌子挂羊头卖狗肉，你看创建的实例使用 instanceof 都无法指向构造函数！

这样方法可以在特殊情况下使用。比如我们想创建一个具有额外方法的特殊数组，但是又不想直接修改Array构造函数，我们可以这样写：

```javascript
function SpecialArray() {
    var values = new Array();

    for (var i = 0, len = arguments.length; i < len; i++) {
        values.push(arguments[i]);
    }

    values.toPipedString = function () {
        return this.join("|");
    };
    return values;
}

var colors = new SpecialArray('red', 'blue', 'green');
var colors2 = SpecialArray('red2', 'blue2', 'green2');


console.log(colors);
console.log(colors.toPipedString()); // red|blue|green

console.log(colors2);
console.log(colors2.toPipedString()); // red2|blue2|green2
```

你会发现，其实所谓的**寄生构造函数模式就是比工厂模式在创建对象的时候，多使用了一个new，实际上两者的结果是一样的。**

但是作者可能是希望能像使用普通 Array 一样使用 SpecialArray，虽然把 SpecialArray 当成函数也一样能用，但是这并不是作者的本意，也变得不优雅。

在可以使用其他模式的情况下，不要使用这种模式。

但是值得一提的是，上面例子中的循环：

```javascript
for (var i = 0, len = arguments.length; i < len; i++) {
    values.push(arguments[i]);
}
```

可以替换成：

```javascript
values.push.apply(values, arguments);
```

#### 5.2 稳妥构造函数模式

```javascript
function person(name){
    var o = new Object();
    o.sayName = function(){
        console.log(name);
    };
    return o;
}

var person1 = person('kevin');

person1.sayName(); // kevin

person1.name = "daisy";

person1.sayName(); // kevin

console.log(person1.name); // daisy
```

所谓稳妥对象，指的是没有公共属性，而且其方法也不引用 this 的对象。

与寄生构造函数模式有两点不同：

1. 新创建的实例方法不引用 this
2. 不使用 new 操作符调用构造函数

稳妥对象最适合在一些安全的环境中。

稳妥构造函数模式也跟工厂模式一样，无法识别对象所属类型。

#### 面向对象

##### 原型链

JavaScript对每个创建的对象都会设置一个原型，指向它的原型对象。

当我们用`obj.xxx`访问一个对象的属性时，JavaScript引擎先在当前对象上查找该属性，如果没有找到，就到其原型对象上找，如果还没有找到，就一直上溯到`Object.prototype`对象，最后，如果还没有找到，就只能返回`undefined`。

```javascript
//数组原型链
arr ----> Array.prototype ----> Object.prototype ----> null
//函数原型链
foo ----> Function.prototype ----> Object.prototype ----> null
```

##### 构造函数

```javascript
function Student(name) {
    this.name = name;
    this.hello = function () {
        alert('Hello, ' + this.name + '!');
    }
}
```

如果不写`new`，这就是一个普通函数，它返回`undefined`。但是，如果写了`new`，它就变成了一个构造函数，它绑定的`this`指向新创建的对象，并默认返回`this`，也就是说，不需要在最后写`return this;`。

新创建的`xiaoming`的原型链是：

```javascript
xiaoming ----> Student.prototype ----> Object.prototype ----> null
```



请利用构造函数定义`Cat`，并让所有的Cat对象有一个`name`属性，并共享一个方法`say()`，返回字符串`'Hello, xxx!'`：

```javascript
function Cat(name){
    this.name=name
}
Cat.prototype.say=function(){
    return 'hello,'+this.name
}
```

##### 原型继承

JavaScript的原型继承实现方式就是：

1. 定义新的构造函数，并在内部用`call()`调用希望“继承”的构造函数，并绑定`this`；
2. 借助中间函数`F`实现原型链继承，最好通过封装的`inherits`函数完成；
3. 继续在新的构造函数的原型上定义新方法。

![1563096746698](C:\Users\Ying\AppData\Roaming\Typora\typora-user-images\1563096746698.png)



如果把继承这个动作用一个`inherits()`函数封装起来，还可以隐藏`F`的定义，并简化代码：

```javascript
function inherits(Child, Parent) {
    var F = function () {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}
```

这个`inherits()`函数可以复用：

```javascript
function Student(props) {
    this.name = props.name || 'Unnamed';
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
}

function PrimaryStudent(props) {
    Student.call(this, props);
    this.grade = props.grade || 1;
}

// 实现原型继承链:
inherits(PrimaryStudent, Student);

// 绑定其他方法到PrimaryStudent原型:
PrimaryStudent.prototype.getGrade = function () {
    return this.grade;
};
```

##### class继承

新的关键字`class`从ES6开始正式被引入到JavaScript中。`class`的目的就是让定义类更简单。

我们先回顾用函数实现`Student`的方法：

```javascript
function Student(name) {
    this.name = name;
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
}
```

如果用新的`class`关键字来编写`Student`，可以这样写：

```javascript
class Student {
    constructor(name) {
        this.name = name;
    }

    hello() {
        alert('Hello, ' + this.name + '!');
    }
}
```

比较一下就可以发现，`class`的定义包含了构造函数`constructor`和定义在原型对象上的函数`hello()`（注意没有`function`关键字），这样就避免了`Student.prototype.hello = function () {...}`这样分散的代码。

最后，创建一个`Student`对象代码和前面章节完全一样：

```javascript
var xiaoming = new Student('小明');
xiaoming.hello();
```

用`class`定义对象的另一个巨大的好处是继承更方便了。想一想我们从`Student`派生一个`PrimaryStudent`需要编写的代码量。现在，原型继承的中间对象，原型对象的构造函数等等都不需要考虑了，直接通过`extends`来实现：

```javascript
class PrimaryStudent extends Student {
    constructor(name, grade) {
        super(name); // 记得用super调用父类的构造方法!
        this.grade = grade;
    }
    myGrade() {
        alert('I am at grade ' + this.grade);
    }
}
```

注意`PrimaryStudent`的定义也是class关键字实现的，而`extends`则表示原型链对象来自`Student`。子类的构造函数可能会与父类不太相同，例如，`PrimaryStudent`需要`name`和`grade`两个参数，并且需要通过`super(name)`来调用父类的构造函数，否则父类的`name`属性无法正常初始化。

`PrimaryStudent`已经自动获得了父类`Student`的`hello`方法，我们又在子类中定义了新的`myGrade`方法。

ES6引入的`class`和原有的JavaScript原型继承有什么区别呢？实际上它们没有任何区别，`class`的作用就是让JavaScript引擎去实现原来需要我们自己编写的原型链代码。简而言之，用`class`的好处就是极大地简化了原型链代码。

练习：

请利用`class`重新定义`Cat`，并让它从已有的`Animal`继承，然后新增一个方法`say()`，返回字符串`'Hello, xxx!'`：

```javascript
'use strict';
class Animal {
    constructor(name) {
        this.name = name;
    }
}
class Cat extends Animal{
    constructor(name){
        super(name);

    }
    say(){
        return 'Hello, '+this.name+'!';
    }
}
```

## 深浅拷贝

### 1.浅拷贝

**即复制引用的拷贝方法，如果原地址中对象被改变了，那么浅复制出来的对象也会相应改变。**

#### 数组的浅拷贝

如果是数组，我们可以利用数组的一些方法比如：slice、concat 返回一个新数组的特性来实现拷贝。

比如：

```javascript
var arr = ['old', 1, true, null, undefined];

var new_arr = arr.concat();

new_arr[0] = 'new';

console.log(arr) // ["old", 1, true, null, undefined]
console.log(new_arr) // ["new", 1, true, null, undefined]
```

用 slice 可以这样做：

```javascript
var new_arr = arr.slice();
```

但是如果数组嵌套了对象或者数组的话，比如：

```javascript
var arr = [{old: 'old'}, ['old']];

var new_arr = arr.concat();

arr[0].old = 'new';
arr[1][0] = 'new';

console.log(arr) // [{old: 'new'}, ['new']]
console.log(new_arr) // [{old: 'new'}, ['new']]
```

我们会发现，无论是新数组还是旧数组都发生了变化，也就是说使用 concat 方法，克隆的并不彻底。

如果数组元素是基本类型，就会拷贝一份，互不影响，而如果是对象或者数组，就会只拷贝对象和数组的引用，这样我们无论在新旧数组进行了修改，两者都会发生变化。

#### 浅拷贝的实现

遍历对象，然后把属性和属性值都放在一个新的对象。

```javascript
var shallowCopy=function (obj) {
    if(typeof obj!=='object')
        return;
    var newObj=obj instanceof Array?[]:{};
    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            newObj[key]=obj[key];
        }
    }
    return newObj;
}
```

因为浅复制只会将对象的各个属性进行依次复制，并不会进行递归复制，而 JavaScript 存储对象都是存地址的，所以浅复制会导致 obj.arr 和 shallowObj.arr 指向同一块内存地址.

### 2.深拷贝

**计算机中开辟了一块新的内存地址用于存放复制的对象。**深复制不同，它不仅将原对象的各个属性逐个复制出去，而且将原对象各个属性所包含的对象也依次采用深复制的方法递归复制到新对象上。

#### 数组的深拷贝

那如何深拷贝一个数组呢？这里介绍一个技巧，**不仅适用于数组还适用于对象**！那就是：

```javascript
var arr = ['old', 1, true, ['old1', 'old2'], {old: 1}]
var new_arr = JSON.parse( JSON.stringify(arr) );
console.log(new_arr);
```

但是， undefined 、 function 、 symbol （ES6+）和包含循环引用（对象之间相互引用，形成一个无限循环）的对象都不符合 JSON 结构标准，支持 JSON 的语言无法处理它们。

#### 深拷贝的实现

在拷贝的时候判断一下属性值的类型，如果是对象，我们递归调用深拷贝函数。

```javascript
var obj = { 
    a:1, 
    arr: [1,2]，
    nation : '中国',
    birthplaces:['北京','上海','广州']
};
//深复制，要想达到深复制就需要用递归
var deepCopy=function (obj) {
    if(typeof obj!=='object')
        return;
    var newObj=obj instanceof Array?[]:{};
    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            newObj[key]=typeof obj[key] === 'object'?deepCopy(obj[key]):obj[key];
        }
    }
    return newObj;
}
```

深拷贝因为使用递归，在性能上不如浅拷贝，在开发中根据实际情况进行选择。

## jQuery中的extend（待看）

## 数组扁平化

### 1.递归

循环数组元素，如果还是一个数组，就递归调用该方法.

```javascript
function flatten(arr) {
    var result=[];
    for(var i=0;i<arr.length;i++){
        if(Array.isArray(arr[i])){
            result=result.concat(flatten(arr[i]));
        }else{
            result.push(arr[i])
        }
    }
    return result;
}
```

### 2.toString

如果数组的元素都是数字，那么可以考虑使用 toString 方法，返回了一个逗号分隔的扁平的字符串，这时候我们再 split，然后转成数字不就可以实现扁平化。

```javascript
function flatten(arr) {
    return arr.toString().split(",").map(function (item) {
        return +item;//+号将‘1’转数字1
    })
}
```

### 3.reduce

reduce 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，接受四个参数：初始值（或者上一次回调函数的返回值），当前元素值，当前索引，调用 reduce 的数组。

**语法:**

```javascript
arr.reduce(callback,[initialValue])
```

- callback （执行数组中每个值的函数，包含四个参数）
  - previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
  - currentValue （数组中当前被处理的元素）
  - index （当前元素在数组中的索引）
  - array （调用 reduce 的数组）
- initialValue （作为第一次调用 callback 的第一个参数。）

```javascript
function flatten(arr) {
    return arr.reduce(function (pre,next) {
        return pre.concat(Array.isArray(next)?flatten(next):next)
    },[])
}
```

### 4.ES6扩展运算符

```javascript
function flatten(arr) {
    while (arr.some(item=>Array.isArray(item))){
        arr=[].concat(...arr);
    }
    return arr;
}
```

## JSON序列化与解析

JSON是一种数据格式，可以表示简单值，对象，数组三种类型。

对象的属性必须用双引号，没有变量与分号。

- JSON.stringify()：序列化为JSON对象
- JSON.parse()：解析为JS对象

```javascript
var obj={
    name:"alice",
    age:"12"
}
var jsonText=JSON.stringify(obj);
var text=JSON.parse(jsonText)
```

## 正则

https://any86.github.io/any-rule/

`手机号`

/^1(3|4|5|7|8)[0-9]{9}$/

`大写字母`

/^[A-Z]+$/

`日期：如2019-7-15`

/^\d{4}(-)(\[0-1][0-2]|\d)\1([0-2]\d|\d|30|31)$/ 其中1表示第一个括号出现的模式

`email地址`

/^\w+@[a-z0-9]+\.[a-z]+$/i

`身份证号`

/(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/

`账号是否合法（字母开头，允许5-16字节以及字母数字下划线）`

/^\[a-zA-Z][a-zA-Z0-9_]{4,15}$/

`匹配小数`

/^\d+\.\d+$/

`匹配HTML标签`

/^<(.*)>.\*<\/\1>|<(.\*)\/>/

`密码强度正则，最少6位，至少包括一个大写字母，1个小写，1个数字，1个特殊字符`

`16进制颜色`

/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/

`IPV4地址`

/^(?:(?:25[0-5]|2\[0-4][0-9]|[01]?\[0-9][0-9]?)\.){3}(?:25[0-5]|2\[0-4][0-9]|[01]?\[0-9][0-9]?)$/

`微信号6至20位，以字母开头，字母，数字，减号，下划线`

/^\[a-zA-Z][-_a-zA-Z0-9]{5,19}$/

`邮编`

/^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/

`非字母`

/^\[^A-Za-z]*$/

`中文`

/^[\u4E00-\u9FA5]+$/

```javascript
//test()搜索字符串指定的值，根据结果并返回真假
var patt1=new RegExp("e");
document.write(patt1.test("The best things in life are free"));
//exec()方法检索字符串中的指定值。返回值是被找到的值。如果没有发现匹配，则返回 null。
var patt1=new RegExp("e");
document.write(patt1.exec("The best things in life are free"));
```

## DOM结构

获取DOM节点：最常用的方法是`document.getElementById()`和`document.getElementsByTagName()`，以及CSS选择器`document.getElementsByClassName()`。

由于ID在HTML文档中是唯一的，所以`document.getElementById()`可以直接定位唯一的一个DOM节点。`document.getElementsByTagName()`和`document.getElementsByClassName()`总是返回一组DOM节点。要精确地选择DOM，可以先定位父节点，再从父节点开始选择，以缩小范围。

```html
<div id="test-div">
<div class="c-red">
    <p id="test-p">JavaScript</p>
    <p>Java</p>
  </div>
  <div class="c-red c-green">
    <p>Python</p>
    <p>Ruby</p>
    <p>Swift</p>
  </div>
  <div class="c-green">
    <p>Scheme</p>
    <p>Haskell</p>
  </div>
</div>
```

```javascript
// 选择<p>JavaScript</p>:
var js = document.getElementById('test-p');

// 选择<p>Python</p>,<p>Ruby</p>,<p>Swift</p>:
var arr = document.getElementsByClassName('c-red')[1].getElementsByTagName('p');

// 选择<p>Haskell</p>:
var haskell = document.getElementsByClassName('c-green')[1].getElementsByTagName('p')[1];

```

##### 修改DOM

一种是修改`innerHTML`属性，这个方式非常强大，不但可以修改一个DOM节点的文本内容，还可以直接通过HTML片段修改DOM节点内部的子树：

```javascript
// 获取<p id="p-id">...</p>
var p = document.getElementById('p-id');
// 设置文本为abc:
p.innerHTML = 'ABC'; // <p id="p-id">ABC</p>
// 设置HTML:
p.innerHTML = 'ABC <span style="color:red">RED</span> XYZ';
// <p>...</p>的内部结构已修改
```

用`innerHTML`时要注意，是否需要写入HTML。如果写入的字符串是通过网络拿到了，要注意对字符编码来避免XSS攻击。

第二种是修改`innerText`或`textContent`属性，这样可以自动对字符串进行HTML编码，保证无法设置任何HTML标签：

```javascript
// 获取<p id="p-id">...</p>
var p = document.getElementById('p-id');
// 设置文本:
p.innerText = '<script>alert("Hi")</script>';
// HTML被自动编码，无法设置一个<script>节点:
// <p id="p-id">&lt;script&gt;alert("Hi")&lt;/script&gt;</p>
```

两者的区别在于读取属性时，`innerText`不返回隐藏元素的文本，而`textContent`返回所有文本。另外注意IE<9不支持`textContent`。

修改CSS也是经常需要的操作。DOM节点的`style`属性对应所有的CSS，可以直接获取或设置。因为CSS允许`font-size`这样的名称，但它并非JavaScript有效的属性名，所以需要在JavaScript中改写为驼峰式命名`fontSize`：

```javascript
// 获取<p id="p-id">...</p>
var p = document.getElementById('p-id');
// 设置CSS:
p.style.color = '#ff0000';
p.style.fontSize = '20px';
p.style.paddingTop = '2em';
```

##### 插入DOM

当我们获得了某个DOM节点，想在这个DOM节点内插入新的DOM，应该如何做？

如果这个DOM节点是空的，例如，`<div></div>`，那么，直接使用`innerHTML = '<span>child</span>'`就可以修改DOM节点的内容，相当于“插入”了新的DOM节点。

如果这个DOM节点不是空的，那就不能这么做，因为`innerHTML`会直接替换掉原来的所有子节点。

有两个办法可以插入新的节点。一个是使用`appendChild`，把一个子节点添加到父节点的最后一个子节点。例如：

```html
<!-- HTML结构 -->
<p id="js">JavaScript</p>
<div id="list">
    <p id="java">Java</p>
    <p id="python">Python</p>
    <p id="scheme">Scheme</p>
</div>
```

把`<p id="js">JavaScript</p>`添加到`<div id="list">`的最后一项：

```javascript
var
    js = document.getElementById('js'),
    list = document.getElementById('list');
list.appendChild(js);
```

现在，HTML结构变成了这样：

```html
<!-- HTML结构 -->
<div id="list">
    <p id="java">Java</p>
    <p id="python">Python</p>
    <p id="scheme">Scheme</p>
    <p id="js">JavaScript</p>
</div>
```

因为我们插入的`js`节点已经存在于当前的文档树，因此这个节点首先会从原先的位置删除，再插入到新的位置。

更多的时候我们会从零创建一个新的节点，然后插入到指定位置：

```javascript
var
    list = document.getElementById('list'),
    haskell = document.createElement('p');
haskell.id = 'haskell';
haskell.innerText = 'Haskell';
list.appendChild(haskell);
```

这样我们就动态添加了一个新的节点：

```html
<!-- HTML结构 -->
<div id="list">
    <p id="java">Java</p>
    <p id="python">Python</p>
    <p id="scheme">Scheme</p>
    <p id="haskell">Haskell</p>
</div>
```

动态创建一个节点然后添加到DOM树中，可以实现很多功能。举个例子，下面的代码动态创建了一个`<style>`节点，然后把它添加到`<head>`节点的末尾，这样就动态地给文档添加了新的CSS定义：

```javascript
var d = document.createElement('style');
d.setAttribute('type', 'text/css');
d.innerHTML = 'p { color: red }';
document.getElementsByTagName('head')[0].appendChild(d);
```

可以在Chrome的控制台执行上述代码，观察页面样式的变化。

###### insertBefore

如果我们要把子节点插入到指定的位置怎么办？可以使用`parentElement.insertBefore(newElement, referenceElement);`，子节点会插入到`referenceElement`之前。

还是以上面的HTML为例，假定我们要把`Haskell`插入到`Python`之前：

```html
<!-- HTML结构 -->
<div id="list">
    <p id="java">Java</p>
    <p id="python">Python</p>
    <p id="scheme">Scheme</p>
</div>
```

可以这么写：

```javascript
var
    list = document.getElementById('list'),
    ref = document.getElementById('python'),
    haskell = document.createElement('p');
haskell.id = 'haskell';
haskell.innerText = 'Haskell';
list.insertBefore(haskell, ref);
```

新的HTML结构如下：

```html
<!-- HTML结构 -->
<div id="list">
    <p id="java">Java</p>
    <p id="haskell">Haskell</p>
    <p id="python">Python</p>
    <p id="scheme">Scheme</p>
</div>
```

可见，使用`insertBefore`重点是要拿到一个“参考子节点”的引用。很多时候，需要循环一个父节点的所有子节点，可以通过迭代`children`属性实现：

```javascript
var
    i, c,
    list = document.getElementById('list');
for (i = 0; i < list.children.length; i++) {
    c = list.children[i]; // 拿到第i个子节点
}
```

练习：按字符串顺序重新排序DOM节点

```html
<ol id="test-list">
    <li class="lang">Scheme</li>
    <li class="lang">JavaScript</li>
    <li class="lang">Python</li>
    <li class="lang">Ruby</li>
    <li class="lang">Haskell</li>
</ol>
<script>
	var list=document.getElementById('test-list')
    var li=list.children
    for(let i=0,len=li.length;i<len;i++){
        for(let j=1;j<len-i;j++){
            if(li[j-1].innerText>li[j].innerText){
                list.insertBefore(li[j],li[j-1])
            }
        }
    }
</script>
```

##### 删除DOM

要删除一个节点，首先要获得该节点本身以及它的父节点，然后，调用父节点的`removeChild`把自己删掉：

```javascript
// 拿到待删除节点:
var self = document.getElementById('to-be-removed');
// 拿到父节点:
var parent = self.parentElement;
// 删除:
var removed = parent.removeChild(self);
removed === self; // true
```

注意到删除后的节点虽然不在文档树中了，但其实它还在内存中，可以随时再次被添加到别的位置。

当你遍历一个父节点的子节点并进行删除操作时，要注意，`children`属性是一个只读属性，并且它在子节点变化时会实时更新。

例如，对于如下HTML结构：

```html
<div id="parent">
    <p>First</p>
    <p>Second</p>
</div>
```

当我们用如下代码删除子节点时：

```javascript
var parent = document.getElementById('parent');
parent.removeChild(parent.children[0]);
parent.removeChild(parent.children[1]); // <-- 浏览器报错
```

浏览器报错：`parent.children[1]`不是一个有效的节点。原因就在于，当`<p>First</p>`节点被删除后，`parent.children`的节点数量已经从2变为了1，索引`[1]`已经不存在了。

**因此，删除多个节点时，要注意`children`属性时刻都在变化**。

#### BOM

(1)location对象

location.href-- 返回或设置当前文档的URL
location.search -- 返回URL中的查询字符串部分。例如 http://www.dreamdu.com/dreamdu.php?id=5&name=dreamdu 返回包括(?)后面的内容?id=5&name=dreamdu
location.hash -- 返回URL#后面的内容，如果没有#，返回空
location.host -- 返回URL中的域名部分，例如[www.dreamdu.com](http://www.dreamdu.com/)
location.hostname -- 返回URL中的主域名部分，例如dreamdu.com
location.pathname -- 返回URL的域名后的部分。例如 http://www.dreamdu.com/xhtml/ 返回/xhtml/
location.port -- 返回URL中的端口部分。例如 http://www.dreamdu.com:8080/xhtml/ 返回8080
location.protocol -- 返回URL中的协议部分。例如 http://www.dreamdu.com:8080/xhtml/ 返回(//)前面的内容http:
location.assign -- 设置当前文档的URL
location.replace() -- 设置当前文档的URL，并且在history对象的地址列表中移除这个URL location.replace(url);
location.reload() -- 重载当前页面

(2)history对象

history.go() -- 前进或后退指定的页面数 history.go(num);
history.back() -- 后退一页
history.forward() -- 前进一页

(3)Navigator对象

navigator.userAgent -- 返回用户代理头的字符串表示(就是包括浏览器版本信息等的字符串)
navigator.cookieEnabled -- 返回浏览器是否支持(启用)cookie

#### 获取页面上出现次数最多的标签

```javascript
//按tagName获取页面上所有标签，并统计出现次数
function getDomCounts() {
        let nodes=document.getElementsByTagName("*");
        let tags={};
        for(let i=0;i<nodes.length;i++){
            var tagName=nodes[i].tagName.toLowerCase();
            if(tags[tagName]){
                tags[tagName]++;
            }else{
                tags[tagName]=1;
            }
        }
        return tags;
}
//对象排序
function sortTags(tags) {
    //Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组,其元素来自于从给定的object上面可直接枚举的属性。这些属性的顺序与手动遍历该对象属性时的一致。
       return Object.keys(tags).sort((a,b)=>{
          return tags[b]-tags[a];
       })
}
let tags=getDomCounts();
console.log(tags)
let afterSort=sortTags(tags);
console.log(afterSort[0]+":"+tags[afterSort[0]]);
```

```javascript
// simple array
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

// array like object
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

// array like object with random key ordering
var anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj)); // console: ['2', '7', '100']
```

类数组对象按照值排序

```javascript
var tag={
    a: 5,
    body: 1,
    div: 4,
    head: 1,
    html: 1,
    img: 7,
    li: 10,
    link: 1,
    meta: 1,
    script: 3,
    title: 1,
    ul: 2
}
var t=Object.keys(tag).sort((a,b)=>{
   return tag[b]-tag[a]//不能写成tag[b]>tag[a]
});
//['li','img','a'...]
```

## 函数上下文

在函数上下文中，我们用活动对象(activation object, AO)来表示变量对象。

活动对象和变量对象其实是一个东西，只是变量对象是规范上的或者说是引擎实现上的，不可在 JavaScript 环境中访问，只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活，所以才叫 activation object 呐，而只有被激活的变量对象，也就是活动对象上的各种属性才能被访问。

活动对象是在进入函数上下文时刻被创建的，它通过函数的 arguments 属性初始化。arguments 属性值是 Arguments 对象。

### 执行过程

执行上下文的代码会分成两个阶段进行处理：分析和执行，我们也可以叫做：

1. 进入执行上下文
2. 代码执行

#### 进入执行上下文

当进入执行上下文时，这时候还没有执行代码，

变量对象会包括：

1. 函数的所有形参 (如果是函数上下文)
   - 由名称和对应值组成的一个变量对象的属性被创建
   - 没有实参，属性值设为 undefined
2. 函数声明
   - 由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建
   - 如果变量对象已经存在相同名称的属性，则完全替换这个属性
3. 变量声明
   - 由名称和对应值（undefined）组成一个变量对象的属性被创建；
   - 如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性

举个例子：

```javascript
function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};

  b = 3;

}

foo(1);
```

在进入执行上下文后，这时候的 AO 是：

```javascript
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: undefined,
    c: reference to function c(){},
    d: undefined
}
```

#### 代码执行

在代码执行阶段，会顺序执行代码，根据代码，修改变量对象的值

还是上面的例子，当代码执行完后，这时候的 AO 是：

```javascript
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: 3,
    c: reference to function c(){},
    d: reference to FunctionExpression "d"
}
```

到这里变量对象的创建过程就介绍完了，让我们简洁的总结我们上述所说：

1. 全局上下文的变量对象初始化是全局对象
2. 函数上下文的变量对象初始化只包括 Arguments 对象
3. 在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值
4. 在代码执行阶段，会再次修改变量对象的属性值

### 思考题

最后让我们看几个例子：

1.第一题

```javascript
function foo() {
    console.log(a);
    a = 1;
}

foo(); // ???

function bar() {
    a = 1;
    console.log(a);
}
bar(); // ???
```

第一段会报错：`Uncaught ReferenceError: a is not defined`。

第二段会打印：`1`。

这是因为函数中的 "a" 并没有通过 var 关键字声明，所有不会被存放在 AO 中。

第一段执行 console 的时候， AO 的值是：

```javascript
AO = {
    arguments: {
        length: 0
    }
}
```

没有 a 的值，然后就会到全局去找，全局也没有，所以会报错。

当第二段执行 console 的时候，全局对象已经被赋予了 a 属性，这时候就可以从全局找到 a 的值，所以会打印 1。

2.第二题

```javascript
console.log(foo);

function foo(){
    console.log("foo");
}

var foo = 1;
```

会打印函数，而不是 undefined 。

这是因为在进入执行上下文时，首先会处理函数声明，其次会处理变量声明，如果如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。

### 作用域链

**当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。**

## 垃圾回收

什么是垃圾？

没有被引用的对象就是垃圾，就是要被清除，如果几个对象引用形成一个环，互相引用，但根访问不到它们，这几个对象也是垃圾，也要被清除。

#### 1.引用计次（初期）

当对象被一个变量引用一次，次数就加1，当被引用次数为0时，就被回收。潜在的一个问题是：循环引用时，两个对象都至少被引用了一次a引用b，b又引用了a，将不能自动被回收。所以导致，我们常讲的内存泄露。

#### 2.标记清除（目前）

给存储在内存的变量加上标记，然后去掉环境中的变量以及被环境中的变量引用的变量的标记，最后回收那些还带有标记变量。