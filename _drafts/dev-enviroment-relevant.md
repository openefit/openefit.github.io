## gem国内源 ##

{% highlight  bash %}
	gem sources --remove https://rubygems.org/
	gem sources -a http://ruby.taobao.org/
	gem sources -l	
{% endhighlight %}

## RVM国内源 ##

Mac：

> $ sed -i .bak 's!ftp.ruby-lang.org/pub/ruby!ruby.taobao.org/mirrors/ruby!' $rvm_path/config/db

Linux:

> $ sed -i 's!ftp.ruby-lang.org/pub/ruby!ruby.taobao.org/mirrors/ruby!' $rvm_path/config/db


