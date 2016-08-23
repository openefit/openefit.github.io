---
title: React Redux 实践-我的博客
description: "my react exercise"
tags: [exercise,react, redux, universal, material-ui]
image:
  background: triangular.png
comments: true
share: true
---

react实践，做了这个blog，类似github page,支持markdown. 主要使用了

* react
* React Route
* react-helmet
* babel
* redux
* redux dev tools
* material-ui
* webpack
* webpack dev middleware
* webpack hot middleware
* style-loader,less-loader 
* webpcak-isomorphic-tools
* universal rendering

这篇文章将介绍这些库使用

## react helmet ##

react helmet 可以方便的用来更改head标签,如title, meta, link, script, tags

示例代码：

```javascript
import React from "react";
import Helmet from "react-helmet";
export default function Application () {
    return (
        <div className="application">
            <Helmet title="My Title" />
            //...
        </div>
    );};
    
```

## redux代码组织 ##

## webpack ##

## todo ##

highlighter
