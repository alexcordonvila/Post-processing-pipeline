#version 330


in vec2 v_uv;
uniform sampler2D u_screen_texture;
out vec4 fragColor;


//"in" attributes from our vertex shader
 vec4 vColor;
//RADIUS of our vignette, where 0.5 results in a circle fitting the screen
 uniform float u_radius;
//softness of our vignette, between 0.0 and 1.0
uniform float u_intensity;//softness
uniform float u_opacity;
//sepia colour, adjust to taste
 uniform vec3 SEPIA = vec3(1.2, 1.0, 0.8); 


void main(){

//VIGNETTE
	//sample our texture
	vec4 texColor = texture(u_screen_texture, v_uv);
	//determine center position
	vec2 position = (v_uv.xy)-vec2(0.5,0.5);
	//determine the vector length of the center position
	float len = length(position);
	//use smoothstep to create a smooth vignette
	float vignette = smoothstep(u_radius, u_radius-u_intensity, len);
	
	//apply the vignette with 50% opacity
	texColor.rgb = mix(texColor.rgb, texColor.rgb * vignette, u_opacity);

	//2. GRAYSCALE
	//convert to grayscale using NTSC conversion weights
	float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
	//3. SEPIA
	//create our sepia tone from some constant value
	vec3 sepiaColor = vec3(gray) * SEPIA;
		
	//again we'll use mix so that the sepia effect is at 75%
	texColor.rgb = mix(texColor.rgb, sepiaColor, 0.75);
		
	//final colour
	fragColor = vec4(texColor.rgb, 1.0); 
 
}


