/**
 * 角度计算相关
 * @author Brave Chan on 2019.1
 * @version 0.0.1
 */
//=================================================================

/**
 * 角度转弧度
 * @param degrees {Number} [required] 角度值（单位：度）
 * @return {Number}
 */
function degreesToRadius(degrees = 0) {
    return degrees * Math.PI / 180;
}

/**
 * 弧度转角度
 * @param radius {Number} [required] 弧度值(单位:弧度)
 * @return {Number}
 */
function radiusToDegrees(radius = 0) {
    return radius * 180 / Math.PI;
}

/**
 * 标准化角度
 * 将一个角度标准化为0-360度之内的角
 * @param degrees {Number} [required] 角度值（单位：度）
 * @return {Number}
 */
function fixAngle(angle = 0) {
    return (angle %= 360 < 0) ? angle + 360 : angle;
}

/**
 * 将一个笛卡尔坐标点转换为极坐标点
 * @param point {{ x: 0, y: 0 }} [required] 点
 * @return {{ r: number, t: number }} {r,t（弧度值）}
 */
function pointToPolar(point = { x: 0, y: 0 }) {
    if (typeof point.x !== 'number' || typeof point.y !== 'number' ) {
        return {r: 0, t: 0};
    }
    return {
        r: Math.sqrt(point.x * point.x + point.y * point.y),
        t: Math.atan2(point.y, point.x)
    };
}

/**
 * 将一个极坐标点转换为笛卡尔坐标点
 * @param polar {{ r: number, t: number }} [required] 极坐标点{r,t(弧度值)}
 * @return {{ x: 0, y: 0 }}
 */
function polarToPoint(polar = {r: 0, t: 0}) {
    if(typeof polar.r !== 'number' || typeof polar.t !== 'number'){
        return { x: 0, y: 0 };
    }
    return {
        x: polar.r * Math.cos(polar.t),
        y: polar.r * Math.sin(polar.t)
    };
}

//=================================================================
export {degreesToRadius, radiusToDegrees, pointToPolar, polarToPoint, fixAngle};