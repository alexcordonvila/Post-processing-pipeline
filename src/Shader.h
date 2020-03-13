#pragma once

#include "includes.h"
#include <unordered_map>
#include <vector>

//Uniform IDs are global so that we can access them in Graphics System
//Uniforms_count has to be last enum in the list
enum UniformID {
    U_VP,
	U_MVP,
	U_MODEL,
	U_NORMAL_MATRIX,
	U_CAM_POS,
	U_COLOR,
	U_COLOR_MOD,
	U_AMBIENT,
	U_DIFFUSE,
	U_SPECULAR,
	U_SPECULAR_GLOSS,
	U_USE_DIFFUSE_MAP,
	U_DIFFUSE_MAP,
	U_SKYBOX,
	U_USE_REFLECTION_MAP,
	U_NUM_LIGHTS,
	U_SCREEN_TEXTURE,
	U_FLAG,
	U_TIME,
	U_SPEED,
	U_INTENSITY,
	U_BLUR,
	U_MAT_TYPE,
	U_LIGHTS_UBO,
	U_RADIUS,
	U_OPACITY,
	UNIFORMS_COUNT
	
};

//this map allows us to map the uniform string name to our enum ID
const std::unordered_map<std::string, UniformID> uniform_string2id_ = {
	{ "u_vp", U_VP },
    { "u_mvp", U_MVP },
	{ "u_model", U_MODEL },
	{ "u_normal_matrix", U_NORMAL_MATRIX },
	{ "u_cam_pos", U_CAM_POS },
	{ "u_color", U_COLOR },
	{ "u_color_mod", U_COLOR_MOD },
	{ "u_ambient", U_AMBIENT },
	{ "u_diffuse", U_DIFFUSE },
	{ "u_specular", U_SPECULAR },
	{ "u_specular_gloss", U_SPECULAR_GLOSS },
	{ "u_use_diffuse_map", U_USE_DIFFUSE_MAP },
	{ "u_diffuse_map", U_DIFFUSE_MAP },
	{ "u_skybox", U_SKYBOX },
	{ "u_use_reflection_map", U_USE_REFLECTION_MAP },
	{ "u_num_lights", U_NUM_LIGHTS },
	{ "u_screen_texture", U_SCREEN_TEXTURE },
	{ "u_float_flag", U_FLAG },
	{ "u_time", U_TIME },
	{ "u_intensity", U_INTENSITY },
	{ "u_flag_blur", U_BLUR },
	{ "u_mat_type", U_MAT_TYPE },
	{ "u_lights_ubo", U_LIGHTS_UBO },
	{ "u_radius", U_RADIUS },
	{ "u_opacity", U_OPACITY },
	{ "u_speed", U_SPEED }

};


class Shader {
private:
	//stores, for each uniform enum, it's location
	std::vector<GLuint> uniform_locations_;
	void initUniforms_();
    
public:
    GLuint program;
	std::string name;
	Shader();
    Shader(std::string vertSource, std::string fragSource);
    std::string readFile(std::string filename);
	GLuint compileFromStrings(std::string vsh, std::string fsh);
    GLuint makeVertexShader(const char* shaderSource);
    GLuint makeFragmentShader(const char* shaderSource);
    void makeShaderProgram(GLuint vertexShaderID, GLuint fragmentShaderID);
    GLint bindAttribute(const char* attribute_name);
    void saveProgramInfoLog(GLuint obj);
    void saveShaderInfoLog(GLuint obj);
    std::string log;
    
	//
    GLuint getUniformLocation(UniformID name);
    
    bool setUniform(UniformID id, const int data);
    bool setUniform(UniformID id, const float data);
    bool setUniform(UniformID id, const lm::vec3& data);
    bool setUniform(UniformID id, const lm::mat4& data);
	bool setUniformBlock(UniformID id, const int binding_point);
    bool setTexture(UniformID id, GLuint tex_id, GLuint unit);
    bool setTextureCube(UniformID id, GLuint tex_id, GLuint unit);
    
    
};

