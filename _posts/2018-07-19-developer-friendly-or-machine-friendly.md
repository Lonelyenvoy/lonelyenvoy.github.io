---
layout: post
title: 对开发者友好 or 对机器友好？
date: 2018-07-19
categories: blog
tags: [开发, 杂谈]
description: 
---

### 背景

在开发过程中，我们追求代码的简洁性，经常会将代码优化得尽可能短（即所谓的one-liner）。提高代码的可读性和易维护性，这是“对开发者友好”。

同时，我们也会担忧程序的性能，并因此重构代码。提升代码性能，这是“对机器友好”。

### 鱼和熊掌不可兼得

无论是何种语言，何种编译器和开发环境，对开发者友好和对机器友好是不可兼得的。换言之，你几乎没法在保持代码优雅的前提下，让程序具备最高性能。如果你不明白我在说什么，请先看看Python和C语言的差别。

以下是一个用Java编写的例子：判断一个正整数是否是完美数*。

**完美数：真约数之和等于该数本身的正整数，如6=1+2+3，28=1+2+4+7+14。*

### 对开发者友好的实现

使用Java的函数式特性（JDK 1.8+）可以用短短几行代码完成需求。（参数合法性检查已略去，下同）

```java
import java.util.stream.IntStream;

class NumberUtils {
    public static boolean isPerfect(int number) {
        return factorsOf(number).sum() == number;
    }

    public static IntStream factorsOf(int number) {
        return IntStream.range(1, number).filter(x -> number % x == 0);
    }
}
```

### 对机器友好的实现

我知道，看到上面的代码，有人会马上站出来说“这也太差了”，因为我们没有缓存已经算过的结果，这会造成多次调用时的重复计算；同时，不得不承认，```range```，```filter```这些高阶函数相对较慢。因此我们再实现一个高性能的版本。

```java
import java.util.Map;
import java.util.HashMap;
import java.util.Set;
import java.util.HashSet;

class NumberUtils {
    private static Map<Integer, Integer> factorSumCache;

    public static boolean isPerfect(int number) {
        if (factorSumCache == null) {
            factorSumCache = new HashMap<>();
        }
        if (!factorSumCache.containsKey(number)) {
            int sum = 0;
            for (int i : factorsOf(number)) {
                sum += i;
            }
            factorSumCache.put(number, sum);
        }
        return factorSumCache.get(number) == number;
    }

    public static Set<Integer> factorsOf(int number) {
        Set<Integer> factors = new HashSet<>();
        factors.add(1);
        for (int i = 2; i < number; i++) {
            if (number % i == 0) {
                factors.add(i);
            }
        }
        return factors;
    }
}
```

### 评价

你会发现，为了提升性能，短短几行代码变长了好几倍，并且通过缓存引入了状态，显著增加了代码的复杂性。这值得吗？在实际开发中我们应该选用哪一种呢？

这个问题其实很好回答。如果你的项目与底层开发相关，毫无疑问你应该使用“对机器友好”的版本，因为性能至关重要。在其他场景中，我建议使用“对开发者友好”的版本，因为开发效率在大多数项目中更加重要，且编译领域对语言和运行时的优化将不断改善，从而减弱“简洁代码”对性能的影响。

最后引用Neal Ford说过的一句话：
> Language designers will always build more efficient mechanisms because they are allowed to bend rules.


