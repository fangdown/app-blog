<template>
  <el-form-item :class="item.type === 'area' ? 'item-area' : ''"
                :label="item.type === 'area' ? ' ' : item.label"
                :prop="item.propertyName"
                :rules="item.attr && item.attr.rules">
    <!-- slot label -->
    <formatter v-if="item.formatterLabel"
               slot="label"
               :formatter="item.formatterLabel"
               :option="item" />
    <el-radio v-else-if="item.labelType === 'radio' && item.labelModel"
              slot="label"
              :label="item.propertyName"
              v-model="model[item.labelModel]"
              @change="e => item.labelChange && item.labelChange(e, model, item)">{{ item.label }}
    </el-radio>
    <!-- slot default -->
    <formatter v-if="item.formatter"
               :option="item"
               :model="model" />
    <el-input v-else-if="item.type === 'text'"
              :style="item.width ? {width: item.width} : null"
              :clearable="!item.required && (item.attr ? item.attr.clearable : true)"
              :disabled="isDisabled(item)"
              :placeholder="item.placeholder"
              v-bind="item.attr"
              :value="bindValue(item.propertyName)"
              @input="bindChange">
    </el-input>
    <fd-select v-else-if="item.type === 'select'"
               :style="item.width ? {width: item.width} : null"
               :clearable="!item.required && (item.attr ? item.attr.clearable : true)"
               :disabled="isDisabled(item)"
               :placeholder="item.placeholder"
               v-bind="item.attr"
               :value="bindValue(item.propertyName)"
               @input="bindChange">
      <fd-option v-for="opt in item.options"
                 :key="opt.label+opt.value"
                 :label="opt.label || ' '"
                 :value="opt.value">
      </fd-option>
    </fd-select>
    <fd-select v-else-if="item.type === 'remoteSelect'"
               :style="item.width ? {width: item.width} : null"
               :clearable="!item.required && (item.attr ? item.attr.clearable : true)"
               :disabled="isDisabled(item)"
               :placeholder="item.placeholder"
               filterable
               remote
               :remote-method="remoteMethod"
               :loading="item.loading"
               v-bind="item.attr"
               :value="bindValue(item.propertyName)"
               ref="remoteSelect"
               @input="bindChange"
               @visible-change="selectVisibleChange">
      <!-- <i slot="prefix" class="el-icon-search" style="padding-top:8px;padding-left:4px;"></i> -->
      <fd-option v-for="opt in item.options"
                 :key="opt.label+opt.value"
                 :label="opt.label"
                 :value="opt.value">
      </fd-option>
    </fd-select>
    <fd-date-picker v-else-if="item.type === 'datePicker'"
                    :style="item.width ? {width: item.width} : null"
                    :clearable="!item.required && (item.attr ? item.attr.clearable : true)"
                    :disabled="isDisabled(item)"
                    :placeholder="item.placeholder"
                    :type="item.dateType || 'date'"
                    :format="item.format || 'yyyy-MM-dd'"
                    :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
                    :operation="item.operation"
                    v-bind="item.attr"
                    :value="bindValue(item.propertyName)"
                    @input="datePickerChange">
    </fd-date-picker>
  </el-form-item>
</template>

<script>
  import { getModelValue, setModelValue } from '../../utils'
  import Formatter from './form-item-formatter'

  export default {
    name: 'form-item',
    components: { Formatter },
    props: {
      item: Object,
      model: Object,
      fields: Array
    },
    methods: {
      bindValue (key) {
        return getModelValue(this.model, key)
      },
      bindChange (value, opt = this.item) {
        if (value && typeof value === 'string') {
          value = value.trim()
        }
        let key = opt.propertyName
        setModelValue(value, this.model, key)
        console.log('value', value)
        console.log('this.model-set', this.model)
        console.log('opt', opt)
        opt.change && opt.change({ key, value, model: this.model, fields: this.fields })
      },
      datePickerChange (val) {
        let keys = this.item.valueKey
        if (keys && Array.isArray(keys)) {
          this.mergeModelInArray(val, keys, this.model)
        }
        this.bindChange(val)
      },
      mergeModelInArray (val, keys, model) {
        keys.forEach((v, i) => {
          setModelValue((val && val[i]), model, v)
        })
      },
      isDisabled (item) {
        if (typeof item.disabled === 'function') {
          let obj = { key: item.propertyName, model: this.model }
          return item.disabled(obj)
        }
        return !!item.disabled
      }
    }
  }
</script>
