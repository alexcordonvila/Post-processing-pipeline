#version 330

in vec2 v_uv;
uniform sampler2D u_screen_texture;
out vec4 fragColor;

void main(){
vec3 color = texture(u_screen_texture,v_uv).xyz;

	float averege = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
	fragColor = vec4(averege,averege,averege,1.0);
	
	//Blue Filter
	//fragColor = vec4(color.x,color.y,1,1.0);

}