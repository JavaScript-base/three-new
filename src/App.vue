<script setup>
import { ref, onMounted, render, reactive } from "vue";
import { Entity } from "./enter";
import TodoMvc from "./components/vue3demo/TodoMvc.vue";

const state = reactive({
  entity: null,
  value: false})

const options = reactive([
   {name: 'Radar', isChecked: true},
    {name: 'Wall', isChecked: true},
    {name: 'Circle', isChecked: true},
    {name: 'Ball', isChecked: true},
    {name: 'Cone', isChecked: true},
    {name: 'Fly', isChecked: true},
    {name: 'Road', isChecked: true},
    {name: 'Rain', isChecked: false},
    {name: 'Snow', isChecked: false},
])

let loaded = ref(false);

onMounted(async() => {
  // 初始化三维场景
  state.entity = new Entity();

  loaded.value = await state.entity.initCity();

  console.log(loaded.value);

  // const play = document.getElementById("play");

    // function triggerHandler() {
    //    entity.initMusic('/src/assets/tesihe.mp3').then((source) => {
    //     // console.log(source);
    //       // source.start(0);
    //     })
    //     play.removeEventListener('mousedown', triggerHandler)
    // }
    // play.addEventListener('mousedown', triggerHandler);
})

function switchChange(value) {
    state.entity.city.background.init(value ? '/three-new/assets/white-bg.png': '/three-new/black-bg.png');
}

function change(isChecked, name) {
  if(!state.entity) return;
  const index = options.findIndex((i) => i.name === name);
  switch (name) {
    case 'Radar':
      options[index].isChecked ? state.entity.city.initEffectRadar() : state.entity.city.radar.remove();
      break;
    case "Wall":
      options[index].isChecked ? state.entity.city.initEffectWall() : state.entity.city.wall.remove();
      break;
    case "Circle":
      options[index].isChecked ? state.entity.city.initEffectCircle() : state.entity.city.circle.remove();
      break;
    case "Ball":
      options[index].isChecked ? state.entity.city.initEffectBall() : state.entity.city.ball.remove();
      break;
    case "Cone":
      options[index].isChecked ? state.entity.city.initEffectCone() : state.entity.city.cone.remove();
      break;
    case "Fly":
      options[index].isChecked ? state.entity.city.initEffectFly() : state.entity.city.fly.remove();
      break;
    case "Road":
      options[index].isChecked ? state.entity.city.initEffectRoad() : state.entity.city.road.remove();
      break;
    case "Rain":
      options[index].isChecked ? state.entity.city.initEffectRain() : state.entity.city.rain.remove();
      break;
    case "Snow":
      options[index].isChecked ? state.entity.city.initEffectSnow() : state.entity.city.snow.remove();
      break;
    default:
      break;
  }
}

</script>

<template>
  <!-- <TodoMvc /> -->
  <div>
    <canvas id="webgl">浏览器不支持canvas，请切换浏览器重试</canvas>
    <div id="play" v-if="loaded">
      <div class="option-warp">
        <div class="form-group form-check option" v-for="(item,index) in options" key="index">
          <input style="{cursor: point}" type="checkbox" class="form-check-input" id="exampleCheck1" v-model="item.isChecked" @change="change(item.isChecked, item.name)">
          <label class="form-check-label" for="exampleCheck1">{{item.name}}</label>
        </div>
      </div>
      <el-switch
        @change="switchChange"
        v-model="state.value"
        active-text="白天"
        inactive-text="黑夜">
      </el-switch>
    </div>
    <div v-else class="loading-wrap">
      <div>
        <div class="text">加载资源..</div>
        <div class="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #webgl{
    position: absolute;
    z-index: 10;
  }
  #play{
    background: rgba(0,0,0,0.2);
    box-shadow: 0px 1px 0px 0 #333;
    position: absolute;
    /* width: 100%; */
    top: 0;
    height: 40px;
    z-index: 100;
    /* padding: 10px; */
    display: flex;
    color: #ddd;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  #play .option-warp{
    display: flex;
    flex-wrap: wrap;
  }
  .option{
    margin-right: 10px;
  }

.loading-wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: radial-gradient(
      circle farthest-corner at center center,
      #666,
      #b5bdca
    );
  }

.loading-wrap .text {
  font-size: 18px;
  color: white;
}

.loading {
  width: 150px;
  height: 15px;
}
.loading span {
  display: inline-block;
  width: 15px;
  height: 100%;
  margin-right: 5px;
  background: lightgreen;
  transform-origin: right bottom;
  animation: load 1s ease infinite;
  -webkit-transform-origin: right bottom;
  -webkit-animation: load 1s ease infinite;
}
.loading span:last-child {
  margin-right: 0px;
}
@keyframes load {
  0% {
    opacity: 1;
    -webkit-transform: scale(1);
  }
  100% {
    opacity: 0;
    -webkit-transform: rotate(90deg) scale(0.3);
  }
}
@-webkit-keyframes load {
  0% {
    opacity: 1;
    -webkit-transform: scale(1);
  }
  100% {
    opacity: 0;
    -webkit-transform: rotate(90deg) scale(0.3);
  }
}
.loading span:nth-child(1) {
  animation-delay: 0.13s;
  -webkit-animation-delay: 0.13s;
}
.loading span:nth-child(2) {
  -animation-delay: 0.26s;
  -webkit-animation-delay: 0.26s;
}
.loading span:nth-child(3) {
  animation-delay: 0.39s;
  -webkit-animation-delay: 0.39s;
}
.loading span:nth-child(4) {
  animation-delay: 0.52s;
  -webkit-animation-delay: 0.52s;
}
.loading span:nth-child(5) {
  animation-delay: 0.65s;
  -webkit-animation-delay: 0.65s;
}
</style>
