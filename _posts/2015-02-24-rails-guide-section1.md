---
layout: post 
title: rails guide notes
description: "Ralis Guide Notes"
tags: [notes,Rails,guide]
image:
  background: triangular.png
comments: true
share: true
---

## Getting Started ##

### Laying down the ground work ###

> Rounting Error 

* uninitialized constant ArticlesController
	* the route needs to have a controller defined in order to serve the request.//无controller

<!--more-->
> Unknown action

* The action 'new' could not be found for ArticlesController

> Template is missing

* Missing template articles/new

<span class="text-info">
template look for *articles/new* then *application/new*</span>

<span class="text-info">because ArticlesController &lt; ApplicationController
</span>

Missing template articles/new, application/new  with {locale:[:en],formats:[:html],handlers:[:erb,:builder,:coffee]}.Searched in *"/path/to/blog/app/views"

handlers telling us what templates handlers could be used to render our template

:erb for HTML

:builder for XML

:coffee for CoffeeScript

new.html.erb  --> the first extension is the *format* of the template.
 the second is the *handler* that will be used.


### The first form  ###

hltrb

# Active Record #

## Active Record Basic ##

create -- new(won't save)

* create
  User.create(name: 'David',occupation: 'Code Artist')
* new
{% highlight  ruby %} 
  user = User.new
  user.name = 'David'
  user.occupation = 'Code Artist'
  user.save

  user = User.new do |u|
	  u.name = 'David'
	  u.occupation = 'Code Artist'
  end
{% endhighlight %}
* all, first, find_by(name: 'David'), 
* User.where(name: 'David',occupation: 'Code Artist').order('created_at DESC')
  find all users name David who are Code Artist and sort by created_at

### Update ###

{% highlight  ruby %}
user = User.find_by(name: 'David')
user.name = 'Dave'
user.save

# alternative
user = User.find_by(name: 'David')
user.update(name: 'Dave')

# -> -> update_all
User.update_all "max_login_attempts = 3, must_change_password = 'true'"
{% endhighlight %}

### Destroy ###

{% highlight  ruby %}
user = User.find_by(name: 'David')
user.destroy
{% endhighlight %}

### Validate ###

{% highlight  ruby %}
class User < ActiveRecord::Base
	validates :name, presence: true
end

User.create # => false
User.create! # => ActiveRecord::RecordInvalid:
	         #      Validation failed: Name can't be blank
{% endhighlight %} 

* 回滚 rake db:roolback

## Active Record Migrate ##

{% highlight  ruby %}
 #--> $ rails generate migration AddPartNumberToProducts

class AddPartNumberToProducts < ActiveRecord::Migration
	def change
	end
end

 #--> $ rails generate migration AddPartNumberToProducts part_number:string

class AddPartNumberToProducts < ActiveRecord::Migration
	def change
		add_column :products, :part_numebr, :string
	end
end

 # Add index
 #--> $ rails generate migration AddPartNumberToProducts part_number:string:index

class AddPartNumberToProducts < ActiveRecord::Migration
	def change
		add_column :products, :part_number, :string
		add_index :products, :part_number
	end
end

 # --> $ rails generate migration RemovePratNumberFromProducts part_number:string

class RemovePartNumberToProducts < ActiveRecord::Migration
	def change
		remove_column :products, :part_number, :string
	end
end

 # --> $ rails generate migration AddDetailsToProducts part_number:string price:decimal

class AddDetailsToProducts < ActiveRecord::Migration
	def change
		add_column :products, :part_number, :string
		add_column :products, :price, :decimal
	end
end

  # --> $ rails generate migration CreateProducts name:string part_number:string

class CreateProducts < ActiveRecord::Migration
	def change
		create_table :products do |t|
			t.string :name
			t.string :part_number
		end
	end
end

 # --> $  rails generate migration AddUserRefToProducts user:references

class AddUserRefToProducts < ActiveRecord::Migration
	def change
		add_reference :products, :user, index: true
	end
end

 # --> $  rails g migration CreateJoinTableCustomerProduct customer product

class CreateJoinTableCustomerProduct < ActiveRecord::Migration
	def change
		create_join_table :customers, :products do |t|
			# t.index [:customer_id, :product_id]
			# t.index [:product_id, :customer_id]
		end
	end
end

 # --> $  rails g model Product name:string description:text

class CreateProducts < ActiveRecord::Migration
	def change
		create_table :products do |t|
			t.string :name
			t.text :description

            t.timestamps
		end
	end
end
{% endhighlight %} 

* AddXXXToYYY --> add_column
* RemoveXXXFromYYY --> remove_column
* CreateXXX --> "XXX"table
* 字段类型references
* JoinTable --> 联合数据表
* 模型生成器

### 支持的类型修饰符 ###

* limit: Set string/text/binary/integer 最大值
* precision: Set decimal 精度， 即数字的位数
* scale: Set decimal 小数点后的数字位数
* polymorphic: 为belongs_to关联添加type字段
* null: 是否允许该字段值为NULL

{% highlight  ruby %}
 # --> $  rails generate migration AddDetailsToProducts 'price:decimal{5,2}' supplier:references{polymorphic}

class AddDetailsToProducts < ActiveRecord::Migration
	def change
		add_column :products, :price, :decimal, precision: 5, scale:2
		add_reference :products, :supplier, polymorphic: true, index:true
	end
end
{% endhighlight %} 

### 编写迁移 ###

{% highlight  ruby %}
create_table :products do |t|
	t.string :name
end
 # :primary_key -->修改主键
 # id: false -->不生成主键

 # 设置数据库选项， :options 选择中使用SQL
create_table :products, options: "ENGINE=BLACKHOLE" do |t|
	t.string :name, null: false
end
 # 会在创建数据库表的SQL语句后面加上
 # ENGINE=BLACKHOLE(MYSQL默认ENGINE=InnoDB)

create_join_table :products, :categories
 # table->'categories_products' 包含两个字段 category_id, product_id. :null->false(default)
create_join_table :products, :categories, column_options:{null: true}
create_join_table :products, :categories, table_name: :categorization
create_join_table :products, :categories do |t|
	t.index :product_id
	t.index :category_id
end

 # change_table
change_table :products do |t|
	t.remove :description, :name
	t.string :part_number
	t.index :part_number
	t.rename :upccode, :upc_code
end

 # excute
Product.connection.execute('UPDATE `products` SET `price`=`free` WHERE 1') 
{% endhighlight %}


* create\_table
* create\_join\_table
* change_table
* excute

-->:-->
* ActiveRecord::ConnectionAdapters::SchemaStatements:包含可在**change, up和down**中使用的方法；
* ActiveRecord::ConnectionAdapters::TableDefinition:包含可在**create_table**方法的块参数上调用的方法；
* ActiveRecord::ConnectionAdapters::Table: 包含可在**change_table**方法的块参数上调用的方法。
-->:-->

* change
  -->:在change方法中只能使用下面的方法：
	  * add_column
	  * add_index
	  * add_reference
	  * add_timestamps
	  * create_table
	  * create_join_table
	  * drop_table(block)
	  * drop_join_table(block)
	  * remove_timestamps
	  * rename_column
	  * rename_index
	  * remove_reference
	  * rename_table
> 块中不使用change, change_default, remove。 change_table中的操作是可逆的。
* reversible
{% highlight  ruby %}
class ExampleMigration < ActiveRecrod::Migration
	def change
		create_table :products do |t|
			t.references :category
		end
	end

	reversible do |dir|
		dir.up do
		  #add a foreign key
		  excute <<-SQL
		    ALTER TABLE products
			  ADD CONSTRAINT fk_products_categories
		      FOREIGN KEY (category_id)
			  REFERENCES categories(id)
		  SQL
		end
		dir.down do
		  excute <<-SQL
		    ALTER TABLE products
			DROP FOREIGN KEY fk_products_categories
		  SQL
	    end

		add_culumn :users, :home_page_url, :string
		rename_column :users, :email, :email_address
	end
{% endhighlight %} 
如果无法撤销迁移，可以在down中抛出ActiveRecord::IrreversibleMigration
* *up* and *down*
* revert
{% highlight  ruby %}
require_relative '2012121212_example_migration'

class FixupExampleMigration < ActiveRecord::Migration
	def change
		revert ExampleMigration

	    create_table(:apples) do |t|
			t.string :variety
		end
	end
end
{% endhighlight %} 

### 运行迁移 ###

 # --> $  rake db:migrate (it will excute _db:schema:dump_ -> update _db/schema.rb_)
  # --> $  rake db:migrate VERSION=20080906120000 (excute all migration before it.)

### 回滚 ###

 # --> $  rake db:roolback
 # --> $  rake db:roolback STEP=3 (撤销前三次迁移)
 # --> $  rake db:migrate:redo STEP (重做)

### 搭建数据库 ###

 # --> $  rake db:setup

### 重建数据库 ###

 # --> $  rake db:reset(使用 schema.rb内容，如果迁移无法回滚，操作无效)
 # SameTo
 # --> $  rake db:drop
 # --> $  rake db:setup

### 运行制定迁移 ###

 # --> $  rake db:migrate:up VERSION=20080906120000

### 运行环境 ###
 # --> $  rake db:migrate RAILS_ENV=test

### 修改运行输出 ###
* suppress_message  接受一个代码块，禁止代码块中的所有操作的输出
* say 接受一个消息字符串作为参数，将其输出。第二个参数是布尔值，指定输出结果是否缩进
* say\_with\_time 输出文本，以及执行代码块中操作所用时间。如果代码块的返回结果是整数，会当做操作的记录数量

-> 不让Active Record 输出任何结果，可以使用 rake db:migrate VARBOSE=false

### 导出模式 ###

config/application.rb
-->config.active\_record.schema\_format :sql :ruby

validates :foreign_key, uniqueness: true 这个验证是保证**数据完整性**的一种方法

关联中设置_:dependent_保证父对象删除后，子对象也会被删除。

无法完全保证引用完整性。

### 迁移和种子数据 ###

{% highlight  ruby %}
class AddInitialProducts < ActiveRecord::Migration
	def up
		5.times do |i|
			Product.create(name: "Product ##{i}", description: "A product.")
		end
	end

	def down
		Product.delete_all
	end
end
{% endhighlight %} 

db/seeds.rb -->:

{% highlight  ruby %}
5.times do |i|
	Product.create(name: 'Product ##{i}', description: "A product.")	
end
{% endhighlight %}
 # --> $  rake db:seek


