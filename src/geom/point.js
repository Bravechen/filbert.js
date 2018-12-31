/**
 * Point对象
 * 仅提供点（2d）对象的相关信息。如果想使用点变换的方法可以使用Vector2D类.
 * @param x {Number} x轴坐标
 * @param y {Number} y轴坐标
 */
class Point {
  constructor(x = 0, y = 0) {
    this.x = Number.isFinite(x) ? x : 0;
    this.y = Number.isFinite(y) ? y : 0;
  }
}

/**
 * 
 * @param {*} point 
 */
function outputPoint(point = new Point()) {
  point = point instanceof Point ? point : new Point();
  return `Point{ x: ${point.x}, y: ${point.y} }`; 
}

/**
 * 在一个区域内产生随机点坐标
 * @param w 区域的宽度 Number
 * @param h 区域的高度 Number
 * @return filbert.Point
 */
function randomPoint(w,h) {
    return new Point(Math.random()*w, Math.random()*h);
}

/**
 * 在某个区域中是否包含某个点。
 *
 * @param rectangle {Rectangle} 区域对应的矩形对象
 * @param point {Point}     点坐标对象
 *
 * @return {Boolean}
 */
function containsPoint(rectangle, point) {
    return !(point.x < rectangle.x || point.x > rectangle.x + rectangle.width ||
        point.y < rectangle.y || point.y > rectangle.y + rectangle.height);
}

export { Point, outputPoint, randomPoint, containsPoint };