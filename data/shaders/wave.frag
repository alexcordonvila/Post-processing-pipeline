#version 330

//in vec2 v_uv;
//uniform sampler2D u_screen_texture;
//out vec4 fragColor;
//void main(){
//	fragColor = vec4(0.0, 0.0, 0.0, 1.0);
//	vec3 color = texture(u_screen_texture,v_uv).xyz;
//	vec4 black = vec4(0.1,0.1,0.1,1.0f);
//	float averege = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
//	fragColor = vec4(averege,averege,averege,1.0);	
//}


out vec4 fragColor;
uniform sampler2D u_screen_texture;
uniform float u_num_lights;

in vec2 v_uv;
void main(void) {

vec2 uv = vec2(v_uv.x ,v_uv.y);
uv.x +=   sin(v_uv.y * 4*2*3.14159 + 10*u_num_lights)/100;

//uv.x *= + u_num_lights*10;
vec3 tex = texture(u_screen_texture, uv).xyz;


fragColor = vec4(tex,1);
}