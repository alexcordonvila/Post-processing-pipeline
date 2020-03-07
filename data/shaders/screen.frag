#version 330

in vec2 v_uv;
uniform sampler2D u_screen_texture;
out vec4 fragColor;

uniform int screen_width = 600;
uniform int screen_height = 800;
vec3 blur(){

	float dx = 1.0f/screen_width;//step on x
	float dy = 1.0f/screen_height;//step on y
    
	vec3 sum = vec3(0,0,0);
	for(int i = -5; i< 5; i++) 
	   for(int j = -5;j < 5; j++) 
		sum += texture(u_screen_texture, v_uv + vec2(i * dx, j * dy)).rgb;
	return sum/60;

}

void main(){
fragColor = vec4(0.0, 0.0, 0.0, 1.0);
vec3 color = texture(u_screen_texture,v_uv).xyz;

//	float averege = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
	float brigthness = dot(fragColor.rgb, vec3(0.2126, 0.7152, 0.0722));
	//fragColor = vec4(averege,averege,averege,1.0);
	
	//Blue Filter
	vec3 bluredColor = blur();
	if(bluredColor.x != 1 && bluredColor.y != 1 && bluredColor.z != 1){
		fragColor = vec4(blur().x,blur().y,blur().z,1.0);
	}
	//if(fragColor.x == 1.0f &&  fragColor.y == 1.0f && fragColor.z == 1.0f)
    // fragColor = vec4(0.0, 0.0, 0.0, 1.0);
	 
  // else
       //fragColor = vec4(fragColor.rgb, 1.0); 

}