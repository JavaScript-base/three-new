import * as Three from 'three';


export class Background {
    constructor(scene) {
        this.url = "../../src/assets/black-bg.png";
        this.scene = scene;
        this.init()
    }

    // 创建天空盒
    init() {
        // 创建纹理加载器
        const textureLoader = new Three.TextureLoader();
        const geometry = new Three.SphereGeometry(5000, 32, 32);

        const meterial = new Three.MeshBasicMaterial({
            side: Three.DoubleSide,
            map: textureLoader.load(this.url)
        })

        const sphere = new Three.Mesh(geometry, meterial);

        sphere.position.copy({x:0, y:0, z:0})

        this.scene.add(sphere);
    }
}