<template>
  <el-form ref="queryForm"
           class="fd-query-form"
           inline
           :model="model">
    <template v-for="item in rowFields">
      <form-item :key="item.propertyName"
                 :fields="rowFields"
                 :model="model"
                 :item="item" />
    </template>
    <fd-button type="primary"
               icon="iconfont icon-search"
               @click="onSubmit">查询
    </fd-button>
  </el-form>
</template>
<script>
  // import Schema from 'async-validator'
  import { createModel } from '../../utils'
  import formItem from './form-item'

  export default {
    name: 'query-form',
    components: {
      formItem
    },
    props: {
      value: {
        type: Object,
        default: () => ({})
      },
      fields: {
        type: Array,
        default: () => ([])
      },
    },
    data () {
      return {
        model: {},
      }
    },
    computed: {
      rowFields () {
        return this.fields
      }
    },
    created () {
      this.model = this.createModel()
      console.log('this.model', this.model)
      console.log(' this.fields', this.fields)
      // this.$emit('created', this.model)
    },
    methods: {
      getModel () {
        return this.model
      },
      onSubmit () {
        // const validator = new Schema(this.rules)
        // validator.validate(this.model, (errors, fields) => {
        //   if (errors) {
        //     this.$message.warning(errors[0].message)
        //   } else {
        //     this.$emit('submit', this.model)
        //   }
        // })
        this.$emit('submit', this.model)
      },
      onReset () {
        this.model = this.createModel()
        this.$refs.queryForm.resetFields()
        this.$emit('reset', this.model)
      },
      createModel () {
        let model = createModel(this.fields, 'propertyName', this.getDefaultValue)
        if (this.fields && this.fields.length) {
          this.fields.forEach(v => {
            if (v.labelType === 'radio' && v.labelModel && v.labelValue) {
              model[v.labelModel] = v.labelValue
            }
          })
        }
        return model
      },
      getDefaultValue (v, key) {
        if (this.value.hasOwnProperty(key)) {
          let func = this.value[key]
          if (typeof func === 'function') {
            return func()
          }
          return this.value[key]
        } else {
          return v.default || ''
        }
      },
      initFields () {
        if (this.fields && this.fields.length) {
          this.fields.forEach(this.mergeFormField)
        }
      },
      handleRowFields (fields = this.fields) {
        // 内联表单溢出
        if (this.option.overflow) {
          this.rowFields = fields.filter(v => v.show)
          return
        }
        this.$nextTick(_ => {
          let sum = 0
          let arr = []
          // 查询按钮70 + 左右内边距32 + 滚动条16
          const maxWidth = this.option.dialog
            ? this.$parent.$el.getBoundingClientRect().width - 118
            : document.documentElement.clientWidth - this.menuWidth - 118
          fields.forEach(v => {
            if (v.show) {
              let type = v.type
              let w = parseInt(v.width)
              // 地址组件不计算 label
              if (type !== 'area') {
                w += v.label.length * 12 + 12
              }
              // 三角箭头
              if (type && type.includes('menu')) {
                w += 16
              }
              sum += w
              // console.log('query-form-field', v.label, w, sum, maxWidth)
              if (sum < maxWidth) {
                arr.push(v)
              }
            }
          })
          this.rowFields = arr
          console.log('arr', arr)
        })
      }
    }
  }
</script>

