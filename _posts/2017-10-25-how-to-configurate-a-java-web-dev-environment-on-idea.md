---
layout: post
title: Intellij IDEA / Java WEB / Tomcat / git 开发环境配置指南
date: 2017-10-25
categories: blog
tags: [开发]
description: 
---

> 此教程面向高校学生/教师开发者。

### 1. 下载并安装Intellij IDEA __Ultimate__
http://www.jetbrains.com/idea/download

注意：请安装Ultimate而不是Community版本

### 2. 下载并安装Tomcat
http://tomcat.apache.org/

### 3. 下载并安装git
https://git-scm.com/downloads

打开命令行
```bash
$ git --version
git version 2.14.1
```
如果git的版本号正常显示则表示安装成功。

### 4. 申请Jetbrains学生免费授权计划
https://www.jetbrains.com/student/

使用学校提供的edu邮箱完成申请。

使用腾讯企业邮箱的高校学生，可以前往[exmail.qq.com](https://exmail.qq.com/login)登录完成验证。

### 5. clone git 远程代码库

打开命令行
```bash
$ cd 你的开发目录
$ git clone https://github.com/lonelyenvoy/musicstorm-server.git
Cloning into 'musicstorm-server'...
Username for 'https://github.com': ***
Password for 'https://***@github.com':
remote: Counting objects: 100, done.
remote: Compressing objects: 100% (100/100), done.
remote: Total 100 (delta 10), reused 100 (delta 10), pack-reused 0
Receiving objects: 100% (100/100), 100.00 KiB | 10.00 KiB/s, done.
Resolving deltas: 100% (10/10), done. 
```

### 6. 配置Intellij IDEA

(1) 启动IDEA，点击Open，找到刚才clone的项目目录，选中并打开。

![示意图](/resources/post-2017-10-25-6-1.png)

(2) 等待IDEA加载并解析文件完毕后，点击右上角的Edit Configurations。

![示意图](/resources/post-2017-10-25-6-2.png)

(3) 点击左上角加号 Add New Configurations -- Tomcat Server -- Local

![示意图](/resources/post-2017-10-25-6-3.png)

(4) 点击Application server右侧的Configure...按钮

![示意图](/resources/post-2017-10-25-6-4.png)

(5) 点击左上角加号添加Tomcat Server

(6) 点击Tomcat Home右侧的...按钮

![示意图](/resources/post-2017-10-25-6-6.png)

(7) 找到并选中第二步中Tomcat的安装目录，一路点击OK，回到(3)中的界面

![示意图](/resources/post-2017-10-25-6-7.png)

(8) 点击Warning: No artifacts marked for deployment右侧的fix按钮，选中"项目名:war exploded"的选项

![示意图](/resources/post-2017-10-25-6-8.png)

(9) 对新的Configurations起一个自己喜欢的名字，并点击OK

![示意图](/resources/post-2017-10-25-6-9.png)

(10) 打开左侧导航栏，在项目文件中引入相关的jar包（如没有则可忽略）
在*/lib目录下找到项目依赖包，点击右键，选择Add as library...并点击OK

![示意图](/resources/post-2017-10-25-6-10.png)

### 7. 运行项目：按Shift+10完美运行


