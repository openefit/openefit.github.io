
---
layout: post 
title: Knowledge points collection
description: "knowledge points collection, skills"
tags: [collection,javascript]
image:
  background: triangular.png
comments: true
share: true
---


## 点击区域外，隐藏元素 ##
{% highlight  javascript %}
 $(document).click(function(e){
                e = window.event || e; // 兼容IE7
                var obj = $(e.srcElement || e.target);

                $(obj).is('.trigger') || $('.target').css('display', 'none');
				
	            // or this to dismiss multi elements
                $(obj).is('.trigger') || $(obj).is('.trigger2')  || (function(){
                    self.dom.find('.formTable').css('display', 'none');
                    self.dom.find('.selectTable').css('display', 'none');
                }());
            });
{% endhighlight %} 	

## click and mousedown 的冒泡问题 ##

mousedown 先于 click触发， 若在冒泡触发时return false 则click不会触发，

code:
{% highlight  javascript %}
$('container').on('click', 'inner-element', function(){
	//codes here...
});
$('container').on('mousedown', 'inner-element', function(e){
	e.stopPropagation();
});

$('container').on('mousedown', 'outer-element', function(){
	//... 
});
{% endhighlight %}

<!--more-->

## drag ##

example code:

{% highlight  javascript  %}
this.dom.on('mousedown', 'target-element', function(){
	//begin code ...

	$(document).on('mousemove.pic-move', function(){
	//execute code ...
	});

	$(document).on('mouseup.pic-move', function(){
		$(document).off('.pic-add');		
	    //end code ...
	})
})；
{% endhighlight %}

## load image from local enviroment ##

code:
{% highlight  javascript %} 
	var reader = new FileReader;
	reader.onload = function() {
		img.src = reader.result;
	}
	reader.readAsDataURL(file);

{% endhighlight %} 

## load multiple image from local enviroment ##

因为onload事件监听只能在循环结束后触发，故只能加载一张图片。故需要采用匿名函数循环调用。
code:
{% highlight  javascript %}
for (var i = 0; i<this.files.length; i++) {
	(function(file){
		var reader = new FileReader;
		reader.onload = function(){
		// code here ...
		}		
		reader.readAsDataURL(file);
	})(this.files[i]);
}
{% endhighlight %} 

## css十字 ##

{% highlight  css %}
.cross{
	background:
		linear-gradient(to bottom, transparent 47.5%, #d6d6d6 47.5%, #d6d6d6 52.5%, transparent 52.5%),
		linear-gradient(to right, transparent 47.5%, #d6d6d6 47.5%, #d6d6d6 52.5%, transparent 52.5%);
	cursor: pointer;
}
.cross:before{
	content: '';
	width: 120px;
	height: 120px;	
	position: absolute;
	top: 0;	
	left: 0;
	background:
		linear-gradient(to right, transparent 0%, #background 0%, #background 25%, transparent 25%),
		linear-gradient(to bottom, transparent 0%, #background 0%, #background 25%, transparent 25%);
	cursor: pointer;
}
.cross:after{
	content: '';
	width: 120px;
	height: 120px;
	position: absolute;
	top: 0;
	left: 0;
	background:
		linear-gradient(to right, transparent 75%, #background 75%, #background 100%, transparent 100%),
		linear-gradient(to bottom, transparent 100%, #background 100%, #background 100%, transparent 100%);
	cursor: pointer;
}

{% endhighlight %} 
