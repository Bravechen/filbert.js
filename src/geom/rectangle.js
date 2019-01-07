/**
 * 矩形区域相关
 * @author Brave Chan on 2019.1
 * @version 0.0.1
 */
//=================================================================
/**
 * 创建一个矩形数据区域
 * @param {Number} [required] x X轴坐标
 * @param {Number} [required] y Y轴坐标
 * @param {Number} [required] width 矩形宽度
 * @param {Number} [required] height 矩形高度
 *
 * @return {{x: 0, y: 0, width: 0, height: 0}}
 */
function createRectangle(x = 0, y = 0, width = 0, height = 0) {
  let rect = Object.create(null);
  rect.x = Number.isFinite(x) ? x : 0;
  rect.y = Number.isFinite(y) ? y : 0;
  rect.width = Number.isFinite(width) ? width : 0;
  rect.height = Number.isFinite(height) ? height : 0;
}

/**
 * 输出一个矩形数据区域的值内容
 * @param { {x: 0, y: 0, width: 0, height: 0} } rect
 *
 * @return { String }
 */
function outputRectangle(rect = createRectangle()) {
  return `Rectangle{x: ${rect.x}, y: ${rect.y}, width: ${rect.width}, height:${rect.height}}`;
}
//=================================================================
export { createRectangle, outputRectangle };
