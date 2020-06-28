<template>
  <div>
    <!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>个人信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

  export default {
    name: "PrivateManage",
  }
</script>

<style scoped>

</style>
