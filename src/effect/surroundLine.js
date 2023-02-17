import * as Three from 'three';
import { color } from '../config/index.js'

export class SurroundLine {
    constructor(child, scene, height) {
        this.child = child;
        this.scene = scene;
        this.height = height;
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

        // 着色器自定义的材质
        const material = new Three.ShaderMaterial({
            uniforms: {
                line_color: {
                    value: new Three.Color(color.buildWrapBoxLine)
                }
            },
            vertexShader: `
                void main() {
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 line_color;
                void main() {
                    gl_FragColor = vec4(line_color, 1.0);
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