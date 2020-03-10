#version 330

out vec4 fragColor;
uniform sampler2D u_screen_texture;
uniform float u_time;
uniform float u_float_flag;
uniform float u_speed;

in vec2 v_uv;
void main(void) {

vec2 uv = vec2(v_uv.x ,v_uv.y);
if(u_float_flag == 1.0f){
uv.x +=   sin(v_uv.y * 4*2*3.14159 + u_speed * u_time) / 100;
}

//uv.y +=   sin(v_uv.x * 4*2*3.14159 + u_time) / 100;

vec3 tex = texture(u_screen_texture, uv).xyz;


fragColor = vec4(tex,1);
}

