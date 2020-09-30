<template>
  <el-card>
    <div slot="header">
      <el-row>
        <el-col :span="12">
          <el-page-header @back="goBack" content="博客更新"/>
        </el-col>
        <el-col :span="4" :offset="8">
          <el-button size="medium" type="primary" @click="updateBlog">保存</el-button>
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
      <mavon-editor
          @save="updateBlog"
          v-highlight
          codeStyle="atom-one-dark"
          :boxShadow="false"
          @change="contentChange"
          class="mk-editor"
          v-model="blogInfo.blogRawContent"/>
    </div>
  </el-card>
</template>

<script>
import {request} from "@/network/request";


//七牛云上传域名: http(s)://upload-z2.qiniup.com
//七牛云的AK: eiHzK04yfyyh-EymPKICBT-WFpanee7HXxXoDG78
//七牛云的SK: 0kHNdQYXaD1cpgERUam2kbNuQpJbPZaHYR4OtU49
export default {
  name: "EditBlog",
  activated() {
    console.log(this.$route.query.blogId)
    this.blogInfo.blogId = this.$route.query.blogId
    this.selectBlogById(this.blogInfo.blogId)
  },
  props: {
    blogMsg: Object //这样可以指定传入的类型，如果类型不对，会警告
  },
  data() {
    return {
      inputVisible: false,
      inputValue: '',
      uploadUrl: "",

      //markdown渲染后的值
      renderValue: '',

      //博客属性
      blogInfo: {
        blogId: '',
        blogTitle: '',
        blogType: '',
        blogOverview: '',
        blogRawContent: '',
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

    contentChange(value, render) {
      this.renderValue = render;
      console.log(this.renderValue)
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

    //更新博客
    updateBlog() {
      let blog = {};
      blog.blogId = this.blogInfo.blogId
      blog.blogTagList = JSON.stringify(this.blogInfo.blogTagList);
      blog.blogTitle = this.blogInfo.blogTitle;
      blog.blogType = this.blogInfo.blogType;
      blog.blogRawContent = this.blogInfo.blogRawContent;
      blog.blogOverview = this.blogInfo.blogOverview
      blog.blogContent = this.renderValue;
      let url = '/api/blog/update/content'
      request({
        url: url,
        method: 'post',
        data: blog
      }).then(res => {
        let resData = res.data;
        if (resData.status === 200) {
          console.log("操作成功");
          this.$message.success("更新成功")
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
