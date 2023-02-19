import { loadFBX } from '../util/index';
import * as Three from 'three';
import { SurroundLine } from '../effect/surroundLine.js'
import { Background } from '../effect/background.js'
import { Tween } from '@tweenjs/tween.js';
import { Radar } from '../effect/index';
import { Wall } from "../effect/wall.js";
import { Circle } from '../effect/circle';
import { Ball } from '../effect/ball';
import { Cone } from '../effect/cone';
import { Fly } from '../effect/fly';
import { Road } from '../effect/road';

export class City {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.tweenRotation = null;
        this.tweenPosition = null;
        this.background = null;
        this.radar = null;
        this.wall = null;
        this.ball = null;
        this.circle = null;
        this.cone = null;
        this.fly = null;
        this.road = null;

        this.beattime = {
            value: []
        };
        this.height = {
            value: 5
        };
        this.time = {
            value: 0
        };

        this.flag = false;

        this.top = {
            value: 0
        }
        this.loadCity();
        this.meshList = [];
        this.lineList = [];
    }

    loadCity() {
        // 加载模型并且渲染到画布
        loadFBX('/src/assets/beijing.fbx').then((object) => {
            object.traverse((child) => {
                if(child.isMesh) {
                    // const meterial1= new Three.MeshLambertMaterial({color: '#1b3045'})
                    new SurroundLine(child, this.scene, this.height, this.time);
                }
            })
            this.initEffectBackground('/src/assets/black-bg.png')
            this.initEffectRadar()
            this.initEffectWall()
            this.initEffectBall()
            this.initEffectCircle()
            this.initEffectCone()
            this.initEffectFly()
            this.initEffectRoad()
            this.addClick();
        })
    }



    // 模型上的效果
    initEffectBackground(url) {
        this.background = new Background(this.scene, url);
    }
    initEffectRadar() {
        this.radar = new Radar(this.scene, this.time);
    }
    initEffectWall() {
        this.wall = new Wall(this.scene, this.time);
    }
    initEffectBall() {
        this.ball = new Ball(this.scene, this.time);
    }
    initEffectCircle() {
        this.circle = new Circle(this.scene, this.time);
    }
    initEffectCone() {
        this.cone = new Cone(this.scene, this.top, this.height);
    }
    initEffectFly() {
        this.fly = new Fly(this.scene, this.time);
    }
    initEffectRoad() {
        this.road = new Road(this.scene, this.time);
    }

    addClick() {
        // 解决点击事件和拖拽的冲突
        const canvas = document.getElementById("webgl")
        let flag = true;
        canvas.onmousedown = () => {
            flag = true;
            document.onmousemove = () => {
                flag = false;
            }
        }

        canvas.onmouseup = (event) => {
            if(flag) {
                this.clickEvent(event)
            }
            canvas.onmousemove = null;
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

    start(delta) {
        if(this.tweenRotation && this.tweenPosition) {
            this.tweenPosition.update();
            this.tweenRotation.update();
        }
        this.height.value += 0.4;

        // let STEP = 50;
        // const averageFrequencyData = [];
        // for (let i = 0; i< frequencyData.length; i += STEP) {
        //     let sum = 0;
        //     for(let j = i; j < i + STEP; j++) {
        //         sum += frequencyData[j];
        //     }
        //     averageFrequencyData.push(sum / STEP);
        // }
       
        // this.beattime.value = averageFrequencyData;

    //    if(this.meshList.length > 0) {
    //         this.meshList.forEach((item, index) => {
    //             item.position.y = Math.floor(averageFrequencyData[index]);
    //             item.position.y = Math.floor(averageFrequencyData[index]);
    //         })
    //         this.lineList.forEach((item, index) => {
    //             item.position.y = Math.floor(averageFrequencyData[index]);
    //             item.position.y = Math.floor(averageFrequencyData[index]);
    //         })
    //    }

        this.time.value += delta;
        if(this.top.value > 15 || this.top.value < 0) {
            this.flag = !this.flag
        }
        this.top.value += this.flag ? 0.8 : -0.8;

        if(this.height.value > 160) {
            this.height.value = 5;
        }
    }
}