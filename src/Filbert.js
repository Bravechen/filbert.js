this.filbert = this.filbert || {};
(function(window,undefined){
    "use strict";
//========================公共对象======================================
    /**
     * 命名空间内的私有对象，提供一些不公开的工具方法。
     * **/
    var PrivateClass = {
        type:"filbert",
        createObject:function(original){
            function T(){
            }
            T.prototype = original;
            return new T();
        }
    };


//======================Core======================================
    /**
     *  filbert.Core提供了一些顶级方法或者对象，用于在建立框架的过程中。
     * **/
    filbert.Core = {
        /**
         * 实现继承<br />
         * 实现一个子类从一个超类的原型继承。
         * @param superClass {Object} 超类
         * @param subClass {Object} 子类
         * **/
        inherits:function(superClass,subClass){
            var prototype = (Object.create)?Object.create(superClass.prototype):PrivateClass.createObject(superClass.prototype);
            prototype.constructor = subClass;
            subClass.prototype = prototype;
        },
        /**
         * 使用类全名称创建类实例
         * @param className {String} 类全名称字符串
         * @return {Object}
         * **/
        createInstance:function (className){
            var ary = className.split(".");
            var ClassItem = window[ary[0]];
            for(var i= 1,len=ary.length;i<len;i++){
                ClassItem = ClassItem[ary[i]];
            }
            return new ClassItem();
        },
        /**
         *  获得一个通用唯一识别码。
         *
         *  @return UUID {String}
         * **/
        getUUID:function(){
            var rand = UUID._getRandomInt, hex = UUID._hexAligner;
            return  hex(rand(32), 8)          // time_low
                + "-"
                + hex(rand(16), 4)          // time_mid
                + "-"
                + hex(0x4000 | rand(12), 4) // time_hi_and_version
                + "-"
                + hex(0x8000 | rand(14), 4) // clock_seq_hi_and_reserved clock_seq_low
                + "-"
                + hex(rand(48), 12);        // node
        },
        /**
         * 定义属性，主要是set和get方法
         * 扩展自<code>Object.defineProperty()</code>
         *
         * <p>
         *     举例：<br />
         *     <code>
         *         var _y = 0;
         *         property(object,"y",{
         *               get:function(){
         *                   return _y;
         *               },
         *               set:function(value){
         *                   _y = value;
         *               }
         *          });
         *      </code>
         *
         * </p>
         *
         * @param propertyHost {Object} 宿主对象
         * @param propertyName {String} 属性名称
         * @param descriptor {Object} 属性的描述或配置
         * **/
        property:function(propertyHost,propertyName,descriptor){
            if(!propertyHost || !descriptor || !propertyName){
                throw new Error("Some param is error!");
            }
            if(Object.defineProperty){
                Object.defineProperty(propertyHost,propertyName,descriptor);
            }else{
                if(descriptor["set"]){
                    propertyHost.__defineSetter__(propertyName,descriptor["set"]);
                }
                if(descriptor["get"]){
                    propertyHost.__defineGetter__(propertyName,descriptor["get"]);
                }
            }
        }
    };
    //==============================UUID====================================
    var UUID = {};
    /**
     * Returns an unsigned x-bit random integer.
     * @param {int} x A positive integer ranging from 0 to 53, inclusive.
     * @returns {int} An unsigned x-bit random integer (0 <= f(x) < 2^x).
     */
    UUID._getRandomInt = function(x) {
        if (x <0) return NaN;
        if (x <= 30) return (0 | Math.random() * (1 << x));
        if (x <= 53) return (0 | Math.random() * (1 << 30))
            + (0 | Math.random() * (1 << x - 30)) * (1 << 30);
        return NaN;
    };
    /**
     * Returns a function that converts an integer to a zero-filled string.
     * @param {int} radix
     * @returns {function(num&#44; length)}
     */
    UUID._getIntAligner = function(radix) {
        return function(num, length) {
            var str = num.toString(radix), i = length - str.length, z = "0";
            for (; i > 0; i >>>= 1, z += z) { if (i & 1) { str = z + str; } }
            return str;
        };
    };

    UUID._hexAligner = UUID._getIntAligner(16);
//======================FilbertObject==========================
    function FilbertObject(){
        this.className = "filbert.FilbertObject";
    }

    FilbertObject.prototype.output = function(){
        return ["[",this.className," ","instance","]"].join('');
    };
    filbert.FilbertObject = FilbertObject;
//=======================EventListener=========================
    function EventDispatcher(){
        filbert.FilbertObject.call(this);
        this.className = "filbert.EventDispatcher";
    }
    filbert.Core.inherits(filbert.FilbertObject,EventDispatcher);

    filbert.EventDispatcher = EventDispatcher;

//==============================================================

})(window);

