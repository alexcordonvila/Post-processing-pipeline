#version 330


in vec2 v_uv;
uniform sampler2D u_screen_texture;
uniform float u_intensity;
out vec4 fragColor;
uniform float scale = 1.0;
uniform float u_time;
uniform int u_speed;

void main(){
	vec3 color = texture(u_screen_texture,v_uv).xyz;
	
	if (mod(floor( (u_speed * u_time) + v_uv.y * 600 / u_intensity), 2.0) == 0.0)
        fragColor = vec4(0.0, 0.0, 0.0, 1.0);
    else
        fragColor = vec4(color, 1.0); 
}


