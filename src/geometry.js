/**
 * Created by gxchen on 2014/12/23.
 */
this.filbert = this.filbert || {};
this.filbert.geom = (function(window,undefined){
    "use strict";
    //======================Point==================================
    /**
     * IPoint接口
     * IPoint={x:0,y:0}
     */

    /**
     * Point对象
     * 仅提供点（2d）对象的相关信息。如果想使用点变换的方法可以使用Vector2D类.
     * @param x {Number} x轴坐标
     * @param y {Number} y轴坐标
     * **/
    function Point(x,y){
        filbert.FilbertObject.call(this);
        this.x = (typeof x === "number")?x:0;     //x轴坐标
        this.y = (typeof y === "number")?y:0;     //y轴坐标
    }
    filbert.Core.inherits(filbert.FilbertObject,Point);

    Point.prototype.output = function(){
        return "x:"+this.x+",y:"+this.y;
    };
    //===============================Matrix===================================
    /**
     * 矩阵类
     * 提供矩阵信息和相关变换方法
     * **/
    function Matrix(a,b,c,d,tx,ty){
        filbert.FilbertObject.call(this);
        this.a = (typeof a === "number")?a:0;
        this.b = (typeof b === "number")?b:0;
        this.c = (typeof c === "number")?c:0;
        this.d = (typeof d === "number")?d:0;
        this.tx = (typeof tx === "number")?tx:0;
        this.ty = (typeof ty === "number")?ty:0;
    }
    filbert.Core.inherits(filbert.FilbertObject,Matrix);
    var maP = Matrix.prototype;
    maP.rotate = function(angle){

    };
    maP.scale = function(sx,sy){

    };
    maP.translate = function(dx,dy){

    };
    //===============================Rectangle================================
    /**
     * 矩形区域信息类
     * 提供矩形区域的信息
     * **/
    function Rectangle(x,y,width,height){
        filbert.FilbertObject.call(this);
        this.x = (typeof x === "number")?x:0;
        this.y = (typeof y === "number")?y:0;
        this.width = (typeof width === "number")?width:0;
        this.height = (typeof height === "number")?height:0;
    }
    filbert.Core.inherits(filbert.FilbertObject,Rectangle);

    Rectangle.prototype.output = function(){
        return ["[Rectangle]===>x:",this.x," y:",this.y," width:",this.width," height:",this.height].join('');
    };

    //===============================Vector2D=================================
    /**
     * Vector2D向量对象
     *
     * **/
    function Vector2D(x,y){
        filbert.Point.call(this,x,y);
    }
    filbert.Core.inherits(Point,Vector2D);
    var v2p = Vector2D.prototype;
    /**
     * 重置Vector2D对象
     * @param x {Number} x坐标值
     * @param y {Number} y坐标值
     * **/
    v2p.reset = function(x,y){
        if(this.x != x || this.y != y){
            filbert.Point.call(this,x,y);
        }
    };
    /**
     * 克隆一个Vector2D对象
     *
     * @return {filbert.Vector2D} 一个新的Vector2D对象
     * **/
    v2p.clone = function(){
        return new filbert.Vector2D(this.x,this.y);
    };
    /**
     * 2个矢量是否相等（数值相等，非矢量对象引用相等）
     * @param vector2d {Vector2D} 需要加入判断的矢量对象
     * @return {Boolean} true 相等 false 不相等
     * **/
    v2p.equals = function(vector2d){
        return this.x == vector2d.x && this.y == vector2d.y;
    };
    /**
     * 与一个向量相加
     * @param vector2d {Vector2D}
     * @param isNew {Boolean} [可选] 默认false，向量相加但不产生新的矢量对象,true 2个向量相加之后，，将产生新的向量对象。
     * @return 当isNew为true时返回{filbert.Vector2D},为false时不返回值。
     * **/
    v2p.plus = function(vector2d,isNew){
        if(isNew===true){
            return new filbert.Vector2D(this.x+vector2d.x,this.y+vector2d.y);
        }else{
            this.x += vector2d.x;
            this.y += vector2d.y;
        }
    };
    /**
     * 与一个向量相减
     * @param vector2d {Vector2D}
     * @param isNew {Boolean} [可选] 默认false,向量相减不产生新的矢量对象,true时,2个向量相减之后，将产生新的向量对象。
     * @return 当isNew为true时返回{filbert.Vector2D},为false时不返回值。
     * **/
    v2p.minus = function(vector2d,isNew){
        if(isNew===true){
            return new filbert.Vector2D(this.x-vector2d.x,this.y-vector2d.y);
        }else{
            this.x+=vector2d.x;
            this.y+=vector2d.y;
        }
    };
    /**
     * 获得向量的逆向量
     * @param isNew {Boolean} [可选] 默认false，向量逆转为逆向量。true时，产生一个新的向量对象，为当前向量的逆向量。
     * @return {Boolean} 当isNew为true时返回{filbert.Vector2D},为false时不返回值。
     * **/
    v2p.negate = function(isNew){
        if(isNew===true){
            return new filbert.Vector2D(-this.x,-this.y);
        }else{
            this.x = -this.x;
            this.y = -this.y;
        }
    };
    /**
     * 对向量进行缩放
     * @param scaleValue {Number} 缩放比例
     * @param isNew {Boolean} [可选] 是否产生新的向量对象,默认false不产生新对象。
     * **/
    v2p.scale = function(scaleValue,isNew){
        if(isNew===true){
            return new filbert.Vector2D(this.x*scaleValue,this.y*scaleValue);
        }else{
            this.x *= scaleValue;
            this.y *= scaleValue;
        }
    };
    /**
     * 获得/设置向量的长度
     * @param value {Number} [可选] 设置向量长度，当传入此参数时，方法不返回值。
     * @return {Number} 向量的长度
     * **/
    v2p.vectorLength = function(value){
        if(typeof value==="number"){
            var r = this.vectorLength();
            if(r){
                this.scale(value/r);
            }else{
                this.x = value;
            }
            return null;
        }
        return Math.sqrt(this.x*this.x+this.y*this.y);
    };
    /**
     * 向量的角度
     * @param value {Number} 弧度值
     * @return {Number} 弧度值
     * **/
    v2p.angle = function(value){
        if(typeof value==="number"){
            var r = this.vectorLength();
            this.x = r*Math.cos(value);
            this.y = r*Math.sin(value);
            return null;
        }
        return Math.atan2(this.y,this.x);
    };
    /**
     * 旋转向量
     *
     * @param angle {Number} 弧度值
     * @param isNew {Boolean} 是否产生新的向量对象，默认false不产生向量。
     * @param isNew {Boolean} [可选] 是否产生新的向量对象,默认false不产生新对象。
     * **/
    v2p.rotate = function(angle,isNew){
        var sin = Math.sin(angle),
            cos = Math.cos(angle);
        var x1 = this.x*cos - this.y*sin,
            y1 = this.y*cos + this.x*sin;
        if(isNew===true){
            return new filbert.Vector2D(x1,y1);
        }else{
            this.x = x1;
            this.y = y1;
        }
    };
    /**
     * 与另一个向量的点积
     * @param vector2d {Vector2D}
     * @return {Number} 2个向量的点积
     * **/
    v2p.dot = function(vector2d){
        return this.x*vector2d.x+this.y*vector2d.y;
    };
    /**
     * 向量的法向量
     * @return {filbert.Vector2D} 法向量
     * **/
    v2p.normalVector = function(){
        return new filbert.Vector2D(-this.y,this.x);
    };
    /**
     * 与另一个向量是否垂直
     * @param vector2d {Vector2D} 向量对象
     * @return {Boolean} 是否垂直
     * **/
    v2p.isPerpTo = function(vector2d){
        return this.dot(vector2d)===0;
    };
    /**
     * 与另一个向量之间的夹角
     * @param vector2d {Vector2d} 向量对象
     * @return {Number} 弧度值
     * **/
    v2p.angleBetween = function(vector2d){
        var dp = this.dot(vector2d);
        var cosA = (dp/this.vectorLength())*(vector2d.vectorLength());
        return Math.acos(cosA);
    };


    //===============================Bezier===================================
    /*
      接口:
      IBezierPoint{
          x:Number,
          y:Number,
          fAngle:Number,
          bAngle:Number
      }
    */
    /**贝塞尔曲线工具**/
    var BezierTools = {
        /**
         * 按一定数量获取一条2次贝塞尔曲线上的所有点
         * @param startPoint {Point} [必须] 起始点对象,需要符合IPoint接口
         * @param endPoint {Point} [必须] 结束点对象,需要符合IPoint接口
         * @param controlPoint [可选] 控制点对象,需要符合IPoint接口
         * @param length {Number} [可选] 数量
         *
         * @return {Array} 符合IBezierPoint接口的点集合
         * **/
        twoPowerBezier:function(startPoint,endPoint,controlPoint,length){
            if(!(startPoint&&endPoint))
                return ["startPoint is null or that endPoint is null."];
            if(typeof startPoint.x!=="number" || typeof startPoint.y!=="number" || typeof endPoint.x!=="number" || typeof endPoint.y!=="number"){
                return [
                        "startPoint.x:"+(typeof startPoint.x),
                        "startPoint.y:"+(typeof startPoint.y),
                        "endPoint.x:"+(typeof endPoint.x),
                        "endPoint.y:"+(typeof endPoint.y)
                ]
            }
            if(!controlPoint || typeof controlPoint.x!=="number" || typeof controlPoint.y!="number"){
                controlPoint = new filbert.Point(endPoint.x*1.1,startPoint.y*1.1);
            }
            if(typeof length!=="number" || length===0){
                length = 10;
            }

            var list = [];

            var p0 = {};
            p0.x = startPoint.x;
            p0.y = startPoint.y;

            var p1 = {x:0,y:0,fAngle:0,bAngle:0};  //IBezierPoint
            p1.x = endPoint.x;
            p1.y = endPoint.y;

            var cp = controlPoint;

            var dt = 1/length,t = 0,rt,bp,preBp;
            while(length--&&t<1){
                bp = {x:0,y:0,fAngle:0,bAngle:0};  //IBezierPoint
                rt = 1-t;
                bp.x = rt * rt * p0.x + 2 * rt * t * cp.x + t * t * p1.x;
                bp.y = rt * rt * p0.y + 2 * rt * t * cp.y + t * t * p1.y;
                list.push(bp);
                if(preBp){
                    preBp.fAngle = Math.atan2(bp.y-preBp.y,bp.x-preBp.x)*180/Math.PI;
                    preBp.bAngle = 180 + preBp.fAngle;
                }
                preBp = bp;
                t+=dt;
            }
            preBp = list[list.length-2];
            bp.fAngle = preBp.fAngle;
            bp.bAngle = preBp.bAngle;
            list.push(p1);
            p1.fAngle = bp.fAngle;
            p1.bAngle = bp.bAngle;
            return list;
        },
        /**
         * 使用给定的点和控制点绘制2次贝塞尔曲线
         * @param list {Array} [必须] 点集合
         * @param isClosed {Boolean} [必须] 是否闭合
         * @param perStep {Number} [必须] 每段线条的点数量
         *
         * @return {Array} 点集合
         * **/
        twoPowerBezierLine:function(list,isClosed,perStep){
            if(!(list&&list.length>0))
                return ["list is null or that list.length equal 0."];
            if(typeof isClosed!=="boolean"){
                isClosed = false;
            }
            if(typeof perStep!=="number"){
                perStep = 50;
            }
            var bList=[],p0,p1,cp;
            for(var i=0,len=list.length;i<len;i++){
                if(!isClosed && i==len-1)
                    break;
                p0 = list[i];
                p1 = (isClosed && i==len-1)?list[0]:list[i+1];
                cp = (i==0)?{x:p1.x*1.1,y:p0.y*1.1}:{x:2*p0.x - cp.x,y:2*p0.y - cp.y};
                var tList = filbert.BezierTools.twoPowerBezier(p0,p1,cp,perStep);
                bList = bList.concat(tList);
            }
            return bList;
        }
    };
    //===============================ColorTools====================================
    /**
     * 颜色工具类
     * 提供各种实用工具
     * **/
    var ColorTools = {
        /**
         * 色值类型常量枚举
         * **/
        ColorType:{
            RGB:"rgb",
            RGBA:"rgba",
            UINT:"#",
            NUMBER:"number"
        },
        /**
         * 随机颜色值 24位
         * @param type 返回值类型
         *     filbert.ColorType.RGB====>"rgb(255,255,255)"
         *     filbert.ColorType.UINT===>"#ffffff"
         * @return {String}
         * **/
        randomColor24:function(type){
            var r = Math.floor(Math.random()*255);
            var g = Math.floor(Math.random()*255);
            var b = Math.floor(Math.random()*255);
            var eType = filbert.GeomTools.ColorType;
            return (type===eType.RGB)?"rgb("+r+","+g+","+b+")":"#"+Number(r).toString(16)+Number(g).toString(16)+Number(b).toString(16);
        },
        /**
         * 随机颜色值 32位
         * @return {String} "rgba(255,255,255,1)"
         * **/
        randomColor32:function(){
            var r = Math.floor(Math.random()*255);
            var g = Math.floor(Math.random()*255);
            var b = Math.floor(Math.random()*255);
            var a = Math.random();
            return "rgba("+r+","+g+","+b+","+a+")";
        },

        /**
         * 转换色值表现形式
         * 提供转换0xffffff/"#ffffff"色值到"rgb(255,255,255)"/"rgba(255,255,255,1)"形式
         * @param color {Number/String} [必须]色值
         * @param alpha {Number} [可选]透明度值
         * @return {String} 色值的字符串形式。
         * **/
        colorToRGB:function(color,alpha){
            if(typeof color === 'string' && color[0] === '#'){
                color = parseInt(color.slice(1),16);
            }
            color = (typeof color === 'string' && color[0] === '#')?parseInt(color.slice(1),16):(typeof color === "number")?color:0;
            alpha = (alpha == undefined)?1:alpha;

            var r = color>>16&0xff,
                g = color>>8&0xff,
                b = color&0xff,
                a = (alpha<0)?0:((alpha>1)?1:alpha);
            return "rgb"+((a===1)?"":"a")+"("+r+","+g+","+b+((a===1)?"":(","+a))+")";
        },
        /**
         * 转换色值为数字形式
         * **/
        parseColor:function(color,toNumber){
            if(toNumber===true){
                if(typeof color==='number'){
                    return (color|0);
                }
                if(typeof color==='string'&&color[0]==='#'){
                    color = color.slice(1);
                }
                return parseInt(color,16);
            }else{
                if(typeof color==='number'){
                    color = '#'+('00000'+(color|0).toString(16)).substr(-6);
                }
                return color;
            }
        },
        /**
         * 从16进制的数值中析出三个颜色通道的值(10/16)
         * @param color {Number} 颜色数值数字形式或者0xffffff形式
         * @return {Array} [red,green,blue]
         * **/
        separateChannel24:function (color) {
            if (!isNaN(color)) {
                var r = color >> 16 & 0xff,
                    g = color >> 8 & 0xff,
                    b = color & 0xff;
                return [r, g, b];
            }
        },
        /**
         * 使用16进制数值合成16进制颜色值
         * @param red {Number} 红色通道值
         * @param green {Number} 绿色通道值
         * @param blue {Number} 蓝色通道值
         * @return {Number}
         * **/
        compoundChannel24:function(red,green,blue){
            return red<<16 | green<<8 | blue;
        }
    };
    //==============================VectorTools=================================
    /**矢量数学计算工具**/
    var VectorTools = {
        /**
         * 在一个区域内产生随机点坐标
         * @param w 区域的宽度 Number
         * @param h 区域的高度 Number
         * @return filbert.Point
         * **/
        randomPoint:function(w,h){
            return new filbert.Point(Math.random()*w,Math.random()*h);
        },
        /**
         * 在某个区域中是否包含某个点。
         *
         * @param rectangle {Rectangle} 区域对应的矩形对象
         * @param point {Point}     点坐标对象
         *
         * @return {Boolean}
         * **/
        containsPoint:function (rectangle, point) {
            return !(point.x < rectangle.x || point.x > rectangle.x + rectangle.width ||
                point.y < rectangle.y || point.y > rectangle.y + rectangle.height);

        }
    };
    //==============================AngleTools=================================================
    /**角度数学计算工具**/
    var AngleTools = {
        /**
         * 角度转弧度
         * @param degrees {Number} 角度值（单位：度）
         * @return {Number}
         * **/
        degreesToRadius:function (degrees) {
            return degrees * Math.PI / 180;
        },
        /**
         * 弧度转角度
         * @param radius {Number} 弧度值(单位:弧度)
         * @return {Number}
         * **/
        radiusToDegrees:function (radius) {
            return radius * 180 / Math.PI;
        },
        /**
         * 标准化角度
         * 将一个角度标准化为0-360度之内的角
         * @return {Number}
         * **/
        fixAngle:function(angle){
            return (angle%=360<0)?angle+360:angle;
        },
        /**
         * 将一个笛卡尔坐标点转换为极坐标点
         * @param point {Point}
         * @return {Object} {r,t（弧度值）}
         * **/
        pointToPolar:function(point){
            if(!point||typeof point.x!=="number"||typeof point.y!=="number"){
                return null;
            }
            return {r:Math.sqrt(point.x*point.x+point.y*point.y),t:Math.atan2(point.y,point.x)};
        },
        /**
         * 将一个极坐标点转换为笛卡尔坐标点
         * @param polar {Object} {r,t(弧度值)}
         * @return {filbert.Point}
         * **/
        polarToPoint:function(polar){
            if(!polar || typeof polar.r!=="number" || typeof polar.t!=="number"){
                return null;
            }
            return new filbert.Point(polar.r*Math.cos(polar.t),polar.r*Math.sin(polar.t));
        }
    };
    //==========================================
    return {
        Point:Point,
        Matrix:Matrix,
        Rectangle:Rectangle,
        Vector2D:Vector2D,
        BezierTools:BezierTools,
        ColorTools:ColorTools,
        VectorTools:VectorTools,
        AngleTools:AngleTools
    };
})(window);
