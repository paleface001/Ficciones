export default `\
precision mediump float;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
attribute vec3 position;
attribute vec2 uv;
varying vec2 vUv;
void main(){
  vUv=uv;
  gl_Position=projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;