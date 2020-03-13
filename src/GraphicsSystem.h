//
//  Copyright � 2018 Alun Evans. All rights reserved.
//
#pragma once
#include "includes.h"
#include "Shader.h"
#include "Components.h"
#include "GraphicsUtilities.h"
#include <unordered_map>



class GraphicsSystem {
public:
	~GraphicsSystem();
    void init(int window_width, int window_height, std::string assets);
    void lateInit();
    void update(float dt);
    
	//viewport
	void updateMainViewport(int window_width, int window_height);
    void getMainViewport(int& width, int& height);
	lm::vec4 screen_background_color;

    //shader loader
	Shader* loadShader(std::string vs_path, std::string fs_path, bool compile_direct = false);

    //set the environment
    void setEnvironment(GLuint tex_id, int geom_id, GLuint program);
    
	//materials
    int createMaterial();
	Material& getMaterial(int mat_id) { return materials_.at(mat_id); }
    
    //geometry
    int createGeometryFromFile(std::string filename);

	//lights update
	bool needUpdateLights = true;
    
private:
    //resources
    std::string assets_folder_;
	std::unordered_map<GLint, Shader*> shaders_; //compiled id, pointer
    std::vector<Geometry> geometries_;
    std::vector<Material> materials_;

    //viewport
    int viewport_width_, viewport_height_;
    
	//shader stuff
	Shader* shader_ = nullptr; //current shader
	Shader* bloom_shader_ = nullptr;
	Shader* wave_shader_ = nullptr;
	Shader* tint_shader_ = nullptr;
	Shader* dithering_shader_ = nullptr;
	Shader* invert_shader_ = nullptr;
	Shader* scan_shader_ = nullptr;
	Shader* vignette_shader_ = nullptr;
	Shader* chrom_aberration_shader_ = nullptr;

	float time = 0; //acum delta time
	lm::vec3 color_var; //used in color picker
	float color_value[3] = { 0, 0, 0 };
	int shader_selector = 1;
	bool bw_flag_ = false;
	bool blur_flag_ = false;
	bool wave_flag_ = true;
	float wave_speed_ = 1;
	int scan_speed = 0;
	int scan_intensity_ = 1;
	int intesity_ = 2;
	float radius_ = 0.75f;
	float softness_ = 0.5;
	float opacity_ = 0.5;

	int mat_type_ = 0;
	void useShader(Shader* s);
	void useShader(GLuint p);

	//materials stuff
    GLint current_material_ = -1;
    void setMaterialUniforms();

	//sorting and checking and abstracting
	void sortMeshes_();
	void resetShaderAndMaterial_();
	void updateAllCameras_();
	void checkShaderAndMaterial(Mesh& mesh);
	
	//binding and clearing
	void bindAndClearScreen_();

	//light uniform buffer object
	GLuint LIGHTS_BINDING_POINT = 1;
	GLuint light_ubo_;
	void updateLights_();
    
    //cubemap/environment
    int cube_map_geom_ = -1;
    GLuint environment_program_ = 0;
    GLuint environment_tex_ = 0;
    
    //rendering
    void renderMeshComponent_(Mesh& comp);
    void renderEnvironment_();
    
	//AABB
	void setGeometryAABB_(Geometry& geom, std::vector<GLfloat>& vertices);
	AABB transformAABB_(const AABB& aabb, const lm::mat4& transform);
	bool BBInFrustum_(const AABB& aabb, const lm::mat4& model_view_projection);
	bool AABBInFrustum_(const AABB& aabb, const lm::mat4& view_projection);

	//frambuffer
	Shader* screen_space_shader_;
	int screen_space_geom_;
	GLuint temp_texture_;
	Framebuffer frame_;
};
