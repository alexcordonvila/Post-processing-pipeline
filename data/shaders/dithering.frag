#version 330
in vec2 v_uv;
out vec4 fragColor;
uniform sampler2D u_screen_texture;
uniform float u_float_flag;
uniform vec3 palette[8];
uniform int paletteSize;
const int indexMatrix4x4[16] = int[](0,  8,  2,  10,
                                     12, 4,  14, 6,
                                     3,  11, 1,  9,
                                     15, 7,  13, 5);

const int indexMatrix8x8[64] = int[](0,  32, 8,  40, 2,  34, 10, 42,
                                     48, 16, 56, 24, 50, 18, 58, 26,
                                     12, 44, 4,  36, 14, 46, 6,  38,
                                     60, 28, 52, 20, 62, 30, 54, 22,
                                     3,  35, 11, 43, 1,  33, 9,  41,
                                     51, 19, 59, 27, 49, 17, 57, 25,
                                     15, 47, 7,  39, 13, 45, 5,  37,
                                     63, 31, 55, 23, 61, 29, 53, 21);

const float lightnessSteps = 4.0;

float indexValue4() {
    int x = int(mod(gl_FragCoord.x, 4));
    int y = int(mod(gl_FragCoord.y, 4));
    return indexMatrix4x4[(x + y * 4)] / 16.0;
}
float indexValue8() {
    int x = int(mod(gl_FragCoord.x, 8));
    int y = int(mod(gl_FragCoord.y, 8));
    return indexMatrix8x8[(x + y * 8)] / 64.0;
}
float hueDistance(float h1, float h2) {
    float diff = abs((h1 - h2));
    return min(abs((1.0 - diff)), diff);
}
float lightnessStep(float l) {
    /* Quantize the lightness to one of `lightnessSteps` values */
    return floor((0.5 + l * lightnessSteps)) / lightnessSteps;
}
vec3[2] closestColors(float hue) {
    vec3 ret[2];
    vec3 closest = vec3(-2, 0, 0);
    vec3 secondClosest = vec3(-2, 0, 0);
    vec3 temp;
    for (int i = 0; i < paletteSize; ++i) {
        temp = palette[i];
        float tempDistance = hueDistance(temp.x, hue);
        if (tempDistance < hueDistance(closest.x, hue)) {
            secondClosest = closest;
            closest = temp;
        } else {
            if (tempDistance < hueDistance(secondClosest.x, hue)) {
                secondClosest = temp;
            }
        }
    }
    ret[0] = closest;
    ret[1] = secondClosest;
    return ret;
}

float dither(float color) {
    float closestColor = (color < 0.5) ? 0 : 1;
    float secondClosestColor = 1 - closestColor;
    float d = indexValue8();
    float distance = abs(closestColor - color);

    return (distance < d) ? closestColor : secondClosestColor;
}
//float dither(float color) {
//	vec3 hsl = texture(u_screen_texture, v_uv).xyz;
//    vec3 colors[2] = closestColors(hsl.x);
//    vec3 closestColor = colors[0];
//	vec3 secondClosestColor = colors[1];
//    float d = indexValue8();
//    float hueDiff = hueDistance(hsl.x, closestColor.x) /
//                    hueDistance(secondClosestColor.x, closestColor.x);
//	 
//	float l1 = lightnessStep(max((hsl.z - 0.125), 0.0));
//    float l2 = lightnessStep(min((hsl.z + 0.124), 1.0));
//    float lightnessDiff = (hsl.z - l1) / (l2 - l1);
//	
//    vec3 resultColor = (hueDiff < d) ? closestColor : secondClosestColor;
//    resultColor.z = (lightnessDiff < d) ? l1 : l2;
//	return resultColor;
//}

void main () {
	u_float_flag;
	vec3 color = texture(u_screen_texture, v_uv).xyz;
	float averege = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;

	if(u_float_flag == 0.0f){
		fragColor = vec4(dither(color.x),dither(color.y),dither(color.z), 1);
	}else{
		fragColor = vec4(dither(averege),dither(averege),dither(averege), 1);
	}
}