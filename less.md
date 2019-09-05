[TOC]

## Less常用语法整理

### 一.Less是什么？

Less （Leaner Style Sheets 的缩写） 是一门向后兼容的 CSS 扩展语言。Less将 CSS 赋予了动态语言的特性，如 变量， 继承， 运算， 函数。LESS 既可以在 客户端 上运行 (支持IE 6+, Webkit, Firefox)，也可以借助Node.js或者Rhino在服务端运行。Less不仅可以使得CSS样式更加灵活地作用于Html标签，还可以提高样式代码的可维护性。

### 二.变量

**变量**：所谓变量，跟其他语言里理解的那样，将你要用到的值赋给一个变量，在要用到的地方直接用变量名代替即可，实际上，这里的变量是“常量”，因为它们只能定义一次。

```less
@nice-blue: #5B83AD;
@light-blue: @nice-blue + #111;//变量可以动态计算（数值、颜色、变量都可以进行运算）

#header {
  color: @light-blue;
}
```

除了值管理，变量还可以用在选择器名称、属性名、URL、以及@import语句中。

```less
@mySelector:banner;
@images:"../img";

@{mySelector} {
    background:url("@{images}/1.png");
}
```

**变量混合**：混合可以将一个定义好的class A轻松的引入到另一个class B中，从而简单实现class B继承class A中的所有属性。

```less
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

.post a {
  color: red;
  .bordered;
}
```

### 三.嵌套

#### 1.模仿了 HTML 的结构，使代码看起来更加清晰和简洁

```less
#header {
  color: black;
}
#header .navigation {
  font-size: 12px;
}
#header .logo {
  width: 300px;
}

//使用嵌套之后
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
```



#### 2.在嵌套中，可以用‘&’表示父类

```less
.clearfix {
  display: block;
  &:after {
    content: " ";
  }
  &:hover {
    color : red;
  }
}
```



### 四.Extend（继承）

#### 1.Extend是一个Less伪类，它将放置的选择器与它引用的匹配器合并。

```less
.a{ 
    color: red;
  }
  
.text { 
    background-color: #0d94f3;
    &:extend(.a);
    font-size: 12px;
}
//输出，text类中会有a中的属性
.a,
.text {
  color: red;
}
.text {
  background-color: #0d94f3;
  font-size: 12px;
}
```



#### 2.Extend all的用法

```less
.a{
    background-color: #fff;
    &:extend(.b all);
    border-bottom: 2px;
}
.b{
    font-weight: 700;
    color: yellow;
}
.b:hover{
    font-size: 2em;
}
//输出
.a {
  background-color: #fff;
  border-bottom: 2px;
}
.b,
.a {
  font-weight: 700;
  color: yellow;
}
.b:hover,
.a:hover {
  font-size: 2em;
}
```



#### 3.嵌套继承选择器

```less
.parentClass{
    span{
        color:red
    }
}
.subClassOne{
    &:extend(.parentClass span);
}
//输出
.parentClass span,
.subClassOne {
  color: red;
}
```

Less中，关键字extend里面的选择器必须与已定义的样式选择器严格一致，如div .a{}样式只能通过extend（div .a）继承，而不能是extend（.a）

#### 4.被继承的选择器需要写在前面，否则无法实现继承

```less
//html
<p class="baseStyle">我是默认的段落样式</p>
<p class="baseStyle specialStyle">我是默认样式上加了特殊样式的段落</p>
//css
.baseStyle{
    color:gray;
    font-weight:500;
}
.specialStyle{
    color:blue;
//less
.baseStyle{
    color:gray;
    font-weight:500;
}
.specialStyle:extend(.baseStyle){
    color:blue;
}
//前者颜色为灰色，后者为蓝色
```

### 五.Mixins(混合)

在 LESS 中我们可以定义一些通用的属性集为一个选择器，然后在另一个选择器中去调用这些属性。

#### 1.创建混合集

```less
.a, #b {
  color: red;
}
.mixin-class {
  .a();  // 这里也可以用 .a,效果于.a()相同
}
.mixin-id {
  #b(); // 同上
}
// 以下是输出：
.a, #b {
  color: red;
}
.mixin-class {
  color: red;
}
.mixin-id {
  color: red;
}
```

#### 2.当创建的混合集但并不想让他输出到样式中

```less
.my-mixin {
  color: black;
}
// 在混合集的名字后面加上一个括号，将不会在样式中输出。
.my-other-mixin() {
  background: white;
}
.class {
  .my-mixin;
  .my-other-mixin;
}
// 以上的代码将会输出(没有了my-other-mixin())：

.my-mixin {
  color: black;
}
.class {
  color: black;
  background: white;
}
```

#### 3.我们同样可以把选择器写在混合集中

```less
.my-hover-mixin() {
  &:hover {
    border: 1px solid red;
  }
}
button {
  .my-hover-mixin();
}

// 将会输出：
button:hover {
  border: 1px solid red;
}
```

#### 4.现在想要将属性混合在比较复杂的选择器中，可以通过嵌套：

```less
#outer {
  .inner {
    color: red;
  }
}

.c {
  #outer > .inner;
}
// 输出：
.c {
 color: red;
}
```

#### 5.!important 的应用

在调用的混合集后面追加 !important 关键字，可以使混合集里面的所有属性都继承 !important：

```less
.foo (@bg: #f5f5f5, @color: #900) {//Mixins也可以接受参数，将变量传递给选择器代码块
  background: @bg;
  color: @color;
}
.unimportant {
  .foo();
}
.important {
  .foo() !important;
}
//输出
.unimportant {
  background: #f5f5f5;
  color: #900;
}
.important {
  background: #f5f5f5 !important;
  color: #900 !important;
}
```

#### 6.带多个参数的mixins

混合属性也可以通过括号传递参数。

```less
.mixin(@color) {
  color-1: @color;
}
.mixin(@color; @padding: 2) {
  color-2: @color;
  padding-2: @padding;
}
.mixin(@color; @padding; @margin: 2) {
  color-3: @color;
  padding-3: @padding;
  margin: @margin @margin @margin @margin;
}

//------------------以上是多个相同名称的mixins
.lucy {
  .mixin(#008000);
}
// 这时输出为：
.lucy  {
  color-1: #008000;
  color-2: #008000;
  padding-2: 2;
}
// 无法匹配第三个mixin，因为只有一个参数，而第三个的mixin的第二个参数@padding又没设置初值，所以无法匹配。
//如果这时有两个参数：
.lucy {
  .mixin(#008000；3);
}
// 这是输出为：
    color-2: #008000;
    padding-2: 3;
    color-3: #008000;
    padding-3: 3;
    margin: 2 2 2 2;
// 第一个mixin直接不匹配，因为第一个只有一个参数。第二个@padding有初值，但是如果参数明确设定了值，那么就会覆盖这个初值。
```

#### 7.命名参数

当6中的书写不便，很多时候还要遵循它的顺序来使用，那么现在，命名参数将很好的解决这个问题：

```less
.mixin(@color: black; @margin: 10px; @padding: 20px) {
  color: @color;
  margin: @margin;
  padding: @padding;
}
.class1 {
  .mixin(@margin: 20px; @color: #33acfe);
}
.class2 {
  .mixin(#efca44; @padding: 40px);
}
//输出
.class1 {
  color: #33acfe;
  margin: 20px;
  padding: 20px;
}
.class2 {
  color: #efca44;
  margin: 10px;
  padding: 40px;
}
```

#### 8.@arguments变量

或许你已经发现了，当参数比较多的情况下，如果还在这样一个一个处理参数，将会是一件浪费时间且没有意义的事情，那么@arguments就可以很好的解决这个问题，它包含了所有传入的参数。

```less
.box-shadow(@x: 0; @y: 0; @blur: 1px; @color: #000) {
  -webkit-box-shadow: @arguments;
     -moz-box-shadow: @arguments;
          box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px; 5px);
}
//输出
.big-block {
  -webkit-box-shadow: 2px 5px 1px #000;
     -moz-box-shadow: 2px 5px 1px #000;
          box-shadow: 2px 5px 1px #000;
}
```

#### 9.@arguments与@rest一起使用

经过上面的改良，你是不是觉得，参数那一堆写的太多了，那有什么方法可以使我只写一个变量来包含这些参数呢，@rest与...，可以解决这个问题：

```less
.mixin(@a; @rest...) {
   // @rest包含了@a之后的参数
   // @arguments包含了所有参数
}
```

```less
.mixin(...) {        // 匹配 0-N 个 arguments
.mixin() {           // 只能匹配 0 arguments
.mixin(@a: 1) {      // 匹配 0-1 arguments
.mixin(@a: 1; ...) { // 匹配 0-N arguments
.mixin(@a; ...) {    // 匹配 1-N arguments
```

那么之前的代码可以写成：

```less
.box-shadow(@rest...) {
  box-shadow: @arguments;
}
//或者：
.box-shadow(...) {
  box-shadow: @arguments;
}
//使用它：
.big-block {
  .box-shadow(2px; 3px; 1px ; #666);
}

//输出
.big-block {
    box-shadow: 2px 3px 1px #666;
}
```

#### 10.匹配模式

如果我想mixin基于@switch的值以不同的方式表现，可以这样定义：

```less
.mixin(dark; @color) {
  color: darken(@color, 10%);
}
.mixin(light; @color) {
  color: lighten(@color, 10%);
}
.mixin(@_; @color) {
  display: block;
}

.class {
  .mixin(light; #888);
}

//输出
.class {
  color: #a2a2a2;
  display: block;
}
```

这里发生了什么？
 1.第一个mixin定义并没有匹配，因为它期望第一个参数是dark。
 2.第二个mixin定义匹配了，因为它接受的参数是预期的light。
 3.第三个mixin定义也匹配了，它是一个变量，任何值进来都会赋值给它,变量匹配的值与它自身相等（这个就可以用来做相同的公共的样式部分）。

同样的，我们除了可以用变量来匹配，我们也可以用参数的数量来匹配，下面给一个例子：

```less
.mixin(@a) {
  color: @a;
}
.mixin(@a; @b) {
  color: fade(@a; @b);
}
```

显而易见：
1.如果我们用一个参数来调用.mixin，则将会输出第一个定义: color : @a;
2.如果我们使用两个参数，则会获取第二个定义：
实现@a淡入到@b。

#### 11.Mixin作为函数使用

```less
.mixin() {
  @width:  100%;
  @height: 200px;
}

.caller {
  .mixin();
  width:  @width;
  height: @height;
}
//输出
.caller {
  width:  100%;
  height: 200px;
}
```

我们还可以用mixin中定义的变量来充当它的返回值(return value):

```less
.average(@x, @y) {
  @average: ((@x + @y) / 2);
}

div {
  .average(16px, 50px); // "call" the mixin
  padding: @average;    // use its "return" value
}
//输出
div {
  padding: 33px;
}
```

### 六.Function(函数)

#### 1.Misc Functions(杂项函数)

**color**

> - 参数：String，代表颜色值的字符串
> - 返回：color
> - 示例：`color("#aaa");`
> - 输出：#aaa

**convert**

> 第一个参数为带单位的数值，第二个参数为单位。如果两个参数的单位是兼容的，则数字的单位被转换。如果两个参数的单位不兼容，则原样返回第一个参数。
>  兼容的单位组:
>
> - 长度: m, cm, mm, in, pt and pc,
> - 时间: s and ms,
> - 角度: rad, deg, grad and turn.
>
> 参数：
>
> - 角度: rad, deg, grad and turn.
> - identifier, string 或 escaped value: 单位
>
> 返回: number
>
> 示例：
>
> ```less
> convert(9s, "ms")
> convert(14cm, mm)
> convert(8, mm) // 不兼容的单位类型
> ```
>
> 输出：
>
> ```less
> 9000ms
> 140mm
> 8
> ```

**unit**

> 移除或改变属性值的单位
> 参数：
>
> - dimension: 数字，带或不带单位。
> - unit: 可选参数，将要替换成的单位，如果省略则移除原单位。
>   示例：`unit(5, px)`
>   输出: `5px`
>   示例: `unit(5em)`
>   输出: `5`

**get-unit**

> 返回一个值的单位.
> 如果参数中包含了数字与单位，该函数就返回其单位。 如果参数不包含单位，该函数就返回空。
> 参数：
>
> - number: 带单位或者不带单位的数字。
>   示例:`number: 带单位或者不带单位的数字。`
>   输出:`px`
>   示例：`get-unit(5)`
>   输出：`//nothing`

#### 2.String Functions(字符串函数)

**e(预判函数)**

> Css 转义, 用~"值" 符号代替。
>  他认为字符串是一个参数返回不带引号的原内容。这可以用来输出一些Less并不认可的Css值，包括未验证的Css语法或者一个专有的语法。
>  参数： string - 用来转义的字符串。
>  返回： string - 不带引号的转义字符串。
>
> 示例：
>  `width: calc(~'50% - 10px');`
>
> 输出：
>
> `width: calc(50% - 10px);`

**replace(替换)**

> 用另一个字符串替换文本.
>
> 参数：
>
> - string: 搜索和替换用的字符串.
> - pattern:一个字符串或者能搜索的正则表达式.
> - replacement: 匹配模式成功的替换字符串.
> - flags: (可选的) 正则表达式匹配标识（全匹配还是...）
>
> 返回： 替换过值后的字符串.
>  示例:
>
> ```less
> replace("Hello, Mars?", "Mars\?", "Earth!");
> replace("One + one = 4", "one", "2", "gi");
> replace('This is a string.', "(string)\.$", "new $1.");
> replace(~"bar-1", '1', '2');
> ```
>
> 结果：
>
> ```less
> "Hello, Earth!";
> "2 + 2 = 4";
> 'This is a new string.';
> bar-2;
> ```

#### 3.List Functions

**length**

> 返回集合中的值的数目.
> 参数：list - 逗号或者空格隔开的值集合。 返回： 集合的值个数。
> 示例：`length(1px solid #0080ff)`; 输出： `3`
> 示例:
>
> ```less
> @list: 1px, solid, red
> n: length(@list)
> ```
>
> 输出：
>
> ```less
> n:3;
> ```

**extract(提取)**

> 返回集合中指定索引的值。
> 参数： list - 逗号或者空格隔开的值集合。 index - 用于返回集合中指定位置值的整型数字。 返回： 集合指定位置处的值。
> 示例：`extract(8px dotted red, 2)`; 输出： `dotted`
> 示例：
>
> ```less
> @list: 1px, solid, red;
> value: extract(@list, 3);
> ```
>
> 输出：
>
> ```less
> value: red
> ```

#### 4.Math Functions

> ```less
> //向上取整
> cell(2.4)
> //output:3
> 
> //向下取整
> floor(2.6)
> //output:2
> 
> //将浮点数转换为百分比字符串
> percentage(0.5)
> //output:50%
> 
> //取整数
> round(1.67)
> round(1.67, 1)
> //output:2  1.7
> 
> //计算一个数的平方根，原样保持单位
> sqrt(25cm)
> //output:5cm
> 
> //计算数字的绝对值，原样保持单位
> abs(25cm)
> //output:25cm
> 
> //pi
> pi()
> //output:3.141592653589793
> 
> //乘方运算,假设第一个参数为A，第二个参数为B，返回A的B次方。返回值与A有相同单位，B的单位被忽略
> pow(0cm, 0px)
> pow(25, -2)
> pow(25, 0.5)
> pow(-25, 0.5)
> pow(-25%, -0.5)
> //output:1cm  0.0016  5  NaN  NaN%
> 
> //取余运算。假设第一个参数为A，第二个参数为B，返回A对B取余的结果。返回值与A有相同单位，B的单位被忽略。这个函数也可以处理负数和浮点数.
> mod(0cm, 0px)
> mod(11cm, 6px);
> mod(-26%, -5);
> //output:NaNcm  5cm  -1%
> 
> //min,max,保留单位
> min(5, 10);
> //output:5
> ```

#### 5.Type Functions

**isnumber**

> 参数： value - 待判断的值或变量.
>  返回： 若是数字返回真true,否则假false.
>  示例：
>
> ```less
> isnumber(#ff0);     // false
> isnumber(blue);     // false
> isnumber("string"); // false
> isnumber(1234);     // true
> isnumber(56px);     // true
> isnumber(7.8%);     // true
> isnumber(keyword);  // false
> isnumber(url(...)); // false
> ```
>
> 同理还有：
> isstring：如果一个值是一个字符串，返回'真(true)',否则返回'假(false)'.
>
> iscolor：如果一个值是一个颜色，返回'真(true)',否则返回'假(false)'.
>
> isurl：如果一个值是一个url地址，返回'真(true)',否则返回'假(false)'.
>
> ispixel：如果一个值是带像素长度单位的数字，返回'真(true)',否则返回'假(false)'.
>  isem: 如果一个值是带em长度单位的数字，返回'真(true)',否则返回'假(false)'.
>
> ispercentage:如果一个值是带百分比单位的数字，返回'真(true)',否则返回'假(false)'.
>
> isunit
>  如果一个值是带指定单位的数字，返回'真(true)',否则返回'假(false)'.
>  参数：
>
> - value - 待判断的值或变量.
> - unit - 用于测试比较的一个单位标示符.
>    参数
> - value - 待判断的值或变量.
> - unit - 用于测试比较的一个单位标示符.
>    返回: 若是带指定单位的数字返回真true,否则假false.
>    例如:
>
> ```
> isunit(11px, px);  // true
> isunit(2.2%, px);  // false
> ```
>
> isruleset
>  如果值是一个规则集合，返回'真(true)',否则返回'假(false)'。
>  参数:
>
> - value - 待判断的值或变量。
>    示例:
>
> ```
> @rules: {
>   color: red;
> }
> isruleset(@rules);   // true
> isruleset(#ff0);     // false
> isruleset(blue);     // false
> isruleset("string"); // false
> ```

#### 6.Color Definition Functions(颜色定义函数)

**rgb**

> 返回值： 颜色(color)
> 例如：rgb(90, 129, 32)
> 输出： #5a8120

**rgba**

> 通过十进制红色，绿色，蓝色，以及 alpha 四种值 (RGBA) 创建带alpha透明的颜色对象。
>  此外还有：
>
> hsl,hsla
>  通过色相 (hue)，饱和度 (saturation)，亮度 (lightness) 三种值 (HSL) 创建颜色对象。
>
> hsv,hsva
>  通过色相 (hue)，饱和度 (saturation)，色调 (value)，以及 alpha 四种值 (HSVA) 创建透明的颜色对象。

#### 7.Color Channel Functions(颜色通道函数)

**hue**

> 从HSL色彩空间中提取颜色对象的色相值。
> 例如:hue(hsl(90, 100%, 50%))
> 输出： 90

**satuation**

> 从HSL色彩空间中提取颜色对象的饱和度值。

**lightness**

> 从HSL色彩空间中提取颜色对象的亮度值。

**hsvhue**

> 从HSV色彩空间中提取颜色对象的色相值。

**hsvsaturation**

> 从HSV色彩空间中提取颜色对象的饱和度值。

**hsvvalue**

> 从色彩空间中提取颜色对象的色调值。

**red**

> 提取颜色对象的红色值。
>  参数： @color - 颜色对象(a color object)
>  返回值： 整数 0-255
>  例如： red(rgb(10, 20, 30))
>  输出： 10

**green**

> 提取颜色对象的绿色值。
>  参数： @color - 颜色对象(a color object)
>  返回值： 整数 0-255
>  例如： green(rgb(10, 20, 30))
>  输出： 20

**blue**

> 提取颜色对象的蓝色值。
>  参数： @color - 颜色对象(a color object)
>  返回值： 整数 0-255
>  例如： blue(rgb(10, 20, 30))
>  输出： 30

**alpha**

> 提取颜色对象的透明度值。
>  参数： @color - 颜色对象(a color object)
>  返回值： 浮点数 0-1
>  例如： alpha(rgba(10, 20, 30, 0.5))
>  输出： 0.5

#### 8.Color Operation Function

> "注意事项”
>  颜色值运算有几点注意事项：参数必须单位/格式相同；百分比将作为绝对值处理，比如 10% 增加 10%，结果是 20% 而不是 11%；参数值只能在限定的范围内,返回值时，除了十六进制的颜色值 (hex versions) 外将对其他格式做简化处理。

**saturate,desaturate**

> 增加/降低一定数值的颜色饱和度。
>  参数：
>
> - @color: 颜色对象(A color object)
> - @amount: 百分比 0-100%
>    返回： color
>    saturate(hsl(90, 80%, 50%), 20%) // 以saturate为例
>    '#80ff00' // hsl(90, 100%, 50%)

**lighten,darken**

> 增加/降低一定数值的颜色亮度。
>  参数：
>
> - color: 颜色对象.
> - amount: 一个百分比 0-100%.
>    示例： lighten(hsl(90, 80%, 50%), 20%) // 以lighten为例
>    输出： #b3f075 // hsl(90, 80%, 70%)

**fadein**

> 降低颜色的透明度（或增加不透明度），令其更不透明。
>  参数：
>
> - color: 颜色对象(A color object)
> - amount: 百分比 0-100%
>    返回： color
>    示例： fadein(hsla(90, 90%, 50%, 0.5), 10%)
>    输出： rgba(128, 242, 13, 0.6) // hsla(90, 90%, 50%, 0.6)

**fadeout**

> 增加颜色的透明度（或降低不透明度），令其更透明。对不透明的颜色无效。如果要增加颜色的透明度，使用fadein() 函数。
>  参数：
>
> - color: 颜色对象(A color object)
> - amount: 百分比 0-100%
>    返回： color
>    示例： fadeout(hsla(90, 90%, 50%, 0.5), 10%)
>    输出： rgba(128, 242, 13, 0.4) // hsla(90, 90%, 50%, 0.4)

**fade**

> 给颜色（包括不透明的颜色）设定一定数值的透明度。
>  参数：
>
> - color: 颜色对象(A color object)
> - amount: 百分比 0-100%
>    返回： color
>    示例： fade(hsl(90, 90%, 50%), 10%)
>    输出： rgba(128, 242, 13, 0.1) //hsla(90, 90%, 50%, 0.1)

**mix**

> 根据比例混合两种颜色，包括计算不透明度。
>  参数：
>
> - color1: 一个颜色对象.
> - color2: 一个颜色对象.
> - weight: 可选项：平衡两种颜色的百分比, 默认 50%。
>    返回： color
>    示例：
>
> ```
> mix(#ff0000, #0000ff, 50%)
> mix(rgba(100,0,0,1.0), >rgba(0,100,0,0.5), 50%)
> 输出：两种颜色混合后的颜色
> ```

**greyscale**

> 完全移除颜色的饱和度，与 desaturate(@color, 100%) 函数效果相同。

### 七.Merge(合并)

merge特性可以从多个属性中将值集合集合到一个单一属性之下的逗号或空格分割属性列表中。对于诸如background和transform之类的属性来说，merge非常有用.
示例：

```less
.mixin() {
  border+_: 1px;
}
.text {
  .mixin();
  background-color: #0d94f3;
  color: white;
  border+_: salmon solid;
}
```

输出：

```css
.text {
  border: 1px salmon solid;
  background-color: #0d94f3;
  color: white;
}
```

为避免任何非有意的添加，merge需要在每个待加入的声明中显示的设置一个+或者+_标记。
注意：尽管transform规范中属性使用空格分割，但它仍然支持使用逗号分割；这也是为什么这个特性中没有选项来配置用空格还是逗号分割的原因。('+' 添加为 ',')

### 八.父级选择器

使用&引用父级选择器

```less
.a {
  color: blue;
  &:hover {
    color: green;
  }
}
```

输出：

```less
a {
  color: blue;
}

a:hover {
  color: green;
}
```

一个使用&的典型场景就是生成重复的类名:

```less
.text {
  &-ok {
    background-image: url("ok.png");
  }
  &-cancel {
    background-image: url("cancel.png");
  }

  &-custom {
    background-image: url("custom.png");
  }
}
```

输出：

```less
.text-ok {
  background-image: url("ok.png");
}
.text-cancel {
  background-image: url("cancel.png");
}
.text-custom {
  background-image: url("custom.png");
}
```

### less,sass,stylus区别

1.变量：

- Sass声明变量必须是『$』开头，后面紧跟变量名和变量值，而且变量名和变量值需要使用冒号：分隔开。
- Less 声明变量用『@』开头，其余等同 Sass。
- Stylus 中声明变量没有任何限定，结尾的分号可有可无，但变量名和变量值之间必须要有『等号』。

2.**作用域**：

- Sass：三者最差，不存在全局变量的概念。也就是说在 Sass 中定义了相同名字的变量时你就要小心蛋疼了。
- Less：最近的一次更新的变量有效，并且会作用于全部的引用！
- Stylus：Sass 的处理方式和 Stylus 相同，变量值输出时根据之前最近的一次定义计算，每次引用最近的定义有效；

3.嵌套：

- 三种 css 预编译器的「选择器嵌套」在使用上来说没有任何区别，甚至连引用父级选择器的标记 & 也相同。

4.继承：

- Sass和Stylus的继承非常像，能把一个选择器的所有样式继承到另一个选择器上。使用『@extend』开始，后面接被继承的选择器。Stylus 的继承方式来自 Sass，两者如出一辙。
- Less 则又「独树一帜」地用伪类来描述继承关系；

5.导入@Import：

- Sass 中只能在使用 url() 表达式引入时进行变量插值：

```
$device: mobile;
@import url(styles.#{$device}.css);
```

- Less 中可以在字符串中进行插值：

```
@device: mobile;
@import "styles.@{device}.css";
```

- Stylus 中在这里插值不管用，但是可以利用其字符串拼接的功能实现：

```
device = "mobile"
@import "styles." + device + ".css"
```

总结

- 1.Sass和Less语法严谨、Stylus相对自由。因为Less长得更像 css，所以它可能学习起来更容易。
- 2.Sass 和 Compass、Stylus 和 Nib 都是好基友。
- 3.Sass 和 Stylus 都具有类语言的逻辑方式处理：条件、循环等，而 Less 需要通过When等关键词模拟这些功能，这方面 Less 比不上 Sass 和 Stylus。
- 4.Less 在丰富性以及特色上都不及 Sass 和 Stylus，若不是因为 Bootstrap 引入了 Less，可能它不会像现在这样被广泛应用（个人愚见）。

