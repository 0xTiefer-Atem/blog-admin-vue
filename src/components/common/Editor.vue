<template>
  <el-card>
    <div slot="header">
      <el-row>
        <el-col :span="12">
          <el-page-header @back="goBack" content="文章编辑"/>
        </el-col>
        <el-col :span="4" :offset="8">
          <el-button size="medium" type="primary" @click="optBlog">保存</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row :grunt="24">
      <el-col :span="12">
        标题:
        <el-input v-model="blogInfo.blogTitle" style="width: 300px;margin: 10px"></el-input>
      </el-col>
      <el-col :span="12">
        分类:
        <el-input v-model="blogInfo.blogType" style="width: 300px;margin: 10px"></el-input>
      </el-col>
    </el-row>
    <el-row :grunt="24">
      <el-col :span="12">
        标签:
        <el-tag
            :key="index"
            v-for="(tag,index) in blogInfo.blogTagList"
            closable
            style="margin-right: 10px"
            :disable-transitions="false"
            @close="handleClose(tag)">
          {{ tag.name }}
        </el-tag>
        <el-input
            style="width: 100px;margin-top: 10px;margin-left: 5px"
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm">
        </el-input>
        <el-button v-else style="margin-top: 10px" class="button-new-tag" @click="showInput">+</el-button>
      </el-col>
      <el-col :span="12">
        概要:
        <el-input v-model="blogInfo.blogOverview" style="width: 300px;margin: 10px"></el-input>
      </el-col>
    </el-row>
    <div>
      <mavon-editor v-highlight :boxShadow="false" @change="contentChange" class="mk-editor" v-model="blogInfo.blogContent"/>
    </div>
  </el-card>
</template>

<script>
import {request} from "@/network/request";


//七牛云上传域名: http(s)://upload-z2.qiniup.com
//七牛云的AK: eiHzK04yfyyh-EymPKICBT-WFpanee7HXxXoDG78
//七牛云的SK: 0kHNdQYXaD1cpgERUam2kbNuQpJbPZaHYR4OtU49
export default {
  name: "Editor",
  activated() {
    console.log(this.blogMsg)
    if (this.blogMsg !== undefined) {
      //说明修改文章
      this.status = 0;
      console.log("修改博客");
      this.selectBlogById(this.blogMsg.blogId)
      return
    } else {
      this.status = 1;
      console.log('写博客');
    }
  },
  props: {
    blogMsg: Object //这样可以指定传入的类型，如果类型不对，会警告
  },
  data() {
    return {
      inputVisible: false,
      inputValue: '',
      uploadUrl: "",
      qiniuForm: {},
      codeStyle:'monokai-sublime',

      //此时文章的状态，默认为 1 新加文章，0为修改文章
      status: 1,

      blogInfo: {
        blogId: '',
        blogTitle: '',
        blogType: '',
        blogOverview: '',
        blogContent: '',
        blogTagList: []
      }
    }
  },
  methods: {
    //返回上一级页面
    goBack() {
      this.$router.back();
    },
    handleClose(tag) {
      this.blogInfo.blogTagList.splice(this.blogInfo.blogTagList.indexOf(tag), 1);
    },

    contentChange(value, reder) {
      console.log(value, reder)
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        let tag = {};
        tag.name = inputValue
        this.blogInfo.blogTagList.push(tag);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },

    selectBlogById(id) {
      let blog = this.$store.getters.getBlogInfo;
      let blogId = id
      request({
        url: '/api/blog/query/one?blogId=' + blogId,
        method: 'get',
      }).then(res => {
        let resData = res.data;
        console.log(resData);
        if (resData.status === 200) {
          this.blogInfo = resData.result.data
          this.blogInfo.blogTagList = JSON.parse(this.blogInfo.blogTagList)
        }
      })
    },

    optBlog() {
      let blog = {};
      blog.blogId = this.blogInfo.blogId
      blog.blogTagList = JSON.stringify(this.blogInfo.blogTagList);
      blog.blogTitle = this.blogInfo.blogTitle;
      blog.blogType = this.blogInfo.blogType;
      blog.blogOverview = this.blogInfo.blogOverview;
      blog.blogContent = this.blogInfo.blogContent;
      let url = '/api/blog/add/blog'
      if (this.status === 0) {
        url = '/api/blog/update/content'
        console.log("更新博客");
      }
      request({
        url: url,
        method: 'post',
        data: blog
      }).then(res => {
        let resData = res.data;
        if (resData.status === 200) {
          console.log("操作成功");
          this.$message.success("操作成功")
        }
      })
    }
  },
}
</script>

<style scoped>
.mk-editor {
  height: 800px;
}
</style>

