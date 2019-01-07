/**
 * 向量相关
 * @author Brave Chan on 2019.1
 * @version 0.0.1
 */
//=====================================================================================
/**
 * 创建一个2d的向量
 * @param {Number} x [required] x轴坐标
 * @param {Number} y [required] y轴坐标
 *
 * @return {{x: number, y: number}}
 */
function createVector2D(x = 0, y = 0) {
  let vector = Object.create(null);
  vector.x = Number.isFinite(x) ? x : 0;
  vector.y = Number.isFinite(y) ? y : 0;
  return vector;
}

/**
 * 重置Vector2D对象
 * @param v2d {{x: number, y: number}} Vector2D对象
 * @param x {Number} [required] x坐标值
 * @param y {Number} [required] y坐标值
 *
 * @return {{x: number, y: number}}
 */
function resetV2D(v2d = createVector2D(), x = 0, y = 0) {
  v2d.x = Number.isFinite(x) ? x : 0;
  v2d.y = Number.isFinite(y) ? y : 0;
  return v2d;
}

/**
 * 克隆一个Vector2D对象
 * @param v2d {{x: number, y: number}} [required] Vector2D对象
 *
 * @return {{x: number, y: number}}
 */
function cloneV2D(v2d = createVector2D()) {
  return createVector2D(v2d.x, v2d.y);
}

/**
 * 2个矢量是否相等（数值相等，非矢量对象引用相等）
 * @param v2d1 {{x: number, y: number}} [required] Vector2D对象
 * @param v2d2 {{x: number, y: number}} [required] Vector2D对象
 *
 * @return {Boolean} true 相等 false 不相等
 */
function equalsV2Ds(v2d1, v2d2) {
  if (!v2d1 || !v2d2 || typeof v2d1 !== 'object' || typeof v2d2 !== 'object') {
    return false;
  }
  return v2d1.x == v2d2.x && v2d1.y == v2d2.y;
}

/**
 * 两个向量相加
 * @param v2d1 {{x: number, y: number}} [required] Vector2D对象
 * @param v2d2 {{x: number, y: number}} [required] Vector2D对象
 * @param isNew {Boolean} [optional] 默认true，产生新的向量对象。
 * false，向量相加但不产生新的矢量对象，将重置第一个参数为相加后的x,y。
 *
 * @return {{x: number, y: number}}
 */
function plusV2Ds(v2d1 = createVector2D(), v2d2 = createVector2D(), isNew = true) {
  if (isNew) {
    return createVector2D(v2d1.x + v2d2.x, v2d1.y + v2d1.y);
  }

  return resetV2D(v2d1, v2d1.x + v2d2.x, v2d1.y + v2d1.y);
}

/**
 * 两个向量相减
 * @param v2d1 {{x: number, y: number}} [required] Vector2D对象
 * @param v2d2 {{x: number, y: number}} [required] Vector2D对象
 * @param isNew {Boolean} [optional] 默认true，产生新的向量对象。
 * false，向量相减但不产生新的矢量对象，将重置第一个参数为相减后的x,y。
 *
 * @return {{x: number, y: number}}
 */
function minusV2Ds(v2d1 = createVector2D(), v2d2 = createVector2D(), isNew = true) {
  if (isNew) {
    return createVector2D(v2d1.x - v2d2.x, v2d1.y - v2d1.y);
  }

  return resetV2D(v2d1, v2d1.x - v2d2.x, v2d1.y - v2d1.y);
}

/**
 * 获得向量的逆向量
 * @param v2d {{x: number, y: number}} [required] Vector2D对象
 * @param isNew {Boolean} [optional] 默认true，产生新的向量对象。
 * false，向量逆转为逆向量。
 *
 * @return {{x: number, y: number}}
 */
function negateV2D(v2d = createVector2D(), isNew = true) {
  if(isNew===true){
    return createVector2D(-v2d.x, -v2d.y);
  }

  return resetV2D(v2d, -v2d.x, -v2d.y);
}

/**
 * 对向量进行缩放
 * @param v2d {{x: number, y: number}} [required] Vector2D对象
 * @param scale {Number} [required] 缩放比例
 * @param isNew {Boolean} [optional] 是否产生新的向量对象，默认true，产生新的向量对象。
 *
 * @return {{x: number, y: number}}
 */
function scaleV2D(v2d = createVector2D(), scale = 1, isNew = true) {
  if(isNew){
    return createVector2D(v2d.x * scale, v2d.y * scale);
  }

  return resetV2D(v2d, v2d.x * scale, v2d.y * scale);
}

/**
 * 设置向量的长度
 * @param v2d {{x: number, y: number}} [required] Vector2D对象
 * @param value {Number} [required] 设置向量长度。
 * @param isNew {Boolean} [optional] 是否产生新的向量对象，默认true，产生新的向量对象。
 *
 * @return {{x: number, y: number}}
 */
function setV2DLength(v2d = createVector2D(), len = 0, isNew = true) {
  if (Number.isFinite(len)) {
    let r = lengthV2D(v2d);
    if(r){
      return scaleV2D(v2d, len / r, isNew);
    }
    return isNew ? createVector2D(len, v2d.y) : resetV2D(v2d, len, v2d.y);
  }
  return v2d;
}

/**
 * 获得向量的长度
 * @param v2d {{x: number, y: number}} [required] Vector2D对象
 *
 * @return {Number} 向量的长度
 */
function lengthV2D(v2d = createVector2D()) {
  return Math.sqrt(v2d.x * v2d.x + v2d.y * v2d.y);
}

/**
 * 设置向量的角度
 * @param v2d {{x: number, y: number}} [required] Vector2D对象
 * @param angle {Number} [required] 弧度值
 * @param isNew {Boolean} [optional] 是否产生新的向量对象，默认true，产生新的向量对象。
 *
 * @return {{x: number, y: number}}
 */
function setV2DAngle(v2d = createVector2D(), angle = 0, isNew = true) {
  if(!Number.isFinite(angle)){
    return v2d;
  }

  let r = lengthV2D(v2d);
  let x = r * Math.cos(angle);
  let y = r * Math.sin(angle);
  return isNew ? createVector2D() : resetV2D(v2d, x, y);
}

/**
 * 获得向量的角度
 * @param v2d {{x: number, y: number}} [required] Vector2D对象
 *
 * @return {Number} 向量的角度
 */
function angleV2D(v2d = createVector2D()) {
  return Math.atan2(v2d.y, v2d.x);
}

/**
 * 旋转向量
 * @param v2d {{x: number, y: number}} [required] Vector2D对象
 * @param angle {Number} 弧度值
 * @param isNew {Boolean} [optional] 是否产生新的向量对象，默认true，产生新的向量对象。
 *
 * @return {{x: number, y: number}}
 */
function rotateV2D(v2d = createVector2D(), angle = 0, isNew = true) {
  let sin = Math.sin(angle);
  let cos = Math.cos(angle);
  let x1 = v2d.x * cos - v2d.y * sin;
  let y1 = v2d.y * cos + v2d.x * sin;
  return isNew ? createVector2D(x1, y1) : resetV2D(v2d, x1, y1);
}

/**
 * 与另一个向量的点积
 * @param v2d {{x: number, y: number}} [required] Vector2D对象
 *
 * @return {Number} 2个向量的点积
 * **/
function dotV2Ds(v2d1 = createVector2D(), v2d2 = createVector2D()) {
  return v2d1.x * v2d2.x + v2d2.y * v2d2.y;
}

/**
 * 向量的法向量
 * @param v2d {{x: number, y: number}} [required] Vector2D对象
 *
 * @return {{x: number, y: number}} 新的法向量
 * **/
function normalV2D(v2d = createVector2D()) {
  return createVector2D(-v2d.y, v2d.x);
}

/**
 * 与另一个向量是否垂直
 * @param v2d1 {{x: number, y: number}} [required] Vector2D对象
 * @param v2d2 {{x: number, y: number}} [required] Vector2D对象
 *
 * @return {Boolean} 是否垂直
 * **/
function isPerpV2Ds(v2d1 = createVector2D(), v2d2 = createVector2D()) {
  return dot(v2d1, v2d2) === 0;
}

/**
 * 与另一个向量之间的夹角
 * @param v2d1 {{x: number, y: number}} [required] Vector2D对象
 * @param v2d2 {{x: number, y: number}} [required] Vector2D对象
 *
 * @return {Number} 弧度值
 * **/
function angleBetweenV2Ds(v2d1 = createVector2D(), v2d2 = createVector2D()) {
  return Math.acos(dot(v2d1, v2d2) / lengthV2D(v2d1) * lengthV2D(v2d2));
}

//=====================================================================================
export {
  createVector2D,

  resetV2D,
  cloneV2D,
  negateV2D,
  scaleV2D,
  setV2DLength,
  lengthV2D,
  setV2DAngle,
  angleV2D,
  rotateV2D,
  normalV2D,

  equalsV2Ds,
  plusV2Ds,
  minusV2Ds,
  dotV2Ds,
  isPerpV2Ds,
  angleBetweenV2Ds
};
