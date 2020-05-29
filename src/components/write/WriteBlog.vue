<template>
  <div><!--    面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>写文章</el-breadcrumb-item>
    </el-breadcrumb>
    <editor></editor>
  </div>
</template>

<script>
  import {request} from "../../network/request";
  import Editor from "./editor/Editor";
  export default {
      name: "Case",
      data() {
          return {

          }
      },

      activated() {

      },


      methods: {

      },
      components: {
          Editor
      }
  }
</script>

<style scoped>
</style>
