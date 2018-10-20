export default `\
precision mediump float;

#define numWaves 5
#define PI 3.14159265
#define sharp 1

struct Wave {
    float freq;  
    float amp; 
    float phase; 
    float2 dir;
};

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform vec3 cameraPos;

uniform float _WaveLength;
uniform float _Amp;
uniform float _Speed;
uniform float4 _Dir;
uniform float _Sharpness;
uniform float time;

attribute vec3 position;
attribute vec2 uv;

varying vec4 clippingSpace;
varying vec3 viewDir;
varying vec2 vUv;

float getHeightFromWave(float2 P, Wave W, float t)
{
    float inner = sin( dot(W.dir, P) * W.freq + W.phase*t);
    return W.amp * sin( dot(W.dir, P) * W.freq + W.phase*t);
}

void main(){
  //calculate sin wave
  Wave waves[5] = {
    {(2*PI)/_WaveLength, _Amp, (_Speed * 2 * PI) / _WaveLength, _Dir.xy},
    {1.5 * (2*PI)/_WaveLength, _Amp*1.5, (_Speed *0.5 * 2 * PI) / _WaveLength, _Dir.yx},
    {0.5* (2*PI)/_WaveLength, _Amp*5, (_Speed *0.1 * 2 * PI) / _WaveLength, float2(0.5, 0.5)},
    {2.5* (2*PI)/_WaveLength, _Amp*0.5, (_Speed *1.5 * 2 * PI) / _WaveLength, float2(-0.4, -0.6)},
    {0.75* (2*PI)/_WaveLength, _Amp*0.2, (_Speed *5 * 2 * PI) / _WaveLength, float2(-0.2, 0.8)}
   };
   float h = 0.0f;
   for(int i = 0; i < numWaves; i++) {
       Wave w = waves[i];
       h += getHeightFromWave(p, w, time);
    }
    //update y position
    position.y += h;

  vUv = uv;
  vec3 worldPosition=vec3(modelMatrix*vec4(position,1.0));
  viewDir = normalize(cameraPos - worldPosition);
  clippingSpace = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  gl_Position = clippingSpace;
}
`;