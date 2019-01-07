/**
 * Created by gxchen on 2015/7/1.
 */
this.filbert = this.filbert || {};
this.filbert.display = (function(window,undefined){
    "use strict";
    //===================================
    /**
     * @public
     * cap常量枚举
     * **/
    var CapsStyle = {
        BUTT:"butt",
        ROUND:"round",
        SQUARE:"square"
    };
    //====================================
    /**
     * @public
     * joint常量枚举
     * **/
    var JointStyle = {
        BEVEL:"bevel",
        ROUND:"round",
        MITER:"miter"
    };
    //======================================
    /**
     * @public
     * 绘制命令标识
     * **/
    var GraphicsPathCommand = {
        NO_OP:0,            //不执行任何操作
        MOVE_TO:1,          //移动绘制点至坐标处
        LINE_TO:2,          //绘制线条至坐标处
        CURVE_TO:3,         //绘制2次贝塞尔曲线
        WIDE_MOVE_TO:4,
        WIDE_LINE_TO:5,     //从一个点开始绘制到另一个点结束
        CUBIC_CURVE_TO:6    //绘制3次贝塞尔曲线
    };
    //======================Graphics===========================
    /**
     * 矢量图形绘制类
     *
     * @author Brave Chen
     * @date    2015.6
     * **/
    function Graphics(){
        filbert.FilbertObject.call(this);
        this.className = "filbert.display.Graphics";
        this.idraw = null;
        this.drawArea = null;         //canvas的context对象
        this.baseX = 0;
        this.baseY = 0;
        this.areaWidth = 0;
        this.areaHeight = 0;
    }
    filbert.Core.inherits(filbert.FilbertObject,Graphics);

    var gp = Graphics.prototype;
    //============================
    /***********************************
     * 接口：
     * IDraw{
     *      area, //2d context
     *      x,    //注册点x
     *      y,    //注册点y
     *      width,//宽度
     *      height//高度
     * }
     ************************************/
    /**
     * @internal
     * 初始化
     *
     * @param IDraw {Object} 符合IDraw接口的对象
     * **/
    gp.initialize = function(IDraw){
        if(!IDraw||!IDraw.area){
            throw new Error("The param of IDraw where is in initialize() is error");
        }
        this.idraw = IDraw;                     //具有IDraw接口特性的对象
        this.drawArea = this.idraw.area;        //可用绘制区域
        this.baseX = this.idraw.x;              //绘制区域的x
        this.baseY = this.idraw.y;              //绘制区域的y
        this.areaWidth = this.idraw.width;      //绘制区域的宽度
        this.areaHeight = this.idraw.height;    //绘制区域的高度

        this.gp_filling = false;                //需要进行填充
        this.gp_stroking = false;               //需要进行描边
        this.gp_needClose = false;              //需要闭合路径
        this.gp_fillFirst = false;              //填充操作优先
    };
    /**
     * @private
     * 处理填充是否优先
     * **/
    gp.doFillFirst = function(){
        var area = this.drawArea;
        if(this.gp_fillFirst){
            if(this.gp_filling){
                area.fill();
            }
            if(this.gp_stroking){
                area.stroke();
                this.gp_stroking = false;
            }
            this.gp_fillFirst = false;
        }else{
            if(this.gp_stroking){
                area.stroke();
                this.gp_stroking = false;
            }
            if(this.gp_filling){
                area.fill();
            }
        }
    };

    /**
     * @public
     * 清空操作
     * **/
    gp.clear = function(){
        this.lineStyle();
        this.drawArea.fillStyle = null;
        this.drawArea.clearRect(this.baseX,this.baseY,this.areaWidth,this.areaHeight);
    };

    /**
     * @public
     * 开始填充颜色
     *
     * @param color {Number} 颜色值
     * @param alpha {Number} 透明度
     * **/
    gp.beginFill = function(color,alpha){
        var area = this.drawArea,colorTools = filbert.geom.ColorTools;
        area.fillStyle = colorTools.colorToRGB(color,alpha);
        this.gp_filling = true;
    };

    /**
     * @public
     *
     * 结束填充颜色
     * **/
    gp.endFill = function(){
        if(this.gp_filling){
            this.gp_filling = false;
            this.drawArea.fillStyle = null;
        }
    };

    /**
     * @public
     * 线条设置
     * @param thickness {Number} [可选]线条宽度,默认为1
     * @param color     {String} [可选]线条颜色,默认为'#000000'
     * @param alpha     {Number} [可选]线条透明度,默认为1
     * @param caps      {String} [可选]
     * @param joints    {String} [可选]
     * @param miterLimit {Number}[可选]
     * **/
    gp.lineStyle = function(thickness,color,alpha,caps,joints,miterLimit){
        var area = this.drawArea,colorTools = filbert.geom.ColorTools;
        color = (typeof color === 'string' || color!==undefined)?color:'#000000';
        area.strokeStyle = colorTools.colorToRGB(color,alpha);
        area.lineWidth = (typeof thickness === "number")?thickness:1;
        area.lineCap = (caps)?caps:null;
        area.lineJoin = (joints)?joints:null;
        area.miterLimit = (miterLimit!=undefined)?miterLimit:(area.lineCap===JointStyle.MITER)?3:null;
        this.gp_stroking = thickness>0;
    };

    /**
     * @public
     * 开始绘制线条
     * @param needClose {Boolean} [可选]是否绘制闭合路径。默认false，不闭合。
     * @param fillFirst {Boolean} [可选]是否填充操作有限。默认false，绘制边框操作优先
     * **/
    gp.beginLine = function(needClose,fillFirst){
        this.gp_needClose = (typeof needClose === "boolean")?needClose:false;
        this.gp_fillFirst = (typeof fillFirst === "boolean")?fillFirst:false;
        if(this.gp_needClose){
            this.drawArea.beginPath();
        }
    };

    /**
     * @public
     * 结束绘制线条
     * **/
    gp.endLine = function(){
        var area = this.drawArea;
        if(this.gp_needClose){
            area.closePath();
            this.gp_needClose = false;
        }
        this.doFillFirst();
    };

    /**
     * @public
     * 移动绘制点到目标点
     * @param x {Number}
     * @param y {Number}
     * **/
    gp.moveTo = function(x,y){
        x = this.baseX + (typeof x === "number")?x:0;
        y = this.baseY + (typeof y === "number")?y:0;
        this.drawArea.moveTo(x,y);
        if(!this.gp_stroking){
            this.gp_stroking = true;
        }
    };

    /**
     * @public
     * 绘制线条至目标点
     * @param x {Number}
     * @param y {Number}
     * **/
    gp.lineTo = function(x,y){
        x = this.baseX + (typeof x === "number")?x:0;
        y = this.baseY + (typeof y === "number")?y:0;
        this.drawArea.lineTo(x,y);
    };

    /**
     * @public
     * 绘制二次贝塞尔曲线
     * @param controlX {Number}
     * @param controlY {Number}
     * @param anchorX {Number}
     * @param anchorY {Number}
     * **/
    gp.curveTo = function(controlX,controlY,anchorX,anchorY){
        controlX = this.baseX + (typeof controlX ==="number")?controlX:0;
        controlY = this.baseY + (typeof controlY ==="number")?controlY:0;
        anchorX = this.baseX + anchorX;
        anchorY = this.baseY + anchorY;
        this.drawArea.quadraticCurveTo(controlX,controlY,anchorX,anchorY);
    };

    /**
     * @public
     * 绘制三次贝塞尔曲线
     * @param controlX1 {Number}
     * @param controlY1 {Number}
     * @param controlX2 {Number}
     * @param controlY2 {Number}
     * **/
    gp.cubicCurveTo = function(controlX1,controlY1,controlX2,controlY2,anchorX,anchorY){
        controlX1 = this.baseX + (typeof controlX1 ==="number")?controlX1:0;
        controlY1 = this.baseY + (typeof controlY1 ==="number")?controlY1:0;
        controlX2 = this.baseX + (typeof controlX2 ==="number")?controlX2:0;
        controlY2 = this.baseY + (typeof controlY2 ==="number")?controlY2:0;
        anchorX = this.baseX + anchorX;
        anchorY = this.baseY + anchorY;
        this.drawArea.cubicCurveTo(controlX1,controlY1,controlX2,controlY2,anchorX,anchorY);
    };

    /**
     * @public
     * 绘制矩形
     * @param x {Number} 绘制x坐标值
     * @param y {Number} 绘制y坐标值
     * @param width {Number} 宽度
     * @param height {Number} 高度
     * @param fillFirst {Boolean} [可选]是否填充优先，默认false，描边优先
     * **/
    gp.drawRect = function(x,y,width,height,fillFirst){
        var area = this.drawArea;
        x = this.baseX+(typeof x === "number")?x:0;
        y = this.baseY+(typeof y === "number")?y:0;
        width = typeof width === "number"?width:0;
        height = typeof height === "number"?height:0;
        area.rect(x,y,width,height);

        this.gp_fillFirst = typeof fillFirst === "boolean"?fillFirst:false;
        this.doFillFirst();
    };

    /**
     * @public
     * 绘制圆角矩形（标准方法）
     * @param x {Number} x坐标
     * @param y {Number} y坐标
     * @param width {Number} 宽度
     * @param height {Number} 高度
     * @param cornerRadius {Number} 圆角的半径
     * @param fillFirst {Boolean} [可选]是否填充优先，默认false，描边优先
     * **/
    gp.drawRoundRect = function(x,y,width,height,cornerRadius,fillFirst){
        var dx = this.baseX+(typeof x === "number")?x: 0,
            dy = this.baseY+(typeof y === "number")?y: 0,
            r = (typeof cornerRadius === "number")?cornerRadius: 0,
            w = (typeof width === "number")?width: 0,
            h = (typeof height === "number")?height: 0,
            area = this.drawArea;

        area.moveTo(dx+r,dy);
        area.lineTo(dx+w-r,dy);
        area.arc(dx+w-r,dy+r,r,Math.PI*1.5,Math.PI*2,false);
        area.lineTo(dx+w,dy+h-r);
        area.arc(dx+w-r,dy+h-r,r,0,Math.PI*0.5,false);
        area.lineTo(dx+r,dy+h);
        area.arc(dx+r,dy+h-r,r,Math.PI*0.5,Math.PI,false);
        area.lineTo(dx,dy+r);
        area.arc(dx+r,dy+r,r,Math.PI,Math.PI*1.5,false);

        this.gp_fillFirst = typeof fillFirst === "boolean"?fillFirst:false;
        this.doFillFirst();
    };

    /**
     * @public
     * 绘制圆形
     * @param x {Number} 圆心x坐标
     * @param y {Number} 圆心y坐标
     * @param radius {Number} 圆半径
     * @param fillFirst {Boolean} [可选]是否填充优先，默认false，描边优先
     * **/
    gp.drawCircle = function(x,y,radius,fillFirst){
        var area = this.drawArea;
        x = this.baseX+(typeof x === "number")?x:0;
        y = this.baseY + (typeof y === "number")?y:0;
        radius = typeof radius === "number" ? radius : 0;

        area.arc(x,y,radius,0,Math.PI*2,false);
        this.gp_fillFirst = typeof fillFirst === "boolean"?fillFirst:false;
        this.doFillFirst();
    };

    /**
     * @private
     * 内部绘制命令
     * **/
    var InternalCommand = {
        BEGIN_PATH:"beginPath",
        CLOSE_PATH:"closePath",
        STROKE:"stroke",
        FILL:"fill"
    };

    /**
     * @public
     * 按照一系列命令进行绘制
     * <p>
     *    参数commandsList是一个二维数组，其中的元素是具有特定结构的commandItem,commandItem[0]是一个绘制命令的标识，为GraphicsPathCommand中的常量。
     *    commandItem除第一个元素之外的其他元素为对应绘制命令所需的参数，其元素排列可以参考相应的绘制方法。例如：绘制一条直线路径:
     *    commandItem = [GraphicsPathCommand.LINE_TO,x,y];本质对应lineTo(x,y)。
     *    采用drawPath()绘制一系列路径线条比使用多个绘制方法更有效率。
     * </p>
     * @param commandsList {Array} 由commandItem组成的命令数组。
     * @param needClose {Boolean} [可选]是否是封闭图形，默认false。当true时，会创建封闭图形，尤其当路径不是闭合时会自动闭合路径。
     * @param fillFirst {Boolean} [可选]是否填充填充优先，默认false,当描边和填充同时存在时，false先执行描边(填充压住边框)，true还是先执行填充(边框压住填充)。
     * **/
    gp.drawPath = function(commandsList,needClose,fillFirst){
        if(!commandsList || commandsList.length<=0){
            throw new Error("commandsList is :"+commandsList+"or commandsList's attribute of length is 0.");
        }
        needClose = (typeof needClose === "boolean")?needClose:false;
        fillFirst = (typeof fillFirst === "boolean")?fillFirst:false;
        if(needClose){
            commandsList.unshift(InternalCommand.BEGIN_PATH);
            commandsList.push(InternalCommand.CLOSE_PATH);
        }
        if(fillFirst){
            commandsList.push(InternalCommand.FILL);
            commandsList.push(InternalCommand.STROKE);
        }else{
            commandsList.push(InternalCommand.STROKE);
            commandsList.push(InternalCommand.FILL);
        }
        var type,area = this.drawArea, x, y,tx,ty,cx1,cy1,cx2,cy2;
        for(var i= 0,commandItem;(commandItem=commandsList[i])!=null;i++){
            var isArray = toString.call(commandItem).indexOf("Array") !== -1;
            type = (isArray)?commandItem[0]:commandItem;
            switch(type){
                case InternalCommand.BEGIN_PATH:
                    area.beginPath();
                    commandsList.splice(i,1);
                    i--;
                    break;
                case InternalCommand.CLOSE_PATH:
                    area.closePath();
                    commandsList.splice(i,1);
                    i--;
                    break;
                case InternalCommand.STROKE:
                    if(this.gp_stroking){
                        area.stroke();
                        this.gp_stroking = false;
                    }
                    commandsList.splice(i,1);
                    i--;
                    break;
                case InternalCommand.FILL:
                    if(this.gp_filling){
                        area.fill();
                    }
                    commandsList.splice(i,1);
                    i--;
                    break;
                case filbert.GraphicsPathCommand.MOVE_TO:
                    x = commandItem[1];
                    y = commandItem[2];
                    tx = this.baseX+(typeof x === "number")?x:0;
                    ty = this.baseY+(typeof y === "number")?y:0;
                    area.moveTo(tx,ty);
                    break;
                case filbert.GraphicsPathCommand.LINE_TO:
                    x = commandItem[1];
                    y = commandItem[2];
                    tx = this.baseX + (typeof x === "number")?x:0;
                    ty = this.baseY + (typeof y === "number")?y:0;
                    area.lineTo(tx,ty);
                    break;
                case filbert.GraphicsPathCommand.CURVE_TO:
                    cx1 = commandItem[1];
                    cy1 = commandItem[2];
                    x = commandItem[3];
                    y = commandItem[4];
                    var t_cx1 = this.baseX + (typeof cx1 === "number")?cx1: 0,
                        t_cy1 = this.baseY + (typeof cy1 === "number")?cy1:0;
                    tx = this.baseX + (typeof x === "number")?x:0;
                    ty = this.baseY + (typeof y === "number")?y:0;
                    area.quadraticCurveTo(t_cx1,t_cy1,tx,ty);
                    break;
                case filbert.GraphicsPathCommand.CUBIC_CURVE_TO:
                    cx1 = commandItem[1];
                    cy1 = commandItem[2];
                    cx2 = commandItem[3];
                    cy2 = commandItem[4];
                    x = commandItem[5];
                    y = commandItem[6];
                    var t_cx1 = this.baseX + (typeof cx1 === "number")?cx1: 0,
                        t_cy1 = this.baseY + (typeof cy1 === "number")?cy1: 0,
                        t_cx2 = this.baseX + (typeof cx2 === "number")?cx2: 0,
                        t_cy2 = this.baseY + (typeof cy2 === "number")?cy2: 0;
                    tx = this.baseX + (typeof x === "number")?x:0;
                    ty = this.baseY + (typeof y === "number")?y:0;
                    area.bezierCurveTo(t_cx1,t_cy1,t_cx2,t_cy2,tx,ty);
                    break;
                default:
                    break;
            }
        }
    };

    /**
     * @public
     * 绘制三角形
     * @param x1 {Number} 顶点1，x坐标
     * @param y1 {Number} 顶点2，y坐标
     * @param x2 {Number} 顶点2，x坐标
     * @param y2 {Number} 顶点2，y坐标
     * @param x3 {Number} 顶点3，x坐标
     * @param y3 {Number} 顶点3，y坐标
     * @param fillFirst {Boolean} [可选]是否填充优先，默认false，描边优先
     * **/
    gp.drawTriangle = function(x1,y1,x2,y2,x3,y3,fillFirst){
        this.drawPath([
            [filbert.GraphicsPathCommand.MOVE_TO,x1,y1],
            [filbert.GraphicsPathCommand.LINE_TO,x2,y2],
            [filbert.GraphicsPathCommand.LINE_TO,x3,y3]
        ],true,typeof fillFirst==="boolean"?fillFirst:false);
    };

    /**
     * @public
     * 绘制扇形
     * @param x {Number} x坐标
     * @param y {Number} y坐标
     * @param radius {Number} 半径
     * @param angle {Number} 弧度值
     * @param fillFirst {Boolean} [可选]是否填充优先，默认false，描边优先
     * **/
    gp.drawSector = function(x,y,radius,angle,fillFirst){
        x = this.baseX + (typeof x === "number")?x:0;
        y = this.baseY + (typeof y === "number")?y:0;
        var x1 = x+radius,
            y1 = y;
        this.drawArea.moveTo(x,y);
        this.drawArea.lineTo(x1,y1);
        this.drawArea.arc(x,y,radius,0,angle,false);
        this.drawArea.lineTo(x,y);
        this.gp_fillFirst = typeof fillFirst === "boolean"?fillFirst:false;
        this.doFillFirst();
    };

    /**
     * @public
     * 绘制椭圆形
     * @param x {Number} 相对于注册点的椭圆中心x坐标
     * @param y {Number} 相对于注册点的椭圆中心y坐标
     * @param width {Number} 椭圆的宽度
     * @param height {Number} 椭圆的高度
     * @param fillFirst {Boolean} [可选]是否填充优先，默认false，描边优先
     * **/
    gp.drawEllipse = function(x,y,width,height,fillFirst){
        x = this.baseX + (typeof x === "number")?x:0;
        y = this.baseY + (typeof y === "number")?y:0;
        width = typeof width === "number"?width:0;
        height = typeof height === "number"?height:0;
        var command = filbert.GraphicsPathCommand,h2 = height*0.5,h4 = h2*0.5,w2 = width*0.5,w4=w2*0.5;
        var tx1 = x-w2,ty2 = y-h2,tx3 = x+w2,ty4 = y+h2,cy1 = y-h4,cx11 = x-w4,cx2 = x+w4,cy22 = y-h4,cy3 = y+h4;
        var list = [
            [command.MOVE_TO,tx1,y],
            [command.CUBIC_CURVE_TO,tx1,cy1,cx11,ty2,x,ty2],
            [command.CUBIC_CURVE_TO,cx2,ty2,tx3,cy22,tx3,y],
            [command.CUBIC_CURVE_TO,tx3,cy3,cx2,ty4,x,ty4],
            [command.CUBIC_CURVE_TO,cx11,ty4,tx1,cy3,tx1,y]
        ];
        this.drawPath(list,true,typeof fillFirst==="boolean"?fillFirst:false);
    };
    //=========================================================


    //=========================================================
    return {
        CapsStyle:CapsStyle,
        JointStyle:JointStyle,
        GraphicsPathCommand:GraphicsPathCommand,
        Graphics:Graphics
    };

})(window);
