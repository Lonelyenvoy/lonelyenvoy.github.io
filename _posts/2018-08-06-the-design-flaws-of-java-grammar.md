---
layout: post
title: Java 语言的设计缺陷
date: 2018-08-06
categories: blog
tags: [程序语言学]
description: 
---

```java
class A {
    // constructor
    A() {
        // ...
    }

    // constructor with an argument
    A(int value) {
        this();
        this.value = value;
    }

    int value;
}
```

我们发现这段简单的代码中出现了多个相同的类名```A```，分别位于类声明和构造函数声明处，造成了轻微的冗余。当我们需要修改```A```的名称时，令人头疼的事情发生了：我们需要同时修改多处，这显然是不合理的设计。

一个合理的解决方案是对构造函数使用特定的名称，如```initialize```。按此方案修改的代码如下：

```java
class A {
    // constructor
    initialize() {
        // ...
    }

    // constructor with an argument
    initialize(int value) {
        this();
        this.value = value;
    }

    int value;
}
```
