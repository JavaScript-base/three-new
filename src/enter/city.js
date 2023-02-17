import { loadFBX } from '../util/index';
import * as Three from 'three';
import { SurroundLine } from '../effect/surroundLine.js'
import { Background } from '../effect/background.js'
import { Tween } from '@tweenjs/tween.js';

export class City {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.tweenRotation = null;
        this.tweenPosition = null;
        this.height = {
            value: 5
        };
        this.loadCity();
    }

    loadCity() {
        // 加载模型并且渲染到画布
        loadFBX('/src/assets/beijing.fbx').then((object) => {
            object.traverse((child) => {
                if(child.isMesh) {
                    // const meterial1= new Three.MeshLambertMaterial({color: '#1b3045'})
                    new SurroundLine(child, this.scene, this.height);
                }
            })
            // this.scene.add(object)
            this.initEffect()
        })
    }

    // 模型上的效果
    initEffect() {
        new Background(this.scene);

        // 添加点击选择
        this.addClick()
    }

    addClick() {
        // 解决点击事件和拖拽的冲突
        let flag = true;
        document.onmousedown = () => {
            flag = true;
            document.onmousemove = () => {
                flag = false;
            }
        }

        document.onmouseup = (event) => {
            if(flag) {
                this.clickEvent(event)
            }
            document.onmousemove = null;
        }

    }

    clickEvent() {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;

        // 创建设备坐标
        const standardVector = new Three.Vector3(x, y, 0.5);

        // 转化为世界坐标
        const worldVector = standardVector.unproject(this.camera);

        // 序列化
        const ray = worldVector.sub(this.camera.position).normalize();

        // 创建射线发射器，用来发射一条射线
        const raycaster = new Three.Raycaster(this.camera.position, ray);

        // 返回射线碰撞到的物体
        const intersects = raycaster.intersectObjects(this.scene.children, true);

        let point3d = null;
        if(intersects.length) {
            point3d = intersects[0]
        }
        if(point3d) {
            const perportion = 3;
            // 开始动画
            const time = 1000;
            this.tweenPosition = new Tween(this.camera.position).to({
                x: point3d.point.x * perportion,
                y: point3d.point.y * perportion,
                z: point3d.point.z * perportion,
            }, time).start();

            this.tweenRotation = new Tween(this.camera.rotation).to({
                x: this.camera.rotation.x,
                y: this.camera.rotation.y,
                z: this.camera.rotation.z,
            }, time).start();
        }
    }

    start() {
        if(this.tweenRotation && this.tweenPosition) {
            this.tweenPosition.update();
            this.tweenRotation.update();
        }
        this.height.value += 0.4;
        if(this.height.value > 160) {
            this.height.value = 5;
        }
    }
}