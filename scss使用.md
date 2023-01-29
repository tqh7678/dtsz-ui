# scss



### `css`原先

```css
/*css*/
@import App2.css /* 大型项目中css文件往往不止一个，css提供了@import命令在css内部引入另一个css文件，浏览器只有在执行到@import语句后才会去加载对应的css文件，导致页面性能变差，故基本不使用。 */

.container ul {
    border:1px solid #aaa;
    list-style:none;
}

.container ul:after {
    display:block;
    content:"";
    clear:both;
}

.container ul li {
    float:left;
}

.container ul li>a {
    display:inline-block;
    padding:6px 12px;
}

/*css*/
p {
    border:1px solid #aaa;
    border-left:0;
    border-right:0;
}
```

### `scss`修改

```scss
/*scss*/
$border-color:#aaa; //声明变量
@import App2.scss;  //引入另一个SCSS文件

.container ul {
    border:1px solid $border-color;
    list-style:none;
    @import App3.scss;  // 这里所有内容直接写入到.container选择器中。
    li {
        float:left;
        
        >a {
            display:inline-block;
            padding:6px 12px;
        }
    }
    
    &:after {
        display:block;
        content:"";
        clear:both;
    }
}

/*scss*/
p {
    border:1px solid $border-color {
        left:0;
        right:0;
    }
}
```



### `scss`注释

- `/*注释*/`   :    这种注释会被保留到编译后的css文件中。

- `//注释`   :    这种注释不会被保留到编译后生成的css文件中。



### 混合器（函数）

#### .1声明一个函数

使用@mixin指令声明一个函数，看一下自己的css文件，有重复的代码片段都可以考虑使用混合器将他们提取出来复用。

```css
@mixin border-radius{
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    color:red;
}
```

混合器作用域内的属性都是return的值，除此之外，还可以为函数传参数。

```css
@mixin get-border-radius($border-radius,$color){
    -moz-border-radius: $border-radius;
    -webkit-border-radius: $border-radius;
    border-radius: $border-radius;
    color:$color;
}
```

也可以设置混合器的默认值。

```css
@mixin get-border-radius($border-radius:5px,$color:red){
    -moz-border-radius: $border-radius;
    -webkit-border-radius: $border-radius;
    border-radius: $border-radius;
    color:$color;
}
```

#### .2使用函数

使用函数的关键字为@include

```less
.container {
    border:1px solid #aaa;
    @include get-border-radius;         //不传参则为默认值5px
    @include get-border-radius(10px,blue);   //传参
}
/*多个参数时，传参指定参数的名字，可以不用考虑传入的顺序*/
.container {
    border:1px solid #aaa;
    @include get-border-radius;         //不传参则为默认值5px
    @include get-border-radius($color:blue,$border-radius:10px);   //传参
}
```

我们可能会想到，直接将混合器写成一个class不就行了，但是写成一个class的时候是需要在html文件中使用的，而使用混合器并不需要在html文件中使用class既可达到复用的效果。

tips:混合器中可以写一切scss代码。

### 继承

继承是面向对象语言的一大特点，可以大大降低代码量。

#### .1定义被继承的样式

```css
%border-style {
  border:1px solid #aaa;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

使用%定义一个被继承的样式，类似静态语言中的抽象类，他本身不起作用，只用于被其他人继承。

#### .2继承样式

通过关键字@extend即可完成继承。

```less
.container {
	@extend %border-style;
}
```

上述例子中看不出混合器与继承之间的区别，那么下一个例子可以看出继承与混合器之间的区别。

```scss
.container {
	@extend %border-style;
	color:red;
}
.container1 {   //继承另一个选择器
	@extend .container;
}
```



14 传递内容块@content到混入,传递到@content位置

test.scss内容是:



```scss
@mixin lala {
    html {
        color: #888;
        @content;
    }
}
@include lala {  //此处名字必须和上面保持一致
    .logo {
        font-size: 15px;
    }
}
```



编译成test.css内容是:

```css
html {
  color: #888;
}
html .logo {
  font-size: 15px;
}
```

 

15 变量在混入@mixin的作用域,即传递给混入（mixin）的内容块在其被定义的作用域中进行运算，而不是混入（mixin）的作用域。这意味着混入（mixin）的局部变量不能传递给样式块使用

test.scss内容是:

```scss
$color: white;
@mixin haha($color:black) {
    background-color: $color;
    @content;
}
.test12 {
    @include haha{
        color: $color;
    }
}
```

编译成test.css内容是:

```css
.test12 {
  background-color: black;
  color: white;
}
```





###  @at-root

该指令导致一个或多个规则被限定输出在文档的根层级上，而不是被嵌套在其父选择器下

test.scss内容是:

```scss
.test7 {
    height: 20px;
    @at-root {
        .children1 {
            color: red;
        }
        .children2 {
            color: black;
        }
    }
}
```

编译成test.css内容是:

```css
.test7 {
  height: 20px;
}
.children1 {
  color: red;
}
.children2 {
  color: black;
}
```



### 其他

#### .1操作符

SCSS提供了标准的算术运算符，例如+、-、*、/、%。