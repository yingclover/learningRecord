#### 盒模型

1. W3C标准盒模型

   ![img](https://github.com/yingclover/img-source/raw/master/front-end-questions-img/w3c-box.jfif)

   > 宽度：只包括content

2. IE盒模型

   ![img](https://github.com/yingclover/img-source/raw/master/front-end-questions-img/ie-box.jfif)

> 宽度：content+padding+border

**盒子模型切换**

css3中的`box-sizing`属性

- `box-sizing: content-box` 是W3C盒子模型  **默认**
- `box-sizing: border-box` 是IE盒子模型

js获取盒模型对应宽高（不包括margin）：dom.offsetWidth/offsetHeight

#### 伪类和伪元素

伪类：用于向某些选择器添加特殊效果

| 伪类         | 作用                           |
| ------------ | ------------------------------ |
| :hover       | 将样式添加到鼠标悬浮的元素     |
| :active      | 将样式添加到被激活的元素       |
| :focus       | 将样式添加到获得焦点的元素     |
| :link        | 将样式添加到未被访问过的链接   |
| :visited     | 将样式添加到被访问过的链接     |
| :first-child | 将样式添加到元素的第一个子元素 |
| :lang        | 定义指定的元素中使用的语言     |

伪元素：用于将特殊效果添加到某些选择器

| 伪元素         | 作用                     |
| -------------- | ------------------------ |
| ::first-letter | 将样式添加到文本的首字母 |
| ::first-line   | 将样式添加到文本的首行   |
| ::before       | 在某元素之前插入某些内容 |
| ::after        | 在某元素之后插入某些内容 |

伪类的效果可以通过添加一个实际的类来达到，而伪元素的效果则需要通过添加一个实际的元素才能达到

**CSS3新增伪类**

| 新增伪类              | 作用                                           |
| --------------------- | ---------------------------------------------- |
| p:first-of-type       | 选择属于其父元素的首个<p>元素的每个<p>元素     |
| p:last-of-type        | 选择属于其父元素的最后<p>元素的每个<p>元素     |
| p:only-of-type        | 选择属于其父元素唯一的<p>元素的每个<p>元素     |
| p:only-child          | 选择属于其父元素唯一的子元素的每个<p>元素      |
| p:nth-child(n)        | 选择属于其父元素的第n个子元素的每个<p>元素     |
| p:nth-last-child(n)   | 选择属于其父元素的倒数第n个子元素的每个<p>元素 |
| p:nth-of-type(n)      | 选择属于其父元素第n个<p>元素的每个<p>元素      |
| p:nth-last-of-type(n) | 选择属于其父元素倒数第n个<p>元素的每个<p>元素  |
| p:last-child          | 选择属于其父元素最后一个子元素的每个<p>元素    |
| p:empty               | 选择没有子元素的每个<p>元素（包括文本节点）    |
| p:target              | 选择当前活动的<p>元素                          |
| :not(p)               | 选择非<p>元素的每个元素                        |
| :enabled              | 控制表单控件的可用状态                         |
| :disabled             | 控制表单控件的禁用状态                         |
| :checked              | 单选框或复选框被选中                           |

#### 级元素与行内元素

1. 常见块级元素

   `块级元素占据其父元素（容器）的整个空间，因此创建了一个“块”。通常浏览器会在块级元素前后另起一个新行。块级元素只能出现在\<body>内。`

   \<div>文档分区

   \<h1>~\<h6>一级标题到六级标题
   \<p>段落
   \<hr>水平线
   \<pre>预格式化文本
   \<ul>无序列表
   \<ol>有序列表
   \<table>表格
   \<form>表单
   \<fieldset>表单元素分组
   \<output>表单输出
   \<header>页头
   \<footer>页尾
   \<section>分区或节
   \<atrical>文章内容
   \<aside>侧边栏
   \<address>联系方式信息
   \<audio>音频
   \<video>视频
   \<blockquote>块引用
   \<canvas>绘制图形
   \<dd>定义列表中定义条目描述
   \<dl>定义列表
   \<figure>图文信息组
   \<figcaption>图文信息组标题

2. 常见行内元素

   `一个行内元素只占据它对应标签的边框所包含的空间。包含其自身及其他行内元素。`

   \<span>行内容器

   \<a>定义锚

   \<b>定义粗体

   \<i>定义斜体

   \<abbr>定义缩写

   \<acronym>定义取得首字母缩写

   \<cite>定义引用

   \<big>定义大号文本

   \<small>定义小号文本

   \<br>定义折行

   \<dfn>定义项目

   \<em>着重阅读

   \<strong>定义加强

   \<img>定义图片

   \<map>定义图像映射

   \<script>定义脚本

   \<sub>定义下标文本

   \<sup>定义上标文本

   \<button>定义按钮

   \<input> 定义输入框

   \<label>定义界面中项目的标题

3. 区别

   - 一般行内元素只能包含数据和其他行内元素，块级元素可以包含行内元素和自身及其他块级元素。
   - 默认情况下块级元素占用一整行，而行内元素占据自身宽度空间
   - 宽高只对块级元素生效。注：如果给行内元素设定绝对定位（如 a{position: absolute;}，脱离正常文档流，绝对定位会隐形的改变a的display为inline-block，此时就可以把a当成块元素一样设置宽高了。
   - 块级元素可设置padding和margin，行内元素只能设置padding及左右margin，且设置padding时左右padding推开距离，上下padding会延申出去，但不会增加上下两行间的距离。

#### 浮动元素（如何清除）

![1564216743133](C:\Users\Ying\AppData\Roaming\Typora\typora-user-images\1564216743133.png)

**什么是浮动**？

使元素脱离文档流，按照指定方向发生移动，遇到父级边界或者相邻的浮动元素停了下来。

float常用属性值left，right，none

浮动元素的副作用：

- 块状元素会钻进浮动元素的下面，被浮动元素所覆盖
- 行内元素，比如文字，则会环绕在浮动元素的周围，为浮动元素留出空间
- 浮动元素的父元素坍塌

**浮动的用途**

可设置文字环绕或使元素宽度由内容填充（类似Inline-block)。使用浮动需要注意的是如果浮动的元素高度比父级容器还高，那么需要设置父级容器的overflow属性为auto,使其自动撑满。

**如何清除浮动**？

如果一个元素里只有浮动元素，那它的高度会是0。如果你想要它自适应即包含所有浮动元素，那你需要清除它的子元素。

1. 添加新元素`<div class="clear"></div>`，样式应用`clear:both`

2. 父元素类，样式应用`overflow:auto/hidden`

3. 在父级样式添加伪元素:after(推荐)

   ```css
   .outer:after{
               content: '';
               display: block;
               clear: both;
           }
   ```

**关于clear属性**

```html
<div class="outer">
    <div class="one"></div>
    <div class="two"></div>
    <div class="clear">As much mud in the streets as if the waters had
        but newly retired from the face of the earth,
        and it would not be wonderful to meet a Megalosaurus,
        forty feet long or so, waddling like an elephantine lizard up Holborn Hill.</div>
</div>
```

```css
		.one {
            width: 100px;
            height: 100px;
            background: darkblue;
            float: left;

        }
        .two {
            width: 100px;
            height: 200px;
            background: darkgoldenrod;
            float: right;
        }
        .clear{
            clear:none/left/right|both;//下面的效果
        }
```

![1564220215657](C:\Users\Ying\AppData\Roaming\Typora\typora-user-images\1564220215657.png)

![1564220245313](C:\Users\Ying\AppData\Roaming\Typora\typora-user-images\1564220245313.png)

![1564220315311](C:\Users\Ying\AppData\Roaming\Typora\typora-user-images\1564220315311.png)

给父元素定高，父元素设置浮动

#### Flex布局

弹性布局适合于**移动前端开发**

1. flex-direction

   - `row`（默认值）：主轴为水平方向，起点在左端。
   - `row-reverse`：主轴为水平方向，起点在右端。
   - `column`：主轴为垂直方向，起点在上沿。
   - `column-reverse`：主轴为垂直方向，起点在下沿。

2. flex-wrap

   - `nowrap`(默认值)：不换行。
   - `wrap`：换行。
   - `wrap-reverse`:换行，第一行在下方

3. flex-flow

   `flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。

4. justify-content

   `justify-content`属性定义了项目在主轴上的对齐方式。

   - `flex-start`（默认值）：左对齐
   - `flex-end`：右对齐
   - `center`： 居中
   - `space-between`：两端对齐，项目之间的间隔都相等。
   - `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

   ![1564664331079](C:\Users\Ying\AppData\Roaming\Typora\typora-user-images\1564664331079.png)

5. align-items

   `align-items`属性定义项目在交叉轴上如何对齐。

   - `flex-start`：交叉轴的起点对齐。

   - `flex-end`：交叉轴的终点对齐。

   - `center`：交叉轴的中点对齐。

   - `baseline`: 项目的第一行文字的基线对齐。

   - `stretch`（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

     ![1564664510040](C:\Users\Ying\AppData\Roaming\Typora\typora-user-images\1564664510040.png)

6. align-content

   `align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

   - `flex-start`：与交叉轴的起点对齐。

   - `flex-end`：与交叉轴的终点对齐。

   - `center`：与交叉轴的中点对齐。

   - `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。

   - `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。

   - `stretch`（默认值）：轴线占满整个交叉轴。

     ![1564664564560](C:\Users\Ying\AppData\Roaming\Typora\typora-user-images\1564664564560.png)

   ##### 项目属性

   1. order

      `order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

   2. flex-grow

      `flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

   3. flex-shrink

      `flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

   4. flex-basis

      `flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

   5. flex

      `flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

   6. align-self

      `align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。
   
   ##### 应用
   
   1. 第一个盒子固定宽度，后面的盒子占据剩下部分
   
      ```css
       .container{
                  width: 100%;
                  height: 200px;
                  display: flex;
                  flex-direction: row;
                  background: palevioletred;
                  font-size: 30px;
              }
              .box1{
                  flex-basis: 100px;//该属性实现占据固定宽度
                  background: palegreen;
              }
              .box2{
                  background: antiquewhite;
                  flex-grow: 1;
              }
              .box3{
                  background:rosybrown;
                  flex-grow: 1;
              }
      ```
   
      ![1565084589855](C:\Users\Ying\AppData\Roaming\Typora\typora-user-images\1565084589855.png)
   
      若右边只有一个盒子，可将其flex-basis设为calc(100%-100px)

#### BFC(块级格式化上下文)

一个边距重叠解决方案

1. BFC原理

   BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。布局规则如下：

   > 1、内部的Box会在垂直方向，从顶部开始一个接一个地放置。
   > 2、Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生叠加
   > 3、每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
   > 4、BFC的区域不会与float box叠加。
   > 5、BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然。
   > 6、计算BFC的高度时，浮动元素也参与计算

2. 如何触发BFC

   - float属性不为none(脱离文档流)
   - position为absolute或fixed
   - display为inline-block,table-cell,table-caption,flex,inline-flex
   - overflow不为visible
   - 根元素

3. 应用场景

   - margin叠加的问题，在父元素上创建BFC

     比如同级的两个div，div1的margin-bottom:20px，div2的margin-top:30px，那么俩个div的margin会重叠，取较大值30px。

     根据BFC布局规则第二条，Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。通过将在其中一个外面包裹一层容器，并在上面创建BFC，就不会发生重叠。因为他们属于不同BFC。

     ```html
     <style>
            .div1{
                 width: 300px;
                 height: 100px;
                 background: #f66;
                 margin-bottom: 20px;
            }
            .div2{
                 width: 300px;
                 height: 100px;
                 background: #fcc;
                 margin-top: 30px;
            }
            .wrap{
                 overflow: hidden;
            }
     </style>
     <body>
     <div class="wrap">
         <div class="div1"></div>
     </div>
         <div class="div2"></div>
     </body>
     ```

     

     ![1564574178748](C:\Users\Ying\AppData\Roaming\Typora\typora-user-images\1564574178748.png)

     ![1564574358256](C:\Users\Ying\AppData\Roaming\Typora\typora-user-images\1564574358256.png)

   - 自适应两栏布局，对于左右布局的元素，我们可以给**右侧**的元素添加overflow:hidden或者auto，左侧的是float:left

     每个元素的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此，因此虽然存在浮动元素div1，div2的左边依然会与包含块的左边接触，根据BFC第四条，BFC的区域不会与float box重叠，可以将在div2创建BFC来实现自适应两栏布局。

     ```html
     <style>
             .div1{
                 width: 100px;
                 height: 200px;
                 float: left;
                 background: #f66;
             }
             .div2{
                 height: 300px;
                 background: #fcc;
                 overflow: hidden;//将右边的div盒子BFC化
             }
         </style>
     <body>
         <div class="div1"></div>
         <div class="div2"></div>
     </body>
     ```

     ![1564573602481](C:\Users\Ying\AppData\Roaming\Typora\typora-user-images\1564573602481.png)

     ![1564573622192](C:\Users\Ying\AppData\Roaming\Typora\typora-user-images\1564573622192.png)

   - 可以清除浮动，计算BFC高度，浮动元素不会撑开父元素的高度，我们可以让父元素触发BFC,即使用overflow:hidden 

     根据BFC布局规则第六条：计算BFC的高度时，浮动元素也参与计算，为达到清除内部浮动，我们可以触发wrap生成BFC，那么wrap在计算高度时，wrap内部的浮动元素div1也会参与计算.

     ```html
     <style>
             .div1{
                 border: 5px solid #f66;
                 width:100px;
                 height: 100px;
                 float: left;
             }
             .wrap{
                 border:1px solid #fcc;
                 width: 300px;
                 overflow: hidden;//在这里创建BFC
             }
         </style>
     
     <body>
     <div class="wrap">
         <div class="div1"></div>
         <div class="div1"></div>
     </div>
     </body>
     ```

     

     ![1564574948436](C:\Users\Ying\AppData\Roaming\Typora\typora-user-images\1564574948436.png)

     ![1564574995472](C:\Users\Ying\AppData\Roaming\Typora\typora-user-images\1564574995472.png)

     

   **因为BFC内部的元素和外部的元素绝对不会互相影响，因此， 当BFC外部存在浮动时，它不应该影响BFC内部Box的布局，BFC会通过变窄，而不与浮动有重叠。同样的，当BFC内部有浮动时，为了不影响外部元素的布局，BFC计算高度时会包括浮动的高度。避免margin重叠也是这样的一个道理**

#### CSS3新特性

1. RGBA和opcity(透明度)

2. background-image（添加背景图片）

   background-clip （规定背景的绘制区域）

   background-origin(content-box/padding-box/border-box) （指定背景图片的定位区域）

   background-size （指定背景图片尺寸）

3. word-wrap（对长的不可分割单词分割换行）text-break（规定文本的换行规则）text-overflow（文本截断）

4. 文字阴影：text-shadow： 5px 5px 5px #FF0000;（水平阴影，垂直阴影，模糊距离，阴影颜色）

   盒阴影：box-shadow: 10px 10px 5px #888888

5. box-sizing（控制盒模型的组成模式）

6. font-face属性：定义自己的字体

7. 圆角（边框半径）：border-radius 属性用于创建圆角

8. 边框图片：border-image: url(border.png) 30 30 round

9. 弹性盒子

10. 动画

11. 媒体查询：定义两套css，当浏览器的尺寸变化时会采用不同的属性、

12. 新布局sticky

#### CSS Hack

由于不同厂商的流览器或某浏览器的不同版本（如IE,Firefox/Safari/Opera/Chrome等），对CSS的支持、解析不一样，导致在不同浏览器的环境中呈现出不一致的页面展现效果。这时，我们为了获得统一的页面效果，就需要**针对不同的浏览器或不同版本写特定的CSS样式**。

我们把针对不同的浏览器/不同版本写相应的CSS code的过程，叫做CSS hack!

CSS Hack分类：

1. CSS属性前缀法（内部hack）

   （1）IE6 能辨认下划线" _"和星号" *"
   （2）IE7 能辨认星号" *"，但不能辨认下划线" _ "
   （3）IE6~IE10 都辨认" 9 "

2. 选择器前缀法

   （1）IE6 能辨认 *html .class{}
   （2）IE7 能辨认 *+html .class{} 或 *:first-child+html .class{}

3. IE条件注释法

   （1）一切 IE (注：IE10+ 曾经不再支持条件注释)能辨认 <!--[if IE]>IE阅读器显现的内容 <![endif]-->
   （2）IE6及以下版本能辨认 <!--[if lt IE 6]>只在IE6-显现的内容 <![endif]-->
   这类 Hack 不只对 CSS 生效，对写在判别语句里面的一切代码都会生效。
   （3）实践项目中 CSS Hack 大局部是针对 IE 阅读器不同版本之间的表现差别而引入的。

#### 垂直左右居中

1. 子绝父相

   ```css
   .child{
       top:50%;
       left:50%;
    	margin-left:-width/2;
       margin-top:-height/2;
   }
   ```

   需要知道自己的高宽。

2. 子绝父相

   ```css
   .child{
       top:50%;
       left:50%;
    	transform:translate(-50%,-50%);
   }
   ```

   css3特性，兼容性不好。

3. 子绝父相

   ```css
   .child{
       position:absolute;
       top:0;
       left:0;
    	bottom:0;
       right:0;
       margin:auto;
   }
   ```

4. flex布局

   ```css
   .parent{
       display:flex;
       justify-content:center;
       align-items:center;
   }
   ```

#### 定位position

| 值       | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| absolute | 生成绝对定位的元素，**相对于 static 定位以外的第一个父元素进行定位**。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。 |
| fixed    | 生成绝对定位的元素，相对于浏览器窗口进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。 |
| relative | 生成相对定位的元素，相对于其正常位置进行定位。因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。 |
| static   | 默认值。没有定位，元素出现在正常的文档流中（忽略 top, bottom, left, right 或者 z-index 声明）。 |
| inherit  | 规定应该从父元素继承 position 属性的值。                     |
| sticky   | relative+fixed。该元素并不脱离文档流，仍然保留元素原本在文档流中的位置。当元素在容器中被滚动超过指定的偏移值时，元素在容器内固定在指定位置（根据top,left等值确定） |

#### display

| none         | 此元素不会被显示。                                           |
| :----------- | :----------------------------------------------------------- |
| block        | 此元素将显示为块级元素，此元素前后会带有换行符。             |
| inline       | 默认。此元素会被显示为内联元素，元素前后没有换行符。         |
| inline-block | 行内块元素。（CSS2.1 新增的值）                              |
| list-item    | 此元素会作为列表显示。                                       |
| table        | 此元素会作为块级表格来显示（类似 <table>），表格前后带有换行符。 |
| inherit      | 规定应该从父元素继承 display 属性的值。                      |

- display:block

1. block元素会独占一行，多个block元素会各自新起一行。默认情况下，block元素宽度自动填满其父元素宽度。
2. block元素可以设置width,height属性。块级元素即使设置了宽度,仍然是独占一行。
3. block元素可以设置margin和padding属性。

- display:inline

1. inline元素不会独占一行，多个相邻的行内元素会排列在同一行里，直到一行排列不下，才会新换一行，其宽度随元素的内容而变化。
2. inline元素设置width,height属性无效。
3. inline元素的margin和padding属性，水平方向的padding-left, padding-right, margin-left, margin-right都产生边距效果；但竖直方向的padding-top, padding-bottom, margin-top, margin-bottom不会产生边距效果。

- display:inline-block

1. 简单来说就是将对象呈现为inline对象，但是对象的内容作为block对象呈现。之后的内联对象会被排列在同一行内。比如我们可以给一个link（a元素）inline-block属性值，使其既具有block的宽度高度特性又具有inline的同行特性。

#### 隐藏属性display,visibility,opacity

`display: none;`
1、浏览器不会生成属性为display: none;的元素。
2、display: none;不占据空间（毕竟都不渲染啦），所以动态改变此属性时会引起重排。
3、display: none;不会被子类继承，但是···子类是不会显示的，毕竟都一起被kill啦。
4、display,是个尴尬的属性，transition对她无效。

`visibility: hidden;`

1、元素会被隐藏，但是不会消失，依然占据空间。
2、visibility: hidden会被子类继承，子类也可以通过显示的设置visibility: visible;来反隐藏。
3、visibility: hidden;不会触发该元素已经绑定的事件。
4、visibility: hidden;动态修改此属性会引起重绘。
5、visibility,transition对她无效。

`opacity=0`
1、opacity=0只是透明度为100%,元素隐藏，依然占据空间。
2、opacity=0会被子元素继承,且，子元素并不能通过opacity=1，进行反隐藏。不能。
3、opacity=0的元素依然能触发已经绑定的事件。

4、opacity,transition对她有效

#### CSS Sprite

可以减少网络请求的次数，加快运行的速度

又叫CSS雪碧图，把网页中一些背景图片整合到一张图片文件中，再利用CSS的“background-image”，“background- repeat”，“background-position”的组合进行背景定位访问图标。

使用雪碧图的目的：有时为了美观，我们会使用一张图片来代替一些小图标，但是一个网页可能有很多很多的小图标，浏览器在显示页面的时候，就需要像服务器发送很多次访问请求，这样一来，一是造成**资源浪费**，二是会导致**访问速度变慢**。这时候，把很多小图片（需要使用的小图标）放在一张图片上，按照一定的距离隔开，就解决了上述的两个问题。

显示雪碧图的条件：

1）需要一个设置好宽和高的容器

2）需要设置background-position的值（默认为（0，0），也就是图片的左上角），即移动图片到自己想要的图标位置。

#### animation

例1：让一个div，top:50%;left:50%，往上跳100px，然后再回来

```css
        .box1{
            position: absolute;
            top:50%;
            left: 50%;
            width: 100px;
            height: 100px;
            margin: auto;
            background: palegreen;
            animation: jump 3s;
        }
        @keyframes jump {
            0%{left: 50%;top:50%}
            50%{left: 50%;top:calc(50% - 100px)}
            100%{left: 50%;top:50%}
        }
```

#### 绘制三角形

```css
    .trangle{
        width: 0;
        height: 0;
        border-top: 50px solid palevioletred;
        border-right: 50px solid deepskyblue;
        border-left: 50px solid palegreen;
        border-bottom: 50px solid yellow;
    }
    .left {
        width: 0;
        height: 0;
        border-top: 50px solid transparent;
        border-right: 50px solid transparent;
        border-left: 50px solid palegreen;
        border-bottom: 50px solid transparent;
    }
    .top {
        width: 0;
        height: 0;
        border-top: 50px solid palevioletred;
        border-right: 50px solid transparent;
        border-left: 50px solid transparent;
        border-bottom: 50px solid transparent;
    }
```

![1565358338810](C:\Users\Ying\AppData\Roaming\Typora\typora-user-images\1565358338810.png)

#### 具体布局

##### 两列布局

1. 自适应两栏布局，对于左右布局的元素，我们可以给**右侧**的元素添加overflow:hidden或者auto，左侧的是float:left。BFC的区域不会与float box重叠，可以将在div2创建BFC来实现自适应两栏布局。

   ```css
   .div1{
               width: 100px;
               height: 200px;
               float: left;
               background: #f66;
   }
   .div2{
               height: 300px;
               background: #fcc;
               overflow: hidden;//将右边的div盒子BFC化
   }
   ```

2. flex

   利用flex属性，设置占据权重

##### 三列布局

一列固定，其余自适应

flex

```css
        .wrap{
            height:400px;
            width: 100%;
            display: flex;
        }
        .box1{
            background: yellowgreen;
            flex: 1;
            height: 400px;
        }
        .box2{
            background: palevioletred;
            flex-basis: 200px;
            height: 400px;
        }
        .box3{
            flex: 1;
            background: deepskyblue;
            height: 400px;
        }
```

#### 瀑布流布局

```html
<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
        position: relative;
    }
    
    img {
        width: 220px;
        display: block;
    }
    
    .item {
        box-shadow: 2px 2px 2px #999;
        position: absolute;
    }
</style>

<!-- html 部分 -->
<div id="box">
    <div class="item"><img src="../image/瀑布流/001.jpg" alt=""></div>
                                .
                                .
                                .
    <div class="item"><img src="../image/瀑布流/030.jpg" alt=""></div>
</div>

<!-- js 部分 -->
<script>
    var box = document.getElementById('box');
    var items = box.children;
    // 定义每一列之间的间隙 为10像素
    var gap = 10;

    window.onload = function() {
        // 一进来就调用一次
        waterFall();
        // 封装成一个函数
        function waterFall() {
            // 1- 确定列数  = 页面的宽度 / 图片的宽度
            var pageWidth = getClient().width;
            var itemWidth = items[0].offsetWidth;
            var columns = parseInt(pageWidth / (itemWidth + gap));
            var arr = [];
            for (var i = 0; i < items.length; i++) {
                if (i < columns) {
                    // 2- 确定第一行
                    items[i].style.top = 0;
                    items[i].style.left = (itemWidth + gap) * i + 'px';
                    arr.push(items[i].offsetHeight);

                } else {
                    // 其他行
                    // 3- 找到数组中最小高度  和 它的索引
                    var minHeight = arr[0];
                    var index = 0;
                    for (var j = 0; j < arr.length; j++) {
                        if (minHeight > arr[j]) {
                            minHeight = arr[j];
                            index = j;
                        }
                    }
                    // 4- 设置下一行的第一个盒子位置
                    // top值就是最小列的高度 + gap
                    items[i].style.top = arr[index] + gap + 'px';
                    // left值就是最小列距离左边的距离
                    items[i].style.left = items[index].offsetLeft + 'px';

                    // 5- 修改最小列的高度 
                    // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
                    arr[index] = arr[index] + items[i].offsetHeight + gap;
                }
            }
        }
        // 页面尺寸改变时实时触发
        window.onresize = function() {
            waterFall();
        };
        // 当加载到第30张的时候
        window.onscroll = function() {
            if (getClient().height + getScrollTop() >= items[items.length - 1].offsetTop) {//懒加载效果
                // 模拟 ajax 获取数据    
                var datas = [
                    "../image/瀑布流/001.jpg",
                            ...
                    "../image/瀑布流/030.jpg"
                ];
                for (var i = 0; i < datas.length; i++) {
                    var div = document.createElement("div");
                    div.className = "item";
                    div.innerHTML = '<img src="' + datas[i] + '" alt="">';
                    box.appendChild(div);
                }
                waterFall();//注意记得再加载一次
            }

        };
    };

    // clientWidth 处理兼容性
    function getClient() {
        return {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }
    }
    // scrollTop兼容性处理
    function getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }
</script>
```

![image](https://segmentfault.com/img/remote/1460000012621951)

#### base64

图片的 base64 编码就是可以将一副图片数据编码成一串字符串，使用该字符串代替图像地址，该字符串直接写入css里面 ，可以减少一个http请求。

适合base64的场景：

1.图片足够小

2.由于特殊性无法制作成雪碧图

3.复用性高且基本不会更新

优缺点：

**减少一个http请求，但是css体积会增大**，页面解析css生成的cssdom时间增加