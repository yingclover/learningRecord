#### vue节点更新机制

要知道渲染真实DOM的开销是很大的，比如有时候我们修改了某个数据，如果直接渲染到真实dom上会引起整个dom树的重绘和重排，有没有可能我们只更新我们修改的那一小块dom而不要更新整个dom呢？diff算法能够帮助我们。

我们先根据真实DOM生成一颗`virtual DOM`，当`virtual DOM`某个节点的数据改变后会生成一个新的`Vnode`，然后`Vnode`和`oldVnode`作对比，发现有不一样的地方就直接修改在真实的DOM上，然后使`oldVnode`的值为`Vnode`。
diff的过程就是调用名为`patch`的函数，比较新旧节点，一边比较一边给**真实的DOM**打补丁。

#### 虚拟DOM和真实DOM的区别

virtual DOM是将真实的DOM的数据抽取出来，以对象的形式模拟树形结构。比如dom是这样的：

```html
<div>
    <p>123</p>
</div>
```

对应的virtual DOM（伪代码）：

```javascript
var Vnode = {
    tag: 'div',
    children: [
        { tag: 'p', text: '123' }
    ]
};
```

（注意：`VNode`和`oldVNode`都是对象，一定要记住）

#### diff的比较方式

在采取diff算法比较新旧节点的时候，比较只会在同层级进行, 不会跨层级比较。

```html
<div>
    <p>123</p>
</div>

<div>
    <span>456</span>
</div>
```

上面的代码会分别比较同一层的两个div以及第二层的p和span，但是不会拿div和span作比较。下图可以很形象的表示： 

![img](https://user-gold-cdn.xitu.io/2018/5/19/163776ba7bda2d47?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**比较只会在同层级进行, 不会跨层级比较。**
比较后会出现四种情况：
1、此节点是否被移除 -> 添加新的节点 
2、属性是否被改变 -> 旧属性改为新属性
3、文本内容被改变-> 旧内容改为新内容
4、节点要被整个替换 -> 结构完全不相同 移除整个替换

#### diff流程图

当数据发生改变时，set方法会让调用`Dep.notify`通知所有订阅者Watcher，订阅者就会调用`patch`给真实的DOM打补丁，更新相应的视图。

![img](https://user-gold-cdn.xitu.io/2018/5/19/163777930be304eb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### 具体分析

vnode的属性：

```javascript
// body下的 <div id="v" class="classA"><div> 对应的 oldVnode 就是
{
  el:  div  //对真实的节点的引用，本例中就是document.querySelector('#id.classA')
  tagName: 'DIV',   //节点的标签
  sel: 'div#v.classA'  //节点的选择器
  data: null,       // 一个存储节点属性的对象，对应节点的el[prop]属性，例如onclick , style
  children: [], //存储子节点的数组，每个子节点也是vnode结构
  text: null,    //如果是文本节点，对应文本节点的textContent，否则为null
}
```

需要注意的是，el属性引用的是此 virtual dom对应的真实dom，`patch`的`vnode`参数的`el`最初是null，因为`patch`之前它还没有对应的真实dom。

##### patch

```javascript
function patch (oldVnode, vnode) {
    // some code
    if (sameVnode(oldVnode, vnode)) {
    	patchVnode(oldVnode, vnode)
    } else {//不值得比较则用vnode替换oldNode
    	const oEl = oldVnode.el // 当前oldVnode对应的真实元素节点
    	let parentEle = api.parentNode(oEl)  // 父元素，真实dom节点
    	createEle(vnode)  // 根据Vnode生成dom节点，令vnode.el=真实dom
    	if (parentEle !== null) {
            api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl)) // 将新元素添加进父元素
            api.removeChild(parentEle, oldVnode.el)  // 移除以前的旧元素节点
            oldVnode = null
    	}
    }
    // some code 
    return vnode//唯一的改变就是之前vnode.el = null, 而现在它引用的是对应的真实dom。
}
```

patch函数接收两个参数`oldVnode`和`Vnode`分别代表新的节点和之前的旧节点。

```javascript
//判断两节点是否值得比较，值得比较则执行patchVnode,
function sameVnode (a, b) {
  return (
    a.key === b.key &&  // key值
    a.tag === b.tag &&  // 标签名
    a.isComment === b.isComment &&  // 是否为注释节点
    // 是否都定义了data，data包含一些具体信息，例如onclick , style
    isDef(a.data) === isDef(b.data) &&  
    sameInputType(a, b) // 当标签是<input>的时候，type必须相同
  )
}
```

如果两个节点都是一样的，那么就深入检查他们的子节点。如果两个节点不一样那就说明`Vnode`完全被改变了，就可以直接替换`oldVnode`。

##### patchVnode

当我们确定两个节点值得比较之后我们会对两个节点指定`patchVnode`方法。

```javascript
patchVnode (oldVnode, vnode) {
    const el = vnode.el = oldVnode.el
    let i, oldCh = oldVnode.children, ch = vnode.children
    if (oldVnode === vnode) return
    if (oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text) {
        api.setTextContent(el, vnode.text)
    }else {
        updateEle(el, vnode, oldVnode)
    	if (oldCh && ch && oldCh !== ch) {
            updateChildren(el, oldCh, ch)
    	}else if (ch){
            createEle(vnode) //create el's children dom
    	}else if (oldCh){
            api.removeChildren(el)
    	}
    }
}
```

`const el = vnode.el = oldVnode.el` 这是很重要的一步，让`vnode.el`引用到现在的真实dom，当`el`修改时，`vnode.el`会同步变化。

节点的比较有5种情况

1. `if (oldVnode === vnode)`，他们的引用一致，可以认为没有变化。
2. `if(oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text)`，文本节点的比较，需要修改，则会调用`Node.textContent = vnode.text`。
3. `if( oldCh && ch && oldCh !== ch )`, 两个节点都有子节点，而且它们不一样，这样我们会调用`updateChildren`函数比较子节点，这是diff的核心，后边会讲到。
4. `else if (ch)`，只有新的节点有子节点，调用`createEle(vnode)`，`vnode.el`已经引用了老的dom节点，`createEle`函数会在老dom节点上添加子节点。
5. `else if (oldCh)`，新节点没有子节点，老节点有子节点，直接删除老节点。

##### updateChildren

```javascript
updateChildren (parentElm, oldCh, newCh) {
    let oldStartIdx = 0, newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx
    let idxInOld
    let elmToMove
    let before
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null) {   // 对于vnode.key的比较，会把oldVnode = null
            oldStartVnode = oldCh[++oldStartIdx] 
        }else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx]
        }else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx]
        }else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx]
        }else if (sameVnode(oldStartVnode, newStartVnode)) {
            patchVnode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        }else if (sameVnode(oldEndVnode, newEndVnode)) {
            patchVnode(oldEndVnode, newEndVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        }else if (sameVnode(oldStartVnode, newEndVnode)) {
            patchVnode(oldStartVnode, newEndVnode)
            api.insertBefore(parentElm, oldStartVnode.el, api.nextSibling(oldEndVnode.el))
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        }else if (sameVnode(oldEndVnode, newStartVnode)) {
            patchVnode(oldEndVnode, newStartVnode)
            api.insertBefore(parentElm, oldEndVnode.el, oldStartVnode.el)
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        }else {
           // 使用key时的比较
            if (oldKeyToIdx === undefined) {
                oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx) // 有key生成index表
            }
            idxInOld = oldKeyToIdx[newStartVnode.key]
            if (!idxInOld) {
                api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                newStartVnode = newCh[++newStartIdx]
            }
            else {
                elmToMove = oldCh[idxInOld]
                if (elmToMove.sel !== newStartVnode.sel) {
                    api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                }else {
                    patchVnode(elmToMove, newStartVnode)
                    oldCh[idxInOld] = null
                    api.insertBefore(parentElm, elmToMove.el, oldStartVnode.el)
                }
                newStartVnode = newCh[++newStartIdx]
            }
        }
    }
    if (oldStartIdx > oldEndIdx) {
        before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].el
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx)
    }else if (newStartIdx > newEndIdx) {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
}
```

该函数将`Vnode`的子节点`Vch`和`oldVnode`的子节点`oldCh`提取出来

`oldCh`和`vCh`各有两个头尾的变量`StartIdx`和`EndIdx`，它们的2个变量相互比较，一共有4种比较方式。如果4种比较都没匹配，如果设置了`key`，就会用`key`进行比较，在比较的过程中，变量会往中间靠，一旦`StartIdx>EndIdx`表明`oldCh`和`vCh`至少有一个已经遍历完了，就会结束比较。

#### 图解updateChildren

粉红色的部分为oldCh和vCh



![img](https://user-gold-cdn.xitu.io/2018/5/19/163783b76bc005cf?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



我们将它们取出来并分别用s和e指针指向它们的头child和尾child



![img](https://user-gold-cdn.xitu.io/2018/5/19/163783eb58bfdb34?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



现在分别对`oldS、oldE、S、E`两两做`sameVnode`比较，有四种比较方式，当其中两个能匹配上那么真实dom中的相应节点会移到Vnode相应的位置，这句话有点绕，打个比方

- 如果是oldS和E匹配上了，那么真实dom中的第一个节点会移到最后
- 如果是oldE和S匹配上了，那么真实dom中的最后一个节点会移到最前，匹配上的两个指针向中间移动
- 如果四种匹配没有一对是成功的，分为两种情况 
  - 如果新旧子节点都存在key，那么会根据`oldChild`的key生成一张hash表，用`S`的key与hash表做匹配，匹配成功就判断`S`和匹配节点是否为`sameNode`，如果是，就在真实dom中将成功的节点移到最前面，否则，将`S`生成对应的节点插入到dom中对应的`oldS`位置，`oldS`和`S`指针向中间移动。
  - 如果没有key,则直接将`S`生成新的节点插入`真实DOM`（ps：这下可以解释为什么v-for的时候需要设置key了，如果没有key那么就只会做四种匹配，就算指针中间有可复用的节点都不能被复用了）

再配个图（假设下图中的所有节点都是有key的，且key为自身的值） 

![img](https://user-gold-cdn.xitu.io/2018/5/19/16378648ea5046c2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



- 第一步

```
oldS = a, oldE = d；
S = a, E = b;
```

`oldS`和`S`匹配，则将dom中的a节点放到第一个，已经是第一个了就不管了，此时dom的位置为：a  b  d

- 第二步

```
oldS = b, oldE = d；
S = c, E = b;
```

`oldS`和`E`匹配，就将原本的b节点移动到最后，因为`E`是最后一个节点，他们位置要一致，这就是上面说的：**当其中两个能匹配上那么真实dom中的相应节点会移到Vnode相应的位置**，此时dom的位置为：a  d  b

- 第三步

```
oldS = d, oldE = d；
S = c, E = d;
```

`oldE`和`E`匹配，位置不变此时dom的位置为：a  d  b

- 第四步

```
oldS++;
oldE--;
oldS > oldE;
```

遍历结束，说明`oldCh`先遍历完。就将剩余的`vCh`节点根据自己的的index插入到真实dom中去，此时dom位置为：a  c  d  b

一次模拟完成。

这个匹配过程的结束有两个条件：

- `oldS > oldE`表示`oldCh`先遍历完，那么就将多余的`vCh`根据index添加到dom中去（如上图）

- ```
  S > E
  ```

  表示vCh先遍历完，那么就在真实dom中将区间为

  ```
  [oldS, oldE]
  ```

  的多余节点删掉 

  ![img](https://user-gold-cdn.xitu.io/2018/5/30/163b0616bcb545ff?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

下面再举一个例子，可以像上面那样自己试着模拟一下



![img](https://user-gold-cdn.xitu.io/2018/5/19/1637871f447465bb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



当这些节点`sameVnode`成功后就会紧接着执行`patchVnode`了，可以看一下上面的代码

```
if (sameVnode(oldStartVnode, newStartVnode)) {
    patchVnode(oldStartVnode, newStartVnode)
}
```

就这样层层递归下去，直到将oldVnode和Vnode中的所有子节点比对完。也将dom的所有补丁都打好啦。

#### vue组件中写key的作用

key是给每一个vnode的唯一id,可以`依靠key`,更`准确`, 更`快`的拿到oldVnode中对应的vnode节点。

![1564750091364](C:\Users\Ying\AppData\Roaming\Typora\typora-user-images\1564750091364.png)

##### 1. 更准确

因为带key就不是`就地复用`了，在sameNode函数 `a.key === b.key`对比中可以避免就地复用的情况。所以会更加准确。

##### 2. 更快

**利用key的唯一性生成map对象来获取对应节点，比遍历方式更快。**
**在交叉对比中，当新节点跟旧节点`头尾交叉对比`没有结果时，会根据新节点的key去对比旧节点数组中的key，从而找到相应旧节点（这里对应的是一个key => index 的map映射）。如果没找到就认为是一个新增节点。而如果没有key，那么就会采用遍历查找的方式去找到对应的旧节点。一种一个map映射，另一种是遍历查找。相比而言。map映射的速度更快。**

- 设置key可以最大化的利用节点
- diff的效率并不是每种情况下都是最优的