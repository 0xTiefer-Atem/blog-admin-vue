<template>
  <div>
    <!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>个人信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      个人信息管理
    </el-card>
  </div>
</template>

<script>
  import {request} from "../../network/request";

  export default {
    name: "PrivateManage",
    data() {
      return {
      }
    },

    //进入排号界面初始化
    activated() {},
    methods: {}
  }
</script>

<style scoped>

</style>