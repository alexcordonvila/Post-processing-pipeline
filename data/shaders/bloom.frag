#version 330
in vec2 v_uv;
out vec4 fragColor;

uniform sampler2D u_screen_texture;
uniform sampler2D u_tex_albedo;
uniform sampler2D bloom;
uniform sampler2D scene;

uniform bool bloom_flag;
uniform float exposure;

void main(){

	     const float gamma = 2.2;
		 vec3 hdrColor = texture(scene, v_uv).rgb;
		 vec3 bloomColor = texture(bloom,v_uv).rgb;

		 if(bloom_flag){
			hdrColor += bloomColor; //additive blending
		 }

		 //tone mapping
		 vec3 result = vec3(1.0) - exp(-hdrColor * exposure);
		 //gamma correct while we're at it
		 result = pow(result,vec3(1.0/gamma));
		 fragColor = vec4(result,1.0);
		
}