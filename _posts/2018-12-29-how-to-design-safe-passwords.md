---
layout: post
title: 如何设计安全的密码
date: 2018-12-29
categories: blog
tags: [杂谈]
description: 
---

> 近期，各网站数据泄露事件频发，引发人们对自身账户安全的惊慌和对网站运营企业的不信任。

一个**安全的密码体系**，能够有效将此类事件对你造成的不良影响降到最低。在本文中，笔者提供一种可行的方案，供读者参考。

注意，我这里说的是密码体系，而不是单个密码。原因是显然的：如果你在所有平台都使用相同的密码，那么密码即使再复杂，在数据发生泄露时也会失去作用，因为拿到数据的人可以用同一个密码轻易地登录你所有的账户。

#### 每个网站的密码都不同，记不住啊！

事实上，笔者提出的方案中，只需要记住一个密码——**基础码**即可。所有其他密码都是在这个基础码之上，用**服务**（即APP、网站）**的名字**，或者**服务提供商**（即平台所属企业）**的名字**生成的。例如，微信是服务的名字，腾讯是服务提供商的名字。

一个简单的例子：以`abcdef`作为基础码，那么微信的密码就是`abcdefweixin`，支付宝的密码是`abcdefzhifubao`。

#### 这样也太简单了，假如别人猜到基础码，所有账户不就都沦陷了？

没错，所以笔者提出设计基础码的**原则**：
1. 不使用有意义的词汇，如英语单词、汉字拼音、姓名
2. 不使用有意义的号码，如自己或他人的生日、纪念日、手机/电话、身份证号、QQ
3. 不使用有顺序的数字或字母（如`123456`），或重复的字符

这样一来，随机密码就成为了不错的选择：你可以在键盘上乱敲一通，或者使用[RANDOM.ORG](https://www.random.org/strings/)帮助你生成一串随机字符。由于基础码必须通用，考虑到部分平台对密码的长度限制和复杂性限制，基础码的长度应在8-16之间，而且应含有大小写字母和数字。

你得到的结果应该像这样：
```
yqUBFDLm1wO6
```

#### 这么复杂的密码我怎么记得住？

托笔者的福，你这辈子可能只尝试记过这一串随机字符，一开始很困难，你可以先抄在纸上。但相信我，只要你在各大平台登录的时候不选 *记住密码* ，每天都会输入不止一次，比较轻易就记住了。

#### 基础码看上去很安全，但假如它泄露了呢？

正如上文所说，普通的密码即使再复杂，在数据发生泄露时也会失去作用。因为别人知道，你的密码就是在基础码后面加上一个简单的、有意义的单词。这就是**扩展码**的部分。为了增大破解难度，需要对扩展码中的单词进行**转换**，下面介绍两种方式。

### 转换方式1：凯撒密码

![凯撒密码示意图](https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Caesar3.svg/2880px-Caesar3.svg.png)

这是最简单的加密方式，只需要**将字母后移几位**。拉丁字母表的顺序如下：
```
abcdefghijklmnopqrstuvwxyz
```

例如，我们把扩展码`weixin`这个词中的每一个字母按照上述顺序后移3位，到底了就重新从头开始。`w`变成`z`，`e`变成`h`，以此类推：
```
weixin
zhlalq
```

这时，我们把基础码`yqUBFDLm1wO6`和转换后的扩展码`zhlalq`拼在一起，得到微信的密码`yqUBFDLm1wO6zhlalq`。

### 转换方式2：维吉尼亚密码

![维吉尼亚密码示意图](http://upload-images.jianshu.io/upload_images/2482101-660f70ac37ab9af5.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/500)

方式2是方式1的加强版。我们首先需要一个**密钥**，可以是任何字母组成的串，比如`big`。

然后我们使用上图进行转换：第一行表示需要转换的字母，第一列表示密钥的字母。

我们把扩展码`zhifubao`和密钥`big`并排摆在一起，如果密钥不够长，就重复写到够长为止，如下所示：
```
zhifubao
bigbigbi
```

接下来我们用这两行字，逐个字母按照图中的信息进行定位。对于第一个`z`和`b`，在第一行中找到z作为横坐标，第一列中找到b作为纵坐标，从而确定它们纵横交错的交点`a`，以此类推，我们得到：
```
apogchbw
```

这时，我们把基础码`yqUBFDLm1wO6`和转换后的扩展码`apogchbw`拼在一起，得到支付宝的密码`yqUBFDLm1wO6apogchbw`。

欲了解维吉尼亚密码的更多详情，请[点击此处](https://blog.csdn.net/White_Idiot/article/details/61201864)。

#### 转换太复杂了，我算到花都谢了

出于简便考虑，可以使用缩写，如`weixin`可缩写为`wx`。

## 总结

笔者提出了一种安全的密码体系，通过固定的随机**基础码**，用服务名称或服务提供商名称作为**扩展码**，并对扩展码进行**转换**，随后将基础码和转换后的扩展码进行拼接，从而对每个平台生成独一无二的密码，确保账户安全。

## Q & A

1. Q: 我能使用密码管理器（如1Password，钥匙串）吗？

   A: 不推荐。且不论管理工具本身的安全性如何，密码管理器的主密码泄露之后，其他密码就会全军覆没。


2. Q: 为什么不用更复杂的算法（如RSA）来加密？

   A: 这篇文章是写给普通人看的，需要在短时间内心算出密码，而不是使用计算机。如果你的心算能力强，不会在登录界面上牺牲太多时间，可以试试。


---
本文为了简明易懂而牺牲了一定的严谨性。限于笔者水平，文中有未尽和错漏之处，请[点此不吝赐教](/contact)。

[1] 图片出处：凯撒密码，维基百科，[https://zh.wikipedia.org/wiki/%E5%87%B1%E6%92%92%E5%AF%86%E7%A2%BC](https://zh.wikipedia.org/wiki/%E5%87%B1%E6%92%92%E5%AF%86%E7%A2%BC)

[2] 图片出处：【密码学】维吉尼亚密码加解密原理及其破解算法Java实现，widiot8023，[https://blog.csdn.net/White_Idiot/article/details/61201864](https://blog.csdn.net/White_Idiot/article/details/61201864)

