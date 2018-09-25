export default `\
precision mediump float;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform vec4 clippingPlane;
uniform vec3 color;
attribute vec3 position;
varying vec3 vColor;
varying float clipDistance;
void main(){
  vColor = color;
  vec4 worldPosition = modelMatrix*vec4(position,1.0);
  clipDistance = dot(worldPosition,clippingPlane);
  gl_Position=projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;