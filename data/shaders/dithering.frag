#version 330
//
//out vec4 fragColor;
//uniform sampler2D u_screen_texture;
//uniform float u_num_lights;
//
//in vec2 v_uv;
//void main(void) {
//
//vec2 uv = vec2(v_uv.x ,v_uv.y);
//uv.x +=   sin(v_uv.y * 4*2*3.14159 + 10*u_num_lights)/100;
//
////uv.x *= + u_num_lights*10;
//vec3 tex = texture(u_screen_texture, uv).xyz;
//
//
//fragColor = vec4(tex,1);
//}
//
in vec2 v_uv;
//in float color;

out vec4 fragColor;
uniform sampler2D u_screen_texture;

mat4 mat = mat4(0,  8,  2,  10,
				12, 4,  14, 6,
				3,  11, 1,  9,
				15, 7,  13, 5);

//float indexValue() {
//    int x = int(mod( v_uv.x, 4));
//    int y = int( mod(v_uv.y, 4));
//    //return mat((x + y * 4)) / 16.0;
//	return (mat[x*y*4])/16.0f;
//}

//float dither(float color) {
//    float closestColor = (color < 0.5) ? 0 : 1;
//    float secondClosestColor = 1 - closestColor;
//    float d = indexValue();
//    float distance = abs(closestColor - color);
//    return (distance < d) ? closestColor : secondClosestColor;
//}
//
//void main () {
//    fragColor = vec4(vec3(dither(color)), 1);
//	fragColor = vec4(1,0,0,1);
//}














in vec3 color;
out vec4 frag_color;

uniform vec3 palette[8];
uniform int paletteSize;
bool bw;
const int indexMatrix4x4[16] = int[](0,  8,  2,  10,
                                     12, 4,  14, 6,
                                     3,  11, 1,  9,
                                     15, 7,  13, 5);

float indexValue() {
    int x = int(mod(gl_FragCoord.x, 4));
    int y = int(mod(gl_FragCoord.y, 4));
    return indexMatrix4x4[(x + y * 4)] / 16.0;
}

float hueDistance(float h1, float h2) {
    float diff = abs((h1 - h2));
    return min(abs((1.0 - diff)), diff);
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
    float d = indexValue();
    float distance = abs(closestColor - color);
    return (distance < d) ? closestColor : secondClosestColor;
}

void main () {
bw = true;
vec3 color = texture(u_screen_texture, v_uv).xyz;
	float averege = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
	//fragColor = vec4(averege,averege,averege,1.0);
	if(!bw){
		fragColor = vec4(dither(color.x),dither(color.y),dither(color.z), 1);
	}else{
		fragColor = vec4(dither(averege),dither(averege),dither(averege), 1);
	}
}