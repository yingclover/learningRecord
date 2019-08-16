AJAX

AJAX是一种用于创建快速动态网页的技术，全称Asynchronous JavaScript and XML，在不重新加载整个页面的情况下，可以与服务器交换数据并更新部分网页内容。

### XMLHttpRequest对象

XMLHttpRequest是AJAX的基础，用于和服务器交换数据。

```javascript
var xhr = new XMLHttpRequest();
```

### XHR 请求

如需将请求发送到服务器，我们使用XHR对象的open()和send()方法。

#### open()

**启动一个请求以备发送，初始化该XMLHttpRequest对象，接受三个参数：**

```
xhr.open(method,url,async);
```

第一个参数表示请求类型的字符串，其值可以是`GET`或者`POST`。

- GET请求：

  ```javascript
  xhr.open("GET",demo.php?name=tsrot&age=24,true);
  ```

- POST请求：

  ```javascript
  xhr.open("POST",demo.php,true);
  ```

第二个参数是要作为请求发送目标的URL。

第三个参数是true或false，表示请求是以异步还是同步的模式发出。（默认为true，一般不建议为false）

- `false`：同步模式发出的请求会暂停所有javascript代码的执行，知道服务器获得响应为止，如果浏览器在连接网络时或者在下载文件时出了故障，页面就会一直挂起。
- `true`：异步模式发出的请求，请求对象收发数据的同时，浏览器可以继续加载页面，执行其他javascript代码

#### send()

```javascript
xhr.send();
```

一般情况下，使用`Ajax`提交的参数多是些简单的字符串，可以直接使用`GET`方法将要提交的参数写到`open`方法的`url`参数中，此时`send`方法的参数为`null`或为空。

- GET请求：

  ```javascript
  xhr.open("GET",demo.php?name=tsrot&age=24,true);
  xhr.send(null);
  ```

- POST请求：

  如果需要像HTML表单那样POST数据，请使用setRequestHeader(header,value)来添加HTTP头，header规定头的名称，value规定头的值。然后在send()方法中规定您希望发送的数据：

  ```javascript
  xhr.open("POST",demo.php,true);
  xhr.setRequestHeder("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
  xhr.send("fname=Henry&lname=Ford")//&分割
  ```

#### 请求方式

常用的get,post,delete，不常用copy，head，link

get与post区别：

- get通过url传递参数，post设置请求头，规定请求数据类型
- get更快，因为参数可以通过url直接获取，而post通过请求体传参，后台通过数据流接收
- post更安全，因为参数在请求体中
- post可以传输的数据量更大
- get主要用于获取数据，post主要用于上传数据

与 POST 相比，GET 更简单也更快，并且在大部分情况下都能用。然而，在以下情况中，请使用 POST 请求：

- 无法使用缓存文件（更新服务器上的文件或数据库）
- 向服务器发送大量数据（POST 没有数据量限制）
- 发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠

### **XHR 响应**

 XMLHttpRequest 对象返回响应的属性

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

status：响应的HTTP状态码

statusText：HTTP状态的说明

返回值一般为`json`字符串，可以用`JSON.parse(xhr.responseText)`转化为`JSON`对象

### XHR readyState

当请求被发送到服务器时，我们需要执行一些基于响应的任务。每当 readyState 改变时，就会触发 onreadystatechange 事件。readyState 属性存有 XMLHttpRequest 的状态信息。

- onreadystatechange

  存储函数（或函数名），每当readyState属性改变时，就会调用该函数。

- readyState

  存有XMLHttpRequest的状态，从0到4发生变化。

  0：未初始化，尚未调用open方法

  1：启动，已经调用open方法，但尚未调用send方法

  2：发送，已经调用send方法，但尚未接收到响应

  3：接受，已经接收到部分响应数据

  4：完成，已经接受到全部响应数据

- status

  200：“OK”

  404：未找到页面

在 onreadystatechange 事件中，我们规定当服务器响应已做好被处理的准备时所执行的任务。当readyState等于4且状态为200时，表示响应已就绪。onreadystatechange 事件被触发 4 次（0 - 4）, 分别是： 0-1、1-2、2-3、3-4，对应着 readyState 的每个变化。

```javascript
xhr.onreadystatechange=function()
{
    if (xhr.readyState==4 && xhr.status==200)
    {
        console.log(JSON.parse(xhr.responseText));
    }
}
```

使用回调函数，回调函数是一种以参数形式传递给另一个函数的函数。

如果您的网站上存在多个 AJAX 任务，那么您应该为创建 XMLHttpRequest 对象编写一个标准的函数，并为每个 AJAX 任务调用该函数。该函数调用应该包含 URL 以及发生 onreadystatechange 事件时执行的任务（每次调用可能不尽相同）：

```javascript
//loadXMLDoc(url,callback{
//  var xhr = new XMLHttpRequest();
//  xhr.onreadystatechange=callback;
//  xhr.open("GET",url,true);
//  xhr.send();
//}
loadXMLDoc("/try/ajax/ajax_info.txt",function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
          document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
        }
});
```

**完整过程:**

```javascript
function ajax(url,success,fail){
    //1.创建XMLHttpRequest对象
    var xhr=null;
    xhr=new XMLHttpRequest()
    //2.规定请求的类型，url，以及是否异步
    xhr.open('get',url,true)
    //3.发送信息到服务器时内容编码类型
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    //4.发送请求
    xhr.send(null);
    //5.接受服务器响应
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                success(xhr.responseText)
            }else{
                fail&&fail(xhr.status)
            }
        }
    }
}
```

### 优缺点

优点：

- 1、最大的一点是页面无刷新，用户的体验非常好。
- 2、使用异步方式与服务器通信，具有更加迅速的响应能力。
- 3、可以把以前一些服务器负担的工作转嫁到客户端，利用客户端闲置的能力来处理，减轻服务器和带宽的负担，节约空间和宽带租用成本。并且减轻服务器的负担，ajax的原则是“按需取数据”，可以最大程度的减少冗余请求，和响应对服务器造成的负担。
- 4、基于标准化的并被广泛支持的技术，不需要下载插件或者小程序。

缺点：

- 1、ajax不支持浏览器back按钮。
- 2、安全问题 AJAX暴露了与服务器交互的细节。
- 3、对搜索引擎的支持比较弱。
- 4、破坏了程序的异常机制。
- 5、不容易调试。

### 应用

#### 输入获取反馈

AJAX 用于创造动态性更强的应用程序。

下面链接是这样一个例子，当用户在输入框中键入字符时，网页如何与 web 服务器进行通信。当输入框输入字符，触发onkeyup函数

- 创建 **XMLHttpRequest** 对象
- 当服务器响应就绪时执行函数
- 把请求发送到服务器上的文件
- 注意向 URL 添加了一个参数 q （带有输入框的内容）

服务器解析url，获取参数，找到对应字符串，然后返回给浏览器

```javascript
function showHint(str) {
    var xhr;
    var text=document.getElementById('hint').innerHTML;
    if(str.length==0){
        text="";
        return;
    }
    if(window.XMLHttpRequest){
        xhr=new XMLHttpRequest();
    }else{
        xhr=new ActiveXObject("Microsoft.XMLHTTP")
    }
    xhr.onreadystatechange=function () {
        if(xhr.state==4&&xhr.status==200){
            text=xhr.responseText;
        }
    }
    xhr.open("GET","url?q+"+str,true);
    xhr.send();
}
```

<https://www.runoob.com/ajax/ajax-asp-php.html>



#### AJAX 数据库

AJAX 可用来与数据库进行动态通信。

下面的例子将演示网页如何通过 AJAX 从数据库读取信息： 请在下面的下拉列表中选择一个客户：

```javascript
function showCustomer(str)
{
  var xmlhttp;    
  if (str=="")
  {
    document.getElementById("txtHint").innerHTML="";
    return;
  }
  if (window.XMLHttpRequest)
  {
    // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xmlhttp=new XMLHttpRequest();
  }
  else
  {
    // IE6, IE5 浏览器执行代码
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET","/try/ajax/getcustomer.php?q="+str,true);
  xmlhttp.send();
}
```

<https://www.runoob.com/ajax/ajax-database.html>

#### AJAX XML

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

### status

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

受浏览器同源策略的影响，不是同域的脚本不能操作其他域下面的对象。**跨域就是一个域下的文档或脚本试图去请求另一个域下的资源**。

广义的跨域：

> 1.资源跳转：a链接，重定向，表单提交
>
> 2.资源嵌入：<script>,<img>,<iframe>等标签，还有样式中background:url()、@font-face()等文件外链
>
> 3.脚本请求：js发起的ajax请求，dom和js对象的跨域操作

### 同源策略

**浏览器的一种安全机制，同源策略，所谓`同源是指，域名，协议，端口相同`。不同源的客户端脚本在没有明确授权的情况下，不能读写对方资源。**所以a.com下的js脚本采用ajax读取b.com里面的文件数据是会报错的。

同源策略限制的行为：

> 1.Cookie,LocalStorage，IndexDB无法读取
>
> 2.DOM和JS对象无法获得
>
> 3.AJAX请求拦截

注意事项：

- 如果是协议和端口造成的跨域问题“前端是无能为力的
- 跨域仅仅是通过“协议”、“域名”、“端口”来识别的，不会根据域名对应的 IP 地址是否相同来判断
- 跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了

当一个浏览器的两个tab页中分别打开来 百度和谷歌的页面，当浏览器的百度tab页执行一个脚本的时候会检查这个脚本是属于哪个页面的，即检查是否同源，只有和百度同源的脚本才会被执行。如果非同源，那么在请求数据时，浏览器会在控制台中报一个异常，提示拒绝访问。

**同源策略是浏览器的行为**，是为了保护本地数据不被JavaScript代码获取回来的数据污染，因此拦截的是客户端发出的请求回来的数据接收，即请求发送了，服务器响应了，但是无法被浏览器接收。

- `DOM 层面的同源策略`：禁止对不同源页面 DOM 进行操作。这里主要场景是 iframe 跨域的情况，不同域名的 iframe 是限制互相访问的。

  > 1. 做一个假网站，里面用 iframe 嵌套一个银行网站 `http://mybank.com`。
  > 2. 把 iframe 宽高啥的调整到页面全部，这样用户进来除了域名，别的部分和银行的网站没有任何差别。
  > 3. 这时如果用户输入账号密码，我们的主网站可以跨域访问到 `http://mybank.com` 的 dom 节点，就可以拿到用户的账户密码了。

- `Cookie和XMLHttprequest层面的同源策略`：禁止 Ajax 直接发起跨域HTTP请求（其实可以发送请求，结果被浏览器拦截，不展示），同时 Ajax 请求不能携带与本网站不同源的 Cookie。

  > 1. 用户登录了自己的银行页面 `http://mybank.com`，`http://mybank.com` 向用户的 cookie 中添加用户标识。
  > 2. 用户浏览了恶意页面 `http://evil.com`，执行了页面中的恶意 AJAX 请求代码。
  > 3. `http://evil.com` 向 `http://mybank.com` 发起 AJAX HTTP 请求，请求会默认把 `http://mybank.com` 对应 cookie 也同时发送过去。
  > 4. 银行页面从发送的 cookie 中提取用户标识，验证用户无误，response 中返回请求数据。此时数据就泄露了。
  > 5. 而且由于 Ajax 在后台执行，用户无法感知这一过程。

- `同源策略的非绝对性`：`<script><img><iframe><link><video><audio>`等带有src属性的标签可以从不同的域加载和执行资源。

- `其他插件的同源策略`：`flash、java applet、silverlight、googlegears`等浏览器加载的第三方插件也有各自的同源策略，只是这些同源策略不属于浏览器原生的同源策略，如果有漏洞则可能被黑客利用，从而留下XSS攻击的后患。

- **不受同源策略限制的：**
  1、**页面中的链接，重定向以及表单提交是不会受到同源策略限制的。**
  2、**跨域资源的引入是可以的。但是js不能读写加载的内容。**如嵌入到页面中的`<script src="..."></script>，<img>，<link>，<iframe>`等。

### 跨域请求的安全问题

#### XSS攻击



#### CSRF攻击

跨站请求伪造，CSRF攻击者在用户已经登录目标网站之后，诱使用户访问一个攻击页面，利用目标网站对用户的信任，以用户身份在攻击页面对目标网站发起伪造用户操作的请求，达到攻击目的。

   CSRF 攻击的原理大致描述如下：有两个网站，其中A网站是真实受信任的网站，而B网站是危险网站。在用户登陆了受信任的A网站是，本地会存储A网站相关的Cookie，并且浏览器也维护这一个Session会话。这时，如果用户在没有登出A网站的情况下访问危险网站B，那么危险网站B就可以模拟发出一个对A网站的请求（跨域请求）对A网站进行操作，而在A网站的角度来看是并不知道请求是由B网站发出来的（Session和Cookie均为A网站的），这时便成功发动一次CSRF 攻击。

   因而 CSRF 攻击可以简单理解为：攻击者盗用了你的身份，以你的名义发送而已请求。CSRF能够做的事情包括：以你名义发送邮件，发消息，盗取你的账号，甚至于购买商品，虚拟货币转账......造成的问题包括：个人隐私泄露以及财产安全。

   因此，大多数浏览器都会跨域请求作出限制，这是从浏览器层面上的对 CSRF 攻击的一种防御，但是需要注意的是在复杂的网络环境中借助浏览器来防御 CSRF 攻击并不足够，还需要从服务端或者客户端方面入手防御。

### 跨域的解决方法

经常使用的有 JSONP, CORS 方法。

#### 1.JSONP

`原理`：

- JSONP 是一种非官方的跨域数据交互协议
- **JSONP 本质上是利用 `script` 标签不受浏览器同源策略的影响，允许跨域引用资源。因此可以通过动态创建 script 标签，然后利用 src 属性进行跨域，在url后面加上回调函数名作为参数，服务器端将数据据放在这个回调函数里传回来。由于返回的是脚本，所以返回后会被立即调用。**

在js中，我们直接用`XMLHttpRequest`请求不同域上的数据时，是不可以的。但是，在页面上引入不同域上的js脚本文件却是可以的，jsonp正是利用这个特性来实现的。 例如：

```html
<script type="text/javascript">
    function dosomething(jsondata){
        //处理获得的json数据
    }
</script>
<script src="http://example.com/data.php?callback=dosomething"></script>
```

如果页面使用jquery，那么通过它封装的方法就能很方便的来进行jsonp操作了。

```html
<script type="text/javascript">
    $.getJSON('http://example.com/data.php?callback=?,function(jsondata)'){
        //处理获得的json数据
    });
</script>
```

`jquery`会自动生成一个全局函数来替换`callback=?`中的问号，之后获取到数据后又会自动销毁，实际上就是起一个临时代理函数的作用。`$.getJSON`方法会自动判断是否跨域，不跨域的话，就调用普通的`ajax`方法；跨域的话，则会以异步加载js文件的形式来调用`jsonp`的回调函数。

JSONP的优缺点：

- JSONP的优点是：它的兼容性更好，简单。
- JSONP的缺点则是：只支持GET请求；它只支持跨域HTTP请求这种情况，不能解决不同域的两个页面之间如何进行`JavaScript`调用的问题。响应可能可能被注入恶意代码，可以采用字符串过滤来规避这个问题，要确定JSONP请求是否失败并不容易。

#### 2.CORS

简而言之，前端无需设置，服务端设置Access-Control-Alow-Origin,Access-Control-Alow-Methods等字段即可。

跨域资源共享 Cross-Origin Resource Sharing(CORS) 是一个新的 W3C 标准，它新增的一组HTTP首部字段，允许服务端其声明哪些源站有权限访问哪些资源。换言之，**它允许浏览器向声明了 CORS 的跨域服务器，发出 XMLHttpReuest 请求，从而克服 Ajax 只能同源使用的限制**。

  CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。

整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，**CORS通信与同源的AJAX通信没有差别**，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

什么情况下需要CORS?

- 由XMLHttpRequest或者Fetch发起的跨域HTTP请求
- Web字体（CSS中通过@font-face使用跨域字体资源）
- WebGL贴图
- 使用drawImage将Images/video画面绘制到canvas

浏览器将CORS请求分为两类：简单请求和非简单请求。

同时满足以下两个条件就属于简单请求:

（1）请求方法是以下三种方法之一

- HEAD
- GET
- POST

（2）HTTP的头信息不超出以下几种字段

- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type(只限于三个值`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`)

其他情况就是非简单请求，对于非简单请求，浏览器必须首先使用 OPTION 方法发起一个预检请求(preflight request)，从而获知服务端是否允许该跨域请求，在服务器确定允许后，才发起实际的HTTP请求。

##### 简单请求

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

上面的头信息中，`Origin`字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。如果`Origin`指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现，这个回应的头信息没有包含`Access-Control-Allow-Origin`字段（详见下文），就知道出错了，从而抛出一个错误，被`XMLHttpRequest`的`onerror`回调函数捕获。注意，**这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200**。

如果`Origin`指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。

```javascript
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8
```

上面的头信息之中，有三个与CORS请求相关的字段，都以`Access-Control-`开头。

​	**1.Access-Control-Allow-Origin**:该字段是必须的。它的值要么是请求时`Origin`字段的值，要么是一个`*`，表示接受任意域名的请求。

​	**2.Access-Control-Allow-Credentials**:该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。**默认情况下，Cookie不包括在CORS请求之中**。设为`true`，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为`true`，如果服务器不要浏览器发送Cookie，删除该字段即可。

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

​	**3.Access-Control-Expose-Headers**:该字段可选。CORS请求时，`XMLHttpRequest`对象的`getResponseHeader()`方法只能拿到6个基本字段：`Cache-Control`、`Content-Language`、`Content-Type`、`Expires`、`Last-Modified`、`Pragma`。如果想拿到其他字段，就必须在`Access-Control-Expose-Headers`里面指定。上面的例子指定，`getResponseHeader('FooBar')`可以返回`FooBar`字段的值。

##### 非简单请求

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是`PUT`或`DELETE`，或者`Content-Type`字段的类型是`application/json`。**非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）**。浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的`XMLHttpRequest`请求，否则就报错。

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

##### 

#### 3.document.domain跨域

**对于主域名相同，而子域名不同的情况，可以使用 document.domain 来跨域，将两个页面的document.domain都设成相同的域名（自身或者更高一级的父域）。这种方式非常适用于不同子域 iframe 跨域的情况。**

`http://www.domain.com/a.html`

```html
<iframe id="iframe" src="http://child.domain.com/b.html"></iframe>
<script>
    document.domain = 'domain.com';
    var user = 'admin';
</script>
```

在页面 `http://child.domain.com/b.html` 中也设置`document.domain`:

```html
<script>
    document.domain = 'domain.com';
    // 获取父窗口中变量
    alert('get js data from parent ---> ' + window.parent.user);
</script>
```

#### 4.window.name跨域

`window`对象有个`name`属性，该属性有个特征：即在一个窗口(window)的生命周期内,**窗口载入的所有的页面都是共享一个window.name**，**每个页面对`window.name`都有读写的权限**，`window.name`是持久存在一个窗口载入过的所有页面中的，并不会因为新的页面的载入而被重置。**name值在不同的页面（甚至不同域名）加载后依旧存在**，并且可以支持非常长的 name 值（2MB）。

比如有一个www.domain1.com/a.html页面。需要通过a.html页面里的js来获取另一个位于不同域上的页面www.domain2.com/data.html中的数据。data.html页面中的设置一个window.name即可,代码如下：

```html
<script>
    window.name = "我是data.html中设置的a页面想要的数据";
</script>
```

具体的实现其实就是在a.html页面中使用一个隐藏的iframe来充当一个中间角色，由iframe去获取data.html的数据，然后a.html再去得到iframe获取到的数据。 

以下为a.html中的代码：

onload事件：页面资源加载完成后再执行函数

```html
<body>
<iframe id="proxy" src="http://www.domain2.com/data.html" style="display: none;" onload = "getData()"> 

<script>
    function getData(){
        var iframe = document.getElementById('proxy);
        iframe.src = 'b.html';
        iframe.onload = function(){
            var data = iframe.contentWindow.name;
            //上述即为获取iframe里的window.name也就是data.html页面中所设置的数据；
        }   
    }
</script>
</body>
```

通过**iframe的src属性由外域转向本地域，跨域数据即由iframe的window.name从外域传递到本地域**。这个就巧妙地绕过了浏览器的跨域访问限制，但同时它又是安全操作。

**这种方法的优点是，`window.name`容量很大，可以放置非常长的字符串；缺点是必须监听子窗口`window.name`属性的变化，影响网页性能。**

#### 5.postMessage

`window.postMessage(message,origin)` 方法是`html5`新引进的特性，跨文档通信，允许跨窗口通信，不论这两个窗口是否同源。

> message: 具体的信息内容
>
> origin:协议+主机+端口号，也可以设置为"*"，表示可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"

父子窗口通过message事件，监听对方消息，`message`事件的事件对象`event`，提供以下三个属性。

> - `event.source`：发送消息的窗口
> - `event.origin`: 消息发向的网址
> - `event.data`: 消息内容

```html
<!--a.html：(http://www.domain1.com/a.html)-->
<iframe id="iframe" src="http://www.domain2.com/b.html" style="display:none;"></iframe>
<script>       
    var iframe = document.getElementById('iframe');
    iframe.onload = function() {
        var data = {
            name: 'aym'
        };
        // 向domain2传送跨域数据
        iframe.contentWindow.postMessage(JSON.stringify(data), 'http://www.domain2.com');
    };

    // 接受domain2返回数据,父窗口和子窗口都可以通过message事件，监听对方的消息
    window.addEventListener('message', function(e) {
        alert('data from domain2 ---> ' + e.data);
    }, false);
</script>
<!--b.html：(http://www.domain2.com/b.html)-->
<script>
    // 接收domain1的数据
    window.addEventListener('message', function(e) {
        alert('data from domain1 ---> ' + e.data);

        var data = JSON.parse(e.data);
        if (data) {
            data.number = 16;
            // 处理后再发回domain1
            window.parent.postMessage(JSON.stringify(data), 'http://www.domain1.com');
        }
    }, false);
</script>
```

#### 6.nginx代理

Nginx是一个高性能的HTTP和反向代理服务器，占有内存少，并发能力强。

http请求转发到另一个或者一些服务器上。通过把本地一个url前缀映射到要跨域访问的web服务器上，就可以实现跨域访问。对于浏览器来说，访问的就是同源服务器上的一个url。而nginx通过检测url前缀，把http请求转发到后面真实的物理服务器。并通过rewrite命令把前缀再去掉。这样真实的服务器就可以正确处理请求，并且并不知道这个请求是来自代理服务器的。

实现原理：同Node.js中间件代理跨域

实现方式：通过nginx配置一个代理服务器（域名与domain1相同，端口不同）做跳板机，反向代理访问domain2接口，并且可以顺便修改cookie中domain信息，方便当前域cookie写入，实现跨域登录

```nginx
server {  
    listen       80;  
    server_name  www.domain1.com;  
    location / {    
        #反向代理    
        proxy_pass   http://www.domain2.com:8080;      
        #修改cookie里域名;    
        proxy_cookie_domain www.domain2.com www.domain1.com;     
        index  index.html index.htm;    
        #当前端只跨域不带cookie时，可为*    
        add_header Access-Control-Allow-Origin http://www.domain1.com;    			add_header Access-Control-Allow-Credentials true;  
    }
}
```

#### 7.nodejs中间件代理跨域

实现原理：**同源策略是浏览器需要遵循的标准，而如果是服务器向服务器请求就无需遵循同源策略**。

代理服务器需要做以下几个步骤：

- 接受客户端请求

- 将请求转发给服务器

- 拿到服务器响应数据

- 将响应转发给客户端![alt](https://www.lolosong.com/static/upload/20190218/OdXF1mAC_qruTDzguLRHpK52.jpg)

  ```nginx
  let express = require('express')
  let proxy = require('http-proxy-middleware');
  let app = express()
  app.use('/', proxy({
      // 代理跨域目标接口
      target: 'http://www.domain2.com:8080',
      changeOrigin: true,
      // 修改响应头信息，实现跨域并允许带cookie
      onProxyRes: function(proxyRes, req, res) {
          res.header('Access-Control-Allow-Origin', 'http://www.domain1.com');
          res.header('Access-Control-Allow-Credentials', 'true');
      },
      // 修改响应信息中的cookie域名
      cookieDomainRewrite: 'www.domain1.com'  // 可以为false，表示不修改
  }));
  ```

#### 8.WebSocket协议跨域

