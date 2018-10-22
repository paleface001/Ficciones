export default `\
precision mediump float;
struct Wave {
    float freq;  
    float amp; 
    float phase; 
    vec2 dir;
};

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform vec3 cameraPos;

uniform float _WaveLength;
uniform float _Amp;
uniform float _Speed;
uniform vec4 _Dir;
uniform float _Sharpness;
uniform float time;

attribute vec3 position;
attribute vec2 uv;

varying vec4 clippingSpace;
varying vec3 viewDir;
varying vec2 vUv;

const int numWaves = 5;
const float PI = 3.14159265;
const float sharp = 1.0;

float getHeightFromWave(vec2 P, Wave W, float t)
{
    float inner = sin( dot(W.dir, P) * W.freq + W.phase*t);
    return W.amp * inner;
}

Wave createWave(float freq, float amp, float phase, vec2 dir){
    Wave wave;
    wave.freq = freq;
    wave.amp = amp;
    wave.phase = phase;
    wave.dir = dir;
    return wave;
}

void main(){
  vec3 vPosition = position;
  //calculate sin wave
  Wave wave1 = createWave((2.0*PI)/_WaveLength, _Amp, (_Speed * 2.0* PI) / _WaveLength, _Dir.xy);
  Wave wave2 = createWave(1.5 * (2.0*PI)/_WaveLength, _Amp*1.5, (_Speed *0.5 * 2.0 * PI) / _WaveLength, _Dir.yx);
  Wave wave3 = createWave(0.5* (2.0*PI)/_WaveLength, _Amp*5.0, (_Speed *0.1 * 2.0 * PI) / _WaveLength, vec2(0.5, 0.5));
  Wave wave4 = createWave(2.5* (2.0*PI)/_WaveLength, _Amp*0.5, (_Speed *1.5 * 2.0 * PI) / _WaveLength, vec2(-0.4, -0.6));
  Wave wave5 = createWave ( 0.75* (2.0*PI)/_WaveLength, _Amp*0.2, (_Speed *5.0 * 2.0 * PI) / _WaveLength, vec2(-0.2, 0.8) );
  //Wave waves[5] = Wave[5](wave1,wave2,wave3,wave4,wave5);
  Wave waves[5];
  waves[0] = wave1;
  waves[1] = wave2;
  waves[2] = wave3;
  waves[3] = wave4;
  waves[4] = wave5;
   float h = 0.0;
   for(int i = 0; i < numWaves; i++) {
       Wave w = waves[i];
       h += getHeightFromWave(vPosition.xy, w, time);
    }
    //update y position
   vPosition.z = vPosition.z+h;
  vUv = uv;
  vec3 worldPosition=vec3(modelMatrix*vec4(vPosition,1.0));
  viewDir = normalize(cameraPos - worldPosition);
  clippingSpace = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );
  gl_Position = clippingSpace;
}
`;