<template>
  <div>
    <div class="title">通用表单</div>
    <div class="content">
      <query-form ref="queryForm"
                  v-if="formFields && formFields.length > 0"
                  :fields="formFields"
                  @submit="formSubmit"
                  @reset="formReset"></query-form>
    </div>
  </div>
</template>
<script>
  import formFields from './data'
  export default {
    data () {
      return {
        model: {},
        formFields,
      }
    },
    methods: {
      formSubmit (model, params) {
        console.log('formSubmit')
      },
      formReset (model) {
        console.log('formReset')
      },
    }
  }
</script>

