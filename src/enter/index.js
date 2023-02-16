import * as Three from 'three';

// 场景初始化
export const initCity = () => {
    const canvas = document.getElementById("webgl");

    const scene = new Three.Scene();

    const camera = new Three.PerspectiveCamera(45, window.innerWidth / innerHeight, 1, 1000);
    camera.position.set(0, 0, 10);

    scene.add(camera);

    // 添加环境光
    const ambientLight = new Three.AmbientLight(0xadadad)
    scene.add(ambientLight);
    // 添加平行光
    const directionLight = scene.add(new Three.DirectionalLight(0xffffff));
    directionLight.position.set(0, 0, 0);
    scene.add(directionLight);

    const boxGeo = new Three.BoxGeometry(2,2,2);
    const boxMesh = new Three.MeshLambertMaterial({color: 0xff0000});
    scene.add(new Three.Mesh(boxGeo, boxMesh));

    const renderer = new Three.WebGL1Renderer({ canvas })

    renderer.setSize(window.innerWidth, window.innerHeight)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    renderer.setClearColor(new Three.Color(0x000000), 1)

    renderer.render(scene, camera);

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
}