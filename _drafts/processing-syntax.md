## 形状一：基本图形 ##

### 基本图形 ###

* point(x, y)
* line(x<sub>1</sub>,y<sub>1</sub>,x<sub>2</sub>,y<sub>2</sub>)
* triangle(x1,y1, x2,y2, x3,y3)
* rect(x,y,width,height)
* quad(x1,y1,x2,y2,x3,y3,x4,y4)
* ellipse(x,y,width,height)
* bezier(x1,y1, cx1,cy1, cx2,cy2, x2,y2)

<!--more-->

### 灰度值 ###
* 0   -> 黑色
* 255 -> 白色

### 透明度 ###
* 0   -> 完全透明
* 255 -> 不透明
* fill(n,opacity)
* strok(n,opacity)
* noFill()
* noStroke()

### 绘图属性 ###
* smooth()
* noSmooth()
* strokeWeight(width)
* strokeCap(ROUND | SQUARE | PROJECT)  // Cap：盖，帽子
* strokeJoin(BEVEL | MITER | ROUND)  //bevel: 斜角 -> 方角；miter ：斜接 -> 默认；

### 绘图模式 ###

* ellipseMode(CENTER | RADIUS | CORNER | CORNERS)
	* CENTER : default
	* RADIOUS: (x,y,longer,shorter)
	* CORNER: ->rect(x,y,width,height)  corner:角落，困境
	* CORNERS: ->rect(x1,y1,x2,y2)

* rectMode(CENTER | CORNER | CORNERS)
	* CENTER: ->ellispe(x,y,width,height)
	* CORNER:default
	* CORNERS: ->(x1,y1, x2,y2)

## 数据一：变量 ##

int, float, boolean, true, false, =, width, height

* width,height -> 显示窗口的宽度、高度

## 数学一：算术与函数 ##

+, -, *, /, %

()

++, --, +=, -=,

*=, /=, -

ceil(), floor(), round(), min(), max()

## 形状二：顶点 ##
beginShape(), endShape(), vertex()

curveVertex(), bezierVertex()

vertex:顶点

endShape( | CLOSE)

### 点与线 ###

beginShape( | POINTS | LINES)

### 形状 ###
beginShape( | POINTS | LINES | TRIANGLES | TRIANGLE\_STRIP | TRIANGLE\_FAN | QUADS | QUAD\_STRIP )

TRIANGLE_STRIP:（n>3）每一点与前两点相连

TRIANGLE_FAN:(n>3) 每一点与前一点及第一点相连

QUAD_STRIP:(n>4)每两点与前两点相连

### 曲线 ###

* curveVertex:一条曲线连接一系列顶点

	* 首尾：控制点（不显示）

* bezierVertex(cx1,cy1,cx2,cy2,x,y)：
	* vertex() 设定第一个锚点




