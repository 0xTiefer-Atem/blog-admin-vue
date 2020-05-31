<template>
  <el-card class="ql-editor-card">
    <editor></editor>
  </el-card>
</template>

<script>
  import Editor from "../../common/Editor";
    export default {
        name: "EditBlog",
        components: {Editor},
        data() {
            return {

            }
        },
        methods: {

        },
        comments: {
            Editor
        }
    }
</script>

<style scoped>

</style>