## vue-select组件封装


### 封装要点
1. 父组件 —> 子组件传值（props）
2. 子组件 —> 父组件传值（$emit）
3. 以及插槽（slot）
4. 不要用vuex

- 对于一个独立的组件来说，props是用来为组件内部注入核心的内容；$emit用来使这个独立的组件通过一些逻辑来融入其他组件中。

- 父组件传的值越多，子组件的耦合就越低。

### 简化版封装
```js
// parent.vue
`<template>
  <child :data="data" @getData="getChildData">
    <button slot="button"></button>
  </child>
</template>
`
<script>
import child from './vueChild.vue'
export default {
  components:{
    child
  },
  methods: {
    getChildData(data){
      console.log('data', data)
    }
  }
}
</script>

// child.vue
`<template>
  <div>
    <span @click="sendData">{{data.name}}</span>
    <slot name="button"></slot>
  </div>
</template>
`
<script>
export default {
  props:{
    data:{
      type:Object,
      default: {}
    }
  },
  methods:{
    sendData(){
      this.$emit('getChildData', '发数据给父组件')
    }
  }
}
</script>
```
#### vue-select
用div模拟select的vue组件

#### API
- subject（必填）：
传入给组件内部option的值，格式为数组，数组每一项是对象，拥有两个属性value & text：[{value:0,text:"xxx"}] 

- selectContent（非必填）:
select组件默认的值，格式为对象，数组每一项是对象，拥有两个属性value & text

- selectWidth（非必填）：
select组件的宽度，默认为100px
```html
<template>
  <div class="select-wrapper">
    <div class="select" @click = "triggerOption">
      <div class="select-content">{{selectContent.text}}</div>
      <div class="triangle-wrapper">
        <div id="triangle-down"></div>
      </div>
    </div>
    <div class="option-wrapper" style="display: none;">
      <div class="option-item"
        v-for = "(item,index) in subject"
        :key="index"
        @mouseout="out($event)"
        @mouseover="move($event)"
        @click = "choose(item)">
        {{item.text}}
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    props:{
      selectWidth:{
        type:Number,
        default:100,
      },
      subject:{
        type:Array,
        default:function(){
          return []
        }
      },
      selectContent:{
        type:Object,
        default:function(){
          return {value:0,text:"请选择"}
        }
      },
    },
    mounted(){
      document.querySelector(".select-wrapper").style.width = this.selectWidth+"px";
    },
    computed:{
      optionWrapper(){
        return document.querySelector(".option-wrapper");
      },
      selectCon(){
        return document.querySelector(".select-content");
      },
      subjectList(){
        return document.getElementsByClassName("option-item");
      },
    },
    methods:{
      move(event){
        for(var item of this.subjectList){
          item.classList.remove("hover");
        }
        event.currentTarget.classList.add("hover");
      },
      out(event){
        event.currentTarget.classList.remove("hover");
      },
      triggerOption(){
        if (this.optionWrapper.style.display == "none") {
          this.optionWrapper.style.display = "block";
        }else{
          this.optionWrapper.style.display = "none";
        }
        for(var item of this.subjectList){
          if (item.innerHTML == this.selectContent.text) {
            item.classList.add("hover");
          }else{
            item.classList.remove("hover");
          }
        }
      },
      choose(item,value){
        this.selectContent.text = item.text;
        this.optionWrapper.style.display = "none";
        this.$emit("changeSelect",this.selectContent.text,this.selectContent.value);
      }
    },
  }
</script>
<style>
  .select{
    position: relative;
    overflow: hidden;
    padding-right: 10px;
    min-width: 80px;
    width: 100%;
    height: 20px;
    line-height: 20px;
    border: 1px solid #000;
    cursor: default;
    font-size: 13px;
  }
  .select-content{
    text-align: left;
  }
  .triangle-wrapper{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 20px;
    background-color: #fff;
    cursor: default;
  }
  #triangle-down{
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 6px solid #000;
  }
  .option-wrapper{
    position: relative;
    overflow: hidden;
    min-width: 80px;
    width: 100%;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
    border-left: 1px solid #000;
  }
  .option-item{
    min-width: 80px;
    height: 20px;
    line-height: 20px;
    padding-right: 10px;
    text-align: left;
    cursor: default; 
  }
  .hover{
    background-color: rgb(30,144,255);
    color:#fff !important;
  }
</style>

```