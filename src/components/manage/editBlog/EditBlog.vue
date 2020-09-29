<template>
    <editor :blogMsg="blog"></editor>
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
        },
        data() {
            return {
                blog: {}
            }
        },
        methods: {},
        comments: {
            Editor
        },
        watch:{
            'blog': {
                deep: true,
                handler(nv, ov) {
                    console.log(nv)
                }
            }
        }
    }
</script>

<style scoped>

</style>
