---
layout: post
title: 2017 ACM-ICPC 西安赛区网络赛总结
date: 2017-09-17
categories: blog
tags: [ACM]
description: 
---

#### #

2017年9月16日午。

西安赛区ACM-ICPC网络赛。

#### Problem C

吃完饭坐在电脑前，已经多次参加网络赛的我，不慌不忙点开[C题](https://nanti.jisuanke.com/t/17116)。

对于输入x（1<=x<=10^6），求出满足S(k*x)%233=0的任意一个k，输出k。

S(x)是x的所有位上数字的和。如：S(123)=1+2+3=6

第一反应，简单题，模拟。

但k*x超出了64bit的范围，需用到大数运算。我笑了一下，对着早已准备好的板敲了上去。

20+分钟后，提交，TLE。

被队友A骂了一顿。这么简单的题，输出一个超大的k满足所有x不就可以了吗？

确实如此。队友交了一个看上去很傻的代码，但是这道签到题就这样AC了。[捂脸]

```cpp
#include <iostream>
using namespace std;

int main(){
    int T;
    cin>>T;
    int x;
    while(T--)
    {
        cin>>x;
        cout<<"99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999"<<endl;

    }
    return 0;
}
```

#### Problem F

与此同时，队友B在聚精会神地研究着[F题](https://nanti.jisuanke.com/t/17119)。这是一道高阶数学题：

对f(cos(x)) = cos(n*x)反解出f(x)，然后将f(x)表示为多项式形式。对于输入n, m，求出f(x)的表达式中x^m这一项的系数，mod 998244353后输出。(1<=n<=10^9, 0<=m<=10^4)

队友B找出了一个相当复杂的公式，成功地将f(x)表示了出来。随后花了数十分钟写出了可通过样例的代码，提交后WA。

以下是**不**正确的代码：

```cpp

#include <iostream>
using namespace std;
const long KLS=998244353;

long long fun_g(long long n,long long m){
    return (m+n)%2==0?((n-m)/2)%2==0?1:-1:0;
}

inline long long mi(long long a,long long b){
    long long ans=1;
    a%=KLS;
    while(b){
        if(b&1) 
        	ans=ans*a%KLS;
        b>>=1;
        a=a*a%KLS;
    }
    return ans;
}

int main(){
	int n,m;
	while(cin>>n>>m){
		long long G=fun_g(n,m);
		if(G==0){
			cout<<0<<endl;
		}
		else{
			long long ans=n;
			long long bns=1;
			long long res=0;
			if(m==0)
				res=1;
			else if(m==1)
				res=n%KLS;
			else{
				for(long long i=n+m-2;i>=n-m+2;i-=2)
					ans=(ans*i)%KLS;
				for(long long i=m;i>=1;i--)
					bns=(bns*i)%KLS;
				bns=mi(bns,KLS-2);
				res=(ans*bns)%KLS;
			}
			cout<<(G==-1?KLS-res:res)<<endl;
		}
	}
}
```


经过手工计算和测试，在n∈[1,10]时都输出了正确的结果，但可惜经过数个小时的查错和调试过后依然未能AC。

期间，队友A被指导老师拉去做项目了，有好几个小时处于挂机状态。 = =

#### Problem B

于是我开始看[B题](https://nanti.jisuanke.com/t/17115)。这是一道组合数学题：

小明闲着没事抛硬币，但是他的硬币不平坦，抛出正面向上的概率是q/p（<=1/2）

抛硬币k次，求出硬币正面向上次数是偶数的概率，并表示为X/Y。

输入p,q,k, 输出(X*Y^-1) mod (10^9 + 7)。

测试数据中，输入2 1 1，输出500000004。

接下来好长一段时间我都处于看不懂题目的懵逼状态中：(X*Y^-1)难道不是小于1吗？结果怎么会那么大？

经过队友A提醒，发现这是分数的模域问题（[参考](http://www.cnblogs.com/Alruddy/p/7191388.html)），而不是普通的求模。

豁然开朗，直接写代码。

以下是**不**正确的代码：

```cpp
#include <cstdio>
#include <cstring>
#include <cmath>
using namespace std;

const int mod = 1000000008;
int p,q,k;
int T;
double prob;
double sumProb;

int main() {
    scanf("%d", &T);
    while (T--) {
        scanf("%d%d%d", &p, &q, &k);
        prob = (double)q/p;
        sumProb = 0;
        for (int i=0; i<=k; i+=2) {
            sumProb += pow(prob, i) * pow(1-prob, k-i);
        }
        printf("%d\n", (int)(mod * sumProb));
    }
}
```

然而，发现这种做法存在小数精度问题，比如0.1^1000的结果中有效数字已经超出了double的范围，无法表示。

于是决定自己写分数类，进行分数的加法和乘法运算。

但是，不对啊！按照伯努利分布，这样算下去会变成大数加法和乘法，极有可能超时。

由于目前也没有其他题目可做了，只能尝试一下，写好分数类并按照费马定理写出分数模域的解法，随后提交。

TLE！确实应证了自己的想法。这时离比赛结束只剩下不到半小时了，可惜没能AC。

赛后队友A提醒，可以用伯努利方程求解，不涉及小数精度问题。真是巧妙！

#### 总结

这是一次不成功的比赛。我们队伍务必要加强训练。
