#version 330

in vec2 v_uv;
uniform sampler2D u_screen_texture;
out vec4 fragColor;
//"in" attributes from our vertex shader
 vec4 vColor;
//RADIUS = 0.1
 uniform float u_radius = 0.1;
//INTENSITY = 0.75
uniform float u_intensity = 0.75;//softness
//OPACITY = 0.05
uniform float u_opacity = 0.05;

void main(){
vec3 color = texture(u_screen_texture,v_uv).xyz;
//sample our texture
	vec4 texColor = texture(u_screen_texture, v_uv);
	//determine center position
	vec2 fromCenter  = (v_uv.xy)-vec2(0.5,0.5);
	//determine the vector length of the center position
	float dist = length(fromCenter);
	//use smoothstep to create a smooth vignette
	float vignette = 1.0 - smoothstep(u_radius, u_radius-u_intensity, dist);
	
	float rOffset =   fromCenter.x * vignette * u_opacity;

	float bOffset = -rOffset;
	float r = dot(vec3(texture(u_screen_texture, v_uv + rOffset )), vec3(1.0f, 0.0f, 0.0f));
	float g = dot(vec3(texture(u_screen_texture, v_uv )), vec3(0.0f, 1.0f, 0.0f));
	float b = dot(vec3(texture(u_screen_texture, v_uv + bOffset )), vec3(0.0f, 0.0f, 1.0f));

	fragColor = vec4(r,g,b,1);
}