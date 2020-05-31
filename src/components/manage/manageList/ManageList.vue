<template>
  <el-card>
    <div slot="header">文章管理</div>
    <el-table
        stripe
        :data="blogListData"
        style="width: 100%">
      <el-table-column
          prop="blogId"
          label="文章编号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="blogOverview"
          label="文章概要"
          width="180">
      </el-table-column>
      <el-table-column
          prop="blogType"
          label="分类"
          width="180">
      </el-table-column>
      <el-table-column
          prop="blogTitle"
          label="标题">
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="更新时间">
      </el-table-column>
      <el-table-column
          label="操作">
        <template slot-scope="scope">
          <el-button type="primary">修改</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
    import {request} from "../../../network/request";
    export default {
        name: "ManageList",
        data() {
            return {
                blogListData: []
            }
        },

        activated() {
            request({
                url: '/blog/selectAll?offset=0&limit=6'
            }).then( res => {
                let resData = res.data;
                console.log(resData)
                if(resData.status === 2000) {
                    this.blogListData = resData.result.data
                }
            })
        },
        methods: {
        },
    }
</script>

<style scoped>

</style>