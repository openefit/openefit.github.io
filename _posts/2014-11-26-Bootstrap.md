---
layout: post
title: Bootstrap notes
description: 'bootstrap learning not'
tags: [exercise,learn,bootstrap]
image:
  background: triangular.png
comments: true
share: true
---

格式说明：

&lt; &gt; html

[] 属性

. class

## 排版 ##

{% highlight html %}
<h1>..<h6>
<small>
<p>
<small> <strong> <em>
.text-left .text-right .text-center

.text-muted .text-primary .text-success
.text-info .text-warning .text-danger

<abbr> [title] .initialism

<adree>

<blokcquote> <small>  .pull-right .blockquote-reverse

<ul> <ol> .list-unstyled .list-inline
<dt> <dd> .dl-horizontal

更多排版类：
	.small
	.text-justify
	.text-lowercase
	.text-uppercase
	.text-capitalize

	<pre> .pre-scrolllable
{% endhighlight%}

<!--more-->

## Bootstrap 网格系统 ##

{% highlight html %}
.col-xs-*
.col-sm-*  .col-lg-*
{% endhighlight%}

## Bootstrap 代码 ##

{% highlight html %}
<code> 单行
<pre>  多行
{% endhighlight%}

## Bootstrap 表格 ##

{% highlight html %}
<table>
	<caption> <thead> <tbody>
	<tr>      <th>    <td>

	.table .table-striped
	.table-bordered
	.table-hover
	.table-condensed

<tr> .active .success .warning .danger
	 .table-responsive
{% endhighlight%}

## Bootstrap 表单 ##


{% highlight html %}
<form> [role="form"]
	.form-group
	.form-control -- 单行输入框
	.form-inline

<lable> .sr-only 隐藏

<form> .form-horizontal
<label> .control-label
	.checkbox-inline
	.radio-inline

<select> [mutiple] .form-control

<form> .form-control-static 静态文本

<input [disabled] :has()>
.has-success .has-warning .has-error

<fieldset [disabled]> 

<input [placeholder('')]>

.input-lg .input-sm .col-lg-*

<input> <span .help-block>
{% endhighlight%}

## Bootstrap 按钮 ##
	
{% highlight html %}
<.btn>

.btn-primary .btn-success .btn-info
.btn-warning .btn-danger .btn-link

.btn-lg .btn-sm .btn-xs .btn-block

.active  .disabled(<a> need js)

{% endhighlight%}

## Bootstrap 图像 ##
	
{% highlight html %}
.img-rounded .img-circle .img-thumbnail
{% endhighlight%}

## Bootstrap 帮助器类 ##
	
{% highlight html %}
.close  关闭图标
.caret  插入图标

.pull-left     快速浮动
.pull-right

.center-block   
.clear-fix      清除浮动

.show
.hidden

.sr-only  屏幕阅读器-only
{% endhighlight%}

## Bootstrap响应式工具 ##
	
{% highlight html %}
.visible-xs .visible-sm ...

.hidden-xs  .hidden-sm ...

.visible-print
.hidden-print
{% endhighlight%}

## .divider 分隔线 ##

# 布局组件 #

## 字形图标 ##
.glyphicon

## 下拉菜单 ##
	
{% highlight html %}
<ul> .dropdown-menu
.dropdown  .dropdown-header
[data-toggle= "dropdown"]

<li [role='presentation']>
{% endhighlight%}

## 按钮组 ##
.btn-toolbar
.btn-group(-lg)
.btn-group-vertical

## 按钮下拉菜单 ##

[data-toggle] .dropdown-menu
.btn-(lg)

上拉  .btn-group  .dropup

## 输入框组 ##

	
{% highlight html %}
.input-group <span .input-group-addon>
.input-gorup-lg

.input-group <span .input-group-btn .button>
	div
{% endhighlight%}

## 导航元素 ##

	
{% highlight html %}
<ul .nav> .nav-tabs .active .nav-pills .nav-stacked
	.nav-justified 两端对齐 <li .disabled>

<li .dropdown <a [data-toggle]>
	<ul .dropdown-menu>>
{% endhighlight%}

## 导航栏 ##

	
{% highlight html %}
<nav .navbar .navbar-default [role(navigation)]>

<.navbar-header <a .navbar-brand>>
<ul .nav .navbar-nav>

.collapse .navbar-collapse #..
.navbar-toggle [data-toggle(collapse)]
	[date-target(#example)]

表单：
<form .navbar-form>

.navbor-btn
<p .navba-text> <a .navbar-link>
.navbar-left  .navbar-right
.navbar .navbar-fixed-right>

<navbar .navbar-fixedtop>
	    .navbar-fixed-bottom
	.navbar-static-top
	.navbar-inverse
{% endhighlight%}

## 面包屑导航 ##

.breadcrumb

## 分页 ##
.pagination .disabled .active
.pagination-lg(sm)

翻页

.pager .previous .next

.disabled

## 标签 ##
.label
.label-default .label-primary .label-success
.label-info .label-warning
.label-danger

## 微章 ##
	
{% highlight html %}
<span .badge>
{% endhighlight%}

## 超大屏幕 ##
.jumbotron
.container

## 网页标题 ##
.page-header

## 缩略图 ##
.thumbnail

## 警告Alerts ##
.alert

.alert-success .alert-info
.alert-warning .alert-danger

.alert-dismissable
[data-miss(alert)] <a .alert-link>

## 进度条 ##
.progress-bar-(success|info|warning|danger)

.progress &lt;.progress-bar &lt;[style(60%)]
.progress-striped .active 可堆叠

## 多媒体对象Media Object ##
.media <ul .media-list <li .media>>

.midia &lt;a

.media-body &lt;.media-header

## 列表组 ##
ul .list-group ;li list-group-item
li .badge

div a .list-group-item
&lt;.list-group-item-heading .list-group-item-text

## 面板Panels ##
.panel

.panel-default &lt;.panel-heading &lt;h1-h6 .panel-text
	               .panel-body
				   .panel-fotter

.panel-primary .panel-success .panel-info
.panel-warning .panel-danger

.table .list-group

## Well ##
.well

.well-lg .well-sm

# Bootstrap插件 #
[data]
	$(document).off('.data-api')
	$(documnet).off('.alert .data-api')

## 模态框 ##
[data-toggle]='modol' [data-target]="#"(or href="#")
	.modol .fade [aria-hidden(true)]
[area-labelleedby('myModolLabel')]

.modol-header # .modol-body .modol-footer
.close [data-dismiss(modal)]

$(function(){$('#').modol({show;false})});


{% highlight html %}
[data-backdrop] [data-keyboard]
[data-show] [data-remote]

事件：
 show.bs.modol shown.bs.modol
 hide.bs.modol hidden.bs.modol
{% endhighlight%}

## 下拉菜单Dropdown ##
[data-toggle(dropdown)]

$('x').dropdown('toggle')

## 滚动监听 Scrollspy ##

{% highlight html %}
[data-spy(scroll)]
[data-target()]
[data-offset(number)]
方法： scrollspy('refresh')
事件： active.bs.scrollspy
{% endhighlight%}

## 标签页Tab ##

{% highlight html %}
[data-toggle='tab'] or [data-toggle(pill)]
ul (.nav nav-tabs)(.nav .nav-pills)
.tab-pane .fade .in(第一个必须)
$('#myTab li:eq(1) a').tab('show')

事件 show.bs.tab shown.bs.tab
{% endhighlight%}

## 工具提示Tooltip ## 必须激活
选项：

{% highlight html %}
[data-toggle(tooltip)]
$('#x').tooltip(*options);

[data-placement]
[data-html]
[data-animation]
[data-selector]
[data-title]
[data-trigger]
[data-content]
[data-delay]
[data-container]

方法：
options toggle show hide destroy
	$('.x').tooltip({html:true});

事件：
show.bs.tooltip
shown.bs.tooltip
hide.bs.tooltip
hidden.bs.tooltip
{% endhighlight%}

## 弹出框 ##
[data-toggle(popover)]
$('#x').popover(option);

选项：[data-*]:
animation html placement selector titel trigger delay container

方法：
  $().popover(options)
toggle show hide destroy
  $().popover('toggle')

事件： ().bs.popover
show.bs.popover
shown.bs.popover
hide.bs.popover
hidden.bs.popover

## 警告框Alert ##
.alert(.alert-success) [data-dismiss(alert)]
(.fade)(.in)

方法：
	
> .alert() 带关闭功能

> .alert('close')

事件 *-bs-alert:
close closed

## 按钮Button ##
加载状态
[data-loading-text('Loading')]

[data-toggle('button')]

.data-group [data-toggle('buttons')]

用法：$('.btn').button()

方法：button():

'toggle' 'loading' 'reset' 'string' 'complete'

[data-complete-texed('....')]

## 折叠Collapse ##

[data-toggle(collpse)]

href or [data-target]

[data-parent]


用法：

.collapse | .collapse .in | .collapsing


选项：[data-*]:

parent toggle


方法：collapse(option):

toggle show hide

.collapse-*(success|info|warning|dange|primary)


事件： *.bs.collapse:

show shown hide hidden

## 轮播Carousel ##

* carousel .slide
	* ol .carsel-indications
		* li<pre>[data-target] [data-slide-to]</pre>
	* .carouse(-inner &lt;.item (&lt;.carousel-caption))
	* a .carousel(-control .left|.light [href])

用法： [data-slide (prev/next)]
[data-slide-to(n)]
[data-ride('carousel')]

选项 [data-*] interval @n/false
pause @hover
wrap @boolen

方法 .carousel(options): 'cycle' 'pause' @n
'prev' 'next'

事件 *bs.carousel slide slid

## Bootstrap 附加导航 Affix ##
{% highlight html %}
[data-spy('affix')] [data-offset-top'n']

	$().affix({
		offset:{
			top:100,
			bottom: function(){
				}
			}
	});

CSS定位：offset [data-offset] @ n

offset:{top:10} 

offset:{top:10,bottom:5}
{% endhighlight%}











