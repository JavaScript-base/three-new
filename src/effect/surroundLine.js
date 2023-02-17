import * as Three from 'three';

export class SurroundLine {
    constructor(child, scene) {
        this.child = child;
        this.scene = scene;
        this.render();
    }

    render() {
        const meterial = new Three.ShaderMaterial({
            uniforms: {
                city_color: {
                    value: new Three.Color("#1b3045")
                }
            },
            vertexShader: `
                void main() {
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 city_color;
                void main() {
                    gl_FragColor = vec4(city_color, 1.0);
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