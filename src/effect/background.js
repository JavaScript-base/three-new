import * as Three from 'three';


export class Background {
    constructor(scene, url) {
        this.url = url;
        this.scene = scene;
        this.sphere = null;
        this.init(this.url);
    }

    // 创建天空盒
    init(url) {
        this.remove();
        // 创建纹理加载器
        const textureLoader = new Three.TextureLoader();
        const geometry = new Three.SphereGeometry(5000, 32, 32);

        const meterial = new Three.MeshBasicMaterial({
            side: Three.DoubleSide,
            map: textureLoader.load(url)
        })

        this.sphere = new Three.Mesh(geometry, meterial);

        this.sphere.position.copy({x:0, y:0, z:0})

        this.scene.add(this.sphere);
    }

    // 清除mesh
    remove() {
        if(this.sphere && this.scene) {
            this.sphere.geometry.dispose();
            this.scene.remove(this.sphere);
        }
        return;
    }
}