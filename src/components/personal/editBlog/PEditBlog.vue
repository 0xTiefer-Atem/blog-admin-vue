<template>
    <editor></editor>
</template>

<script>
  import Editor from "../../common/Editor";
    export default {
        name: "PEditBlog",
        components: {
            Editor
        },
        activated() {
            let blog = {}
            blog.blogId = this.$route.query.blogId
            blog.blogStatus = this.$route.query.blogStatus
            this.$store.commit({
                type: 'updateBlogInfo',
                blog
            })
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
