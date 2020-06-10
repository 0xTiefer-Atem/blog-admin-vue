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
        created() {
            this.blog.blogId = this.$route.query.blogId
            // console.log(this.blog);
        },
        data() {
            return {
                blog: {

                }
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
