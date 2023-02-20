import * as Three from 'three'
import { Points } from './points'

export class Rain{
  constructor(scene) {

    this.points = new Points(scene, {
      size: 10,
      opacity: 0.4,
      range: 1000,
      count: 800,
      setAnimation(position) {
        position.y -= position.speedY;

        // 边界检查
        if (position.y <= 0) {
          position.y = this.range / 2;
        }
      },
      setPosition(position) {
        position.speedY = 20
      },
      url: '/three-new/assets/rain.png',
    })
    this.scene = scene;
  }

  remove() {
    if(this.points) this.points.remove();
  }

  animation() {
    this.points.animation();
  }
}