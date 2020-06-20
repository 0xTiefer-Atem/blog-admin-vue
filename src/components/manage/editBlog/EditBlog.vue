<template>
    <editor :blog="blog"></editor>
</template>

<script>
  import Editor from "../../common/Editor";
    export default {
        name: "EditBlog",
        components: {
            Editor
        },
        activated() {
            this.blog.blogId = this.$route.query.blogId
            this.blog.blogStatus = this.$route.query.blogStatus
        },
        data() {
            return {
                blog: {}
            }
        },
        methods: {},
        comments: {
            Editor
        }
    }
</script>

<style scoped>

</style>
