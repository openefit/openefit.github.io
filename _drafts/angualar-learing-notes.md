## angular内置指令 ##

* ng-app
* ng-controller
* ng-click
* ng-model
* ng-show
* ng-hide
* ng-repeat

## directive ##

## filters ##

{% highlight  html %}
body ng-app="app" ng-controller="MainCtrl"> 
 
    Search: <input ng-model="search" type="text" /> 
 
    <ul> 
 
    <li ng-repeat="person in developers | filter:search"> 
 
    {{ person.name }} from {{ person.country }}
 
    </li> 
 
    </ul> 
 
</body> 
{% endhighlight %} 

自定义首字母大写filter
{% highlight  javascript %}
app.filter('capitalize', function(){
	return function (input, param) {
	return input.substring(0,1).toUpperCase() + input.substring(1);
	}
});
{% endhighlight %}

## Services ##

内置services:
* $http http请求

* $q 异步promises编程模式

## module ##

> var app = angular.module('myApp', []);

## scopes ##

* app.run -->angular的main方法
{% highlight  javascript %}
app.run(function() {
  $rootScope.name = "Exm Name";
});
{% endhighlight %}

## ng-controller ##
{% highlight  html %}
<div ng-controller="MyController">
	{{ person.name }}
</div>
{% endhighlight %} 

> 所有scope都遵循原型继承（prototypal inheritance）

* 有些指令属性可以选择性的创建一个独立的scope,让这个scope不继承它的父scope。
