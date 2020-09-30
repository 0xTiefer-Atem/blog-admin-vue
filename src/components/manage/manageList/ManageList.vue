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
          label="文章概要"
          width="150">
        <template slot-scope="scope">
          <div class="blogOverview">
            {{scope.row.blogOverview}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
          prop="blogType"
          label="分类"
          width="140">
      </el-table-column>
      <el-table-column
          prop="blogTitle"
          label="标题">
      </el-table-column>
      <el-table-column
          prop="createTime"
          :formatter="dateFormat"
          label="创建时间">
      </el-table-column>
      <el-table-column
          label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="editBlog(scope.$index, scope.row)">修改</el-button>
          <el-popconfirm
                  confirmButtonText='确定'
                  cancelButtonText='取消'
                  @onConfirm="deleteBlog(scope.$index, scope.row)"
                  icon="el-icon-info"
                  iconColor="red"
                  title="确定删除吗？">
            <el-button style="margin-left: 10px" size="small" type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
    import {request} from "@/network/request";
    import moment from 'moment'
    export default {
      name: "ManageList",
      data() {
        return {
          blogListData: []
        }
      },

      activated() {
        this.selectAll()
      },
      methods: {
        /*日期处理*/
        dateFormat(row,column){
          let date = row[column.property];
          if(date === undefined){
            return ''
          }
          return moment(date).format("YYYY-MM-DD HH:mm")
        },
        selectAll() {
          request({
            url: '/api/blog/list?pageNum=1&pageSize=10'
          }).then(res => {
            let resData = res.data;
            if (resData.status === 200) {
              let blogListData = resData.result.data.list;
              console.log(blogListData)
              for (let i = 0; i <blogListData.length; i++) {
                blogListData[i].blogTagList = JSON.parse(blogListData[i].blogTagList);
              }
              this.blogListData = blogListData
            }
          })
        },
        editBlog(index, row) {
          let blogId = row.blogId
          this.$router.push({
            path: "/blog-admin/manage-blog/manage-edit",
            query: {
              blogId
            }
          })
        },
        deleteBlog(index, row) {
          console.log("delete", index, row);
          let blogId = row.blogId;
          request({
            url: '/api/blog/update/status?blogId='+blogId+'&status=-1',
            method: 'get'
          }).then( res => {
            let resData = res.data;
            if(resData.status === 200) {
              this.$message.success("文章删除成功")
              this.selectAll();
            }
          })
        },
      },
    }
</script>

<style scoped>
  .blogOverview {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
