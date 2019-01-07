/**
 * Created by gxchen on 2015/2/9.
 */
this.filbert = this.filbert || {};
this.filbert.ui = (function(window,undefined){

    var MouseEvent = {
        CLICK:"click",
        MOUSE_MOVE:"mousemove",
        MOUSE_OVER:"mouseover",
        MOUSE_OUT:"mouseout",
        MOUSE_UP:"mouseup",
        MOUSE_DOWN:"mousedown"
    };

    //=======================Mouse============================
    /**
     * 鼠标操作类
     * 提供了有关鼠标信息的一些静态方法
     * **/
    var Mouse = {
        /**
         * @public
         * 在dom元素上捕捉鼠标坐标,鼠标在dom元素上移动时，可以实时监测鼠标的位置
         *
         * @compatibility Internet Explorer 9+, Firefox, Opera, Chrome 以及 Safari
         *
         * @param element dom元素
         * @param dispose 是否释放对鼠标的监听
         * return mouse{x:0,y:0}
         * **/
        captureMouse : function (element, dispose) {
            if (dispose === true) {
                if (element.removeEventListener) {
                    element.removeEventListener(MouseEvent.MOUSE_MOVE, handleMouseMove, false);
                } else if(element.detachEvent) {
                    element.detachEvent(MouseEvent.MOUSE_MOVE, handleMouseMove);
                }else{
                    element["on"+MouseEvent.MOUSE_MOVE] = null;
                }
                return null;
            }
            var mouse = {x: 0, y: 0},offsetX=0,offsetY= 0,rootE = element.offsetParent;
            while(rootE){
                if(rootE === document.body){
                    offsetX += element.offsetLeft || 0;
                    offsetY += element.offsetTop || 0;
                    break;
                }
                offsetX+= rootE.offsetLeft || 0;
                offsetY += rootE.offsetTop || 0;
                rootE = rootE.offsetParent;
            }

            if (element.addEventListener) {
                element.addEventListener(MouseEvent.MOUSE_MOVE, handleMouseMove, false);
            } else if(element.attachEvent) {
                element.attachEvent(MouseEvent.MOUSE_MOVE, handleMouseMove);
            }else{
                element["on"+MouseEvent.MOUSE_MOVE] = handleMouseMove;
            }

            /**鼠标移动事件处理器**/
            function handleMouseMove(e) {
                var x, y;
                if (e.pageX || e.pageY) {
                    x = e.pageX;
                    y = e.pageY;
                } else {
                    x = e.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft);
                    y = e.clientY + (document.body.scrollTop || document.documentElement.scrollTop);
                }

                x -= offsetX;
                y -= offsetY;

                mouse.x = x;
                mouse.y = y;
            }
            return mouse;
        }
    };
    return {
        Mouse:Mouse
    };
})(window);
