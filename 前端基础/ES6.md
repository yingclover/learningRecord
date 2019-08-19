## let和const

#### 特点与区别

块级作用域存在于：

- 函数内部
- 块中(字符 { 和 } 之间的区域)

外层代码块不受内层代码块的影响，外层作用域无法读取内层作用域内的变量，所以内层作用域可以定义外层作用域相同的变量名。

二者特点：

**1.不会被提升**

```javascript
if (false) {
    let value = 1;
}
console.log(value); // Uncaught ReferenceError: value is not defined
```

**2.重复声明报错**

```javascript
var value = 1;
let value = 2; // Uncaught SyntaxError: Identifier 'value' has already been declared
```

**3.不绑定全局作用域**

当在全局作用域中使用 var 声明的时候，会创建一个新的全局变量作为全局对象的属性。

```javascript
var value = 1;
console.log(window.value); // 1
```

然而 let 和 const 不会：

```javascript
let value = 1;
console.log(window.value); // undefined
```

let和const区别

const 用于声明常量，其值一旦被设定不能再被修改，否则会报错。

值得一提的是：const 声明不允许修改绑定，但允许修改值。这意味着当用 const 声明对象时：

```javascript
const data = {
    value: 1
}

// 没有问题
data.value = 2;
data.num = 3;

// 报错
data = {}; // Uncaught TypeError: Assignment to constant variable.
```

#### 暂时性死区

只要块级作用域内存在let或者const，它所声明的变量就绑定这个区域，不再受外部影响，即在代码块内，变量在用let或者const声明之前都不可用。

```javascript
console.log(typeof value); // Uncaught ReferenceError: value is not defined
let value = 1;
```

这是因为 JavaScript 引擎在扫描代码发现变量声明时，要么将它们提升到作用域顶部(遇到 var 声明)，要么将声明放在 TDZ 中(遇到 let 和 const 声明)。访问 TDZ 中的变量会触发运行时错误。只有执行过变量声明语句后，变量才会从 TDZ 中移出，然后方可访问。

看似很好理解，不保证你不犯错：

```javascript
var value = "global";

// 例子1
(function() {
    console.log(value);
    let value = 'local';
}());

// 例子2
{
    console.log(value);
    const value = 'local';
};
```

两个例子中，结果并不会打印 "global"，而是报错 `Uncaught ReferenceError: value is not defined`，就是因为 TDZ 的缘故。

#### 循环中的块级作用域

```javascript
var funcs = [];
for (var i = 0; i < 3; i++) {
    funcs[i] = function () {
        console.log(i);
    };
}
funcs[0](); // 3
```

一个老生常谈的面试题，解决方案如下：

```javascript
var funcs = [];
for (var i = 0; i < 3; i++) {
    funcs[i] = (function(i){
        return function() {
            console.log(i);
        }
    }(i))
}
funcs[0](); // 0
```

ES6 的 let 为这个问题提供了新的解决方法：

```javascript
var funcs = [];
for (let i = 0; i < 3; i++) {
    funcs[i] = function () {
        console.log(i);
    };
}
funcs[0](); // 0
```

在 `for (let i = 0; i < 3; i++)` 中，即圆括号之内建立一个隐藏的作用域，这就可以解释为什么:

```javascript
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```

然后**每次迭代循环时都创建一个新变量，并以之前迭代中同名变量的值将其初始化**。这样对于下面这样一段代码

```javascript
var funcs = [];
for (let i = 0; i < 3; i++) {
    funcs[i] = function () {
        console.log(i);
    };
}
funcs[0](); // 0
```

就相当于：

```javascript
// 伪代码
(let i = 0) {
    funcs[0] = function() {
        console.log(i)
    };
}
(let i = 1) {
    funcs[1] = function() {
        console.log(i)
    };
}
(let i = 2) {
    funcs[2] = function() {
        console.log(i)
    };
};
```

当执行函数的时候，根据词法作用域就可以找到正确的值，其实你也可以理解为 let 声明模仿了闭包的做法来简化循环过程。

#### Babel

在 Babel 中是如何编译 let 和 const 的呢?const直接在编译时报错

```javascript
let value = 1;
{
    let value = 2;
}
value = 3;
var value = 1;
{
    var _value = 2;
}
value = 3;
```

## 模板字符串

#### 基础用法

什么是模板字符串？

> 模板字符串是增强版字符串，用反引号（`）标识，可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

```javascript
let message = `Hello World`;
console.log(message);
```

如果你碰巧要在字符串中使用反撇号，你可以使用反斜杠转义：

```javascript
let message = `Hello \` World`;
console.log(message);
```

值得一提的是，在模板字符串中，空格、缩进、换行都会被保留：

```javascript
let message = `
	<ul>
		<li>1</li>
		<li>2</li>
	</ul>
`;
console.log(message);
```

打印的结果中第一行是一个换行，你可以使用 trim 函数消除换行：

```javascript
let message = `
	<ul>
		<li>1</li>
		<li>2</li>
	</ul>
`.trim();
console.log(message);
```

#### 嵌入变量

模板字符串支持嵌入变量，只需要将变量名写在 ${} 之中，其实不止变量，任意的 JavaScript 表达式都是可以的：

```javascript
let x = 1, y = 2;
let message = `<ul><li>${x}</li><li>${x + y}</li></ul>`;
console.log(message); // <ul><li>1</li><li>3</li></ul>
```

值得一提的是，模板字符串支持嵌套:

```javascript
let arr = [{value: 1}, {value: 2}];
let message = `
	<ul>
		${arr.map((item) => {
			return `
				<li>${item.value}</li>
			`
		}).join('')}//join 方法是因为当大括号中的值不是字符串时，会将其转为字符串，比如一个数组 [1, 2, 3] 就会被转为 1,2,3，就会产生逗号，可以用join消除
	</ul>
`;
console.log(message);
```

#### 标签模板

模板标签是一个非常重要的能力，模板字符串可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串，举个例子：

```javascript
let x = 'Hi', y = 'Kevin';
var res = message`${x}, I am ${y}`;
console.log(res);
```

我们可以自定义 message 函数来处理返回的字符串:

```javascript
// literals 文字
// 注意在这个例子中 literals 的第一个元素和最后一个元素都是空字符串
function message(literals, value1, value2) {
	console.log(literals); // [ "", ", I am ", "" ]
	console.log(value1); // Hi
	console.log(value2); // Kevin
}
```

可以利用这些参数将其拼回去

```javascript
function message(literals, ...values) {
    let result = '';

    for (let i = 0; i < values.length; i++) {
        result += literals[i];
        result += values[i];
    }

    result += literals[literals.length - 1];

    return result;
}
let x = 'Hi', y = 'Kevin';
var res = message`${x}, I am ${y}`;
console.log(res);//Hi,I am Kevin
```

讲完了基础，我们可以来看一些实际的需求：

```javascript
let message = `
	Hi,
	Daisy!
	I am
	Kevin.
`;
```

出于可读性或者其他原因，我希望书写的时候是换行的，但是最终输出的字符是在一行，这就需要借助模板标签来实现了，我们尝试写一个这样的函数：

```javascript
// oneLine 第一版
function oneLine(template, ...expressions) {
    let result = template.reduce((prev, next, i) => {
        let expression = expressions[i - 1];
        return prev + expression + next;
    });

    result = result.replace(/(\s+)/g, " ");
    result = result.trim();

    return result;
}
```

实现原理很简单，拼合回去然后将多个空白符如换行符、空格等替换成一个空格。

使用如下：

```javascript
let message = oneLine `
    Hi,
    Daisy!
    I am
    Kevin.
`;
console.log(message); // Hi, Daisy! I am Kevin.
```

## 箭头函数

#### 基本语法

```javascript
let func = value => value;
```

相当于：

```javascript
let func = function (value) {
    return value;
};
```

如果需要给函数传入多个参数：

```javascript
let func = (value, num) => value * num;
```

如果函数的代码块需要多条语句：

```javascript
let func = (value, num) => {
    return value * num
};
```

如果需要直接返回一个对象：

```javascript
let func = (value, num) => ({total: value * num});
```

与变量解构结合：

```javascript
let func = ({value, num}) => ({total: value * num})

// 使用
var result = func({
    value: 10,
    num: 10
})

console.log(result); // {total: 100}
```

很多时候，你可能想不到要这样用，所以再来举个例子，比如在 React 与 Immutable 的技术选型中，我们处理一个事件会这样做：

```javascript
handleEvent = () => {
  this.setState({
    data: this.state.data.set("key", "value")
  })
};
```

其实就可以简化为：

```javascript
handleEvent = () => {
  this.setState(({data}) => ({
    data: data.set("key", "value")
  }))
};
```

#### 比较

##### 1.没有 this

**箭头函数没有 this，所以需要通过查找作用域链来确定 this 的值。**

这就意味着如果箭头函数被非箭头函数包含，this 绑定的就是最近一层非箭头函数的 this。指向的是函数定义生效时所在的对象。

模拟一个实际开发中的例子：

我们的需求是点击一个按钮，改变该按钮的背景色。

为了方便开发，我们抽离一个 Button 组件，当需要使用的时候，直接：

```javascript
// 传入元素 id 值即可绑定该元素点击时改变背景色的事件
new Button("button")
```

HTML 代码如下：

```javascript
<button id="button">点击变色</button>
```

JavaScript 代码如下：

```javascript
function Button(id) {
    this.element = document.querySelector("#" + id);
    this.bindEvent();
}

Button.prototype.bindEvent = function() {
    this.element.addEventListener("click", this.setBgColor, false);
};

Button.prototype.setBgColor = function() {
    this.element.style.backgroundColor = '#1abc9c'
};

var button = new Button("button");
```

看着好像没有问题，结果却是报错 `Uncaught TypeError: Cannot read property 'style' of undefined`

这是因为当使用 addEventListener() 为一个元素注册事件的时候，事件函数里的 this 值是该元素的引用。

所以如果我们在 setBgColor 中 `console.log(this)`，this 指向的是按钮元素，那 this.element 就是 undefined，报错自然就理所当然了。

也许你会问，既然 this 都指向了按钮元素，那我们直接修改 setBgColor 函数为：

```javascript
Button.prototype.setBgColor = function() {
    this.style.backgroundColor = '#1abc9c'
};
```

不就可以解决这个问题了？

确实可以这样做，但是在实际的开发中，我们可能会在 setBgColor 中还调用其他的函数，比如写成这种：

```javascript
Button.prototype.setBgColor = function() {
    this.setElementColor();
    this.setOtherElementColor();
};
```

所以我们还是希望 setBgColor 中的 this 是指向实例对象的，这样就可以调用其他的函数。

利用 ES5，我们一般会这样做：

```javascript
Button.prototype.bindEvent = function() {
    this.element.addEventListener("click", this.setBgColor.bind(this), false);
};
```

为避免 addEventListener 的影响，使用 bind 强制绑定 setBgColor() 的 this 为实例对象

使用 ES6，我们可以更好的解决这个问题：

```javascript
Button.prototype.bindEvent = function() {
    this.element.addEventListener("click", event => this.setBgColor(event), false);
};
```

由于箭头函数没有 this，所以会向外层查找 this 的值，即 bindEvent 中的 this，此时 this 指向实例对象，所以可以正确的调用 this.setBgColor 方法， 而 this.setBgColor 中的 this 也会正确指向实例对象。

在这里再额外提一点，就是注意 bindEvent 和 setBgColor 在这里使用的是普通函数的形式，而非箭头函数，如果我们改成箭头函数，会导致函数里的 this 指向 window 对象 (非严格模式下)。

最后，因为箭头函数没有 this，所以也不能用 call()、apply()、bind() 这些方法改变 this 的指向，可以看一个例子：

```javascript
var value = 1;
var result = (() => this.value).bind({value: 2})();
console.log(result); // 1
```

##### 2. 没有 arguments

箭头函数没有自己的 arguments 对象，这不一定是件坏事，因为箭头函数可以访问外围函数的 arguments 对象：

```javascript
function constant() {
    return () => arguments[0]
}

var result = constant(1);
console.log(result()); // 1
```

那如果我们就是要访问箭头函数的参数呢？

你可以通过命名参数或者 rest 参数的形式访问参数:

```javascript
let nums = (...nums) => nums;
```

##### rest参数

形式为“...变量名”，用于获取函数的多余参数，变量是一个数组，rest参数后不能有其他参数，并且函数的length属性不包括rest参数。

##### 3. 不能通过 new 关键字调用

JavaScript 函数有两个内部方法：[[Call]] 和 [[Construct]]。

当通过 new 调用函数时，执行 [[Construct]] 方法，创建一个实例对象，然后再执行函数体，将 this 绑定到实例上。

当直接调用的时候，执行 [[Call]] 方法，直接执行函数体。

箭头函数并没有 [[Construct]] 方法，**不能被用作构造函数**，如果通过 new 的方式调用，会报错。

```javascript
var Foo = () => {};
var foo = new Foo(); // TypeError: Foo is not a constructor
```

##### 4. 没有 new.target

因为不能使用 new 调用，所以也没有 new.target 值。

关于 new.target，可以参考 [http://es6.ruanyifeng.com/#docs/class#new-target-%E5%B1%9E%E6%80%A7](http://es6.ruanyifeng.com/#docs/class#new-target-属性)

##### 5. 没有原型

由于不能使用 new 调用箭头函数，所以也没有构建原型的需求，于是箭头函数也不存在 prototype 这个属性。

```javascript
var Foo = () => {};
console.log(Foo.prototype); // undefined
```

##### 6. 没有 super

连原型都没有，自然也不能通过 super 来访问原型的属性，所以箭头函数也是没有 super 的，不过跟 this、arguments、new.target 一样，这些值由外围最近一层非箭头函数决定。

## 模拟实现Symbol类型

#### 关于Symbol

这是ES6引入的一种新的原始数据类型Symbol，表示独一无二的值。

**1. Symbol 值通过 Symbol 函数生成，使用 typeof，结果为 "symbol"**

```javascript
var s = Symbol();
console.log(typeof s); // "symbol"
```

**2. Symbol 函数前不能使用 new 命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。**

**3. instanceof 的结果为 false**

```javascript
var s = Symbol('foo');
console.log(s instanceof Symbol); // false
```

**4. Symbol 函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。**

```javascript
var s1 = Symbol('foo');
console.log(s1); // Symbol(foo)
```

**5. 如果 Symbol 的参数是一个对象，就会调用该对象的 toString 方法，将其转为字符串，然后才生成一个 Symbol 值。**

```javascript
const obj = {
  toString() {
    return 'abc';
  }
};
const sym = Symbol(obj);
console.log(sym); // Symbol(abc)
```

**6. Symbol 函数的参数只是表示对当前 Symbol 值的描述，相同参数的 Symbol 函数的返回值是不相等的。**

```javascript
// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();

console.log(s1 === s2); // false

// 有参数的情况
var s1 = Symbol('foo');
var s2 = Symbol('foo');

console.log(s1 === s2); // false
```

**7. Symbol 值不能与其他类型的值进行运算，会报错。**

```javascript
var sym = Symbol('My symbol');

console.log("your symbol is " + sym); // TypeError: can't convert symbol to string
```

**8. Symbol 值可以显式转为字符串，布尔值，不能转化为数字。**

```javascript
var sym = Symbol('My symbol');

console.log(String(sym)); // 'Symbol(My symbol)'
console.log(sym.toString()); // 'Symbol(My symbol)'
```

**9. Symbol 值可以作为标识符，用于对象的属性名，可以保证不会出现同名的属性。**

```javascript
var mySymbol = Symbol();

// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
var a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
console.log(a[mySymbol]); // "Hello!"
```

**10. Symbol 作为属性名，该属性不会出现在 for...in、for...of 循环中，也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify() 返回。但是，它也不是私有属性，有一个 Object.getOwnPropertySymbols 方法，可以获取指定对象的所有 Symbol 属性名。**

```javascript
var obj = {};
var a = Symbol('a');
var b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

var objectSymbols = Object.getOwnPropertySymbols(obj);

console.log(objectSymbols);
// [Symbol(a), Symbol(b)]
```

**11. 如果我们希望使用同一个 Symbol 值，可以使用 Symbol.for。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。 Symbol.for被登记在全局环境中供检索**

```javascript
var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');

console.log(s1 === s2); // true
```

**12. Symbol.keyFor 方法返回一个已登记的 Symbol 类型值的 key。**

```javascript
var s1 = Symbol.for("foo");
console.log(Symbol.keyFor(s1)); // "foo"，因为 Symbol.for方法有登记，而Symbol方法没有登记

var s2 = Symbol("foo");
console.log(Symbol.keyFor(s2) ); // undefined
```

## 迭代器与for of

所谓迭代器，其实就是一个具有 next() 方法的对象，每次调用 next() 都会返回一个结果对象，该结果对象有两个属性，value 表示当前的值，done 表示遍历是否结束。

ES5创建迭代器

```javascript
function createIterator(items) {
    var i=0;
    return {
        next:function () {
            var done=i>=items.length;
            var value=!done?items[i++]:undefined;
            return {
                done:done,
                value:value
            }
        }
    }
}
```

#### for of

除了迭代器之外，我们还需要一个可以遍历迭代器对象的方式，ES6 提供了 for of 语句

```javascript
var iterator = createIterator([1, 2, 3]);

for (let value of iterator) {
    console.log(value);
}
```

结果报错 `TypeError: iterator is not iterable`，表明我们生成的 iterator 对象并不是 iterable(可遍历的)。

那什么才是可遍历的呢？

其实一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。

ES6 规定，默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性，或者说，一个数据结构只要具有 Symbol.iterator 属性，就可以认为是"可遍历的"（iterable）。

举个例子：

```javascript
const obj = {
    value: 1
};

for (value of obj) {
    console.log(value);
}

// TypeError: iterator is not iterable
```

我们直接 for of 遍历一个对象，会报错，然而如果我们给该对象添加 Symbol.iterator 属性：

```javascript
const obj = {
    value: 1
};

obj[Symbol.iterator] = function() {
    return createIterator([1, 2, 3]);
};

for (value of obj) {
    console.log(value);
}

// 1
// 2
// 3
```

由此，我们也可以发现 for of 遍历的其实是对象的 Symbol.iterator 属性。

**ES6对一些数据结构默认部署了Symbol.iterator属性**

for of循环可以使用的范围包括：

> 1. 数组
> 2. Set
> 3. Map
> 4. 类数组对象，如arguments对象，DOM NodeList对象
> 5. Generator对象
> 6. 字符串

**for of 循环读取键名，for in循环读取键值**

#### 模拟实现for of

通过Symbol.iterator属性获取迭代器对象，然后用while遍历

```javascript
function forOf(obj, cb) {//迭代器对象，回调函数
    let iterable, result;

    if (typeof obj[Symbol.iterator] !== "function")
        throw new TypeError(result + " is not iterable");
    if (typeof cb !== "function") throw new TypeError("cb must be callable");

    iterable = obj[Symbol.iterator]();

    result = iterable.next();
    while (!result.done) {
        cb(result.value);
        result = iterable.next();
    }
}
```

#### 内建迭代器

为了更好的访问对象中的内容，比如有的时候我们仅需要数组中的值，但有的时候不仅需要使用值还需要使用索引，ES6 为数组、Map、Set 集合内建了以下三种迭代器：

> 1. entries() 返回一个遍历器对象，用来遍历[键名, 键值]组成的数组。对于数组，键名就是索引值。
> 2. keys() 返回一个遍历器对象，用来遍历所有的键名。
> 3. values() 返回一个遍历器对象，用来遍历所有的键值。

以数组为例：

```javascript
var colors = ["red", "green", "blue"];

for (let index of colors.keys()) {
    console.log(index);
}

// 0
// 1
// 2

for (let color of colors.values()) {
    console.log(color);
}

// red
// green
// blue

for (let item of colors.entries()) {
    console.log(item);
}

// [ 0, "red" ]
// [ 1, "green" ]
// [ 2, "blue" ]
```

Map 类型与数组类似，但是对于 Set 类型需要注意以下：

```javascript
var colors = new Set(["red", "green", "blue"]);

for (let index of colors.keys()) {
    console.log(index);
}

// red
// green
// blue

for (let color of colors.values()) {
    console.log(color);
}

// red
// green
// blue

for (let item of colors.entries()) {
    console.log(item);
}

// [ "red", "red" ]
// [ "green", "green" ]
// [ "blue", "blue" ]
```

Set 类型的 keys() 和 values() 返回的是相同的迭代器，这也意味着在 Set 这种数据结构中键名与键值相同。

**而且每个集合类型都有一个默认的迭代器，在 for-of 循环中，如果没有显式指定则使用默认的迭代器。数组和 Set 集合的默认迭代器是 values() 方法，Map 集合的默认迭代器是 entries() 方法。**

## Set和Map

#### 1.Set

> ES6提供的新的数据结构，类似于数组，但成员的值是唯一的，没有重复。
>
> Set本身是一个构造函数，用来生成Set数据结构，可以接受一个数组（或者具有iterable接口的其他数据结构作为参数）用来初始化。
>
> 向Set加入值不会发生类型转换，并且内部判断两个值是否相等的算法类似于“===”，但是在Set里面认为两个NaN相等，另外，两个对象是不相等的。
>
> Array.from(set)可以将Set变为数组。

**属性和方法：**

- 属性

  > Set.prototype.constructor:构造函数，默认就是Set函数
  >
  > Set.prototype.size:返回Set实例的成员总数

- 方法

  - 操作方法

    > 1. add(value)：添加某个值，返回 Set 结构本身。
    > 2. delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
    > 3. has(value)：返回一个布尔值，表示该值是否为 Set 的成员。
    > 4. clear()：清除所有成员，无返回值

  - 遍历方法

    > 1. keys()：返回键名的遍历器
    > 2. values()：返回键值的遍历器
    > 3. entries()：返回键值对的遍历器
    > 4. forEach()：使用回调函数遍历每个成员，无返回值

#### 2.WeakSet

WeakSet与Set相似，但与Set有两个区别：

- WeakSet的成员只能是对象，不能是其他类型的值
- WeakSet中的对象都是弱引用， 即垃圾回收机制不考虑WeakSet对该对象的引用，也就是说如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象是否还存在于WeakSet中，基于这个特点，WeakSet不可遍历。

#### 3.Map

> JavaScript的对象本质上是键值对的集合，但是只能用字符串作为键。ES6提供的Map数据结构，也是键值对的集合，但是键不限于字符串，各种类型的值包括对象，都可以当做键。
>
> 如果对同一个键多次赋值，后面的值将覆盖前面的值。
>
> 如果读取一个未知的键，则返回undefined。
>
> 只有对同一个对象的引用，Map结构才将其视为同一个键。Map的键与内存地址绑定，只要内存地址不一样，就视为两个键。
>
> 虽然js中NaN不等于自身，但是Map将其视为同一个键。
>
> 可以通过扩展运算符转换为数组。

属性和方法：

size属性返回Map结构的成员数

> 1. set(key,value)：设置key对应的键值。
> 2. get(key)：获取key对应键值。
> 3. has(key)：返回一个布尔值，表示该值是否在Map中。
> 4. delete(key)：删除某个键，返回一个布尔值，表示删除是否成功。
> 5. clear()：清除所有成员，无返回值

遍历方法同Set

#### 4.WeakMap

- 只接受对象做键名（null）除外
- 键名所指对象不计入垃圾回收机制，键名所引用的对象都是弱引用（是键名不是键值），有助于防止内存泄漏（由于疏忽或错误造成程序未能释放已不再使用的内存），他的专用场景就是**他的键所对应的对象可能会在将来消失的场景**

应用：

1. 在 DOM 对象上保存相关数据

传统使用 jQuery 的时候，我们会通过 $.data() 方法在 DOM 对象上储存相关信息(就比如在删除按钮元素上储存帖子的 ID 信息)，jQuery 内部会使用一个对象管理 DOM 和对应的数据，当你将 DOM 元素删除，DOM 对象置为空的时候，相关联的数据并不会被删除，你必须手动执行 $.removeData() 方法才能删除掉相关联的数据，WeakMap 就可以简化这一操作：

```javascript
let wm = new WeakMap(), element = document.querySelector(".element");
wm.set(element, "data");

let value = wm.get(elemet);
console.log(value); // data

element.parentNode.removeChild(element);
element = null;
```

2. 数据缓存

从上一个例子，我们也可以看出，当我们需要关联对象和数据，比如在不修改原有对象的情况下储存某些属性或者根据对象储存一些计算的值等，而又不想管理这些数据的死活时非常适合考虑使用 WeakMap。数据缓存就是一个非常好的例子：

```javascript
const cache = new WeakMap();
function countOwnKeys(obj) {
    if (cache.has(obj)) {
        console.log('Cached');
        return cache.get(obj);
    } else {
        console.log('Computed');
        const count = Object.keys(obj).length;
        cache.set(obj, count);
        return count;
    }
}
```

3. 私有属性

WeakMap 也可以被用于实现私有变量，不过在 ES6 中实现私有变量的方式有很多种，这只是其中一种：

```javascript
const privateData = new WeakMap();

class Person {
    constructor(name, age) {
        privateData.set(this, { name: name, age: age });
    }

    getName() {
        return privateData.get(this).name;
    }

    getAge() {
        return privateData.get(this).age;
    }
}

export default Person;
```

## Promise

Promise 是异步编程的一种解决方案，其实是一个构造函数，自己身上有all、reject、resolve这几个方法，原型上有then、catch等方法。

#### 特点

（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

#### 基本用法

Promise构造器接受一个函数作为参数，这个函数有两个参数：resolve，reject，分别代表这个Promise实例成功之后的回调函数和失败之后的回调函数，并将参数传递出去。Promise新建就会立即执行。

```javascript
let p=new Promise(function (resolve,reject) {
    var a=1;
    if(a==2){
        resolve(a);
    }else{
        reject('error');
    }
})
```

Promise实例生成后，可以用then方法分别指定resolve状态和reject状态的回调函数。then方法可以接受两个回调函数作为参数，第一个在状态变为resolved时调用，第二个在状态变为rejected时调用，第二个是可选的。then方法返回的是一个新的Promise实例，因此可以采用链式写法，在then方法后面调用另一个then方法。

```javascript
promise.then(function(value){
    //success
},function(error){
    //failure
})//下面使用catch的方式更好
```

Promise的catch方法是then(null,rejection)的别名，用于指定发生错误时的回调函数，并且then指定的回调函数如果在运行中抛出错误，也会被catch方法捕获。一般来说，不要在then方法中定义rejected状态的回调函数（即then的第二个参数），而应总是用catch方法

```javascript
promise.then(function(data){
    //success
}).catch(function(err){
    //error
})
```

**注意**:then方法指定的回调函数要等同步任务执行完成后才会执行。

> 当JS解析执行时，会被引擎分为两类任务，同步任务（synchronous） 和 异步任务（asynchronous）。
>
> 对于同步任务来说，会被推到执行栈按顺序去执行这些任务。
> 对于异步任务来说，当其可以被执行时，会被放到一个 任务队列（task queue） 里等待JS引擎去执行。
>
> 当执行栈中的所有同步任务完成后，JS引擎才会去任务队列里查看是否有任务存在，并将任务放到执行栈中去执行，执行完了又会去任务队列里查看是否有已经可以执行的任务。这种循环检查的机制，就叫做事件循环(Event Loop)。
>
> 对于任务队列，其实是有更细的分类。其被分为 微任务（microtask）队列 & 宏任务（macrotask）队列
>
> 宏任务: setTimeout、setInterval等，会被放在宏任务（macrotask）队列。
>
> 微任务: Promise的then、Mutation Observer等，会被放在微任务（microtask）队列。
>
> Event Loop的执行顺序是：
>
> 首先执行执行栈里的任务。
> 执行栈清空后，检查微任务（microtask）队列，将可执行的微任务全部执行。
> 取宏任务（macrotask）队列中的第一项执行。
> 回到第二步。 
>
> 注意： 微任务队列每次全执行，宏任务队列每次只取一项执行。

```javascript
var testFn = function(){
    console.log("promise before"); //同步任务
    //异步宏任务
    setTimeout(function(){
        console.log("异步宏任务");
    },300);
    //异步微任务
    promise.then(function(resolved){
        console.log("异步微任务");
    }).catch(function(rejected){
        console.log(rejected);
    });
    console.log("promise after");//同步任务
}
testFn();
//promise before
//promise after
//异步微任务
//异步宏任务
```

#### Promise.all()

接收一个Promise对象的数组作为参数，当这个数组里的所有Promise对象全部变为resolve的时候，该方法才resolve。如果其中一个Promise对象为reject的话，则该方法为reject。

#### Promise.race()

使用方法和Promise.all一样，接收一个Promise对象数组为参数。只要其中一个Promise对象变为Resolved或者Rejected状态，该方法返回，进行后面的处理。

```javascript
// `delay`毫秒后执行resolve
function timerPromisefy(delay) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(delay);
        }, delay);
    });
}
// 当数组中所有Promise对象被resolve之后，该方法才返回
Promise.all([
    timerPromisefy(1),
    timerPromisefy(32),
    timerPromisefy(64),
    timerPromisefy(128)
]).then(function (value) {
    console.log(value);    
});
// 任何一个promise变为resolve或reject 的话程序就停止运行
Promise.race([
    timerPromisefy(1),
    timerPromisefy(32),
    timerPromisefy(64),
    timerPromisefy(128)
]).then(function (value) {
    console.log(value);    
});
//[1,32,64,128]
//[1]
```

## defineProperty与proxy

### defineProperty

ES5 提供了 Object.defineProperty 方法，该方法可以在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。

**语法**

> Object.defineProperty(obj, prop, descriptor)
>
> obj: 要在其上定义属性的对象。
>
> prop:  要定义或修改的属性的名称。
>
> descriptor: 将被定义或修改的属性的描述符。

举个例子：

```javascript
var obj = {};
Object.defineProperty(obj, "num", {
    value : 1,
    writable : true,
    enumerable : true,
    configurable : true
});
//  对象 obj 拥有属性 num，值为 1
```

虽然我们可以直接添加属性和值，但是使用这种方式，我们能进行更多的配置。

函数的第三个参数 descriptor 所表示的属性描述符有两种形式：**数据描述符或存取描述符**。上述例子就是数据描述符，存取描述符例子如下：

```javascript
var value = 1;
Object.defineProperty({}, "num", {
    get : function(){
      return value;
    },
    set : function(newValue){
      value = newValue;
    },
    enumerable : true,
    configurable : true
});
```

两者不能同时出现表示，选择其中一种。

此外，所有的属性描述符都是非必须的，但是 descriptor 这个字段是必须的，如果不进行任何配置，你可以这样：

```javascript
var obj = Object.defineProperty({}, "num", {});
console.log(obj.num); // undefined
```

之所以讲到 defineProperty，是因为我们要使用存取描述符中的 get 和 set，这两个方法又被称为 getter 和 setter。由 getter 和 setter 定义的属性称做”存取器属性“。

当程序查询存取器属性的值时，JavaScript 调用 getter方法。这个方法的返回值就是属性存取表达式的值。当程序设置一个存取器属性的值时，JavaScript 调用 setter 方法，将赋值表达式右侧的值当做参数传入 setter。从某种意义上讲，这个方法负责“设置”属性值。可以忽略 setter 方法的返回值。

#### watch API

既然可以监控数据的改变，那我可以这样设想，即当数据改变的时候，自动进行渲染工作。举个例子：

HTML 中有个 span 标签和 button 标签

```html
<span id="container">1</span>
<button id="button">点击加 1</button>
```

当点击按钮的时候，span 标签里的值加 1。

传统的做法是：

```javascript
document.getElementById('button').addEventListener("click", function(){
    var container = document.getElementById("container");
    container.innerHTML = Number(container.innerHTML) + 1;
});
```

如果使用了 defineProperty：

```javascript
var obj = {
    value: 1
}

// 储存 obj.value 的值
var value = 1;

Object.defineProperty(obj, "value", {
    get: function() {
        return value;
    },
    set: function(newValue) {
        value = newValue;
        document.getElementById('container').innerHTML = newValue;
    }
});

document.getElementById('button').addEventListener("click", function() {
    obj.value += 1;
});
```

代码看似增多了，但是当我们需要改变 span 标签里的值的时候，直接修改 obj.value 的值就可以了。

然而，现在的写法，我们还需要单独声明一个变量存储 obj.value 的值，因为如果你在 set 中直接 `obj.value = newValue` 就会陷入无限的循环中。此外，我们可能需要监控很多属性值的改变，要是一个一个写，也很累呐，所以我们简单写个 watch 函数。使用效果如下：

```javascript
var obj = {
    value: 1
}

watch(obj, "value", function(newvalue){
    document.getElementById('container').innerHTML = newvalue;
})

document.getElementById('button').addEventListener("click", function(){
    obj.value += 1
});
```

我们来写下这个 watch 函数：

```javascript
(function(){
    function watch(obj, name, func){
        var value = obj[name];
        Object.defineProperty(obj, name, {
            get: function() {
                return value;
            },
            set: function(newValue) {
                value = newValue;
                func(value)
            }
        });
        if (value) obj[name] = value
    }
    this.watch = watch;
})()
```

现在我们已经可以监控对象属性值的改变，并且可以根据属性值的改变，添加回调函数

### Proxy

使用 defineProperty 只能重定义属性的读取（get）和设置（set）行为，到了 ES6，提供了 Proxy，可以重定义更多的行为，比如 in、delete、函数调用等更多行为。

Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。我们来看看它的语法：

```javascript
var proxy = new Proxy(target, handler);
```

proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。其中，new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。

```javascript
var proxy = new Proxy({}, {
    get: function(obj, prop) {
        console.log('设置 get 操作')
        return obj[prop];
    },
    set: function(obj, prop, value) {
        console.log('设置 set 操作')
        obj[prop] = value;
    }
});

proxy.time = 35; // 设置 set 操作

console.log(proxy.time); // 设置 get 操作 // 35
```

除了 get 和 set 之外，proxy 可以拦截多达 13 种操作，比如 has(target, propKey)，可以拦截 propKey in proxy 的操作，返回一个布尔值。

```javascript
// 使用 has 方法隐藏某些属性，不被 in 运算符发现
var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
console.log('_prop' in proxy); // false
```

又比如说 apply 方法拦截函数的调用、call 和 apply 操作。

apply 方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组，不过这里我们简单演示一下：

```javascript
var target = function () { return 'I am the target'; };
var handler = {
  apply: function () {
    return 'I am the proxy';
  }
};

var p = new Proxy(target, handler);

p();
// "I am the proxy"
```

又比如说 ownKeys 方法可以拦截对象自身属性的读取操作。具体来说，拦截以下操作：

- Object.getOwnPropertyNames()
- Object.getOwnPropertySymbols()
- Object.keys()

下面的例子是拦截第一个字符为下划线的属性名，不让它被 for of 遍历到。

```javascript
let target = {
  _bar: 'foo',
  _prop: 'bar',
  prop: 'baz'
};

let handler = {
  ownKeys (target) {
    return Reflect.ownKeys(target).filter(key => key[0] !== '_');
  }
};

let proxy = new Proxy(target, handler);
for (let key of Object.keys(proxy)) {
  console.log(target[key]);
}
// "baz"
```

#### watch API优化

我们使用 proxy 再来写一下 watch 函数。使用效果如下：

```javascript
(function() {
    function watch(target, func) {
        var proxy = new Proxy(target, {
            get: function(target, prop) {
                return target[prop];
            },
            set: function(target, prop, value) {
                target[prop] = value;
                func(prop, value);
            }
        });
        return proxy;//因为后面修改必须针对proxy实例，所以要返回
    }
    this.watch = watch;
})()
var obj = {
    value: 1
}
var newObj = watch(obj, function(key, newvalue) {
    if (key == 'value') document.getElementById('container').innerHTML = newvalue;
})
document.getElementById('button').addEventListener("click", function() {
    newObj.value += 1
});
```

我们也可以发现，使用 defineProperty 和 proxy 的区别，当使用 defineProperty，我们修改原来的 obj 对象就可以触发拦截，而使用 proxy，就必须修改代理对象，即 Proxy 的实例才可以触发拦截。

## 模块加载方案

### AMD

AMD 其实就是 RequireJS 在推广过程中对模块定义的规范化产出

`requirejs` 为全局添加了 `define` 函数，你只要按照一种约定的方式书写这个模块即可。而这种约定的书写方式就是AMD，其主要内容就是定义了define函数该如何书写，只要按照这个规范书写模块和依赖，require.js就能正确的进行解析。

### CMD

CMD 其实就是 SeaJS 在推广过程中对模块定义的规范化产出

主要内容就是描述该如何定义模块，如何引入模块，如何导出模块，只要你按照这个规范书写代码，sea.js 就能正确的进行解析。

两者区别：

- AMD推崇依赖前置，CMD推崇依赖就近

  ```javascript
  // require.js 例子中的 main.js
  // 依赖必须一开始就写好
  require(['./add', './square'], function(addModule, squareModule) {
      console.log(addModule.add(1, 1))
      console.log(squareModule.square(3))
  });
  // sea.js 例子中的 main.js
  define(function(require, exports, module) {
      var addModule = require('./add');
      console.log(addModule.add(1, 1))
  
      // 依赖可以就近书写
      var squareModule = require('./square');
      console.log(squareModule.square(3))
  });
  ```

- 对于依赖的模块，AMD是提前执行，CMD是延迟执行

  ```javascript
  // require.js
  加载了 add 模块
  加载了 multiply 模块
  加载了 square 模块
  2
  9
  // sea.js
  加载了 add 模块
  2
  加载了 square 模块
  加载了 multiply 模块
  9
  ```

  AMD 是将需要使用的模块先加载完再执行代码，而 CMD 是在 require 的时候才去加载模块文件，加载完再接着执行。

### CommonJS

AMD 和 CMD 都是用于浏览器端的模块规范，而在服务器端比如 node，采用的则是 CommonJS 规范。

跟 sea.js 的执行结果一致，也是在 require 的时候才去加载模块文件，加载完再接着执行。

#### CommonJS与AMD

> CommonJS 规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。

> AMD规范则是非同步加载模块，允许指定回调函数。
>
> 由于 Node.js 主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以 CommonJS 规范比较适用。

> 但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用异步模式，因此浏览器端一般采用 AMD 规范。

### ES6模块

浏览器允许脚本异步加载，下面是俩种异步加载方案的语法：

```html
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```

\<script>标签打开defer或者async属性，浏览器就会异步加载，渲染引擎遇到这一行命令就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。

**区别**：defer要等到整个页面正常渲染结束才会执行，async一旦下载完成渲染引擎就会中断，执行这个脚本再继续渲染，即defer是渲染完再执行，async是下载完就执行。

如果有多个defer脚本，会按照在页面中出现的顺序加载，而async脚本不能保证加载顺序。



> 浏览器加载 ES6 模块，也使用 `<script>` 标签，但是要加入 `type="module"` 属性。
>
> 通过export导出模块，import导入模块，跟 require.js 的执行结果是一致的，也就是将需要使用的模块先加载完再执行代码。

#### ES6与CommonJS

> 它们有两个重大差异。
>
> 1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
> 2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

第二个差异可以从两个项目的打印结果看出，导致这种差别的原因是：

> 因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

重点解释第一个差异。

> CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
>
> ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令 import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的 import 有点像 Unix 系统的“符号连接”，原始值变了，import 加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

Babel将ES6模块语法转为CommonJS模块语法，而浏览器不支持，会报错，需要使用打包工具将代码打包。

首先为什么浏览器中不支持 CommonJS 语法呢？

这是因为浏览器环境中并没有 module、 exports、 require 等环境变量。

换句话说，webpack 打包后的文件之所以在浏览器中能运行，就是靠模拟了这些变量的行为。

## 装饰器

修饰器是一个函数，用来修改类的行为，ES2017引入。

装饰器主要用于：

1. 装饰类
2. 装饰方法或属性

### 装饰类

```javascript
@annotation
class MyClass { }

function annotation(target) {
   target.annotated = true;
}
MyClass.annotated//true
//等价于
Class A{}
A=decorator(A)||A
```

@annotation是一个修饰器，修改了MyClass的行为，为它加上了静态属性annotation

### 装饰方法或属性

```javascript
class MyClass {
  @readonly
  method() { }
}

function readonly(target, name, descriptor) {//目标对象，属性，属性描述
  descriptor.writable = false;
  return descriptor;
}
```

如果一个方法有很多修饰器，那么该方法会先从外到内进入修饰器，然后由内向外执行。修饰器不能用于函数，因为存在函数提升

应用：

1.log

为一个方法添加 log 函数，检查输入的参数：

```javascript
class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function(...args) {
    console.log(`Calling ${name} with`, args);
    return oldValue.apply(this, args);
  };

  return descriptor;
}

const math = new Math();

// Calling add with [2, 4]
math.add(2, 4);
```

## 私有变量的实现

### 1. 约定

**实现**

```javascript
class Example {
	constructor() {
		this._private = 'private';
	}
	getName() {
		return this._private
	}
}

var ex = new Example();

console.log(ex.getName()); // private
console.log(ex._private); // private
```

**优点**

1. 写法简单
2. 调试方便
3. 兼容性好

缺点

1. 外部可以访问和修改
2. 语言没有配合的机制，如 for in 语句会将所有属性枚举出来
3. 命名冲突

### 2. 闭包

**实现一**

```javascript
/**
 * 实现一
 */
class Example {
  constructor() {
    var _private = '';
    _private = 'private';
    this.getName = function() {return _private}
  }
}

var ex = new Example();

console.log(ex.getName()); // private
console.log(ex._private); // undefined
```

**优点**

1. 无命名冲突
2. 外部无法访问和修改

**缺点**

1. constructor 的逻辑变得复杂。构造函数应该只做对象初始化的事情，现在为了实现私有变量，必须包含部分方法的实现，代码组织上略不清晰。
2. 方法存在于实例，而非原型上，子类也无法使用 super 调用
3. 构建增加一点点开销

**实现二**

```javascript
/**
 * 实现二
 */
const Example = (function() {
  var _private = '';

  class Example {
    constructor() {
      _private = 'private';
    }
    getName() {
      return _private;
    }
  }

  return Example;

})();

var ex = new Example();

console.log(ex.getName()); // private
console.log(ex._private); // undefined
```

**优点**

1. 无命名冲突
2. 外部无法访问和修改

**缺点**

1. 写法有一点复杂
2. 构建增加一点点开销

### 3. Symbol

**实现**

```javascript
const Example = (function() {
    var _private = Symbol('private');

    class Example {
        constructor() {
          this[_private] = 'private';
        }
        getName() {
          return this[_private];
        }
    }

    return Example;
})();

var ex = new Example();

console.log(ex.getName()); // private
console.log(ex.name); // undefined
```

**优点**

1. 无命名冲突
2. 外部无法访问和修改
3. 无性能损失

**缺点**

1. 写法稍微复杂
2. 兼容性也还好

### 4. WeakMap

**实现**

```javascript
/**
 * 实现一
 */
const _private = new WeakMap();

class Example {
  constructor() {
    _private.set(this, 'private');
  }
  getName() {
  	return _private.get(this);
  }
}

var ex = new Example();

console.log(ex.getName()); // private
console.log(ex.name); // undefined
```

如果这样写，你可能觉得封装性不够，你也可以这样写：

```javascript
/**
 * 实现二
 */
const Example = (function() {
  var _private = new WeakMap(); // 私有成员存储容器

  class Example {
    constructor() {
      _private.set(this, 'private');
    }
    getName() {
    	return _private.get(this);
    }
  }

  return Example;
})();

var ex = new Example();

console.log(ex.getName()); // private
console.log(ex.name); // undefined
```

**优点**

1. 无命名冲突
2. 外部无法访问和修改

**缺点**

1. 写法比较麻烦
2. 兼容性有点问题
3. 有一定性能代价

### 5. 最新提案

```javascript
class Point {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  equals(point) {
    return this.#x === point.#x && this.#y === point.#y;
  }
}
```

那么为什么不直接使用 private 字段呢？比如说这样：

```javascript
class Foo {
  private value;

  equals(foo) {
    return this.value === foo.value;
  }
}
```

简单点来说，就是嫌麻烦，当然也有性能上的考虑……

举个例子，如果我们不使用 #，而是使用 private 关键字：

```
class Foo {
  private value = '1';

  equals(foo) {
    return this.value === foo.value;
  }
}

var foo1 = new Foo();
var foo2 = new Foo();

console.log(foo1.equals(foo2));
```

在这里我们新建了两个实例，然后将 foo2 作为参数传入了 foo1 的实例方法中。

那么我们可以获取 foo2.value 的值吗？如果我们直接 `foo2.value` 肯定是获取不到值的，毕竟是私有变量，可是 equals 是 Foo 的一个类方法，那么可以获取到的吗？

答案是可以的。

其实这点在其他语言，比如说 Java 和 C++ 中也是一样的，**类的成员函数中可以访问同类型实例的私有变量**，这是因为私有是为了实现“对外”的信息隐藏，在类自己内部，没有必要禁止私有变量的访问，你也可以理解为私有变量的限制是以类为单位，而不是以对象为单位，此外这样做也可以为使用者带来便利。

既然获取值是可以的，那么打印的结果应该为 true，但是如果我们传入的值不是 Foo 的实例，而是一个其他对象呢？

```javascript
var foo1 = new Foo();

console.log(foo1.equals({
  value: 2
}));
```

当然这里代码也是可以正常运行的，但是对于编译器来说，就有一点麻烦了，因为编译器不知道 value 到底是 foo 的正常属性还是私有属性，所以编译器需要做判断，先判断 foo 是不是 Foo 的实例，然后再接着获取值。

这也意味着每次属性访问都需要做这样一个判断，而引擎已经围绕属性访问做了高度优化，懒得改，而且还降低速度。

不过除了这个工作之外，还会有一些其他的内容需要考虑，比如说：

1. 你必须将私有的 key 编码进每个词法环境
2. for in 可以遍历这些属性吗？
3. 私有属性和正常属性同名的时候，谁会屏蔽谁？
4. 怎么防止私有属性的名称不被探测出来。

而如果你选择 #，实现的方式将跟 JavaScript 对象属性完全没有关系，将会使用 `private slots` 的方式以及使用一个新的 slot 查找语法，总之就是会比 private 的实现方式简单很多。