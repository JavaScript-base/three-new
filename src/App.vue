<script setup>
import { ref, onMounted, render, reactive } from "vue";
import { Entity } from "./enter";
import TodoMvc from "./components/vue3demo/TodoMvc.vue";

const state = reactive({
  entity: null,
  value: true,
  options: [
    {name: 'Radar', isChecked: true},
    {name: 'Wall', isChecked: true},
    {name: 'Circle', isChecked: true},
    {name: 'Ball', isChecked: true},
    {name: 'Cone', isChecked: true},
    {name: 'Fly', isChecked: true},
    {name: 'Road', isChecked: true}
  ]})

onMounted(() => {
  // 初始化三维场景
  state.entity = new Entity();
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
    state.entity.city.background.init(value ? '/src/assets/white-bg.png': '/src/assets/black-bg.png');
}

function change(isChecked, name) {
  if(!state.entity) return;
  const index = state.options.findIndex((i) => i.name === name);
  switch (name) {
    case 'Radar':
      !isChecked ? state.entity.city.initEffectRadar() : state.entity.city.radar.remove();
      state.options[index].isChecked = !state.options[index].isChecked;
      break;
    case "Wall":
      !isChecked ? state.entity.city.initEffectWall() : state.entity.city.wall.remove();
      state.options[index].isChecked = !state.options[index].isChecked;
      break;
    case "Circle":
      !isChecked ? state.entity.city.initEffectCircle() : state.entity.city.circle.remove();
      state.options[index].isChecked = !state.options[index].isChecked;
      break;
    case "Ball":
      debugger;
      !isChecked ? state.entity.city.initEffectBall() : state.entity.city.ball.remove();
      state.options[index].isChecked = !state.options[index].isChecked;
      break;
    case "Cone":
      !isChecked ? state.entity.city.initEffectCone() : state.entity.city.cone.remove();
      state.options[index].isChecked = !state.options[index].isChecked;
      break;
    case "Fly":
      !isChecked ? state.entity.city.initEffectFly() : state.entity.city.fly.remove();
      state.options[index].isChecked = !state.options[index].isChecked;
      break;
    case "Road":
      !isChecked ? state.entity.city.initEffectRoad() : state.entity.city.road.remove();
      state.options[index].isChecked = !state.options[index].isChecked;
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
    <div id="play">
      <div class="option-warp">
        <div class="form-group form-check option" v-for="(item,index) in state.options" key="index">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" checked="item.isChecked" @change="change(item.isChecked, item.name)">
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
  </div>
</template>

<style scoped>
  #webgl{
    position: absolute;
    z-index: 10;
  }
  #play{
    background: #dfdfdf;
    position: absolute;
    width: 100%;
    top: 0;
    height: 40px;
    z-index: 100;
    padding: 10px;
    cursor: pointer;
    display: flex;
    color: #adadad;
    align-items: center;
    justify-content: space-between;
  }
  #play .option-warp{
    display: flex;
  }
  .option{
    margin-right: 10px;
  }
</style>
