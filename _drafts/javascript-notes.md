---
layout: post
title: JavaScription notes
description: "JavaScription 知识点总结"
tags: [javascript,notes]
image:
  background: triangular.png
share: true
comments: true
---
## JavaScript Dom ##

### 获取节点 ###

* document
	* getElementById
	* getElementsByClass
	* getElementsByTagName
<!--more-->
* 节点指针
	* firstChild
	* lastChild
	* childNodes
	* nextSibling
	* previousSibling
	* parentNode

### 节点操作 ###

* 创建节点
	* document.creatElement('h2')
	* document.creatAttribute()
	* document.creatTextNode()

* 插入节点
	* appendChild
	* insertBefore

* 替换节点
	* replaceChild

* 复制节点
	* cloneNode

* 删除节点
	* removeChild

### 属性操作 ###

* 获取属性
	* getAttribute
* 设置属性
	* setAttribute
* 删除属性
	* removeAttribute

### 文本操作 ###

* insertData(offset, string)
* appendData(string)

* deleteData(offset,count)

* replaceData(off,count,string)

* splitData(offset)

* substring(offset, count)

## window对象 ##

### navigator(导航器对象) ###

* appCodeName -> 浏览器代码名
* appName
* appVersion
* cookieEnabled -> 返回是否启用cookie
* platform
* userAgent

### screen 显示器对象 ###

* availHeight
* availWidth
* height
* width
* colorDepth

### history 历史对象 ###

* back() -> 前一个对象
* forward()
* go()

### location 位置对象 ###

* 属性
	* hash -> #开始的URL
	* host -> 
	* hostname ->
	* href
	* pathname
	* port
	* protocol
	* search

* 方法
	* assign(URL)
	* reload
	* replace(new URL)

### document ###

* 集合
	* anchors[]
	* images[]
	* links[]
	* forms[]

* 属性
	* cookie
	* domain
	* referrer
	* title
	* URL

* 方法
	* open()
	* close()
	* write()
	* writeIn()

### 窗口控制 ###

* moveBy(水平位移量，垂直位移量)
* moveTo(x, y)
* resizeBy(水平， 垂直) -> 改变指定大小 >0:扩大 <0:缩小
* resizeTo(x，y ) -> 变为指定大小
* scrollBy(水平位移量， 垂直位移量)
* scrollTo(x,y)

### 焦点控制 ###

* focus -> 得到焦点
* blur -> 失去焦点

### 打开关闭窗口 ###

* open
	* open("URL","窗口名称","窗口风格")
	* 窗口风格：
		* height >=100
		* width >=100
		* left >0
		* top >0
		* location  -> yes/no
		* menubar -> yes/no
		* resizable -> yes/no
		* scrollbars -> yes/no
		* status  -> yes/no
		* toolbar -> yes/no

* close()

### 定时器 ###
* setTimeout(func,ms)
* clearTimeout()
* setInterval(func,ms)
* clearInterval()

### 对话框 ###

* alert("")
* confirm("")
* prompt("提示","缺省文本")

### 属性 ###

* 状态栏
	* defaultStatus -> 改变默认显示
	* status -> 临时改变显示

* 窗口位置
	* IE
		* screenLeft
		* screenTop
* document.body.scrollLeft | document.documentElement.scrollLoft -> 当前文档向右滚动过的像素数
* document.body.scrollTop | document.documentElement.scrollTop
	* !IE
		* screenX
		* screenY
		* pageXOffset
		* pageYOffset

	* FF
		* innerHeight
		* innerWidth
		* outerHeight
		* outerWidth
* 其他属性
	* opener ->可实现同域名下跨窗体通讯，一个窗体要包含另一个窗体的opener
	* closed ->当前窗口关闭时返回true
	* name
	* self

## JavaScript 正则表达式 ##

### 方式 ###
* /表达式/修饰符
* new RegExp("表达式","修饰符")

### 说明 ###

单个字符与数字

* . ->
* [a-z0-9]
* \d
* \D
* \w
* \W
<br/>
<br/>
空白：

* \0
* \b
* \f
* \n
* \r
* \s
* \S
* \t
<br/>
定位符：

* ^
* &
* \A
* \b
* \B
* \G
* \Z
* \z
<br/>
限定符：

* ?
* *
* +
* {m,n}

<br/>
分组

* (?:x)
* x(?=y)
* x(?!y)

<br/>
引用

* \1...\9

<br/>
或模式

* x|y|z

<br/>
**模式修饰符**

* g
* i
* m




