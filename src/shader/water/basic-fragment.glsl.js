export default `\
precision mediump float;
uniform sampler2D reflectionTexture;
uniform sampler2D refractionTexture;
uniform float near;
uniform float far;
varying vec4 clippingSpace;
varying vec3 viewDir;
varying vec2 vUv;

const vec4 waterColor = vec4(0.604, 0.867, 0.851,1.0);
const float fresnelReflective = 0.5;
const float minBlueness = 0.4;
const float maxBlueness = 0.8;
const float murkyDepth = 14.0;

vec2 clipSpaceToTexCoords(vec4 clipSpace){
	vec2 ndc = (clipSpace.xy / clipSpace.w);
    vec2 texCoords = ndc / 2.0 + 0.5;
    return clamp(texCoords, 0.002, 0.998);
}

float calculateFresnel(){
	vec3 normal = normalize(vec3(0,1,0));
	float refractiveFactor = dot(viewDir, normal);
	refractiveFactor = pow(refractiveFactor, fresnelReflective);
	return clamp(refractiveFactor, 0.0, 1.0);
}

float LinearizeDepth(float depth) {
    float z = depth * 2.0 - 1.0;  
    return (2.0 * near * far) / (far + near - z * (far - near));  
}

vec4 applyMurkiness(vec4 refractColour, float waterDepth){
	float murkyFactor = clamp(waterDepth / murkyDepth, 0.0, 1.0);
	float murkiness = minBlueness + murkyFactor * (maxBlueness - minBlueness);
	return mix(refractColour, waterColor, murkiness);
}


void main(){
    vec2 globalUV = clipSpaceToTexCoords(clippingSpace);
    vec4 reflectionColor = texture2D(reflectionTexture,vec2(globalUV.x,1.0-globalUV.y)).rgba;
    vec4 refractionColor = texture2D(refractionTexture,vec2(globalUV.x,globalUV.y)).rgba;
    //blueness
    reflectionColor = mix(reflectionColor, waterColor, minBlueness);
    float waterDepth= 1.0-LinearizeDepth(gl_FragCoord.z) / far;
    refractionColor = applyMurkiness(refractionColor, waterDepth);

    gl_FragColor = mix(reflectionColor,refractionColor,calculateFresnel());
}
`;