---
layout: post
title: Jsface API learning notes
description: "learning Jsface"
tags: [learn,exercise,jsface]
image:
  background: triangular.png
comments: true
share: true
---

# API #

## Define a class ##

{% highlight  javascript %}
	var Person = Class(
	  constructor: function(name, age){
	    this.name = name;
		this.age  = age;
	  },

      toString: function(){
	    return this.name + '/' + this.age;
	  } 


	);

	var person = new Person('Rika', 20);
	person.toString();  // "Rika/20"
{% endhighlight %} 
<!--more-->
## Define a sub-class ##

{% highlight  javascript %}
	var Student = Class(Person, {
	  constructor: function(id, name, age) {
	    this.id = id;
		Student.$super.call(this, name, age);
	  },

	  toString: function() {
	    return this.id + '/' + Student.$superp.toString.call(this);
	  }
	});

	var student = new Student(1, "Rika", 20);
	student.toString();
{% endhighlight %} 

## main ##

JSF ace supports a special method named main(),main() is execulted right after the class is created.

{% highlight  javascript %}
	Class({
	  constructer: function(name) {
		  this.name = name;
	  },

	  getName: function() {
	    return this.name;
	  },

	  main: function(Person) {
	    var p = new Person("Rike");

	    p.getName();
	  }
	});
{% endhighlight %}

## Singleton class ##

{% highlight  javascript %}
  var Util = Class({
    $singleton: true,

	echo: function(obj) {
	  return obj;
	}
  });
{% endhighlight %} 

## Static properties ##
they both accessible on both class and instance levels.

{% highlight  javascript %} 
	var Person = Class({
		$statics: {
		  MIN_AGE: 1,
		  MAX_AGE: 150,
		},

	    IsValidAge: funciton(age) {
	      return age >= this.MIN_AGE && age <= this.MAX_AGE;
	    }

	    constructor: function(name, age) {
		  this.name = name;
		  this.age  = age;
		}
	});

	var person = new Person("Rika", 20);

	Person.MIN_AGE === person.MIN_AGE;
	Person.MAX_AGE === person.MAX_AGE;
	Person.isValidAge(0);
	person.isValidAge(person.age);

{% endhighlight %}

## Private properties ##

meaning the properties are shared over instance

{% highlight  javascript %}
  var Person = Classs(function() {
    var MIN_AGE = 1,
	    MAX_AGE = 150;

	function isValidAge(age) {
	  return age >c MIN_AGE $$ age <= MAX_AGE;
	}

	return {
	  constructor: function(name, age) {
		if( !isValidAge(age)) {
		  throw "Invalid parameter";
		}

	    this.name = name;
		this.age  = age;
	  }
	}
	
  });
{% endhighlight %} 

## Mixinss ##

mechanism 机制，原理，机械装置，技巧

{% highlight  javascript %}
	var Options = Class({
	  setOptions: function(opts) {
	    this.opts = opts;
	  }
	});

	var Events = Class({
	  bind: function(event, fn) {
	    return true;
	  },
	  unbind: function(event, fn){
	    return flase;
	  }
	});

	var Person = Class({
	  constructor: funciton(name, age) {
	    this.name = name;
		this.age = age;
	  }
	}	
	);

	// Student interits Person and extends properties from Option and Events
	var Student = Class([Person, Options, Events ], {
      constructor: function(id, name, age) {}
	}
	);

	var student = new Student(1, "Rika", 20);
	student.setOptions({ foo: true});
	student.bind();
	student.unbind();

	//Or after define Classes:
	var Student = Class(Person, {
	  constructer: function(id, name, age)
	});

	extend(Student, [Options, Events ]);

	//Mixin with instance
	 var person = new Person("Rika", 20);
	 extend(person, Options);
	 person.setOptions({ foo:true});

	//Mixin with native classes:
	extend(String.prototype, {
	  trim: function() {
	    return this.replace(/^\s|\s+$/g, "")
	  }
	})

	"    Hello World    ".trim(); // "Hello world"
{% endhighlight %}

## No conflict ##

{% highlight  javascript %}
  jsface.noConflict();
  // Code that uses other library's Class can follow here
  // ...

  // Define classes by using jsface.Class directly
  var Person = jsface.Class({
  });
{% endhighlight %} 




