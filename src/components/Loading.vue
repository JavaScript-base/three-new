<template>
  <div id="loading-wrap">
    <div class="text">加载资源...</div>
    <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
    <div class="start">开始播放</div>
    </div>
</template>

<script>

</script>


<style>
    #loading-wrap {
        position: absolute;
        width: 100%;
        height: 100%;
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

        #loading-wrap .text {
        font-size: 18px;
        color: white;
        }

        #loading-wrap .start {
        display: none;
        padding: 10px 20px;
        border: aqua solid 1px;
        border-radius: 10px;
        font-size: 18px;
        color: aqua;
        cursor: pointer;
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
        -webkit-transform-origin: right bottom;
        -webkit-animation: load 1s ease infinite;
        }
        .loading span:last-child {
        margin-right: 0px;
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
        -webkit-animation-delay: 0.13s;
        }
        .loading span:nth-child(2) {
        -webkit-animation-delay: 0.26s;
        }
        .loading span:nth-child(3) {
        -webkit-animation-delay: 0.39s;
        }
        .loading span:nth-child(4) {
        -webkit-animation-delay: 0.52s;
        }
        .loading span:nth-child(5) {
        -webkit-animation-delay: 0.65s;
        }
</style>