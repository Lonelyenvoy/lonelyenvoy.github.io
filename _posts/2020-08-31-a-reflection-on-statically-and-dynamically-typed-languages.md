---
layout: post
title: 对静态语言和动态语言的思考
date: 2020-08-31
categories: blog
tags: [编程语言]
description: 
---

![强类型、弱类型、静态类型、动态类型语言](https://res.cloudinary.com/practicaldev/image/fetch/s--FamBVQk1--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/cdd3ra936gltf65hlj8i.png)

[知乎 - 弱类型、强类型、动态类型、静态类型语言的区别是什么？](https://www.zhihu.com/question/19918532)

“动态一时爽，重构火葬场。”作为一名语言设计者，我曾经对静态语言情有独钟，因为静态语言相比动态语言有着无与伦比的优势：
1. 类型安全：大部分bug都是变量类型相关的错误（例如函数接受的参数类型和传入的参数类型不匹配），它们会在编译时报错，开发者能够及早发现错误，而不是等到运行时，节省debug的时间，也避免了在代码中埋下不知何时会被引爆的地雷。
2. 高可读性、可维护性：代码能够自说明，由于开发者知道变量的类型，可以很容易地重构代码。
3. 强大的基于静态分析的开发支持：由于IDE可以轻易分析出所有语句和表达式的类型，可以很容易地提供代码智能提示和自动补全功能，可以自动优化代码（如Java的`list.stream().forEach()`部分情况下可优化为`list.forEach()`），甚至可以检测出开发者正在写的可疑的、可能有bug的代码。

不得不说，动态语言在这三个方面是望尘莫及的——Python和JavaScript的开发者无法享受这些好处。

类型安全是让所有这些好处成为可能的基石，也是我最欣赏的特征。然而，安全是沉重的，意味着自缚手脚，放弃一些机会和能力，相比不安全的语言要写更多的代码，不可避免地陷入一些繁文缛节中。

Python（蟒蛇）正如其名，写代码就像“玩蛇”一样，极其灵活。

我曾经质疑过Python的类成员函数的设计：
```python
class Person:
    def cook(self, food):
        print(f'{self.name} is cooking {food}')
```
类成员函数的第一个参数`self`必须是对当前实例的引用，为什么Python不像C++和Java一样把它设计成一个隐式的关键字`this`，而是要作为显式的函数参数？这增加了不必要的麻烦。从表面上看，这样做的好处是允许开发者修改`self`的名称，改成他们喜欢的单词。但实际上，一个更大的好处在于，运行时对类或实例动态添加函数：
```python
class Person:
    pass

def cook(self, food):
    print(f'{self.name} is cooking {food}')
```

动态添加函数到类：
```python
Person.cook = cook
```

或者，动态添加函数到实例：
```python
from types import MethodType

person = Person()
person.cook = MethodType(cook, person)
```

现在，`Person`类或`person`实例就有了`cook`函数。在`cook`函数中，`self`是一个普通参数，而不必是当前对象的引用。但把它绑定到类或对象上了之后，普通参数`self`就会自动被视为当前实例的引用。从这一点上看，这是一个巧妙的设计。

静态语言能够有这种动态添加函数的操作吗？例如Java是有的，但需要通过动态代理，或者修改编译生成的字节码（这已经是一种非常规的HACK手段），开发者需要了解和学习的内容多了很多，需要写的代码也多了很多，无法像Python这样简洁。这就是静态语言为了维持类型安全需要付出的代价。

可见，动态语言并不会被静态语言的优势完全碾压，开发者需要根据需求来选择合适的语言。
