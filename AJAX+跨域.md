## AJAX

AJAX是一种用于创建快速动态网页的技术，全称Asynchronous JavaScript and XML，在不重新加载整个页面的情况下，可以与服务器交换数据并更新部分网页内容。

### XMLHttpRequest对象

XMLHttpRequest是AJAX的基础，用于和服务器交换数据。

```javascript
var xhr = new XMLHttpRequest();
```

### XHR 请求

如需将请求发送到服务器，我们使用XHR对象的open()和send()方法。

open(method,url,async)：规定请求的类型（GET或POST），url（文件在服务器上的位置）以及是否异步处理请求（true或false）

send(string)：将请求发送到服务器，string：仅用于POST请求。

`GET还是POST？`

与 POST 相比，GET 更简单也更快，并且在大部分情况下都能用。然而，在以下情况中，请使用 POST 请求：

- 无法使用缓存文件（更新服务器上的文件或数据库）
- 向服务器发送大量数据（POST 没有数据量限制）
- 发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠

一个简单的GET请求

```javascript
xmlhttp.open("GET","/try/ajax/demo_get.php",true);
xmlhttp.send();
```

如果您希望通过 GET 方法发送信息，请向 URL 添加信息：

```javascript
xmlhttp.open("GET","/try/ajax/demo_get2.php?fname=Henry&lname=Ford",true);
xmlhttp.send();
```

一个简单的POST请求：

```javascript
xmlhttp.open("POST","/try/ajax/demo_post.php",true);
xmlhttp.send();
```

如果需要像 HTML 表单那样 POST 数据，请使用 setRequestHeader(header,value) 来添加 HTTP 头，header规定头的名称，value规定头的值。然后在 send() 方法中规定您希望发送的数据：

```javascript
xmlhttp.open("POST","/try/ajax/demo_post2.php",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("fname=Henry&lname=Ford");
```

`异步`

JavaScript 会等到服务器响应就绪才继续执行。如果服务器繁忙或缓慢，应用程序会挂起或停止。

open() 方法的 async 参数为 true时是异步，通过AJAX，JavaScript 无需等待服务器的响应，而是：

- 在等待服务器响应时执行其他脚本
- 当响应就绪后对响应进行处理

当为异步时，请规定在响应处于 onreadystatechange 事件中的就绪状态时执行的函数：

```javascript
xmlhttp.onreadystatechange=function()
{
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    }
}
xmlhttp.open("GET","/try/ajax/ajax_info.txt",true);
xmlhttp.send();
```

若参数为false，即同步， onreadystatechange 函数里面的代码放到 send() 语句后面。

```javascript
xmlhttp.open("GET","/try/ajax/ajax_info.txt",false);
xmlhttp.send();
document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
```

### **XHR 响应**

如需获得来自服务器的响应，请使用 XMLHttpRequest 对象的 responseText 或 responseXML 属性。

responseText ：获得字符串形式的响应数据

```javascript
document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
```

responseXML：获得XML形式的响应数据

```javascript
xmlDoc=xmlhttp.responseXML;
txt="";
x=xmlDoc.getElementsByTagName("ARTIST");//xml文件里面标签 为ARTIST的内容
for (i=0;i<x.length;i++)
{
    txt=txt + x[i].childNodes[0].nodeValue + "<br>";
}
document.getElementById("myDiv").innerHTML=txt;
```

### XHR readyState

当请求被发送到服务器时，我们需要执行一些基于响应的任务。每当 readyState 改变时，就会触发 onreadystatechange 事件。readyState 属性存有 XMLHttpRequest 的状态信息。

- onreadystatechange

  存储函数（或函数名），每当readyState属性改变时，就会调用该函数。

- readyState

  存有XMLHttpRequest的状态，从0到4发生变化。

  0：请求初始化

  1：服务器连接已建立

  2：请求已接收

  3：请求处理中

  4：请求已完成，且响应已就绪

- status

  200：“OK”

  404：未找到页面

在 onreadystatechange 事件中，我们规定当服务器响应已做好被处理的准备时所执行的任务。当readyState等于4且状态为200时，表示响应已就绪。onreadystatechange 事件被触发 4 次（0 - 4）, 分别是： 0-1、1-2、2-3、3-4，对应着 readyState 的每个变化。

```javascript
xmlhttp.onreadystatechange=function()
{
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    }
}
```

使用回调函数，回调函数是一种以参数形式传递给另一个函数的函数。

如果您的网站上存在多个 AJAX 任务，那么您应该为创建 XMLHttpRequest 对象编写一个标准的函数，并为每个 AJAX 任务调用该函数。该函数调用应该包含 URL 以及发生 onreadystatechange 事件时执行的任务（每次调用可能不尽相同）：

```javascript
//loadXMLDoc(url,callback{
//  var xmlhttp = new XMLHttpRequest();
//  xmlhttp.onreadystatechange=callback;
//  xmlhttp.open("GET",url,true);
//  xmlhttp.send();
//}
loadXMLDoc("/try/ajax/ajax_info.txt",function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
        }
    });
```

### AJAX ASP/PHP

AJAX 用于创造动态性更强的应用程序。

下面链接是这样一个例子，当用户在输入框中键入字符时，网页如何与 web 服务器进行通信。当输入框输入字符，触发onkeyup函数

- 创建 **XMLHttpRequest** 对象
- 当服务器响应就绪时执行函数
- 把请求发送到服务器上的文件
- 注意向 URL 添加了一个参数 q （带有输入框的内容）

服务器解析url，获取参数，找到对应字符串，然后返回给浏览器

<https://www.runoob.com/ajax/ajax-asp-php.html>

### AJAX 数据库

AJAX 可用来与数据库进行动态通信。

下面的例子将演示网页如何通过 AJAX 从数据库读取信息： 请在下面的下拉列表中选择一个客户：

<https://www.runoob.com/ajax/ajax-database.html>

### AJAX XML

AJAX 可用来与 XML 文件进行交互式通信。

下面的例子将演示网页如何使用 AJAX 来读取来自 XML 文件的信息：

<https://www.runoob.com/ajax/ajax-xmlfile.html>

当用户点击上面的"获取我收藏的 CD"这个按钮，就会执行 loadXMLDoc() 函数。

loadXMLDoc() 函数创建 XMLHttpRequest 对象，添加当服务器响应就绪时执行的函数，并将请求发送到服务器。当服务器响应就绪时，会构建一个 HTML 表格，从 XML 文件中提取节点（元素），最后使用 XML 数据的 填充 id="demo" 的表格元素：

```javascript
function loadXMLDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    myFunction(this);
    }
  };
  xhttp.open("GET", "cd_catalog.xml", true);
  xhttp.send();
}
function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var table="<tr><th>Artist</th><th>Title</th></tr>";
  var x = xmlDoc.getElementsByTagName("CD");
  for (i = 0; i <x.length; i++) { 
    table += "<tr><td>" +
    x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
    "</td></tr>";
  }
  document.getElementById("demo").innerHTML = table;
}
```



**xmlhttp.readyState的值及解释：**

0：请求未初始化（还没有调用 open()）。

1：请求已经建立，但是还没有发送（还没有调用 send()）。

2：请求已发送，正在处理中（通常现在可以从响应中获取内容头）。

3：请求在处理中；通常响应中已有部分数据可用了，但是服务器还没有完成响应的生成。

4：响应已完成；您可以获取并使用服务器的响应了。

**xmlhttp.status的值及解释：**

100——客户必须继续发出请求

101——客户要求服务器根据请求转换HTTP协议版本

200——交易成功

201——提示知道新文件的URL

202——接受和处理、但处理未完成

203——返回信息不确定或不完整

204——请求收到，但返回信息为空

205——服务器完成了请求，用户代理必须复位当前已经浏览过的文件

206——服务器已经完成了部分用户的GET请求

300——请求的资源可在多处得到

301——删除请求数据

302——在其他地址发现了请求数据

303——建议客户访问其他URL或访问方式

304——客户端已经执行了GET，但文件未变化

305——请求的资源必须从服务器指定的地址得到

306——前一版本HTTP中使用的代码，现行版本中不再使用

307——申明请求的资源临时性删除

400——错误请求，如语法错误

401——请求授权失败

402——保留有效ChargeTo头响应

403——请求不允许

404——没有发现文件、查询或URl

405——用户在Request-Line字段定义的方法不允许

406——根据用户发送的Accept拖，请求资源不可访问

407——类似401，用户必须首先在代理服务器上得到授权

408——客户端没有在用户指定的饿时间内完成请求

409——对当前资源状态，请求不能完成

410——服务器上不再有此资源且无进一步的参考地址

411——服务器拒绝用户定义的Content-Length属性请求

412——一个或多个请求头字段在当前请求中错误

413——请求的资源大于服务器允许的大小

414——请求的资源URL长于服务器允许的长度

415——请求资源不支持请求项目格式

416——请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求也不包含If-Range请求头字段

417——服务器不满足请求Expect头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求

**合起来**

500——服务器产生内部错误

501——服务器不支持请求的函数

502——服务器暂时不可用，有时是为了防止发生系统过载

503——服务器过载或暂停维修

504——关口过载，服务器使用另一个关口或服务来响应用户，等待时间设定值较长

505——服务器不支持或拒绝支请求头中指定的HTTP版本

1xx:信息响应类，表示接收到请求并且继续处理

2xx:处理成功响应类，表示动作被成功接收、理解和接受

3xx:重定向响应类，为了完成指定的动作，必须接受进一步处理

4xx:客户端错误，客户请求包含语法错误或者是不能正确执行

5xx:服务端错误，服务器不能正确执行一个正确的请求

------



## 跨域

### 什么是跨域？

​	在HTML中，\<a>, \<form>, \<img>, \<script>, \<iframe>, \<link> 等标签以及 Ajax 都可以指向一个资源地址，当发起请求的域和资源所在的域不一样时就是跨域，而这里的域指的是这样一个概念，当两个域协议+域名+端口号均相同时，就是同域。

### 跨域请求的安全问题

浏览器会对跨域请求作出限制，因为跨域请求可能被不法分子利用来发动CSRF攻击。

**CSRF攻击**：跨站请求伪造，CSRF攻击者在用户已经登录目标网站之后，诱使用户访问一个攻击页面，利用目标网站对用户的信任，以用户身份在攻击页面对目标网站发起伪造用户操作的请求，达到攻击目的。

   CSRF 攻击的原理大致描述如下：有两个网站，其中A网站是真实受信任的网站，而B网站是危险网站。在用户登陆了受信任的A网站是，本地会存储A网站相关的Cookie，并且浏览器也维护这一个Session会话。这时，如果用户在没有登出A网站的情况下访问危险网站B，那么危险网站B就可以模拟发出一个对A网站的请求（跨域请求）对A网站进行操作，而在A网站的角度来看是并不知道请求是由B网站发出来的（Session和Cookie均为A网站的），这时便成功发动一次CSRF 攻击。

   因而 CSRF 攻击可以简单理解为：攻击者盗用了你的身份，以你的名义发送而已请求。CSRF能够做的事情包括：以你名义发送邮件，发消息，盗取你的账号，甚至于购买商品，虚拟货币转账......造成的问题包括：个人隐私泄露以及财产安全。

   因此，大多数浏览器都会跨域请求作出限制，这是从浏览器层面上的对 CSRF 攻击的一种防御，但是需要注意的是在复杂的网络环境中借助浏览器来防御 CSRF 攻击并不足够，还需要从服务端或者客户端方面入手防御。

### 同源策略

同源策略，它是由Netscape提出的一个著名的安全策略。现在所有支持JavaScript 的浏览器都会使用这个策略。所谓`同源是指，域名，协议，端口相同`。当一个浏览器的两个tab页中分别打开来 百度和谷歌的页面

当浏览器的百度tab页执行一个脚本的时候会检查这个脚本是属于哪个页面的，即检查是否同源，只有和百度同源的脚本才会被执行。如果非同源，那么在请求数据时，浏览器会在控制台中报一个异常，提示拒绝访问。

**同源策略是浏览器的行为**，是为了保护本地数据不被JavaScript代码获取回来的数据污染，因此拦截的是客户端发出的请求回来的数据接收，即请求发送了，服务器响应了，但是无法被浏览器接收。

- `DOM 层面的同源策略`：限制了来自不同源的”Document”对象或 JS 脚本，对当前“document”对象的读取或设置某些属性
- `Cookie和XMLHttprequest层面的同源策略`：禁止 Ajax 直接发起跨域HTTP请求（其实可以发送请求，结果被浏览器拦截，不展示），同时 Ajax 请求不能携带与本网站不同源的 Cookie。
- `同源策略的非绝对性`：`<script><img><iframe><link><video><audio>`等带有src属性的标签可以从不同的域加载和执行资源。
- `其他插件的同源策略`：`flash、java applet、silverlight、googlegears`等浏览器加载的第三方插件也有各自的同源策略，只是这些同源策略不属于浏览器原生的同源策略，如果有漏洞则可能被黑客利用，从而留下XSS攻击的后患。

### 跨域的解决方法

虽然在安全层面上同源限制是必要的，但有时同源策略会对我们的合理用途造成影响，为了避免开发的应用受到限制，有多种方式可以绕开同源策略，经常使用的有 JSONP, CORS 方法。

### JSONP

`原理`：

- JSONP 是一种非官方的跨域数据交互协议
- JSONP 本质上是利用 `<script><img><iframe>` 等标签不受同源策略限制，可以从不同域加载并执行资源的特性，来实现数据跨域传输。
- JSONP由两部分组成：回调函数和数据。**回调函数是当响应到来时应该在页面中调用的函数，而数据就是传入回调函数中的JSON数据**。
- JSONP 的理念就是，与服务端约定好一个回调函数名，服务端接收到请求后，将返回一段 Javascript，在这段  Javascript 代码中调用了约定好的回调函数，并且将数据作为参数进行传递。当网页接收到这段 Javascript 代码后，就会执行这个回调函数，这时数据已经成功传输到客户端了。所以jsonp是需要服务器端的页面进行相应的配合。

在js中，我们直接用`XMLHttpRequest`请求不同域上的数据时，是不可以的。但是，在页面上引入不同域上的js脚本文件却是可以的，jsonp正是利用这个特性来实现的。 例如：

```javascript
<script type="text/javascript">
    function dosomething(jsondata){
        //处理获得的json数据
    }
</script>
<script src="http://example.com/data.php?callback=dosomething"></script>
```

如果页面使用jquery，那么通过它封装的方法就能很方便的来进行jsonp操作了。

```javascript
<script type="text/javascript">
    $.getJSON('http://example.com/data.php?callback=?,function(jsondata)'){
        //处理获得的json数据
    });
</script>
```

`jquery`会自动生成一个全局函数来替换`callback=?`中的问号，之后获取到数据后又会自动销毁，实际上就是起一个临时代理函数的作用。`$.getJSON`方法会自动判断是否跨域，不跨域的话，就调用普通的`ajax`方法；跨域的话，则会以异步加载js文件的形式来调用`jsonp`的回调函数。

JSONP的优缺点：

- JSONP的优点是：它不像`XMLHttpRequest`对象实现的Ajax请求那样受到同源策略的限制；它的兼容性更好，在更加古老的浏览器中都可以运行，不需要XMLHttpRequest或ActiveX的支持；并且在请求完毕后可以通过调用callback的方式回传结果。
- JSONP的缺点则是：它只支持GET请求而不支持POST等其它类型的HTTP请求；它只支持跨域HTTP请求这种情况，不能解决不同域的两个页面之间如何进行`JavaScript`调用的问题。

### **CORS**

跨源资源共享 **Cross-Origin Resource Sharing(CORS)** 是一个新的 W3C 标准，它新增的一组HTTP首部字段，允许服务端其声明哪些源站有权限访问哪些资源。换言之，`它允许浏览器向声明了 CORS 的跨域服务器，发出 XMLHttpReuest 请求，从而克服 Ajax 只能同源使用的限制`。

  CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。

整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

浏览器将CORS请求分为两类：简单请求和非简单请求。

同时满足以下两个条件就属于简单请求:

（1）请求方法是以下三种方法之一：HEAD,GET,POST.

（2）HTTP的头信息不超出以下几种字段：Accept,Accept-Language,Content-Language,Last-Event-ID,Content-Type(只限于三个值`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`)

其他情况就是非简单请求，对于非简单请求，浏览器必须首先使用 OPTION 方法发起一个预检请求(preflight request)，从而获知服务端是否允许该跨域请求，在服务器确定允许后，才发起实际的HTTP请求。

**简单请求**

对于简单请求，浏览器直接发出CORS请求。具体来说，就是在头信息之中，增加一个`Origin`字段。

下面是一个例子，浏览器发现这次跨源AJAX请求是简单请求，就自动在头信息之中，添加一个`Origin`字段。

```javascript
GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

上面的头信息中，`Origin`字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。如果`Origin`指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现，这个回应的头信息没有包含`Access-Control-Allow-Origin`字段（详见下文），就知道出错了，从而抛出一个错误，被`XMLHttpRequest`的`onerror`回调函数捕获。注意，这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200。

如果`Origin`指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。

```javascript
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8
```

上面的头信息之中，有三个与CORS请求相关的字段，都以`Access-Control-`开头。

​	**Access-Control-Allow-Origin**:该字段是必须的。它的值要么是请求时`Origin`字段的值，要么是一个`*`，表示接受任意域名的请求。

​	**Access-Control-Allow-Credentials**:该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为`true`，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为`true`，如果服务器不要浏览器发送Cookie，删除该字段即可。

​		**注意**：CORS请求默认不发送Cookie和HTTP认证信息。如果要把Cookie发到服务器，一方面要服务器同意，指定`Access-Control-Allow-Credentials`字段。另一方面，开发者必须在AJAX请求中打开`withCredentials`属性。

```javascript
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

否则，即使服务器同意发送Cookie，浏览器也不会发送。或者，服务器要求设置Cookie，浏览器也不会处理。但是，如果省略`withCredentials`设置，有的浏览器还是会一起发送Cookie。这时，可以显式关闭`withCredentials`。

```javascript
xhr.withCredentials = false;
```

需要注意的是，如果要发送Cookie，`Access-Control-Allow-Origin`就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的`document.cookie`也无法读取服务器域名下的Cookie。

​	**Access-Control-Expose-Headers**:该字段可选。CORS请求时，`XMLHttpRequest`对象的`getResponseHeader()`方法只能拿到6个基本字段：`Cache-Control`、`Content-Language`、`Content-Type`、`Expires`、`Last-Modified`、`Pragma`。如果想拿到其他字段，就必须在`Access-Control-Expose-Headers`里面指定。上面的例子指定，`getResponseHeader('FooBar')`可以返回`FooBar`字段的值。

**非简单请求**

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是`PUT`或`DELETE`，或者`Content-Type`字段的类型是`application/json`。非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）。浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的`XMLHttpRequest`请求，否则就报错。

```javascript
var url = 'http://api.alice.com/cors';
var xhr = new XMLHttpRequest();
xhr.open('PUT', url, true);
xhr.setRequestHeader('X-Custom-Header', 'value');
xhr.send();
```

上面代码中，HTTP请求的方法是`PUT`，并且发送一个自定义头信息`X-Custom-Header`。

浏览器发现，这是一个非简单请求，就自动发出一个"预检"请求，要求服务器确认可以这样请求。下面是这个"预检"请求的HTTP头信息。

```javascript
OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

"预检"请求用的请求方法是`OPTIONS`，表示这个请求是用来询问的。头信息里面，关键字段是`Origin`，表示请求来自哪个源。除了`Origin`字段，"预检"请求的头信息包括两个特殊字段。

​	**Access-Control-Request-Method**:该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是`PUT`.

​	**Access-Control-Request-Headers**:该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是`X-Custom-Header`。

------

服务器收到"预检"请求以后，检查了`Origin`、`Access-Control-Request-Method`和`Access-Control-Request-Headers`字段以后，确认允许跨源请求，就可以做出回应。

```javascript
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
```

上面的HTTP回应中，关键的是`Access-Control-Allow-Origin`字段，表示`http://api.bob.com`可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。

如果浏览器否定了"预检"请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被`XMLHttpRequest`对象的`onerror`回调函数捕获。控制台会打印出如下的报错信息。

```javascript
XMLHttpRequest cannot load http://api.alice.com.
Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.
```

服务器回应的其他CORS相关字段如下。

```javascript
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 1728000
```

​	**Access-Control-Allow-Methods**:该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。

​	**Access-Control-Allow-Headers**:如果浏览器请求包括`Access-Control-Request-Headers`字段，则`Access-Control-Allow-Headers`字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。

​	**Access-Control-Allow-Credentials**:该字段与简单请求时的含义相同。

​	**Access-Control-Max-Age**:该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。

------

一旦服务器通过了"预检"请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个`Origin`头信息字段。服务器的回应，也都会有一个`Access-Control-Allow-Origin`头信息字段。

下面是"预检"请求之后，浏览器的正常CORS请求。

```javascript
PUT /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
X-Custom-Header: value
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

上面头信息的`Origin`字段是浏览器自动添加的。

------

下面是服务器正常的回应。

```javascript
Access-Control-Allow-Origin: http://api.bob.com
Content-Type: text/html; charset=utf-8
```

上面头信息中，`Access-Control-Allow-Origin`字段是每次回应都必定包含的。

**与JSOP的比较：**

- JSONP 只能实现 GET 请求，而 CORS 支持所有类型的 HTTP 请求
- 使用 CORS ，开发者可以是使用普通的 XMLHttpRequest 发起请求和获取数据，比起 JSONP 有更好的错误处理
- 虽然绝大多数现代的浏览器都已经支持 CORS，但是 CORS 的兼容性比不上 JSONP，一些比较老的浏览器只支持 JSONP

### 通过修改document.domain来跨子域

浏览器都有一个同源策略，其限制之一就是第一种方法中我们说的**不能通过ajax的方法去请求不同源中的文档**。 它的第二个限制是**浏览器中不同域的框架之间是不能进行js的交互操作的**。
不同的框架之间是可以获取window对象的，但却无法获取相应的属性和方法。比如，有一个页面，它的地址是`http://www.example.com/a.html` ， 在这个页面里面有一个`iframe`，它的src是`http://example.com/b.html`, 很显然，这个页面与它里面的`iframe`框架是不同域的，所以我们是无法通过在页面中书写js代码来获取`iframe`中的东西的：

```javascript
<script type="text/javascript">
    function test(){
        var iframe = document.getElementById('￼ifame');
        var win = document.contentWindow;//可以获取到iframe里的window对象，但该window对象的属性和方法几乎是不可用的
        var doc = win.document;//这里获取不到iframe里的document对象
        var name = win.name;//这里同样获取不到window对象的name属性
    }
</script>
<iframe id = "iframe" src="http://example.com/b.html" onload = "test()"></iframe>
```

这个时候，`document.domain`就可以派上用场了，我们只要把`http://www.example.com/a.html` 和 `http://example.com/b.html`这两个页面的document.domain都设成相同的域名就可以了。但要注意的是，document.domain的设置是有限制的，我们只能把document.domain设置成自身或更高一级的父域，且主域必须相同。（主域只能有一个点）

- 在页面 `http://www.example.com/a.html` 中设置`document.domain`:

  ```javascript
  <iframe id = "iframe" src="http://example.com/b.html" onload = "test()"></iframe>
  <script type="text/javascript">
      document.domain = 'example.com';//设置成主域,example.com是www.example.com的父级域名
      function test(){
          alert(document.getElementById('￼iframe').contentWindow);//contentWindow 可取得子窗口的 window 对象
      }
  </script>
  ```

- 在页面 `http://example.com/b.html` 中也设置`document.domain`:

  ```javascript
  <script type="text/javascript">
      document.domain = 'example.com';//在iframe载入这个页面也设置document.domain，使之与主页面的document.domain相同
  </script>
  ```

  修改`document.domain`的方法只适用于不同子域的框架间的交互。

### 使用window.name来进行跨域

`window`对象有个`name`属性，该属性有个特征：即在一个窗口(window)的生命周期内,窗口载入的所有的页面都是共享一个`window.name`的，每个页面对`window.name`都有读写的权限，`window.name`是持久存在一个窗口载入过的所有页面中的，并不会因为新的页面的载入而被重置。name值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值（2MB）。

实例说明：下面就来看一看具体是如何通过window.name来跨域获取数据的；

比如有一个www.example.com/a.html页面。需要通过a.html页面里的js来获取另一个位于不同域上的页面www.cnblogs.com/data.html中的数据。data.html页面中的设置一个window.name即可,代码如下：

```html
<script>
    window.name = "我是data.html中设置的a页面想要的数据";
</script>
```

那么接下来问题来了，我们怎么把data.html页面载入进来呢，显然我们不能直接在a.html页面中通过改变window.location来载入data.html页面（因为我们现在需要实现的是a.html页面不跳转,但是也能够获取到data.html中的数据）； 
具体的实现其实就是在a.html页面中使用一个隐藏的iframe来充当一个中间角色，由iframe去获取data.html的数据，然后a.html再去得到iframe获取到的数据。 
充当中间人的iframe想要获取到data.html中通过window.name设置的数据，只要要把这个iframe的src设置为www.cnblogs.com/data.html即可,然后a.html想要得到iframe所获取到的数据，也就是想要得到iframe的widnow.name的值，还必须把这个iframe的src设置成跟a.html页面同一个域才行，不然根据同源策略，a.html是不能访问到iframe中的window.name属性的。

以下为a.html中的代码：

```html
<body>
<iframe id="proxy" src="http://www.cnblogs.com/data.html" style="display: none;" onload = "getData()"> 

<script>
    function getData(){
        var iframe = document.getElementById('proxy);
        iframe.onload = function(){
            var data = iframe.contentWindow.name;
            //上述即为获取iframe里的window.name也就是data.html页面中所设置的数据；
        }
        iframe.src = 'b.html';
    }
</script>
</body>
```

通过iframe的src属性由外域转向本地域，跨域数据即由iframe的window.name从外域传递到本地域。这个就巧妙地绕过了浏览器的跨域访问限制，但同时它又是安全操作。

### 使用HTML5的window.postMessage方法跨域

`window.postMessage(message,targetOrigin)` 方法是`html5`新引进的特性，可以使用它来向其它的`window`对象发送消息，无论这个window对象是属于同源或不同源，目前`IE8+、FireFox、Chrome、Opera`等浏览器都已经支持`window.postMessage`方法。

message: 将要发送到其他 window的数据。

targetOrigin:通过窗口的origin属性来指定哪些窗口能接收到消息事件，其值可以是字符串"*"（表示无限制）或者一个URI。在发送消息的时候，如果目标窗口的协议、主机地址或端口这三者的任意一项不匹配targetOrigin提供的值，那么消息就不会被发送；只有三者完全匹配，消息才会被发送。

九种跨域解决方案：<https://juejin.im/post/5c23993de51d457b8c1f4ee1>

