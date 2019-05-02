<template>
  <div>
    <!-- <div id="capture" style="padding: 10px; background: #f5da55">
        <h4 style="color: #000; ">Hello world!</h4>
    </div> -->
    <div @click="html2canvas"> 生成快照</div>
    <div id="result"></div>
    <div class="container" id="container">
      <section class="app">
        <ul class="page-list" data-curr-page="0"><li class="page-item" data-index="1" data-id="6d3446b0-30e5-4e10-a059-bfcef908857a" style=""><div class="scroll-wrapper" style="height: 100%; background-color: rgb(255, 255, 255);"><div class="e-page-bg-image" style="opacity: 1; height: 100%; display: block;"><img src="./3.webp" style="width: 100%; height: 100%; object-fit: cover;"></div><div class="page-content" style="width: 3.2rem; height: 5.04rem;"><div class="cmp cmp-image" data-id="155607746444123" data-type="image" style="top: 4.34rem; left: 0rem; width: 3.2rem; height: 0.699733rem; position: absolute;"><div class="animate-wrapper" data-id="155607746444123" style="box-shadow: transparent 0rem 0rem 0.1rem; border-radius: 0rem;"><div class="image" style="border-color: rgb(0, 0, 0); border-radius: 0rem; border-width: 0rem; opacity: 1; border-style: solid;"><img class="inner-image" src="./3.webp"></div></div></div><div class="cmp cmp-wxnickname" data-id="155607746444121" data-type="wxnickname" style="top: 4.63rem; left: 0.58rem; width: 1.2032rem; position: absolute;"><div class="animate-wrapper" data-id="155607746444121" style="border-radius: 0rem;"></div></div><div class="cmp cmp-wxportrait" data-id="155607746444122" data-type="wxportrait" style="top: 4.5rem; left: 0.15rem; width: 0.384rem; height: 0.384rem; position: absolute;"><div class="animate-wrapper" data-id="155607746444122"><div class=""></div></div></div><div class="cmp cmp-posterQrCode" data-id="155607746444224" data-type="posterQrCode" style="top: 4.33rem; left: 2.46rem; width: 0.699733rem; height: 0.699733rem; position: absolute;"><div class="animate-wrapper" data-id="155607746444224"><div class="poster-qrcode"><div class="qrcode" style="position: relative;"><canvas width="77" height="77" style="display: none;"></canvas><img alt="Scan me!" draggable="false" style="display: block;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE0AAABNCAYAAADjCemwAAAFe0lEQVR4Xu2c63bbMAyDk/d/6Oy4jX1omQQ+ymu7i/pra2xdIBAEaafPx+PxejR/Xq/PW57P5yP+Oxum+nz/fXbPNu72M17jfp/ds4+/37v/361bQbKt7qU2EG+uFr0DGK8dF6UAqDY0bliNOa7NAezWpw5zgVawGoM2nnhF5Sw8K1Z02OKuHTeShVhXDiIj6f5PTKM3LdCCps2A1swh6eWVpna1Lmor1awfYdoC7S2KTjtots1Ofhw7Y/cM86rsOepyNf82J420W5pGWKZsSmZVZryWCssvB82BkJ1mpR3OTJJk4tYTGVmxpBqDal7mU2/5tKwicClfAV+5d7fxirEK9NuguRNVGueYRj53bp58TuYhYUyw+GAauTBeo2rPmcUTUKLWzciEW1cHgycuPJNRY3iSrDgL/CjmLlMSADoO4LK3BRqB+HzNB9NoeGTD0xPrsIMmk4q5mW0h89N50+xJyxfiqZyWKNtATW6md5U/cwaWZOIF2hvdjudLw3P0S8TTOPoT1ozXONmI66zudR6vY4oPHDJNW6DlUB+gxXZ352R3HSEaQU0lYaPLdY5xag7K9LRgd+HY6UE51mYZsOv51BguqZEQH/E4mVvHmqxjQRelGFJ1QmY6JOM8LnvP2JYFWkCNRhjKnpXnyTzNjNmlbHWMJL5R7cXp5RHKJHsu0M5wovB0Xoe4aDJGlQCcLm2fO79FQy+ytXITC7T3SUXQ3SG1OreVfVBMc94nsotoVsaE6ndUo5QWZmMs0N6o0AT2QRDST3N68bsMqqsIlC45j6miZI8UF5an7OlovED7fPVLgkZPLWoZpbfyZK72VZrXrTnJOioyIXOrOpp3NuoYTm1Cp5Gp1ksT0QItvJ+GQctaQ2MFoApnN5ELW+KPRhEfGRrNbRUV1Z5IEhvnl+9yuPBQmuY6FBkQbj6ltVXYZQBXvpIe8OlhsTOiqjVEhZgW58r0ZgDRDSt9HgEuy6j4hH2BdoYN1Z5lijWvqKssSAyjM7WjHjmjmoWfmyP7vJKDVkXgQjAD758FzYmoy0hZBqq0i+iRSyKdMVwiIB7vMp96LYGkabcoZ1+2BTktJQJNo6BTv5ZRQkCrNCXLcF39UaC5eR0ju9rmgD9AXKB9Hk3n8GQ/zdWVKmu6TKx00HmuLHvSJoPT721sx7gFWvI1AAuaakISzXCMcqVR1J0ZhlWhVSUPp5PZetLsSTfeCcdOaHcPh1iObwfNxT1xzx0H7gCmekVYq+aqDm+c/9RPq5ikwoayRG2cjjEmgBhq1fjOa0b5cAd9zB8txwIt/3bAhWnqewQui2S2IbMDymRGf+RkYTzUrLwjiacSe8e0Y+wF2vWPGFRJJK0IXHZUhfsdu1DpDj15kgAqPVQmu3QVRNOcmGYumtqYqBezofXtoJF3bpWWUIaRzOe6HcR6kGuUgc0IkCYC0iisaPxfghbLqK7XUQ28ip1VdlWn7xjomBPZQw2skpzW+2mdBt4/DdqMphF/RjNxh2GVFZCsGB4KuWjKWHlJhAu06/FW1urk0xwrnH1QXqfjtSq9czrUaSCoOpdWJOgR3gLtjMDt77CP8V7pjqN81LaLhgBdUtVKduhZUqOMXqA1XrU6FezUoKqOKdUD1TnpriMycsyKzrArHXSsvf1nczClRYjRDaq5iAHOJECFbiU1C7QENZfxb4HWMYpfkYGjRXEhVSUXFeLlmtXrozNZzJVPytW7+RTwfw1o2SboQ5Ksj+ZMthJ7lWBUmRXndPp8MPsO0xZo7pjfL4nEUyMPRZyoKpvhGoqRGURfncmla219oWzGp9GFKNZWOvmjoAGSnS5RzUdnUGeAdwmi85yBmHDn+W6VUapedBYjZjtnbv800H4BrFjsOtqKUtcAAAAASUVORK5CYII="></div></div></div></div></div><div class="bottom-link" style="opacity: 1;"><span class="abuse">举报</span><span class="show-link"><span>免费创作这样的展示 &gt;&gt; <span>兔展</span></span></span><span class="view-count">阅读:130</span></div></div></li></ul>
      </section>
    </div>
  </div>
</template>
<script>
  import html2canvas from 'html2canvas'
  // import Canvas2Image from 'canvas2image'
   import { Canvas2Image } from './canvas2image'
   const a = require('./a.js')
   console.log('Canvas2Image', Canvas2Image)
   console.log('a', a)

  const train = require('./2.png')
  export default {
    data(){
      return {
        train
      }
    },
    mounted () {
        document.documentElement.style = 'font-size:100px'
    },
    methods: {
      async html2canvas () {
        // html2canvas(document.querySelector('#container'),{
        //   useCORS:true
        // }).then(canvas => {
        //     document.getElementById('result').appendChild(canvas)
        // })
        var pageContent = document.querySelector('.page-content')
        var pageContentObj = document.querySelector('.page-content').getBoundingClientRect()
        var width = pageContentObj.width
        var height = pageContentObj.height
        console.log('width',width)
        // var canvas = document.createElement('canvas')
        // var scale = 2

        // canvas.width = width * 2
        // canvas.height = height * 2
        // canvas.getContext("2d").scale(scale, scale)

        var opts = {
            // scale: scale,
            // canvas: canvas,
            logging: true,
            width: width,
            height: height,
            useCORS:true
        };
        html2canvas(pageContent, opts).then( (canvas)  => {
          console.log('canvas', canvas)
          document.getElementById('result').appendChild(canvas)
            // this.tobase64(canvas)
            // var context = canvas.getContext('2d')
            // var img = Canvas2Image.convertToImage(canvas, canvas.width, canvas.height)
            // img.className  = 'img1'
            // img.setAttribute('width', canvas.width / 2 + 'px')
            // img.setAttribute('height', canvas.height / 2 + 'px')
            // document.getElementById('result').appendChild(img)
            // var context = canvas.getContext('2d');
            // // 【重要】关闭抗锯齿
            // context.mozImageSmoothingEnabled = false;
            // context.webkitImageSmoothingEnabled = false;
            // context.msImageSmoothingEnabled = false;
            // context.imageSmoothingEnabled = false;
            
            // // 【重要】默认转化的格式为png,也可设置为其他格式
            // var img = Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height);
            // img.className  = 'img1'
            // // img.setAttribute('width', canvas.width / 2 + 'px')
            // // img.setAttribute('height', canvas.height / 2 + 'px')
            // document.getElementById('result').appendChild(img)

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
