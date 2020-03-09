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
	for(int i = -10; i< 10; i++) 
	   for(int j = -10;j < 10; j++) 
		sum += texture(u_screen_texture, v_uv + vec2(i * dx, j * dy)).rgb;
	return sum/100;

}

void main(){
fragColor = vec4(0.0, 0.0, 0.0, 1.0);
vec3 color = texture(u_screen_texture,v_uv).xyz;
vec4 black = vec4(0.1,0.1,0.1,1.0f);
//BLACK AND WHITE:
//	float averege = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
//fragColor = vec4(averege,averege,averege,1.0);
//Blue Filter
//fragColor = color.x,color.y,1,1.0);
	
	//vec4 bluredColor = vec4(blur().x*black.x,blur().y*black.z,blur().z*black.z,1);
	//bluredColor += bluredColor * black;
	//if(bluredColor.x != 1 && bluredColor.y != 1 && bluredColor.z != 1){
		fragColor = vec4(blur().x,blur().y,blur().z,1.0);
	//}



	if(fragColor.x > 0.99f &&  fragColor.y > 0.99f  && fragColor.z > 0.99f  && fragColor.a > 0.5)
		// fragColor = vec4(0.0, 0.0, 0.0, 1.0);
		fragColor = vec4(1.0, 1.0, 1.0, 1.0);
	else
      fragColor = vec4(fragColor.x,fragColor.y,fragColor.z, 1.0); 
	     
		
}