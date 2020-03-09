#version 330

in vec2 v_uv;
uniform sampler2D u_screen_texture;
uniform int uColor;
out vec4 fragColor;

uniform vec3 u_num_lights;

void main(){

vec3 color = texture(u_screen_texture,v_uv).xyz;

//BLACK AND WHITE:
	float averege = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
//fragColor = vec4(averege,averege,averege,1.0);
//Blue Filter
//fragColor = color.x,color.y,1,1.0);
	
	//fragColor = vec4(u_num_lights.x,u_num_lights.y,u_num_lights.z,1.0);	
	fragColor = vec4(u_num_lights.x * color.x,u_num_lights.y * color.y,u_num_lights.z* color.z,1.0);	

}