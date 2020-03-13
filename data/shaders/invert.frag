#version 330

in vec2 v_uv;
uniform sampler2D u_screen_texture;
out vec4 fragColor;
uniform float u_float_flag;
uniform float u_flag_blur;
uniform int u_intensity;

void main(){

vec3 color = texture(u_screen_texture,v_uv).xyz;

	if(u_float_flag == 0.0f){
		
		fragColor = vec4(1-color, 1.0); 
	}		
	
}