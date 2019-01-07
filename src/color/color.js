const UINT = "#";
const ColorType = {
  RGB:"rgb",
  RGBA:"rgba",  
  NUMBER:"number",
  UINT
};

const COLOR_REG = /^#[0-9a-f]{6,8}$/;
const RGB_REG = /^rgb\([0-9]{1,3},(\s?)+[0-9]{1,3},(\s?)+[0-9]{1,3}\)$/;
const RGBA_REG = /^rgba\([0-9\.]{1,3},(\s?)+[0-9\.]{1,3},(\s?)+[0-9\.]{1,3},(\s?)+[0-9\.]+\)$/;
const DEFAULT_RGB = 'rgb(0, 0, 0)';
const DEFAULT_RGBA = 'rgb(0, 0, 0, 1)';
const DEFAULT_HEX = '#000000';
const DEFAULT_HEX_32 = '#00000000';
const DEFAULT_COLOR_24 = 0x000000;
const DEFAULT_COLOR_32 = 0x00000000;
const MAX = 255;

/**
 * @private
 * 是否是安全的颜色数值
 * @param {Number} num [required]
 * @return {Boolean} 
 */
function safeUint(num) {
  return Number.isSafeInteger(num) && num >= 0;
}

/**
 * @private
 * 将24位色值分解为rgb3个通道
 * @param {Number} color [required]
 * @return {number[]}
 */
function separate24(color) {
  const r = color >> 16 & 0xff;
  const g = color >> 8 & 0xff;
  const b = color & 0xff;
  return [r, g, b];
}

/**
 * @private
 * 将32位色值分解为rgba4个通道
 * @param {Number} color [required]
 * @return {number[]} 
 */
function separate32(color) {
  const r = color >> 24 & 0xff;
  const g = color >> 16 & 0xff;
  const b = color >> 8 & 0xff;
  const a = color & 0xff;
  return [r, g, b, a];
}

/**
 * @private
 * 将三个通道的数值合成24位色值
 * @param {Number} r [required]
 * @param {Number} g [required]
 * @param {Number} b [required]
 * @return {Number} 色值
 */
function compound24(r = 0, g = 0, b = 0) {
  return r << 16 | g << 8 | b;
}

/**
 * @private
 * 将三个通道的数值合成32位色值
 * @param {Number} r [required]
 * @param {Number} g [required]
 * @param {Number} b [required]
 * @param {Number} a [required]
 */
function compound32(r = 0, g = 0, b = 0, a = 0) {
  a = a <= 1 ? a * 255 : a;
  return r << 24 | g << 16 | b << 8 | a;
}

/**
 * 随机颜色值字符串 24位
 * @param type {String} 返回值类型 [optional] 
 * `ColorType.RGB====>"rgb(255,255,255)"`
 * `ColorType.UINT===>"#ffffff"`
 * 
 * @return {String | Number} 颜色值
 */
function randomColorStr24(type = UINT) {
    const r = (Math.random() * 255) >> 0;
    const g = (Math.random() * 255) >> 0;
    const b = (Math.random() * 255) >> 0;
    return type === ColorType.RGB
      ? `rgb(${r}, ${g}, ${b})`
      : `#${Number(r).toString(16)}${Number(g).toString(16)}${Number(b).toString(16)}`;
}

/**
 * 随机颜色值，数值，24位
 * @param {Number} bound [optional] 上边界，最大0xffffff的整数
 */
function randomColorNum24(bound = DEFAULT_COLOR_24) {
  return Math.random() * (safeUint(bound) ? bound : DEFAULT_COLOR_24) ;
}

/**
 * 随机颜色值 32位
 * @param type {String} 返回值类型 [optional] 
 * `ColorType.RGB====>"rgb(255,255,255, 1)"`
 * `ColorType.UINT===>"#ffffffff"`
 * 
 * @return {String} "rgba(255,255,255,1)"
 */
function randomColor32(type = UINT) {
  const r = (Math.random() * 255) >> 0;
  const g = (Math.random() * 255) >> 0;
  const b = (Math.random() * 255) >> 0;
  const a = Math.random();
  const ha = (Math.random() * 255) >> 0;
  return type === ColorType.RGBA
      ? `rgb(${r}, ${g}, ${b}, ${a})`
      : `#${Number(r).toString(16)}${Number(g).toString(16)}${Number(b).toString(16)}${Number(ha).toString(16)}`;
}

/**
 * 随机颜色值，数值，32位
 * @param {Number} bound [optional] 上边界，最大0xffffffff的整数
 */
function randomColorNum32(bound = DEFAULT_COLOR_32) {
  return Math.random() * (safeUint(bound) ? bound : DEFAULT_COLOR_32) ;
}

/**
 * 转换色值表现形式
 * 提供转换"#ffffff"色值到"rgb(255,255,255)"形式
 * @param color {String} [required] 24位色值
 * @return {String} 色值的字符串形式。
 */
function colorToRGB24(color = DEFAULT_HEX) {
  if(typeof color !== 'string' || COLOR_REG.test(color)){
      return DEFAULT_RGB;
  }

  color = parseInt(color.slice(1), 16);
  if (!safeUint(color)) {
    return DEFAULT_RGB;
  }

  const [r, g, b] = separate24(color);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * 转换色值表现形式
 * 提供转换"#ffffffff"色值到"rgb(255,255,255, 1)"形式
 * @param color {String} [required] 24位色值
 * @return {String} 色值的字符串形式。
 */
function colorToRGB32(color = DEFAULT_HEX_32) {
  if(typeof color !== 'string' || COLOR_REG.test(color)){
      return DEFAULT_RGB;
  }

  color = parseInt(color.slice(1), 16);
  if (!safeUint(color)) {
    return DEFAULT_RGB;
  }

  const [r, g, b, ha] = separate32(color);
  const a = ha / 255;
  return `rgb(${r}, ${g}, ${b}, ${a})`;
}

/**
 * 
 * @param {*} color 
 */
function hexToNumber(color = DEFAULT_HEX) {
  if(typeof color !== 'string' || COLOR_REG.test(color)){
    return 0;
  }

  return parseInt(color.slice(1), 16);
}

function rgbToNumber24(color = DEFAULT_RGB) {}

function rgbaToNumber32(color = DEFAULT_RGBA) {}    

export {
  ColorType,
  randomColorStr24,
  randomColorNum24,
  randomColor32,
  randomColorNum32,
  colorToRGB24,
  colorToRGB32,
  hexToNumber,
  rgbToNumber24,
  rgbaToNumber32,
  // separate24,
  // separate32,
  // compound24,
  // compound32
};