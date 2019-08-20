### 1.原型链

简而言之，就是创建父类的实例，并将其赋值给子类的原型，从而子类可以使用父类的属性和方法

```javascript
Child.prototype=new Parent();
```

问题：包含引用类型的原型属性比如数组，会被所有子类实例所共享。其次，创建子类实例时，不能向父类的构造函数中传递参数，在实践中很少用到原型链。

### 2.借用构造函数

在子类构造函数内部调用超类构造函数。

```javascript
function Child(){
    Parent.call(this)
}
```

虽然可以解决原型链继承出现的问题，但是无法避免构造函数出现的问题，即方法在构造函数中定义（每个方法都要在每个实例上重新创造一遍，即每个子类实例都包含了一个不同的function实例），因此函数复用就无从谈起了，并且父类原型中定义的方法，子类不可见，即无法继承原型属性/方法。

### 3.组合继承

将原型链和构造函数的技术组合到一起，其思路是使用原型链实现对原型属性和方法的继承，使用构造函数实现对实例属性的继承，这样，既通过在原型上定义方法实现函数复用，又保证每个实例都有自己的属性。

```javascript
function Child(name,age){
    // 继承属性
    Parent.call(this, name)//一次
    this.age=age
}
// 继承方法
Child.prototype = new Parent()//二次
Child.prototype.constructor = Child;
```

缺点：无论在什么情况都会调用两次父构造函数，一次是创建子类型原型，另一次是在子构造函数内部

### 4.原型式继承

执行对给定对象的浅复制

```javascript
  var person1=Object.create(Person);
//Object.create(obj)等价于下面
function object(obj){
    function F(){}
    F.prototype=obj
    return new F();
}
```

缺点：原型式继承多个实例的引用类型属性指向相同，存在篡改的可能；无法传递参数

### 5.寄生式继承

在原型式继承的基础上，创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。

```javascript
function createAnother(obj){
    var clone=object(obj);
    // ES5中用这个
    // var clone=Object.create(obj);
    // 增强对象
    clone.sayHi=function(){};
    return clone;
}
var person1=createAnother(person)
```

缺点：同上

### 6.寄生组合式继承

结合构造函数传递参数和寄生模式实现继承，解决了组合继承两次调用超类型构造函数的缺点，结合寄生式继承，其思路是，不必为了指定子类型的原型去调用超类型的构造函数，我们所需要的无非是超类型原型的一个副本而已，本质上是使用寄生式继承来继承超类型的原型，再将结果指定给子类型的原型。

```javascript
// 借用构造函数增强子类实例属性（支持传参和避免篡改）
function Child(name,age){
    // 继承属性
    Parent.call(this, name)
    this.age=age
}
function inheritPrototype(Child, Parent){
    //1.创建超类型原型的副本
    var prototype=Object.create(Parent.prototype);
    //2.为创建的副本添加constructor属性，从而弥补因为重写原型而失去的默认的constructor属性
    prototype.constructor=Child;
    //3.将新创建的对象赋给子类型的原型
    Child.prototype=prototype;
}
// 将父类原型指向子类，这样子类就能使用父类原型链的属性/方法
inheritPrototype(Child, Parent);
```

优点：只调用一次构造函数，原型链不变，是最成熟的

### 7.混入方式继承多个方式

利用Object.assign将父类原型上的方法拷贝到子类原型上，这样子类实例就可以使用父类的方法

```javascript
Object.assign(Child.prototype, Parent.prototype);
Child.prototype.constructor=Child;
```

### 8.ES6类extends

ES6中引入了新的关键字extends，表明继承自哪个父类，然后再子类构造函数中使用super就可以实现继承。

```javascript
class Parent {
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    speakSomething(){
        console.log("I can speek chinese");
    }
}
//定义子类，继承父类
class Child extends Parent {
    constructor(name,age,sex){
        super(name,age);
        this.sex=sex;
    }
}
```

