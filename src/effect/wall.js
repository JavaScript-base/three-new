import * as Three from 'three';
import { color } from '../config';

export class Wall {
    constructor(sence, time) {
        this.time = time;
        this.sence  = sence;
        this.config = {
            radius: 50,
            height: 50,
            open: true,
            color: color.wall,
            opacity: 0.6
        }
        this.createWall();
    }

    createWall() {
        const geometry = new Three.CylinderGeometry(
            this.config.radius,
            this.config.radius,
            this.config.height,
            32,
            1,
            this.config.open,
        )

        geometry.translate(0, this.config.height/ 2, 0);

        const meterial = new Three.ShaderMaterial({
            uniforms: {
                u_color: {
                    value: new Three.Color(this.config.color)
                },
                u_height: {
                    value: this.config.height
                },
                u_opacity: {
                    value: this.config.opacity
                },
                u_time: this.time
            },
            transparent: true,
            side: Three.DoubleSide,
            depthTest: false,
            vertexShader: `
                uniform float u_time;
                uniform float u_height;
                varying float v_opacity;
                void main() {
                    vec3 v_position = position * mod(u_time, 1.0);
                    v_opacity = mix(1.0, 0.0, position.y / u_height);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(v_position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 u_color;
                uniform float u_opacity;
                varying float v_opacity;

                void main() {
                    gl_FragColor = vec4(u_color, u_opacity * v_opacity);
                }
            `
        })

        const mesh = new Three.Mesh(geometry, meterial);

        mesh.position.set(0, 0, 0);

        this.sence.add(mesh);
    }
}