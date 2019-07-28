### 基础

**基础语法**：`$(selector).action`

- 美元符号定义 jQuery
- 选择符（selector）“查询”和“查找” HTML 元素
- jQuery 的 action() 执行对元素的操作

**jQuery选择器**：

1. jQuery 使用 CSS 选择器来选取 `HTML 元素`
   - $("p") 选取\<p> 元素。
   - $("p.intro") 选取所有 class="intro" 的 \<p> 元素
   - $("p#demo") 选取所有 id="demo" 的 \<p> 元素。

2. jQuery 使用 XPath 表达式来选择带有给定`属性`的元素
   - $("[href]") 选取所有带有 href 属性的元素。
   - $("[href='#']") 选取所有带有 href 值等于 "#" 的元素。
   - $("[href!='#']") 选取所有带有 href 值不等于 "#" 的元素。
   - $("[href$='.jpg']") 选取所有 href 值以 ".jpg" 结尾的元素。

3. jQuery CSS 选择器可用于改变 HTML 元素的 CSS 属性

   ```javascript
   $("p").css("background-color","red")
   ```

| 语法                 | 描述                                                  |
| :------------------- | :---------------------------------------------------- |
| $(this)              | 当前 HTML 元素                                        |
| $("p")               | 所有 \<p> 元素                                        |
| $("p.intro")         | 所有 class="intro" 的 \<p> 元素                       |
| $(".intro")          | 所有 class="intro" 的元素                             |
| $("#intro")          | id="intro" 的元素                                     |
| $("ul li:first")     | 每个 \<ul> 的第一个 \<li> 元素                        |
| $("[href$='.jpg']")  | 所有带有以 ".jpg" 结尾的属性值的 href 属性            |
| $("div#intro .head") | id="intro" 的 \<div> 元素中的所有 class="head" 的元素 |

**jQuery事件**

| Event 函数                      | 绑定函数至                                     |
| :------------------------------ | :--------------------------------------------- |
| $(document).ready(function)     | 将函数绑定到文档的就绪事件（当文档完成加载时） |
| $(selector).click(function)     | 触发或将函数绑定到被选元素的点击事件           |
| $(selector).dblclick(function)  | 触发或将函数绑定到被选元素的双击事件           |
| $(selector).focus(function)     | 触发或将函数绑定到被选元素的获得焦点事件       |
| $(selector).mouseover(function) | 触发或将函数绑定到被选元素的鼠标悬停事件       |

### jQuery效果

#### 隐藏/显示

`hide()/show()`

可以包含俩个参数speed,callback

```javascript
$(selector).hide(speed,callback)
//spped规定速度，可取fast,slow,毫秒
//callback是隐藏或者显示完成后执行的函数名称
```

#### toggle()

显示被隐藏的元素，并隐藏已显示的元素

#### Fading方法

1. fadeIn(speed,callback)

   用于淡入已隐藏的元素

2. fadeOut(speed,callback)

   用于淡出可见元素

3. fadeToggle(speed,callback)

   fadeToggle() 方法可以在 fadeIn() 与 fadeOut() 方法之间进行切换。

4. fadeTo(speed,opacity,callback)

    fadeTo() 方法允许渐变为给定的不透明度（值介于 0 与 1 之间）

#### 滑动方法

1. slideDown(speed,callback)

   用于向下滑动元素

2. slideUp(speed,callback)

   用于向上滑动元素

3. slideToggle(speed,callback)

   如果元素向下滑动，则 slideToggle() 可向上滑动它们。

   如果元素向上滑动，则 slideToggle() 可向下滑动它们。

#### animate()

jQuery animate() 方法用于创建自定义动画。

语法：`$(selector).animate({params},speed,callback);`

必需的 params 参数定义形成动画的 CSS 属性。

可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。

可选的 callback 参数是动画完成后所执行的函数名称。

**提示：**默认地，所有 HTML 元素都有一个静态位置，且无法移动。

如需对位置进行操作，要记得首先把元素的 CSS position 属性设置为 relative、fixed 或 absolute！

```javascript
<div style="background:#98bf21;height:100px;width:100px;position:absolute;">
</div>

//操作多个属性
$("button").click(function(){
  $("div").animate({
    left:'250px',
    opacity:'0.5',
    height:'150px',
    width:'150px'
  });
});
//使用相对值
$("button").click(function(){
  $("div").animate({
    left:'250px',
    height:'+=150px',
    width:'+=150px'
  });
});
//使用预定义值
$("button").click(function(){
  $("div").animate({
    height:'toggle'
  });
});
//使用队列功能
$("button").click(function(){
  var div=$("div");
  div.animate({height:'300px',opacity:'0.4'},"slow");
  div.animate({width:'300px',opacity:'0.8'},"slow");
  div.animate({height:'100px',opacity:'0.4'},"slow");
  div.animate({width:'100px',opacity:'0.8'},"slow");
});
```

#### stop()

jQuery stop() 方法用于停止动画或效果，在它们完成之前。

stop() 方法适用于所有 jQuery 效果函数，包括滑动、淡入淡出和自定义动画。

语法：`$(selector).stop(stopAll,goToEnd);`

可选的 stopAll 参数规定是否应该清除动画队列。默认是 false，即仅停止活动的动画，允许任何排入队列的动画向后执行。

可选的 goToEnd 参数规定是否立即完成当前动画。默认是 false。

#### callback函数

Callback 函数在当前动画 100% 完成之后执行。如果希望在一个涉及动画的函数之后来执行语句，要使用 callback 函数。

#### chaining技术

允许我们在一条语句中允许多个 jQuery 方法（在相同的元素上）。这样的话，浏览器就不必多次查找相同的元素。如需链接一个动作，您只需简单地把该动作追加到之前的动作上。

栗子：

```
$("#p1").css("color","red")
  .slideUp(2000)
  .slideDown(2000);
```

### jQuery HTML

#### jQuery获取

jQuery 拥有可操作 HTML 元素和属性的强大方法，jQuery 提供一系列与 DOM 相关的方法，这使访问和操作元素和属性变得很容易。

> - text() - 设置或返回所选元素的文本内容
> - html() - 设置或返回所选元素的内容（包括 HTML 标记）
> - val() - 设置或返回表单字段的值
> - attr() - 用于获取属性值,如$().attr('href'),获得链接中 href 属性的值

#### jQuery设置

在获取的方法里面加入要设置的值即可，比如

```javascript
$("#btn1").click(function(){
  $("#test1").text("Hello world!");
});
$("#btn2").click(function(){
  $("#test2").html("<b>Hello world!</b>");
});
$("#btn3").click(function(){
  $("#test3").val("Dolly Duck");
});
```

同时，上面三个函数也拥有回调函数，两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值。然后以函数新值返回希望使用的字符串。

```javas
$("#btn1").click(function(){
  $("#test1").text(function(i,origText){
    return "Old text: " + origText + " New text: Hello world!
    (index: " + i + ")";
  });
});
```

attr()也可以设置/改变属性值,支持回调函数

```javascript
$("button").click(function(){
  $("#w3s").attr("href","http://www.w3school.com.cn/jquery");
});
$("button").click(function(){
  $("#w3s").attr("href", function(i,origValue){
    return origValue + "/jquery";
  });
});
```

#### jQuery添加

通过 jQuery，可以很容易地添加新元素/内容

1. append() - 在被选元素的结尾插入内容

   `$("p").append("Some appended text.");`添加在p标签的内部

2. prepend() - 在被选元素的开头插入内容

   `$("p").prepend("Some prepended text.");`

   ```javascript
   function appendText()
   {
   var txt1="<p>Text.</p>";               // 以 HTML 创建新元素
   var txt2=$("<p></p>").text("Text.");   // 以 jQuery 创建新元素
   var txt3=document.createElement("p");  // 以 DOM 创建新元素
   txt3.innerHTML="Text.";
   $("p").append(txt1,txt2,txt3);         // 追加新元素
   }
   ```

3. after() - 在被选元素之后插入内容

   ```javascript
   function afterText()
   {
   var txt1="<b>I </b>";                    // 以 HTML 创建新元素
   var txt2=$("<i></i>").text("love ");     // 通过 jQuery 创建新元素
   var txt3=document.createElement("big");  // 通过 DOM 创建新元素
   txt3.innerHTML="jQuery!";
   $("img").after(txt1,txt2,txt3);          // 在 img 之后插入新元素
   }
   ```

4. before() - 在被选元素之前插入内容

#### jQuery删除

1. remove()

   删除被选元素及其子元素

   jQuery remove() 方法也可接受一个参数，允许您对被删元素进行过滤。

   该参数可以是任何 jQuery 选择器的语法。

   下面的例子删除 class="italic" 的所有 <p> 元素：

   ### 实例

   ```
   $("p").remove(".italic");
   ```

2. empty()

   从备选元素中删除子元素

#### jQuery CSS类

jQuery 拥有若干进行 CSS 操作的方法。

- addClass() - 向被选元素添加一个或多个类
- removeClass() - 从被选元素删除一个或多个类
- toggleClass() - 对被选元素进行添加/删除类的切换操作
- css() - 设置或返回样式属性

```javascript
$("button").click(function(){
  $("h1,h2,p").addClass("blue");
  $("div").addClass("important");
});
$("button").click(function(){
  $("#div1").addClass("important blue");
});
```

css() 方法设置或返回被选元素的一个或多个样式属性

```javascript
$("p").css("属性名");//返回属性值
css("属性名","值");//设置属性值
$("p").css({"background-color":"yellow","font-size":"200%"});
```

#### jQuery 尺寸

1. width()：设置或返回元素的宽度（不包括内边距、边框或外边距）

2. height()：设置或返回元素的高度（不包括内边距、边框或外边距）

3. innerWidth()：返回元素的宽度（包括内边距）

4. innerHeight()：返回元素的高度（包括内边距）

5. outerWidth()：返回元素的宽度（包括内边距和边框）

6. outerHeight()：返回元素的高度（包括内边距和边框）

```javascript
//outerWidth(true) 方法返回元素的宽度（包括内边距、边框和外边距）。
//outerHeight(true) 方法返回元素的高度（包括内边距、边框和外边距）。
//$(document).width() HTML文档宽度
//$(window).width() 浏览器宽度
//指定元素宽度和高度
$("button").click(function(){
  $("#div1").width(500).height(500);
});
```

### jQuery 遍历

#### jQuery 祖先

向上遍历DOM树

1. parent()

   parent() 方法返回被选元素的**直接父元素**，该方法只会向上一级对 DOM 树进行遍历。

2. parents()

   parents() 方法返回被选元素的所有祖先元素，它一路向上直到文档的根元素 (\<html>)。

   ```javascript
   //返回所有 <span> 元素的所有祖先，并且它是 <ul> 元素
   $(document).ready(function(){
     $("span").parents("ul");
   });
   ```

3. parentsUntil()

   返回介于两个给定元素之间的所有祖先元素

   ```javascript
   $(document).ready(function(){
     $("span").parentsUntil("div");
   });
   ```

#### jQuery 后代

向下遍历 DOM 树，以查找元素的后代

1. children()

   返回被选元素的所有**直接子元素**,也可以使用可选参数来过滤对子元素的搜索，比如`$("div").children("p.1")`返回类名为 "1" 的所有\<p> 元素

2. find()

   返回被选元素的后代元素，一路向下直到最后一个后代

   ```javascript
   //返回属于 <div> 后代的所有 <span> 元素
   $(document).ready(function(){
     $("div").find("span");
   });
   //返回 <div> 的所有后代
   $(document).ready(function(){
     $("div").find("*");
   });
   ```

#### jQuery 同胞

1. siblings()

   返回被选元素的所有同胞元素,也可以使用可选参数来过滤对同胞元素的搜索

2. next()

   返回被选元素的下一个同胞元素

3. nextAll()

   返回被选元素的所有跟随的同胞元素

4. nextUntil()

   返回介于两个给定参数之间的所有跟随的同胞元素

5. prev()，与next()相反，下同

6. prevAll()

7. prevUntil()

#### jQuery 过滤

1. first() 方法返回被选元素的首个元素
2. last() 方法返回被选元素的最后一个元素
3. eq() 方法返回被选元素中带有指定索引号的元素

```javascript
//选取首个 <div> 元素内部的第一个 <p> 元素
$("div p").first();
//选择最后一个 <div> 元素中的最后一个 <p> 元素
$("div p").last();
//选取第二个 <p> 元素（索引号 1）
$("p").eq(1);
```

filter() 方法允许规定一个标准。不匹配这个标准的元素会被从集合中删除，匹配的元素会被返回。下面的例子返回带有类名 "intro" 的所有 \<p> 元素：`$("p").filter(".intro");`,not()方法与filter方法相反。

### jQuery AJAX

**AJAX 是与服务器交换数据的艺术，它在不重载全部页面的情况下，实现了对部分网页的更新。**

AJAX = 异步 JavaScript 和 XML（Asynchronous JavaScript and XML）。

简短地说，在不重载整个网页的情况下，AJAX 通过后台加载数据，并在网页上进行显示。

#### load()方法

load() 方法从服务器加载数据，并把返回的数据放入被选元素中。

语法：`$(selector).load(URL,data,callback);`

- 必需的 *URL* 参数规定您希望加载的 URL。

- 可选的 *data* 参数规定与请求一同发送的查询字符串键/值对集合。

- 可选的 *callback* 参数是 load() 方法完成后所执行的函数名称。回调函数可以设置不同的参数：
  - *responseTxt* - 包含调用成功时的结果内容
  - *statusTXT* - 包含调用的状态
  - *xhr* - 包含 XMLHttpRequest 对象

```javascript
//把文件 "demo_test.txt" 的内容加载到指定的 <div> 元素中
$("#div1").load("demo_test.txt");
//把 "demo_test.txt" 文件中 id="p1" 的元素的内容，加载到指定的 <div> 元素中
$("#div1").load("demo_test.txt #p1");
//在 load() 方法完成后显示一个提示框。如果 load() 方法已成功，则显示“外部内容加载成功！”，而如果失败，则显示错误消息
$("button").click(function(){
  $("#div1").load("demo_test.txt",function(responseTxt,statusTxt,xhr){
    if(statusTxt=="success")
      alert("外部内容加载成功！");
    if(statusTxt=="error")
      alert("Error: "+xhr.status+": "+xhr.statusText);
  });
});
```

#### GET/POST

1. *GET* - 从指定的资源请求数据

   $.get() 方法通过 HTTP GET 请求从服务器上请求数据。

   `$.get(URL,callback);`

   必需的 *URL* 参数规定您希望请求的 URL。

   可选的 *callback* 参数是请求成功后所执行的函数名,第一个回调参数存有被请求页面的内容，第二个回调参数存有请求的状态。

   ```javascript
   $("button").click(function(){
     $.get("demo_test.asp",function(data,status){
       alert("Data: " + data + "\nStatus: " + status);
     });
   });
   ```

2. *POST* - 向指定的资源提交要处理的数据

   $.post() 方法通过 HTTP POST 请求从服务器上请求数据。

   `$.post(URL,data,callback);`

   必需的 *URL* 参数规定您希望请求的 URL。

   可选的 *data* 参数规定连同请求发送的数据。

   可选的 *callback* 参数是请求成功后所执行的函数名。第一个回调参数存有被请求页面的内容，而第二个参数存有请求的状态。

   ```javascript
   $("button").click(function(){
     $.post("demo_test_post.asp",
     {
       name:"Donald Duck",
       city:"Duckburg"
     },
     function(data,status){
       alert("Data: " + data + "\nStatus: " + status);
     });
   });
   ```

### jQuery杂项

jQuery 使用 $ 符号作为 jQuery 的简写，如果其他 JavaScript 框架也使用 $ 符号作为简写怎么办？

在用的两种不同的框架正在使用相同的简写符号，有可能导致脚本停止运行。

**jQuery noConflict() 方法**：noConflict() 方法会释放会 $ 标识符的控制，这样其他脚本就可以使用它了

```javascript
//通过全名替代简写的方式来使用 jQuery
$.noConflict();
jQuery(document).ready(function(){
  jQuery("button").click(function(){
    jQuery("p").text("jQuery 仍在运行！");
  });
});
//创建自己的简写
var jq = $.noConflict();
jq(document).ready(function(){
  jq("button").click(function(){
    jq("p").text("jQuery 仍在运行！");
  });
});
//如果你的 jQuery 代码块使用 $ 简写，并且您不愿意改变这个快捷方式，那么您可以把 $ 符号作为变量传递给 ready 方法。这样就可以在函数内使用 $ 符号了 - 而在函数外，依旧不得不使用 "jQuery"
$.noConflict();
jQuery(document).ready(function($){
  $("button").click(function(){
    $("p").text("jQuery 仍在运行！");
  });
});
```

### $(document).ready(function(){})

$(document).ready(function() {}和$(function(){})等价，谁在前面谁在先执行，还有多个闭包函数时 按成次 一级一级运行的







