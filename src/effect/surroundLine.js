import * as Three from 'three';
import { color } from '../config/index.js'

export class SurroundLine {
    constructor(child, scene) {
        this.child = child;
        this.scene = scene;

        // 底部模型颜色
        this.meshColor = color.mesh;
        // 顶部颜色
        this.headColor = color.head;
        this.render();
    }

    computedMesh() {
        this.child.geometry.computeBoundingBox();
        this.child.geometry.computeBoundingSphere();
    }

    render() {
        this.computedMesh();
        const { max, min } = this.child.geometry.boundingBox;
        // 高度差
        const size = max.z - min.z;
        const meterial = new Three.ShaderMaterial({
            uniforms: {
                u_city_color: {
                    value: new Three.Color(this.meshColor)
                },
                u_head_color: {
                    value: new Three.Color(this.headColor)
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

                uniform vec3 u_city_color;
                uniform vec3 u_head_color;
                uniform float u_size;
                void main() {
                    vec3 base_color = u_city_color;
                    base_color = mix(base_color, u_head_color, v_position.z / u_size);

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