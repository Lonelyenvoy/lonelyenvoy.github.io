---
layout: post
title: Codeforces 849A 解题报告
date: 2017-09-04
categories: blog
tags: [ACM, Codeforces]
description: 
---

[Codeforces 849A](http://codeforces.com/problemset/problem/849/A)

#### 题意
给你n个数，尝试将其划分成许多段（每一段至少有一个数），这些段的个数为奇数，且*每一段*均需满足以下条件：

- 段的长度为奇数
- 第一个数必须为奇数
- 最后一个数必须为奇数

如果存在这样的划分，输出YES，否则输出NO。

#### 简析
从题目不难看出，只要序列的长度为奇数，并且第一个数和最后一个数均为奇数，即可满足题目要求。

如果不是这种情况，是否有可能满足？

- 序列的长度为偶数
> 不存在一种划分，能够同时满足*段的个数*和*每一段的长度*均为奇数。
- 第一个数或最后一个数为偶数
> 包含该数的段不满足要求


#### 代码

```c++
#include <bits/stdc++.h>
using namespace std;

#define rep(i,a,n) for(int i=a;i<n;++i)
#define erep(i,a,n) for(int i=a;i<=n;++i)
#define per(i,a,n) for(int i=n-1;i>=a;--i)

int main() {
    int n, a[101];
    scanf("%d", &n);
    rep(i,0,n) scanf("%d", a+i);
    printf((n & 1) && (a[0] & 1) && (a[n-1] & 1) ? "YES\n" : "NO\n");
}
```
