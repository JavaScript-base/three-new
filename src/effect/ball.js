import * as Three from 'three';
import { color } from '../config';

export class Ball {
    constructor(sence, time) {
        this.time = time;
        this.sence  = sence;
        this.createCylinder({
            color: color.ball,
            opacity: 0.6,
            height: 60,
            speed: 3.0,
            position: {
                x: 300,
                y: 0,
                z: -200
            }
        })
    }
    createCylinder(config) {
        const geometry = new Three.SphereGeometry(
            50,
            32,
            32,
            Math.PI / 2,
            Math.PI * 2,
            0,
            Math.PI / 2,
        )

        const meterial = new Three.ShaderMaterial({
            uniforms: {
                u_color: {
                    value: new Three.Color(config.color)
                },
                u_speed: {
                    value: config.speed
                },
                u_height: {
                    value: config.height
                },
                u_opacity: {
                    value: config.opacity
                },
                u_time: this.time
            },
            transparent: true,
            side: Three.DoubleSide,
            depthTest: false,
            vertexShader: `
                uniform float u_time;
                uniform float u_height;
                uniform float u_speed;
                varying float v_opacity;
                void main() {
                    float df = float(u_time / u_speed);
                    vec3 v_position = position * mod(df, 1.0);
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

        mesh.position.copy(config.position);

        this.sence.add(mesh);
    }
}