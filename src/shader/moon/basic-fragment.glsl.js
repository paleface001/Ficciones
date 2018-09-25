export default `\
precision mediump float;
uniform bool clipped;
varying float clipDistance;
varying vec3 vColor;
void main(){
    if(clipped == false || clipDistance >= 0.0){
      gl_FragColor = vec4(vColor,1.0);
    }else{
        discard;
    }
}
`;