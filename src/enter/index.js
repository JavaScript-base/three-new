import * as Three from 'three';
import { City } from './city';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 场景初始化
export const initCity = () => {
    const canvas = document.getElementById("webgl");

    const scene = new Three.Scene();

    const camera = new Three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 100000);
    camera.position.set(1000, 500, 100);

    scene.add(camera);

    // 添加相机控件
    const orbitControls = new OrbitControls(camera, canvas);

    // 设置属性
    // 是否有惯性
    orbitControls.enableDamping = true;
    orbitControls.enableZoom = true;
    orbitControls.minDistance = 100;
    orbitControls.maxDistance = 2000;

    // 添加环境光
    const ambientLight = new Three.AmbientLight(0xadadad)
    scene.add(ambientLight);
    // 添加平行光
    const directionLight = new Three.DirectionalLight(0xffffff);
    directionLight.position.set(0, 0, 0);
    scene.add(directionLight);

    // const boxGeo = new Three.BoxGeometry(1,1,1);
    // const boxMesh = new Three.MeshLambertMaterial({color: 0xff0000});
    // scene.add(new Three.Mesh(boxGeo, boxMesh));

    const renderer = new Three.WebGLRenderer({ canvas })

    renderer.setSize(window.innerWidth, window.innerHeight)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    renderer.setClearColor(new Three.Color(0x000000), 1)

    const axesHelper = new Three.AxesHelper( 1000 );
    scene.add( axesHelper );

    const city = new City(scene, camera);

    const clock = new Three.Clock();

    const start = () => {
        city.start(clock.getDelta());
        orbitControls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(start);
    }

    start()


    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
}