<template>
  <div>
<!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    </el-breadcrumb>

<!--    卡片视图区域-->
    <el-card>
      文章管理
    </el-card>
  </div>
</template>

<script>
  import {request} from "../../network/request";

  export default {
    name: "BlogManage",
    data() {
      return {}
    },

    activated() {},

    methods: {}
  }
</script>

<style scoped>

</style>
