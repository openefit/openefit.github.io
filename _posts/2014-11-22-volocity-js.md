---
layout: post
title: Velocity.js
description: "volocity.js learning note, need to be simplified"
tags: [exercise,volocity]
image:
  background: triangular.png
comments: true
share: true
---

## Basic:Arguments ##

### Overview ###

velocity默认选项:

<pre>
$element.velocity({width:"500px",
	               property2:value2
			      },
				  {
				     queue: "",
					 begin: undefined,
					 progress: underfined,
					 complete: underfined,
					 display: undefined,
					 visibility: undefined,
					 loop: false,
					 mobileHA: true,
                  }
	             );
</pre>

$.Velocity.defaults修改默认设置

### Single Object ###

<pre>
$element
  .velocity({
	  properties:{opacity:1},
	  options:{duration:500}
		  });
</pre>

<!--more-->

### Comma-Separated ###

#### ----only for *duration,easing,complete* ####

*$element.velocity(propertyMap[,duration][,easing][,complete])*
`

    $element.velocity({top:50},1000);
	$element.velocity({top:50},1000,"swing");
	$element.velocity({top:50},1000,function(){alert("hi");});

`

## Basics:Properties Map ##

### Properties ###

auto-prefix properties(e.g. *transform* become *webkit-transform* on WebKit browsers)

**one numeric value**per porperty

### Values ###

supports **+,-,*,/**
`

    $element.velcity({top:50,left:"50%",width:"+=5rem",height:"*=2"});

`
rem units are not supported below IE9,vh/vw units are not supported below IE9 or below Android 4.4

## Basic:Chaining ##
automatically queue onto one another.
`

    $element.velocity({width:75}).velocity({height:0});

`

## Option:Duration ##
specified in milliseconds and *"slow","normal","fast"*
`

    $element.velocity({opacity:1},{duration:1000});
	$element.velocity({opacity:1},{duration:"slow"});

`

## Option:Easing ##
the following easing types by default:

* **jQuery UI's easings**except *back,bounce,elastic*easing types.

* CSS3's named easing: "ease","ease-in","ease-out","ease-in-out"

* CSS3's bezier curves: a four-item array of bezier points.

* Spring physics: a two-item array in the form of [*tension(拉力),friction(摩擦力)*]

	* a higher tension(*default:500*)increases total speed and bounciness.
  
	* a lower friction(*default:20*)increases ending vibration spped.(振动)
  
* Step easing: a one-item array in the form of [*steps*]. The animation will jump towards its end values using the spefified number of steps.
(compatible with IE8.)

`

    $element.velocity({width:50},"easeInSine");
	$element.velocity({width:50},[0.17,0.67,0.83,0.67]);
	$element.velocity({width:50},[250,15]);
	$element.velocity({width:50},[8]);

`

### Pre-Property Easing ###
Easing can also be optionally be declared on a per-property basis by passing in an two-item array as the property's value.

The first is the standard end value
The second is the easing type:
`

    $element.velocity({borderBottomWidth:["2px","spring"],width:["100px",[250,15]],height: "100px"},{easing:"easeInSine"});

`
"swing" is the velocity's default type.

## Option:Queue ##
*false* -> immediately run in parallel 
`

    $element.velocity({width:"50px"},{duration: 3000});
	setTimeout(function()
		{
			$element.veloctiy({height:"50px"},{queue:fales});
		}
	);

`
Alternatively:

    $element.dequeue("queueName")
or

    Velocity.Utilities.dequeue(elemnet(s),"queueName")
	(Without jQuery)
loop option and reverse command do not work with custom and parallel queues.

## Option:Begin&Complete ##

### Begin ###
Pass *begin* a function to be triggered *prior to the start* of the animation.
the *begin* only fires ones even a call is looped.
`

    $element.velocity({opacity:0},{begin:function(elements)
		{
			console.log(elements);
		}
	});

`

### Complete ###
executed *once per call* even if multiple elements are being animated at once.Further ,if a call is looped,the complete callback only fires once -- at the and of the last loop alternation.
`

    $element.velcity({opacity:0},{begin:function(elements){
		console.log(elements);
		}
	});

`

## Options:Progress ##
*progress* option a callback function to be repeatedlly triggred througout the duration of the animation.
It's passed *percentComplete*(decimal value),*timeRemaining*(in ms),and *timeStart*(Unix time):
`

    $element.veloctiy({opacity:0},{progresss:function(elements,pecentComplete,timeRemaining,timeStart){
		console.log((percentComplete * 100)+"%");
		console.log(timeRemaining + "ms remaining!");
		}
	})

`

## Option:mobileHA ##
for *mobile handware acceleration*.
true ->automatically hardware accelerated on mobile device.
`

    $element.velocity(propertiesMap,{mabileHA: false});

`

## Option:Loop ##

`

    $element.velocity({height:"10em"},{loop:2});

`
true -> infinite looping
(A loop can be stopped with the Stop command)
Same element cannot have two infinite loop.

## Option:Delay ##
`

    $element.velocity({
		height: "+=10em"
	},{
		loop:4,
		delay:100
	});

`

## Option:Display&Visibility ##

### Intro ###
display: *"inline","inline-block","block","flex",""*
visibility: *"hidden","visible","collapse",""*
Exclusive to Velocity,*display*: "*auto*"(its native display value)

### Usage ###
"none" set after the animation.
This replace jQuery's $.fadeOut() function:
`

    $element.velocity({opacity:0},{display:"none"});

`
an element is made invisible once it has faded out:
`

    $element.velocity({opacity:0},{visibility: "hidden"});

`
values other than "none/hidden" set before the animation .
`

    $element.velocity({opacity:1},{display: "block"});

`
The display and visiblity options are ignored when used with the Reverse command.

## Command:Fade&Slide ##
`

    $element.velocity("fadeIn",{duration:1500})
	        .velocity("fadeOut",{delay:500,duration:1500});
	$element.velocity("slideDown",{duration:1500});
		    .velocity("slideUp",{delay:500,duration:1500});

`

## Command:Scroll ##
scroll -> to the top edge of an element.
`

    $element
		.velocity("scroll",{duration:1500,easing: "spring"});
		.velocity({opacity:1});
	

`

take an optional container option.
The container element must have its CSS position property set to either *relative, absolute,* or *fixed* - *static* will not work:

`

    $element.velocity("scroll",{container: $("#container")});

`
the scroll command is *always called on the element that is being scrolled into view*.

scroll horizontally:
`
	// Scroll the browser to the LEFT edge of the targeted div
    $element.velocity("scroll",{axis: "x"});

`

takes an *offset* option,specified in pixels,which offsets the target scroll position:

`
	// Then scroll to a position 250px BELOW the div.
	.velocity("scroll",{duration: 750,offset 250});
	// 50px ABOVE the div.
	.velocity("scroll",{duration: 750,offset: -50});

`
`
	// Scroll the whole page to an arbitrary value.
    $('html').velocity("scroll",{offset: "750px",mobieHA: false});

`

## Command:Stop ##

### Overview ###
immediately stop all current Velocity calls on an element,The next Velocity calls in the element's animation queue immediately starts.
`

    $element.velocity("stop");
	$element.velocity("stop","myQueue");

`

When a call is stopped ,its *complete* callback and *displap:none* are skipped.

`
	// Prior velocity call.
    $element.velocity({opacity: 0});

	// Later, midway through the call ...
	$element
		// Stop animating opacity
		.velocity("stop");
		// Animate opacity back to 1
		.velocity("reverse");
`

### Stopping Multi-Element Calls ###
if otherh elements also targeted by the same call, they will also be stopped:
`

	// Prior Velocity call.
    $allElements.velocity({opacity:0})
	// Stop the above call.
	$allElements.velocity("stop");
	or
	// Behaves like above since it's ending a multi-element call.
	$firstElement.velocity("stop");
	
`

### Clearing the Animation Queue ###
pass in true (or the name of a custom queue) to clear all of the element's remaining queued called:
`

    $element
		.velocity({width:100},1000);
		.velocity({height: 100},1000);

	// Called immediately after.
	$elemnt.velocity("stop",true);

`
the initial *{ width: 100 }* call will be instantly stopped ,and the ensuring *{ height: 200 }* will be removed and skipped entirely.
**Important: If you're clearing the remaining queue entries on a call that targeted more than one element, be sure that you *stop* command is applied to the full set of elements that the call initially targeted. Otherwise, some elements will have stuck quues and will ignore further Velocity calls untils they are manually dequeued.**

## Command:Reverse ##
Reverse defaults to the options used in the element's previous Velocity call.However, this can be overridden by passing in a new options object:
`

    $element.velocity("reverse");
	or
	$element.velocity("reverse",{ duration: 2000 });
	

`
The previous call's callback options *(begin and comlete)* are ignored by reverse;reverse does not re-fire callbacks.

Note:The reverse command only applies to the defalt effects queue;
reverse cannot be used with custom queue or parallel queueing (queue:false).

## Feature:Transforms ##
Velocity uses the *translateX* and *translateY* property names for transform translations,not X and Y
`

	//Translate to the right and rotate clockwise.
	$element.volocity({
		translateX: "200px",
		rotateZ: "45deg"
	});

`

### Details ###
`

    $element.velocity({
		translateZ: 0, // Force HA by animating a 3D property
		translateX: "200px",
		rotateZ: "45deg"
	});

`
applies to desktop browsers only - by default,Velocity automatically turns HA on for all animations on mobile.

3D transforms are not supported below IE10 and below Android 3.0,even 2D transforms aren't supported below IE9.

## Feature Colors ##
color animation for the following properties: *color*, *backgroundColor*,*borderColor*, and *outlineColor*

pass color property a hex string(rgb, hsla strings, and color keywords are not supported),
`

    $element.velocity({
		backgroundColor: "#ff0000",
		backgroundColorAlpha: 0.5,
		colorRed: "50%",
		colorBle: "+=50",
		colorAlpha: 0.85
	})

`

## Feature:SVG ##
Velocity contains full supports for SVG elements animation, including the animation of SVG specific properties such as x, rx, strock-width, and so on.

not all CSS properties can be applied to SVG elements.
while SVG properties can take the *px* and *%* units, they cannot take the *em* and *rem* units.
`

    $svgRectangle.velocity({
	// Coordinate animation works.
	x:200,
	r:5,
	// 2D transforms works.
	translateX: "200px",
	// 3D transforms work in non-IE browsers.
	translateZ: "200px",
	// "Fill" color animation works.
	fill: "#ff0000",
	strokeRed: 255,
	stokeGReen: 0,
	stokeBlue: 0,
	// Some standard CSS properties work.
	opacity: 1,
	width: "50%"
	});

`
SVG elements are not supported below IE9 or below Android 3.0

## Feature:Hook ##
Hooks are the subvalues of multi-value CSS properties.
For example, *textShadow*: "0px 0px 0px black".

Velocity allows you to individually animate each of these subvalues,
e.g. *textShadowX*, *textShadowY* and *textShadowBlur*
`

    $element.velocity({textShadowBlur: "10px"});
	

`
*$.Velocity.hook(element,property[,value])*:

Set a hook value：
`

    $.Velocity.hook($element,"translateX", "500px");//Must provide unit type
	$.Velocity.hook(elementNode, "textShadowBlur", "10px");//Must provide unit type

`
Get a hook value:
`

    $.Velocity.hook($element,"translateX");
	$.Velocity.hook(elementNode,"textShadowBlur");

`
**When using the hook function, you must provide a unit type(e.g. px, deg, etc.) if the CSS property can accept one.**

## Feature:Promises ##

`

	// Using Velocity's utility function...
	$.Velocity.animate(element,{opacity:0.5})
		// Callback to fire once the animation is complete.
		.then(function(element){console.log("Resolved");})
		// Callback to fire if an error occurs.
		.catch(function(elemnet){console.log("Rejected");});

`
the returned promise(.then) is resolved when the call's animation completes, regardles of whether it completed on its own or permaturely due to the user calling $element.velocity("stop"[,true]).

The resoleve function is passed the entire raw DOM(not jQuery) element array as both its context and its first argument.

Promises also work with effects from the UI pack (including custom effects). As usual, however, ensure that you're calling the UI pack effect using Velocity's utility function.Further ensure you're using the latest version of the UI pack ,since promise support was added only recently.

Browser support: Chrome desktop and Firefor (native support)

## Feature:Mock ##
set *$.Velocity.mock = true;* to force all Velocity animations to run with 0ms duration and 0ms delay.

Alternatively, you can also set $.Velocity.mock to an arbitrary multiplier to spped up or slow down all animations on the page:
`

	// Slow down all animation by a factor of 10
    $.Velocity.mock = 10;

`

## Feature:Utility Function ##
you can use Velocity's utility funciton to target raw DOM elements:
`

	// Standard multi-argument syntax
    var divs = document.getElementsByTagName("div");
	$.Velocity(divs,{opacity: 0},{duration: 1500});

	// Alternative single-argument syntax(ideal for CoffeeScript)
	var divs = document.getElementsByTagName("div");
	$.Velocity({
		elements: divs,
		properties: {opacity: 0},
		options: {duration: 1500}
	});
	
	
`

## Adanced:Value Functions ##
Property values can be passed functions.

only called once per element.
when looping/reversing, the functions are not repeatedly re-called.

The value returned by the function is used as the property value:
`

    $element.velocity({
		opacity: function(){return Math.random();}
	});

`

Value functions are passed the *iterating element* as their context, plus a first argument containing the element's index within the set and a second argument containing the total length of the set. By using these values,visual offseting can be achieved:

`

    $element.velocity({
		translateX: function(i,total){
			return i * 10;
	    }
	});

`

## Advanced:Forcefeeding ##
Forcefed start values are passed as a second or third item in an array than takes the place of a property's value.
`

    $element.velocity({
		// Two-item array format.
		translateX: [500, 0],
		// Three-item array format with a per-property easing.
		opacity: [0, "easeInSide", 1 ]
	});

`
Above, we're passing translateX a start value of 0 since we know the element han yet to be translated(perhaps the page has just loaded).Next, we also know that element's opacity is currently 1 because that's opacity's default value and we haven't modified the element yet. With both properties, we're forcefeeding in what we know (or want) the origfinal animation values to be.

forcefed start values also accept value functions.(You can take advantage of this feature to seed an element set differentiated start values.)

Be sure to forcefeed only at the start of an animation, not between chained animations (where Velocity already does value caching internally):
`

    $element
		// Optionally forcefeed here.
		.velocity({translateX:[500, 0]})
		// Don't forcefeed here; 500 is internally cached.
		.velocity({translateX: 1000});

`
**Forcefeeding a hook's subproperty will default that hook's non-animated subproperties to their zero-values**

## Plugins: UI Pack ##

### Overview ###
*$.Velocity.RegisterEffect()* and *$.Velocity.RunSequence()*

The former allows you to combine multiple Velocity calls into a single effect that you  can reference by name.

The latter helps make nested animation sequences much more manageable.

load it after Velocity.

### Sequence Running ###
without the UI pack, this is the standard approach to consecutively(连续的) animating separate elements:
`

    $element1.velocity({translateX: 100}, 1000, function(){
		$element2.velocity({translateX: 200}, 1000, function(){
			$element3.velocity({translateX: 300}, 1000);
		});
	});

`

With the UI pack's Sequence running feature, you simply use Velocity's utility funciton and single-object arguments syntax to creat an array of Velocity call objects that make up your animation sequence:

`

    var mySequence = [
		{elments:$element1,properties:{translateX: 100}, options:{duration:1000}},
		{elments: $element2, properties:{translateX: 200}, options:{ duration: 1000}},
		{elments: $element3, properties:{translateX: 200}, options:{ duration: 1000}}
	];

`
**$.Velocity.RunSequence(mySequence);**

Sequence running also exposes a special *sequenceQueue* option which, when set to false, forces the associated call to run in parallel with the call that came before it:
`

    var mySequence = [
		{elements: $element1, properties: {translateX: 200}, options: {duration: 1000}},
		// The call will run at the same time as the first call
		{elements: $element2, properties: {traslateX: 300}, option: { duration: 1000, sequenceQueue: false}},
		// As normal, the call will run once the second call is complete.
		{elements: $element3, properties: {translateX: 300}, options:{ duration: 1000}}
	];

`
$.Velocity.RunSequence(mySequence);

### Effects: Pre-Registered ###

e.g. $element.velocity("callout.bounce");
UI pack effects do not accept the loop, easing, or progress options.
Further they cannot be used with parallel queueing .

### Effects:Behavior ###

* UI pack effects behave like normal Velocity calls; they can be chained and can take options.

* Elements automatically switch to *display: block/inline* when transitioning in, and back to *display: none* after transitoning out.(To prevent, pass *display: null* as an option into the UI Pack call.)

* Support the special *stagger, drag,* and *backwards* options

* Browser support: Below IE10 and Android 3.0 ,the *flip* and *perspective* transitions gracefully fall back to simply fading in and out, and callouts (except for *callout.flash*) have no effect.

Three options that *work* only with UI pack effects - but not with traditional Velocity calls.

* Stagger: Specify the *stagger* option in ms to successively(相继地) delay the animaton of each element in a set by the targeted amount. You can also pass in a value funciton to define your own stragger falloffs.

* Drag: Set the drag option to true to successively increase the animation duration of each element in a set. The last element will animate with a duration equal to the sequence's original value, whereas the elements before the last will have their duration values gradually approach the original value. The end result is a cross-element easing effect.

* Backwards(反向): Set the *backwards* opition to *true* to animate starting with the last element in a set . This option is ideal for use with an effect that transitions(过渡) elements out of view since the *backwards* option mirrors the behavior of elements transitioning into view (which ,by default, animate in the forwards direction -- from the first element to the last).

### Effects: Registration ###
Allows you to register custom effects, which also accept the special *stagger*, *darg* and *backwords* options.
--> *$element.velocity("name")*.

A custom UI pack effect is registered with the following syntax:
`

    $.Velocity.RegisterEffect(name,{
		defaultDuration:duration, // for the full effect 
		calls:[
			[{property: value }, durationPercentage,{options}],
			[{property: value }, durationPercentage,{opitons}]
		],
		reset: { preperty:value,property:value}
	});

`
*defaultDuration* also accepts a function to be run at an animation's start. called once per UI pack call.

Sample effect registrations:

Callout:
`

    $.Velocity.RegisterEffect("callout.pulse",{
		defaultDuration: 900,
		calls:[
			[{scaleX: 1.1}, 0.50],
			[{scaleX: 1}, 0.50]
		]
	});

`
$element.velocity("callout.pulse");

Transition:
`

    // Registration
	$.Velocity
		.RegisterEffect("transition.flipXIn", {
			defaultDuration: 700,
			calls:[
				[{ opacity:1, rotateY:[0, -55]}]
			]
		});
		.RegisterEffect("transition.flipXOut",{
			defaultDuraton: 700,
			calls:[
				[{opacity:0, rotateY: 55}]
			],
			reset:{ rotateY:0}
		});

	//Usage
	$element
		.velocity("transition.flipXIn")
		.velocity("transition.flipXOut",{delay: 1000});


	// Bypass the UI pack's automatic display setting.
	$element.velocity("transition.flipXIn",{display: null});

`

## Plugins: VMD ##



