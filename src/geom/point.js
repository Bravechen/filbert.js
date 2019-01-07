/**
 * 点相关
 * @author Brave Chan on 2019.1
 * @version 0.0.1
 */
//=================================================================

/**
 * 创建Point对象
 * 仅提供点（2d）对象的相关信息
 * @param {Number} x [required] x轴坐标
 * @param {Number} y [required] y轴坐标
 *
 * @return {Object}
 */
function createPoint(x = 0, y = 0) {
  let point = Object.create(null);
  point.x = Number.isFinite(x) ? x : 0;
  point.y = Number.isFinite(y) ? y : 0;
  return point;
}

/**
 * 输出一个点的信息
 * @param {Object} point [required] 点对象
 * @return {String}
 */
function outputPoint(point = createPoint()) {
  point = typeof point === 'object' ? point : createPoint();
  return `Point{ x: ${point.x}, y: ${point.y} }`;
}

/**
 * 在一个区域内产生随机点坐标
 * @param w {Number} [required] 区域的宽度
 * @param h {Number} [required] 区域的高度
 * @return {Object}
 */
function randomPoint(w = 0, h = 0) {
    return createPoint(Math.random() * w, Math.random() * h);
}

/**
 * 在某个区域中是否包含某个点。
 *
 * @param rectangle {{x: 0, y: 0, width: 0, height: 0 }} [required] 区域对应的矩形对象
 * @param point { { x: number, y: number } } [required] 点坐标对象
 *
 * @return {Boolean}
 */
function containsPoint(rectangle = {x: 0, y: 0, width: 0, height: 0 }, point = createPoint()) {
    return !(point.x < rectangle.x || point.x > rectangle.x + rectangle.width ||
        point.y < rectangle.y || point.y > rectangle.y + rectangle.height);
}
//=================================================================
export { createPoint, outputPoint, randomPoint, containsPoint };
