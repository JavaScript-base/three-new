import * as Three from 'three';
import { color } from '../config/index.js'

export class SurroundLine {
    constructor(child, scene, height, time) {
        this.child = child;
        this.scene = scene;
        this.height = height;
        this.time = time;
        this.createMesh();
        this.createLine();
    }

    computedMesh() {
        this.child.geometry.computeBoundingBox();
        this.child.geometry.computeBoundingSphere();
    }

    createLine() {
        // 获取建筑物的外围
        const buildingWarpBox = new Three.EdgesGeometry(this.child.geometry);
        
        // 创建线条 api
        // const material = new Three.LineBasicMaterial({color: color.buildWrapBoxLine});

        const { max, min } = this.child.geometry.boundingBox;
        // 着色器自定义的材质
        const material = new Three.ShaderMaterial({
            uniforms: {
                // 一个不断变化的值 u_height u_time 
                u_time: this.time,
                // 扫描的位置
                u_max: {
                    value: max
                },
                u_min: {
                    value: min
                },
                live_color: {
                    value: new Three.Color(color.liveColor)
                },
                line_color: {
                    value: new Three.Color(color.buildWrapBoxLine)
                }
            },
            vertexShader: `
                uniform float u_time;
                uniform vec3 live_color;
                uniform vec3 line_color;
                uniform vec3 u_max;
                uniform vec3 u_min;

                varying vec3 v_color;

                void main() { 
                    float new_time = mod(u_time * 0.1, 1.0);
                    // 扫描的位置
                    float rangY = mix(u_min.y, u_max.y, new_time); 
                    if(rangY < position.y && rangY > position.y - 200.0){
                        float f_index = 1.0 - sin((position.y - rangY) / 200.0);
                        float r = mix(live_color.r, line_color.r, f_index);
                        float g = mix(live_color.g, line_color.g, f_index);
                        float b = mix(live_color.b, line_color.b, f_index);

                        v_color = vec3(r,g,b);
                    } else {
                        v_color = line_color;
                    }
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 v_color;
                void main() {
                    gl_FragColor = vec4(v_color, 1.0);
                }
            `
        })

        const line = new Three.LineSegments(buildingWarpBox, material);    

        // 继承建筑物的偏移量和旋转
        line.scale.copy(this.child.scale);
        line.rotation.copy(this.child.rotation);
        line.position.copy(this.child.position);
        this.scene.add(line);
    }

    createMesh() {
        this.computedMesh();
        const { max, min } = this.child.geometry.boundingBox;
        // 高度差
        const size = max.z - min.z;
        const meterial = new Three.ShaderMaterial({
            uniforms: {
                u_height: this.height,
                u_up_color: {
                    value: new Three.Color(color.risingColor)
                },
                u_city_color: {
                    value: new Three.Color(color.mesh)
                },
                u_head_color: {
                    value: new Three.Color(color.head)
                },
                u_size: {
                    value: size
                }
            },
            vertexShader: `
                varying vec3 v_position;
                void main() {
                    v_position = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 v_position;
                uniform vec3 u_up_color;
                uniform float u_height;
                uniform vec3 u_city_color;
                uniform vec3 u_head_color;
                uniform float u_size;
                void main() {
                    vec3 base_color = u_city_color;
                    base_color = mix(base_color, u_head_color, v_position.z / u_size);

                    if (u_height > v_position.z && u_height < v_position.z + 6.0) {
                        float f_index = (u_height - v_position.z) / 4.0;
                        base_color = mix(u_up_color, base_color, abs(f_index - 1.0));
                    }

                    gl_FragColor = vec4(base_color, 1.0);
                }
             `,
             polygonOffset: true,
             polygonOffsetFactor: -1,
             polygonOffsetUnits: -10
        })
        const mesh = new Three.Mesh(this.child.geometry, meterial);
        mesh.position.copy(this.child.position);
        mesh.rotation.copy(this.child.rotation);
        mesh.scale.copy(this.child.scale);
        // mesh.position.x += 1;
        // mesh.position.y += 1;
        // mesh.position.z += 1;
        this.scene.add(mesh);
    }
}