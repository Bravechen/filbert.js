/**
 * 按一定数量获取一条2次贝塞尔曲线上的所有点
 * @param startPoint {Point} [必须] 起始点对象,需要符合IPoint接口
 * @param endPoint {Point} [必须] 结束点对象,需要符合IPoint接口
 * @param controlPoint [可选] 控制点对象,需要符合IPoint接口
 * @param length {Number} [可选] 数量
 *
 * @return {Array} 符合IBezierPoint接口的点集合
 * **/
function twoPowerBezier(startPoint, endPoint, controlPoint, length){
  if(!(startPoint&&endPoint))
      return ["startPoint is null or that endPoint is null."];
  if(typeof startPoint.x!=="number" || typeof startPoint.y!=="number" || typeof endPoint.x!=="number" || typeof endPoint.y!=="number"){
      return [
              "startPoint.x:"+(typeof startPoint.x),
              "startPoint.y:"+(typeof startPoint.y),
              "endPoint.x:"+(typeof endPoint.x),
              "endPoint.y:"+(typeof endPoint.y)
      ]
  }
  if(!controlPoint || typeof controlPoint.x!=="number" || typeof controlPoint.y!="number"){
      controlPoint = new filbert.Point(endPoint.x*1.1,startPoint.y*1.1);
  }
  if(typeof length!=="number" || length===0){
      length = 10;
  }

  var list = [];

  var p0 = {};
  p0.x = startPoint.x;
  p0.y = startPoint.y;

  var p1 = {x:0,y:0,fAngle:0,bAngle:0};  //IBezierPoint
  p1.x = endPoint.x;
  p1.y = endPoint.y;

  var cp = controlPoint;

  var dt = 1/length,t = 0,rt,bp,preBp;
  while(length--&&t<1){
      bp = {x:0,y:0,fAngle:0,bAngle:0};  //IBezierPoint
      rt = 1-t;
      bp.x = rt * rt * p0.x + 2 * rt * t * cp.x + t * t * p1.x;
      bp.y = rt * rt * p0.y + 2 * rt * t * cp.y + t * t * p1.y;
      list.push(bp);
      if(preBp){
          preBp.fAngle = Math.atan2(bp.y-preBp.y,bp.x-preBp.x)*180/Math.PI;
          preBp.bAngle = 180 + preBp.fAngle;
      }
      preBp = bp;
      t+=dt;
  }
  preBp = list[list.length-2];
  bp.fAngle = preBp.fAngle;
  bp.bAngle = preBp.bAngle;
  list.push(p1);
  p1.fAngle = bp.fAngle;
  p1.bAngle = bp.bAngle;
  return list;
}
/**
 * 使用给定的点和控制点绘制2次贝塞尔曲线
 * @param list {Array} [必须] 点集合
 * @param isClosed {Boolean} [必须] 是否闭合
 * @param perStep {Number} [必须] 每段线条的点数量
 *
 * @return {Array} 点集合
 */
function twoPowerBezierLine(list,isClosed,perStep) {
  if(!(list&&list.length>0))
      return ["list is null or that list.length equal 0."];
  if(typeof isClosed!=="boolean"){
      isClosed = false;
  }
  if(typeof perStep!=="number"){
      perStep = 50;
  }
  var bList=[],p0,p1,cp;
  for(var i=0,len=list.length;i<len;i++){
      if(!isClosed && i==len-1)
          break;
      p0 = list[i];
      p1 = (isClosed && i==len-1)?list[0]:list[i+1];
      cp = (i==0)?{x:p1.x*1.1,y:p0.y*1.1}:{x:2*p0.x - cp.x,y:2*p0.y - cp.y};
      var tList = twoPowerBezier(p0, p1, cp, perStep);
      bList = bList.concat(tList);
  }
  return bList;
}