<template>
  <div>
    <el-table :data="tableData"
              border
              height="600"
              style="width: 100%;">
      <el-table-column prop="source"
                       label="来源"
                       width="120">
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          <a :href="scope.row.url"
             target="_blank">{{scope.row.title}}</a>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[20]"
                   :page-size="20"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="400">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        content: '',
        tableData: [],
        currentPage: 1,
        total: 0
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      async getData () {
        const params = {
          key: 'b84435e0b50508349f504721d5006e6d',
          pno: this.currentPage,
          ps: 20,
          ERPSearchCacheFlag: true
        }
        const data = await this.$http('/api/weixin/query', params)
        this.tableData = data.list
        this.currentPage = data.pno
        this.total = this.totalPage
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getData()
      }
    }
  }
</script>

