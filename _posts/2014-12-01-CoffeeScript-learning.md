---
layout: post
title: CoffeeScript learning notes
description: "learning notes"
tags: [learn,exercise,CoffeeScript]
image:
  background: triangular.png
comments: true
share: true
---


## overview ##

{% highlight coffeescript %}
#赋值
number = 42
opposite = true

#条件
number = -42 if opposite

#函数
square = (x) -> x*x

#数组
list = [1, 2, 3, 4, 5]

#对象
math =
  root:   Math.sqrt
  square: square
  cube: (x) -> x * square x

#Splats:
race = (winner, runners...) ->
  print winner,runners

#存在性
alert "I knew it!" if elvis?

# 数组 推导（comprehensions）：
cubes = (math.cube num for num in list)
{% endhighlight %}

<!--more-->

## 语言手册 ##

不需要{}包裹代码块
在 [函数](#math), [if表达式](#if),[switch](#switch),和[try/catch](#try)当中使用缩进。

传参 **不需要使用圆括号表明函数被执行**。 隐式函数调用作用范围直到行尾或者一个块级表达式。

> console.log sys.inspect object -- console.log(sys.inspect(object))

## <a name="math">函数</a> ##

{% highlight coffeescript %}
square = (x) -> x * x
cube = (x) -> square(x) * x

fill = (container, liquid = "coffee") ->
	"Filling the #{container} with #{linquid}..."


{% endhighlight %}

## 对象和数组 ##

单个属性写在自己的一行里，逗号可以省略
{% highlight coffeescript %}
song = ["do", "re", "mi", "fa", "so"]

singers = {Jagger: "Rock", Elvis:"Roll"}

bitlist = [
	1,0,1
	0,0,1
	1,1,0
  ]

kids =
  brother:
    name: "Max"
	age: 11
  sister:
    name: "Ida"
	age: 9

#JavaScript不能使用不添加引号的保留字段作为属性名称，如 class.
#CoffeeScript会被识别并补上引号

$('.account').attr class: 'active'
log object.class

{% endhighlight%}

## 词法作用域和变量安全 ##

永远不用写var

{% highlight coffeescript %}
outer =1
changeNumbers = ->
  inner = -1
  outer = 10
inner = changeNumbers()
{% endhighlight%}

## if, else, unless 和条件赋值 ##


{% highlight coffeescript %}
mood = greatlyImproved if singing

if happy and knowIt
  clapsHands()
  chaChaCha()
else
  showIt()

date = if friday then sue else jill

{% endhighlight%}

## 变参（splats） ##

JavaScript: arguments

CoffeeScript: ...


{% highlight coffeescript %}
gold = silver = rest = "unknown"

awardMedeals = (first, second, others...) ->
	gold = first
	silver = second
	rest = others

contenders = [
	"Michael Phelps"
	"Liu Xiang"
	"Yao Ming"
	"Allyson Felix"
	"Shawn Jothson"
	"Guo Jingjing"
	"Tyson Gay"
	"Asafa Powell"
	"Usain Bolt"
]

awardMedals contenders...

alert "Gold: " + gold
alert "Silver: " + silver
alert "The Field" + rest

{% endhighlight%}

## 循环和推导式 ##


{% highlight coffeescript %}
eat food for food in ['toast', 'chese', 'wine']

courses = ['greens', 'caviar', 'truffles', 'roast', 'cake']
menu i + 1, dish for dish, i in courses

foods = ['broccoli','spinach','chocolate']
eat food for food in foods when food isnt 'chocolate'
{% endhighlight%}

推导式可以适用于其他一些使用循环的地方，如**each**/**farEach**, **map**,**select/filter**e.g.

> shortNames = (name for name in list when name.length < 5)

如果希望以固定跨度迭代，可以在范围推导式中指定开始与介绍。

{% highlight coffeescript %}
countdown = (num for num in [10..1])
{% endhighlight%}

使用by子句，实现以固定跨度迭代范围值

> evens = (x for x in [0..10] by 2)

推导式也可以用于迭代对象中的key和value,在推导式中使用 of 来取出对象中的属性，而不是数组中的值

{% highlight coffeescript %}
yearsOld = max: 10, ida: 9, tim: 11

ages = for child, age of yersOld
  "#{child} is #{age}"
{% endhighlight%}

如果希望仅迭代当前对象定义的属性，通过**hasOwnProperty**检查并 避免属性是继承来的，可以这样来写

> for own key, value of object

while可以作为表达式来用，而且可以返回一个数组，该数组包含每个迭代项的迭代结果。
{% highlight coffeescript %}
if this.studyingEconomics
  buy() while supply > demand
  sell() until supply > demand

num = 6
lyrics = while num -= 1
  "#{num} little monkeys, jumping on the bed,
    One fell and bumped his head."
{% endhighlight %}

**until** 等同于 while not

**loop** 等同于 while true

do 提供闭包

{% highlight coffeescript %}

for filename in list
  do (filename) ->
    fs.readFile filename, (err,contents) ->
	  compile filename, contents.toString()
{% endhighlight %}

## Array Slicing and Splicing with Ranges ##

a..b 闭区间 [a,b]

a...b [a,b)

default:
start: 0 , end: length-1

## Everything is an Expression(at least, as much as possible) ##

{% highlight coffeescript %}
grade = (student) ->
  if student.excellentWork
    "A+"
  else if student.okayStuff
    if student.triedHard then "B" else "B-"
  else
    "C"

eldest = if 24 > 21 then "Liz" else "Ike"
{% endhighlight %}

{% highlight javascript  %}
var eldest,grade;

grade = function(student) {
  if (student.excellentWork) {
    return "A+";
  } else if (student.okayStuff) {
    if (student.triedHard) {
	  return "B";
	} else {
	  return "B-";
	}
  } else {
    return "C";
  }
};

eldest = 24 > 21 ? "Liz" : "Ike" ;
{% endhighlight %}
Things that would otherwise be statements in JavaScript, when used as part of an expression in CoffeeScript, are converted into expressions by wrapping them in a closure.
{% highlight coffeescript %}
globals = (name for name fo window)[0...10]
{% endhighlight %}
{% highlight coffeescript %} 
alert(
  try
    nonexistent/ undefined
  catch error
    "And the error is ... #{error}"
)
{% endhighlight %}
**break**, **continue**, and **return** won't try to perform the conversion.

## Operators and Aliases ##

> CoffeeScript     JavaScript
>     is             ===
>    isnt            !==
>    not              !
>    and             &&
>     or             ||
>  true,yes,no       true
> flase,no,off       false
>  @,this            this
>     of              in
>     in            ------
>    a**b         Math.pow(a, b)
>    a//b         Math.floor(a / b)
>    a%%b         (a % b + b ) % b

## The Existential Operator ##

? : check the existance of a variable

returns true unless a variable is **null** or **undefined**

{% highlight coffeescript %}
solipsism = true if mind? and not world?

speed = 0
speed ?= 15
footprints = yeti ? "bear"

zip = lottery.drawWinner?().address?.zipcode
{% endhighlight %}
if the chain is broken , **undefined** is returned instead of the **TypeError**.

## Classes, Inheritance, and Super ##
{% highlight coffeescript %}
class Animal
  constructor: (@name) ->

  move: (meter) ->
    alert @name + " moved #{meters}m."


class Snake extends Animal
  move: ->
    alert "Slithering..."
	super 5

class Horse extends Animal
  move: ->
    alert "Galloping..."
	super 45

sam = new Snake "Sammy the Python"
tom = new Horse "Tommy the palomino"

sam.move()
tom.move()
{% endhighlight %}
{% highlight coffeescript %}
String::dasherize = ->
  this.replace /_/g, "-"
{% endhighlight %}
{% highlight javascript %}
String.prototype.dasherize = function() {
  return this.replace(/_/g, "-");
};

{% endhighlight %}

## Destructuring Assignment ##
{% highlight coffeescript %} 
theBait = 1000
theSwitch = 0

[theBait, theSwitch] = [theSwitch, theBait]

weatherReport = (location) ->
  [location, 72, "Mostly Sunny"]

[city, temp, forecast] = weatherReport "Berkeley, CA"



futurists =
  sculptor: "Umberto Boccioni"
  painter: "Vladmir Burliuk"
  poet:
    name: "F.T. Marinetti"
	address: [
	  "Via Roma 42R"
	  "Bellagio, Italy 22021"
	]


{poet: {name, address: [street, city]}} = futurists



tag = "<impossible>"

[open,contents..., close] =tag.split("")

 

text = "Every literary critic believes he will outwit history and have the last word"
[first, ..., last] = text.split " "



class Person
  constructor: (options) ->
    {@name, @age, @height} = options

tim = new Person age:4
{% endhighlight %}

## Function Binding ##
{% highlight coffeescript %}
Account = (customer, cart) ->
  @customer = customer
  @cart = cart

  $('.shopping_cart').bind 'click',(event) =>
    @customer.purchase @cart
{% endhighlight %}

## Embedded JavaScript ##
{% highlight coffeescript %}
hi = `function(){
  return [documnet.title, "HelloJavaScript"].join(": ");
}`
{% endhighlight %}

## Switch/When/Else ##
{% highlight coffeescript %}
switch day
  when "Mon" then go work
  when "Tue" then go relax
  when "Thu" then go iceFishing
  when "Fri", "Sat"
    if day is bingoDay
	  go bingo
	  go dancing
	when "Sun" then go church
	else go work



score = 76
grade = switch
  when score < 60 then 'F'
  when score < 70 then 'D'
  when score < 80 then 'C'
  when score < 90 then 'B'
  else 'A'
 # grade == 'C'
{% endhighlight %}

## Try/Catch/Finally ##
{% highlight coffeescript %}
try
  allHellBreaksLoose()
  catsAndDogsLivingTogether()
catch error
  print error
finally
  clearUp()

#Chained Comparisons
cholesterol = 127

healthy = 200 > cholesterol > 60
#In JavaScript
# healthy = (200 > cholesteral && cholesteral > 60)


#String Interpolation, Block Strings, and Block Comments
author = "Wittgenstein"
quote = "A picture is a fact. -- #{ author}"

sentence = "#{ 22 / 7 } is a decent approximation of pai"



html = """
	   <strong>
	     cup of coffeescript
	   </strong>
	   """

###
Multiple Comments
...
###
{% endhighlight %} 

## Block Regular Expressions ##

block-regexes -- extended regular expressions that ignore internal whitespace and can cantain comments and intepolation.

delimited by /// . 

{% highlight coffeescript %}
OPERATOR = /// ^ (
  ?: [-=]>
   | [-+*/%<>&|^!?=]=
   | >>>=?
   | ([-+:])\1
   | ([&|<>])\2=?
   | \?\.
   | \.{2,3}
) ///
{% endhighlight %}

### Cake, and CakeFiles ###
{% highlight coffeescript %}
fs = require 'fs'

option '-o', '--output [DIR]', 'directory for compiled code'

task 'build:parser', 'rebuild the Jison parser', (options) ->
  require 'jison'
  code = require('./lib/grammer').parser.generate()
  dir = options.output or 'lib'
  fs.writeFile "#{dir}/parser.js", code
{% endhighlight %}

### Source Maps ###

### text/coffeescript Script Tags ###

coffee-script.js
{% highlight html %} 
<script type="text/coffeescript">
{% endhighlight %} 
















