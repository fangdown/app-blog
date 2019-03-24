<template>
  <div>日志查看</div>
</template>
<script>
  import axios from 'axios'

  // const service = axios.create({
  //   headers: {
  //     'content-type': 'application/x-www-form-urlencoded',
  //     token: '5eb37636-4f34-4dbe-a0f0-ac2d44bf9432',
  //     method: 'syslog.frontendOperationLog.search',
  //     appkey: '10135',
  //     format: 'JSON',
  //   }
  // })
  export default {
    mounted () {
      this.getLog()
    },
    methods: {
      async getLog () {
        axios({
          method: 'post',
          params: {},
          headers: {
            token: '5eb37636-4f34-4dbe-a0f0-ac2d44bf9432',
            method: 'syslog.frontendOperationLog.search',
            appkey: '10135',
            format: 'JSON',
            'Content-type': 'application/json;charset=UTF-8'
          },
          url: '/router/rest'
        }).then((res) => {
          console.log(res)
        }).catch((res) => {
          console.log(res)
        })
        // const data = await service.post('/router/rest')
        // console.log('data', data)
      }
    }
  }
</script>
