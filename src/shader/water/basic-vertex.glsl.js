export default `\
precision mediump float;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform vec3 cameraPos;
attribute vec3 position;
attribute vec2 uv;
varying vec4 clippingSpace;
varying vec3 viewDir;
varying vec2 vUv;
void main(){
  vUv = uv;
  vec3 worldPosition=vec3(modelMatrix*vec4(position,1.0));
  viewDir = normalize(cameraPos - worldPosition);
  clippingSpace = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  gl_Position = clippingSpace;
}
`;