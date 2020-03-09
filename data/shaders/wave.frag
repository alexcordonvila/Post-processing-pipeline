#version 330

out vec4 fragColor;
uniform sampler2D u_screen_texture;
uniform float u_num_lights;

in vec2 v_uv;
void main(void) {

vec2 uv = vec2(v_uv.x ,v_uv.y);
uv.x +=   sin(v_uv.y * 4*2*3.14159 + 10*u_num_lights)/100;

//uv.x *= + u_num_lights*10;
vec3 tex = texture(u_screen_texture, uv).xyz;


fragColor = vec4(tex,1);
}

