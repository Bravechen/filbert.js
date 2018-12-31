/**
 * 角度转弧度
 * @param degrees {Number} 角度值（单位：度）
 * @return {Number}
 */
function degreesToRadius(degrees = 0) {
    return degrees * Math.PI / 180;
}

/**
 * 弧度转角度
 * @param radius {Number} 弧度值(单位:弧度)
 * @return {Number}
 * **/
function radiusToDegrees(radius) {
    return radius * 180 / Math.PI;
}
/**
 * 标准化角度
 * 将一个角度标准化为0-360度之内的角
 * @return {Number}
 * **/
function fixAngle(angle) {
    return (angle%=360<0)?angle+360:angle;
}
/**
 * 将一个笛卡尔坐标点转换为极坐标点
 * @param point {Point}
 * @return {Object} {r,t（弧度值）}
 * **/
function pointToPolar(point) {
    if(!point||typeof point.x!=="number"||typeof point.y!=="number"){
        return null;
    }
    return {r:Math.sqrt(point.x*point.x+point.y*point.y),t:Math.atan2(point.y,point.x)};
}
/**
 * 将一个极坐标点转换为笛卡尔坐标点
 * @param polar {Object} {r,t(弧度值)}
 * @return {filbert.Point}
 * **/
function polarToPoint(polar) {
    if(!polar || typeof polar.r!=="number" || typeof polar.t!=="number"){
        return null;
    }
    return new filbert.Point(polar.r*Math.cos(polar.t),polar.r*Math.sin(polar.t));
}

export {degreesToRadius, radiusToDegrees, pointToPolar, polarToPoint};