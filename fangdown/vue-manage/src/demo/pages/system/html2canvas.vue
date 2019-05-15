<template>
  <div>
    <!-- <div @click="html2canvas">生成快照</div> -->
    <div @click="html2canvas2">生成canvas</div>
    <div id="result"></div>
    <div class="container" id="container">
      <article class="e-page" style="height: 504px; background-color: rgb(255, 255, 255);"><div class="e-page-bg-image" style="opacity: 1;"></div><div class="e-editable active" data-id="15571321463191" style="transform: rotate(0deg); height: 100px; width: 100px; left: 115px; top: 81px;"><div class="e-cmp cmp-shape" data-id="15571321463191" data-type="shape"><div class="animate-wrapper" data-id="15571321463191"><svg class="shape shape-cmp" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" preserveAspectRatio="none meet" width="100" height="100" x="0" y="0" opacity="1" stroke="#000" stroke-width="0" stroke-dasharray="none" viewBox="0 0 90 90"><path vector-effect="non-scaling-stroke" d="M67.335,50.625 C67.335,50.625 73.125,50.911 73.125,50.911 C82.639,52.289 90.000,60.422 90.000,70.313 C90.000,81.167 81.167,90.000 70.313,90.000 C59.458,90.000 50.625,81.167 50.625,70.313 C50.625,64.803 52.915,59.829 56.580,56.250 C56.580,56.250 33.420,56.250 33.420,56.250 C37.084,59.829 39.375,64.803 39.375,70.313 C39.375,81.167 30.542,90.000 19.687,90.000 C8.833,90.000 -0.000,81.167 -0.000,70.313 C-0.000,59.458 8.833,50.625 19.687,50.625 C20.649,50.625 28.372,50.625 28.372,50.625 C28.372,50.625 78.750,-0.000 78.750,-0.000 C78.750,-0.000 78.750,22.500 78.750,22.500 C78.750,22.500 55.920,45.000 55.920,45.000 C55.920,45.000 61.875,45.000 61.875,45.000 C61.875,45.000 67.335,50.625 67.335,50.625 ZM70.313,78.750 C74.965,78.750 78.750,74.965 78.750,70.313 C78.750,65.660 74.965,61.875 70.313,61.875 C65.660,61.875 61.875,65.660 61.875,70.313 C61.875,74.965 65.660,78.750 70.313,78.750 ZM19.687,61.875 C15.035,61.875 11.250,65.660 11.250,70.313 C11.250,74.965 15.035,78.750 19.687,78.750 C24.340,78.750 28.125,74.965 28.125,70.313 C28.125,65.660 24.340,61.875 19.687,61.875 ZM33.750,39.375 C33.750,39.375 28.125,39.375 28.125,39.375 C28.125,39.375 11.250,22.500 11.250,22.500 C11.250,22.500 11.415,-0.000 11.415,-0.000 C11.415,-0.000 39.375,28.125 39.375,28.125 C39.375,28.125 39.375,33.750 39.375,33.750 C39.375,33.750 33.750,33.750 33.750,33.750 C33.750,33.750 33.750,39.375 33.750,39.375 Z" fill="rgb(254, 213, 23)"></path></svg></div></div><div class="op"><span class="rotate"><span class="icon e-icon icon-recover"></span></span><span class="resize nw" style="cursor: nwse-resize;"></span><span class="resize n" style="cursor: ns-resize;"></span><span class="resize ne" style="cursor: nesw-resize;"></span><span class="resize e" style="cursor: ew-resize;"></span><span class="resize se" style="cursor: nwse-resize;"></span><span class="resize s" style="cursor: ns-resize;"></span><span class="resize sw" style="cursor: nesw-resize;"></span><span class="resize w" style="cursor: ew-resize;"></span></div></div><div class="e-editable" data-id="15571321469022" style="transform: rotate(0deg); height: 100px; width: 100px; left: 113px; top: 331px;"><div class="e-cmp cmp-shape" data-id="15571321469022" data-type="shape"><div class="animate-wrapper" data-id="15571321469022"><svg class="shape shape-cmp" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" preserveAspectRatio="none meet" width="100" height="100" x="0" y="0" opacity="1" stroke="#000" stroke-width="0" stroke-dasharray="none" viewBox="0 0 92 83"><path vector-effect="non-scaling-stroke" d="M88.781,56.324 C88.781,56.324 61.569,8.985 61.569,8.985 C58.339,3.363 52.521,0.005 46.009,-0.001 C46.003,-0.001 45.995,-0.001 45.995,-0.001 C39.487,-0.001 33.667,3.348 30.429,8.964 C30.429,8.964 3.215,56.162 3.215,56.162 C0.003,61.734 0.015,68.384 3.247,73.948 C6.479,79.508 12.269,82.843 18.733,82.861 C18.733,82.861 73.157,83.003 73.157,83.003 C73.175,83.003 73.192,83.003 73.210,83.003 C79.668,83.003 85.458,79.694 88.711,74.145 C91.969,68.578 91.995,61.918 88.781,56.324 ZM78.375,68.163 C77.852,69.052 76.311,71.115 73.210,71.115 C73.204,71.115 73.198,71.115 73.189,71.115 C73.189,71.115 18.765,70.973 18.765,70.973 C15.659,70.964 14.120,68.892 13.603,68.001 C13.086,67.110 12.047,64.750 13.591,62.071 C13.591,62.071 40.807,14.876 40.807,14.876 C42.359,12.180 44.950,11.887 45.995,11.887 C46.885,11.759 49.630,12.171 51.186,14.882 C51.186,14.882 78.398,62.222 78.398,62.222 C79.943,64.910 78.894,67.272 78.375,68.163 ZM51.989,24.565 C51.989,24.565 51.989,46.895 51.989,46.895 C51.989,47.171 51.764,47.394 51.487,47.394 C51.487,47.394 40.532,47.394 40.532,47.394 C40.255,47.394 40.030,47.171 40.030,46.895 C40.030,46.895 40.030,24.565 40.030,24.565 C40.030,24.042 40.456,23.618 40.982,23.618 C40.982,23.618 51.037,23.618 51.037,23.618 C51.563,23.618 51.989,24.042 51.989,24.565 ZM51.989,53.837 C51.989,53.837 51.989,64.727 51.989,64.727 C51.989,65.003 51.764,65.226 51.487,65.226 C51.487,65.226 40.532,65.226 40.532,65.226 C40.255,65.226 40.030,65.003 40.030,64.727 C40.030,64.727 40.030,53.837 40.030,53.837 C40.030,53.561 40.255,53.338 40.532,53.338 C40.532,53.338 51.487,53.338 51.487,53.338 C51.764,53.338 51.989,53.561 51.989,53.837 Z" fill="rgb(254, 213, 23)"></path></svg></div></div></div><div class="e-editable" data-id="15571321568863" style="transform: rotate(0deg); width: 120px; height: 32px; left: 100px; top: 236px;"><div class="e-cmp cmp-btn" data-id="15571321568863" data-type="btn"><div class="animate-wrapper" data-id="15571321568863" style="box-shadow: transparent 5px 5px 10px; border-radius: 0px;"><button class="btn" style="opacity: 1; border-style: solid; border-width: 0px; border-color: rgb(0, 0, 0); color: rgb(255, 255, 255); font-size: 12px; text-align: center; border-radius: 0px; background-color: rgb(33, 147, 255);"><span>生成海报</span></button></div></div></div></article>
    
    </div>
  </div>
</template>
<script>
import html2canvas from "html2canvas";
import { Canvas2Image } from "./canvas2image";
import canvg from "canvg";

export default {
  data() {
    return {};
  },
  mounted() {
    document.documentElement.style = "font-size:100px";
  },
  methods: {
    async html2canvas2(){
      const $page = document.getElementById('container')
      //以下是对svg的处理
      var nodesToRecover = [];
      var nodesToRemove = [];
      var svgElem = Array.from($page.querySelectorAll('svg'));//divReport为需要截取成图片的dom的id
      console.info('svgElem', svgElem)
      svgElem.forEach( node => {
        var parentNode = node.parentNode;
        var svg = node.outerHTML.trim();
        var canvas = document.createElement('canvas');
        canvg(canvas, svg);
        parentNode.removeChild(node);
        parentNode.appendChild(canvas);
      })
      console.log('$page', $page)
      html2canvas($page).then(canvas => {
        document.getElementById("result").appendChild(canvas);
      });
    },
    async html2canvas() {
      var pageContent = document.querySelector(".page-content");
      var pageContentObj = document
        .querySelector(".page-content")
        .getBoundingClientRect();
      var width = pageContentObj.width;
      var height = pageContentObj.height;

      var opts = {
        // scale: scale,
        // canvas: canvas,
        logging: true,
        width: width,
        height: height,
        useCORS: true
      };
      html2canvas(pageContent, opts).then(canvas => {
        document.getElementById("result").appendChild(canvas);
      });
    },
    async tobase64(canvas) {
      const base64 = await canvas.toDataURL();
      console.log("base64", base64);
      return base64;
    }
  }
};
</script>
<style scoped>
.container {
  width: 320px;
  position: relative;
  overflow: hidden;
  height: 618px;
  margin: 0 auto;
}
.app {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  -webkit-tap-highlight-color: transparent;
}
.cmp.cmp-image .image .inner-image {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  outline: 1px solid transparent;
}
.inner-image {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  outline: 1px solid transparent;
}
</style>
