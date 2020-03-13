#version 330

in vec2 v_uv;
uniform sampler2D u_screen_texture;
out vec4 fragColor;
uniform float u_float_flag;
uniform float u_flag_blur;
uniform int u_intensity;
uniform int screen_width = 600;
uniform int screen_height = 800;


vec3 blur(int limit){

	float dx = 1.0f/screen_width;//step on x
	float dy = 1.0f/screen_height;//step on y
    
	vec3 sum = vec3(0,0,0);
	for(int i = -limit; i< limit; i++) 
	   for(int j = -limit;j < limit; j++) 
		sum += texture(u_screen_texture, v_uv + vec2(i * dx, j * dy)).rgb;
	return sum/(limit*10);

}

void main(){

vec3 color = texture(u_screen_texture,v_uv).xyz;

	if(u_float_flag == 0.0f){
		if(u_flag_blur == 1.0f){
		fragColor = vec4(blur(u_intensity).x,blur(u_intensity).y,blur(u_intensity).z,1.0);
		}else{
			fragColor = vec4(color, 1.0); 
		}
	}else{
		float averege = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
		fragColor = vec4(averege,averege,averege, 1.0); 
	}		
	
}