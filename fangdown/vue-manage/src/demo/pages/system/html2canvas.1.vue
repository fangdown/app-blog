<template>
  <div>
    <div @click="html2canvas"> 生成快照</div>
    <div id="result"></div>
    <div class="container" id="container">
      
    </div>
  </div>
</template>
<script>
  import html2canvas from 'html2canvas'
   import { Canvas2Image } from './canvas2image'
   import canvg from 'canvg'

  export default {
    data(){
      return {
        
      }
    },
    mounted () {
        document.documentElement.style = 'font-size:100px'
    },
    methods: {
      async html2canvas () {
        var pageContent = document.querySelector('.page-content')
        var pageContentObj = document.querySelector('.page-content').getBoundingClientRect()
        var width = pageContentObj.width
        var height = pageContentObj.height
      
        var opts = {
            // scale: scale,
            // canvas: canvas,
            logging: true,
            width: width,
            height: height,
            useCORS:true
        };
        html2canvas(pageContent, opts).then( (canvas)  => {
          document.getElementById('result').appendChild(canvas)
        })
      },
      async tobase64(canvas){
        const base64 = await canvas.toDataURL();
        console.log('base64', base64)
        return base64;
      }
    }
  }
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
