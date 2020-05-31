<template>
  <div>
<!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    </el-breadcrumb>

<!--    卡片视图区域-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>


  export default {
    name: "BlogManage",
  }
</script>

<style scoped>

</style>
