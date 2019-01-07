/**
 * 矩阵相关
 * 提供矩阵信息和相关变换方法
 * @author Brave Chan on 2019.1
 * @version 0.0.1
 */
//=================================================================

/**
 * 创建一个3 * 2矩阵
 * @param {Number} a [required]
 * @param {Number} b [required]
 * @param {Number} c [required]
 * @param {Number} d [required]
 * @param {Number} tx [required]
 * @param {Number} ty [required]
 *
 * @return {{a : 0, b : 0, c : 0, d : 0, tx : 0, ty : 0}}
 */
function createMatrix(a = 0, b = 0, c = 0, d = 0, tx = 0, ty = 0) {
  let obj = Object.create(null);
  obj.a = Number.isFinite(a) ? a : 0;
  obj.b = Number.isFinite(b) ? b : 0;
  obj.c = Number.isFinite(c) ? c : 0;
  obj.d = Number.isFinite(d) ? d : 0;
  obj.tx = Number.isFinite(tx) ? tx : 0;
  obj.ty = Number.isFinite(ty) ? ty : 0;

  return obj;
}

function rotate(matrix = createMatrix(), angle = 0) {
  return matrix;
}

function scale(matrix = createMatrix(), sx = 0, sy = 0) {
  return matrix;
}

function translate(matrix = createMatrix(), dx = 0, dy = 0) {
  return matrix;
}

export { createMatrix, rotate, scale, translate };
