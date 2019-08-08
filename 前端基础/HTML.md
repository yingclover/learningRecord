# W3C标准

中文名：万维网联盟，外文名：World Wide Web Consortium          

万维网联盟标准不是某一个标准，而是一些列标准的集合。W3C标准由结构化标准语言，表现标准语言，行为标准等组成。

对应的标准也有三方面：**结构化标准**主要包括XHTML和XML，**表现标准语言**主要包括CSS、**行为标准**主要包括（如W3C DOM）、ECMAScript等。这些标准大部分是W3C起草发布，也有一是其他标准组织制定的标准，比如ECMAScript（European Computer Manufacturers Association）的ECMAScript的标准。

 

目的：为什么要遵循标准

用一个程序语言来说，我们是转换器........adapter，我们想方设法让我们的页面、我们的程序能够支持所有浏览器，能够满足尽可能多的用户。我们要满足所有的用户，即使做不到，我们也要满足我们技术范围之内的所有用户。

目标：一个标准的制作的网站，让你压根感觉不到跟标准有关。

受众： 所有UI设计师、技术工程师、运行维护人员。

标准规范：

1、 需要声明（DOCTYPE）

DOCTYPE（document type）文档类型的简写，用来说明你用的XHTML或者HTML是什么版本。其中DTD叫文档类型定义，里面包含了文档的规则，浏览器就根据你定义的DTD来解释你页面的标识，并展现出来。要建立符合标准的网页，DOCTYPE声明是必不可少的关键组成部分；除非你的XHTML确定了一个正确的DOCTYPE，否则你的标识和css都不会生效。 有过度的（Transitional）、严格的（strict）、框架的（frameset）。

2、需要定义语言编码

<meta http-equiv=“Content-Type” content=“text/html; charset=gb2312” />

注：如果忘记了定义语言编码，可能会出现页面乱码现象。

3、JavaScript定义

Js必须要用<script language="javascript" type="text/javascript">来开头定义，以保证在不支持js的浏览器上直接显示出来。

4、CSS定义

CSS必须要用<style type="text/css">开头来定义，为保证各浏览器的兼容性，在写CSS时请都写上数量单位，例如：错误：.space_10{padding-left:10} 正确：.space_10 {padding-left:10px}

5、使用注释

正确的应用等号或者空格替换内部的虚线。<!--这里是注释============这里是注释-->

6、所有标签的元素和属性名字都必须使用小写

与HTML不一样，XHTML对大小写是敏感的，<title>和<TITLE>是不同的标签。XHTML要求所有的标签和属性的名字都必须使用小写。

6、所有属性值必须用引号括起来（"" ''）双引号或单引号

7、把所有特殊符号用编码表示

空格为&nbsp; 、小于号（<）&lt、大于号（>）&gt、和号（&）&amp等。

8、所有属性必须有属性值

XHTML规定所有属性都必须有个值，没有值就是重复本身。

9、所有的标记都必须有相应的结束标记

双标记：<div></div> 单标记：<img />

10、所有的标记都必须合理嵌套

\<p>\<b>\</p>\</b>必须修改为：\<p>\<b>\</b>\</p> 

11、图片添加有意义的alt属性 

图片加载失败时可以用alt属性表明图片内容。同理添加文字链接的title属性，帮助显示不完整的内容显示完整。

12、在form表单中增加label，以增加用户友好度

结论：

1、标签规范可以提高搜索引擎对页面的抓取效率，对SEO（搜索引擎优化）很有帮助。

2、尽量使用外链css样式表和js脚本。是结构、表现和行为分为三块，符合规范。同时提高页面渲染速度，提高用户的体验。

3、样式尽量少用行间样式表，使结构与表现分离，标签的id和class等属性命名要做到见文知义，标签越少，加载越快，用户体验提高，代码维护简单，便于改版 

**注：JQurry不符合W3C标准**

#### HTML语义化标签

指正确的标签包含了正确的内容，结构良好，便于阅读，比如nav表示导航条，类似的还有article,header,footer等标签。

#### iframe

定义：iframe元素会创建包含另一个文档的内联框架

提示：可以将提示文字放在\<iframe>\</iframe>之间，来提示某些不支持iframe的浏览器

缺点：

会阻塞主页面的onload事件

搜索引擎无法解读这种页面，不利于SEO

iframe和主页面共享连接池，而浏览器对相同区域有限制所以会影响性能。

#### Doctype

Doctype声明于文档最前面，告诉浏览器以何种方式来渲染页面，这里有两种模式，严格模式和混杂模式。

严格模式的排版和JS 运作模式是 以该浏览器支持的最高标准运行。

混杂模式，向后兼容，模拟老式浏览器，防止浏览器无法兼容页面。

#### 严格模式与混杂模式

**严格模式：**又称标准模式，是指浏览器按照 W3C 标准解析代码。

**混杂模式：**又称怪异模式或兼容模式，是指浏览器用自己的方式解析代码。

**如何区分：**浏览器解析时到底使用严格模式还是混杂模式，与网页中的 DTD 直接相关。

1、如果文档包含严格的 DOCTYPE ，那么它一般以严格模式呈现。**（严格 DTD ——严格模式）** 
2、包含过渡 DTD 和 URI 的 DOCTYPE ，也以严格模式呈现，但有过渡 DTD 而没有 URI （统一资源标识符，就是声明最后的地址）会导致页面以混杂模式呈现。**（有 URI 的过渡 DTD ——严格模式；没有 URI 的过渡 DTD ——混杂模式）** 
3、DOCTYPE 不存在或形式不正确会导致文档以混杂模式呈现。**（DTD不存在或者格式不正确——混杂模式）**
4、HTML5 没有 DTD ，因此也就没有严格模式与混杂模式的区别，HTML5 有相对宽松的语法，实现时，已经尽可能大的实现了向后兼容。**（ HTML5 没有严格和混杂之分）**

**意义：**严格模式与混杂模式存在的意义与其来源密切相关，如果说只存在严格模式，那么许多旧网站必然受到影响，如果只存在混杂模式，那么会回到当时浏览器大战时的混乱，每个浏览器都有自己的解析模式。  

#### HTML与XHTML

- XHTML 元素必须被正确地嵌套。
- XHTML 元素必须被关闭。
- 标签名必须用小写字母。
- XHTML 文档必须拥有根元素。

#### RESTFUL

就是用URL定位资源，用HTTP描述操作

#### HTML5新特性

https://www.cnblogs.com/vicky1018/p/7705223.html

- 1.增加语义标签

  header、footer、nav、section、article、aside、details、summaary、dialog

- 2.表单增强

  - 表单输入类型：color、date、email、number、search、tel、url、time
  - 表单元素：datalist（输入域选项列表）、keygen（与秘钥相关）、output（用于不同类型输出）
  - 表单属性：placeholder、required、pattern、min、max、autofocus、multipile、height、width(规定image类型的高宽)

- 3.音频和视频标：audio,video

- 4.canvas绘图：图形容器，必须使用脚本来绘图

- 5.SVG：可伸缩矢量图形

  - Canvas与SVG区别

    SVG 是一种使用 XML 描述 2D 图形的语言。

    Canvas 通过 JavaScript 来绘制 2D 图形。

    SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。您可以为某个元素附加 JavaScript 事件处理器。

    在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。

    Canvas 是逐像素进行渲染的。在 canvas 中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。

- 6.地理定位

- 7.支持拖放

- 8.Web Worker：web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。

- 9.Web Storage：在本地存储浏览数据，localStorage和sessionStorage

  - localStorage:没有时间限制的数据存储,除非手动清空
  - sessionStorage:针对一个 session 的数据存储, 当用户关闭浏览器窗口后，数据会被删除

- Web Soocket：在单个 TCP 连接上进行全双工通讯的协议。在WebSocket API中，浏览器和服务器只需要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送。浏览器通过 JavaScript 向服务器发出建立 WebSocket 连接的请求，连接建立以后，客户端和服务器端就可以通过 TCP 连接直接交换数据。当你获取 Web Socket 连接后，你可以通过 **send()** 方法来向服务器发送数据，并通过 **onmessage** 事件来接收服务器返回的数据。



#### HTML全局属性

可用于任何HTML元素。

| 属性                                                         | 描述                                                   |
| :----------------------------------------------------------- | :----------------------------------------------------- |
| [accesskey](https://www.w3school.com.cn/tags/att_standard_accesskey.asp) | 规定激活元素的快捷键。                                 |
| [class](https://www.w3school.com.cn/tags/att_standard_class.asp) | 规定元素的一个或多个类名（引用样式表中的类）。         |
| [contenteditable](https://www.w3school.com.cn/tags/att_global_contenteditable.asp) | 规定元素内容是否可编辑。                               |
| [contextmenu](https://www.w3school.com.cn/tags/att_global_contextmenu.asp) | 规定元素的上下文菜单。上下文菜单在用户点击元素时显示。 |
| [data-*](https://www.w3school.com.cn/tags/att_global_data.asp) | 用于存储页面或应用程序的私有定制数据。                 |
| [dir](https://www.w3school.com.cn/tags/att_standard_dir.asp) | 规定元素中内容的文本方向。                             |
| [draggable](https://www.w3school.com.cn/tags/att_global_draggable.asp) | 规定元素是否可拖动。                                   |
| [dropzone](https://www.w3school.com.cn/tags/att_global_dropzone.asp) | 规定在拖动被拖动数据时是否进行复制、移动或链接。       |
| [hidden](https://www.w3school.com.cn/tags/att_global_hidden.asp) | 规定元素仍未或不再相关。                               |
| [id](https://www.w3school.com.cn/tags/att_standard_id.asp)   | 规定元素的唯一 id。                                    |
| [lang](https://www.w3school.com.cn/tags/att_standard_lang.asp) | 规定元素内容的语言。                                   |
| [spellcheck](https://www.w3school.com.cn/tags/att_global_spellcheck.asp) | 规定是否对元素进行拼写和语法检查。                     |
| [style](https://www.w3school.com.cn/tags/att_standard_style.asp) | 规定元素的行内 CSS 样式。                              |
| [tabindex](https://www.w3school.com.cn/tags/att_standard_tabindex.asp) | 规定元素的 tab 键次序。                                |
| [title](https://www.w3school.com.cn/tags/att_standard_title.asp) | 规定有关元素的额外信息。                               |
| [translate](https://www.w3school.com.cn/tags/att_global_translate.asp) | 规定是否应该翻译元素内容。                             |

#### WebSocket

HTTP协议是一个请求－响应协议，请求必须先由浏览器发给服务器，服务器才能响应这个请求，再把数据发送给浏览器。换句话说，浏览器不主动请求，服务器是没法主动发数据给浏览器的。

WebSocket是HTML5新增的协议，它的目的是在浏览器和服务器之间建立一个不受限的双向通信的通道，比如说，服务器可以在任意时刻发送消息给浏览器。

WebSocket并不是全新的协议，而是利用了HTTP协议来建立连接。

首先，WebSocket连接必须由浏览器发起，因为请求协议是一个标准的HTTP请求，格式如下：

```
GET ws://localhost:3000/ws/chat HTTP/1.1
Host: localhost
Upgrade: websocket
Connection: Upgrade
Origin: http://localhost:3000
Sec-WebSocket-Key: client-random-string
Sec-WebSocket-Version: 13
```

该请求和普通的HTTP请求有几点不同：

1. GET请求的地址不是类似`/path/`，而是以`ws://`开头的地址；
2. 请求头`Upgrade: websocket`和`Connection: Upgrade`表示这个连接将要被转换为WebSocket连接；
3. `Sec-WebSocket-Key`是用于标识这个连接，并非用于加密数据；
4. `Sec-WebSocket-Version`指定了WebSocket的协议版本。

随后，服务器如果接受该请求，就会返回如下响应：

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: server-random-string
```

该响应代码`101`表示本次连接的HTTP协议即将被更改，更改后的协议就是`Upgrade: websocket`指定的WebSocket协议。

版本号和子协议规定了双方能理解的数据格式，以及是否支持压缩等等。如果仅使用WebSocket的API，就不需要关心这些。

现在，`一个WebSocket连接就建立成功，浏览器和服务器就可以随时主动发送消息给对方`。消息有两种，一种是文本，一种是二进制数据。通常，我们可以发送JSON格式的文本，这样，在浏览器处理起来就十分容易。

为什么WebSocket连接可以实现全双工通信而HTTP连接不行呢？实际上HTTP协议是建立在TCP协议之上的，TCP协议本身就实现了全双工通信，但是HTTP协议的请求－应答机制限制了全双工通信。WebSocket连接建立以后，其实只是简单规定了一下：接下来，咱们通信就不使用HTTP协议了，直接互相发数据吧。

安全的WebSocket连接机制和HTTPS类似。首先，浏览器用`wss://xxx`创建WebSocket连接时，会先通过HTTPS创建安全的连接，然后，该HTTPS连接升级为WebSocket连接，底层通信走的仍然是安全的SSL/TLS协议。

#### 响应式布局与自适应

https://github.com/forthealllight/blog/issues/13

#### 强缓存与协商缓存

https://www.jianshu.com/p/fd00f0d02f5f

缓存的优点：

- 减少了不必要的数据传输，节省带宽
- 减少服务器的负担，提升网站性能
- 加快了客户端加载网页的速度
- 用户体验友好

缺点：

- 资源如果有更改但是客户端不及时更新会造成用户获取信息滞后，如果老版本有bug的话，情况会更加糟糕。

![1563274807764](C:\Users\Ying\AppData\Roaming\Typora\typora-user-images\1563274807764.png)

**强制缓存**

不会向服务器发送请求，直接从缓存中读取资源，在chrome控制台的network选项中可以看到该请求返回200的状态码;

**协商缓存**

向服务器发送请求，服务器会根据这个请求的request header的一些参数来判断是否命中协商缓存，如果命中，则返回304状态码并带上新的response header通知浏览器从缓存中读取资源；
两者的共同点是，都是从客户端缓存中读取资源；区别是强缓存不会发请求，协商缓存会发请求

请求资源时，把用户本地该资源的 etag 同时带到服务端，服务端和最新资源做对比。
如果资源没更改，返回304，浏览器读取本地缓存。（**该资源从上次缓存到现在并没有修改过**）
如果资源有更改，返回200，返回最新的资源。

**为什么要有etag？**
 你可能会觉得使用last-modified已经足以让浏览器知道本地的缓存副本是否足够新，为什么还需要etag呢？HTTP1.1中etag的出现（也就是说，etag是新增的，为了解决之前只有If-Modified的缺点）主要是为了解决几个last-modified比较难解决的问题：

1. 一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新get；
2. 某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，if-modified-since能检查到的粒度是秒级的，这种修改无法判断(或者说UNIX记录MTIME只能精确到秒)；
3. 某些服务器不能精确的得到文件的最后修改时间。

#### 浏览器渲染步骤

1. 解析HTML结构
2. 加载外部脚本和样式表文件
3. 解析并执行脚本代码
4. 构造HTML DOM模型
5. 加载图片等外部文件
6. 页面加载完毕

#### 页面加载完成后执行js的两种方法

1. document.onload
   当一个文档完全下载到浏览器中时，才会触发window.onload事件。这意味着页面上的全部元素对js而言都是可以操作的，也就是说页面上的所有元素加载完毕才会执行。这种情况对编写功能性代码非常有利，因为无需考虑加载的次序。

2. $(document).ready(function(){})或者$(function(){})(前者简写)

   会在DOM完全就绪并可以使用时调用。虽然这也意味着所有元素对脚本而言都是可以访问的，但是，并不意味着所有关联的文件都已经下载完毕。换句话说，当HMTL下载完成并解析为DOM树之后，代码就会执行。$(document).ready要比window.onload先执行