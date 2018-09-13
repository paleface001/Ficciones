/*坐标系转换 齐次坐标系转笛卡尔坐标系
  params
  @ coord:array 齐次坐标系坐标
  @ width:number 坐标系宽度
  @ height:number 坐标系高度
  output:array 转换生成的笛卡尔坐标系坐标
*/
export function homogeneousToCartesian(coord,width,height){
    const halfW = width/2;
    const halfH = height/2;
    const x = coord[0] - halfW;
    const y = coord[1] - halfH;
    
    return [x,y];
}

/*坐标系转换  笛卡尔坐标系转齐次坐标系
  params
  @ coord:array 笛卡尔坐标系坐标
  @ width:number 坐标系宽度
  @ height:number 坐标系高度
  output:array 转换生成的齐次坐标系坐标
*/
export function cartesianToHomogeneous(coord,width,height){
    const halfW = width/2;
    const halfH = height/2;
    const x = coord[0] + halfW;
    const y = coord[1] + halfH;
    
    return [x,y];
}