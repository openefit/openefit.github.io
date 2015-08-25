# Vagrant简介 #

简单的讲，Vagrant 就是配备了命令行支持的VirtualBox。

[官网](http://www.vagrantup.com/)

[文档](http://docs.vagrantup.com/)

# 相关概念 #

## box ##

box相当于虚拟机的镜像文件

## VagrantFile ##

虚拟机相关配置，比如端口映射，ip指定， 内存分配， 共享文件夹 等等

# 相关命令 #

[]代表可选参数

## init ##

> vagrant init [boxname]

创建VagrantFile

## box ##

box相关管理

### add ###

vagrant box add {boxname} {box_url}

## up ##

开机

## ssh ##

ssh

window不支持直接ssh。
但是会输出ssh相关配置

可以使用其他ssh软件

## suspend ##
待机

## halt ##
关机

## reload ##
重启

## package ##
打包

# 使用步骤 #

我们项目不需要init,步骤如下：

> cd /path/to/meddev.box

> vagrant box add meddev meddev.box

> cd /path/to/our/project

> vagrant up

> 访问localhost:8080

> 多个项目：修改host 127.0.0.1 med.loc.okapp.cc

> 访问 med.loc.okapp.cc:8080

以下使用时不需要了解

# 发布之前的动作 #

全部配置完成后，打包

> vagrant package --output NAME[meddev]

但是这个方法，不能在发布之后进行成员间的同步

# 版本控制 #

打包之后，使用puppet 或者chef ， 进行系统更新和成员间的同步。
