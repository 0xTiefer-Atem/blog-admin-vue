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
          {{tag.name}}
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
    <div v-highlight-a v-highlight-b>
      <quill-editor
              class="ql-editor"
              v-model="blogInfo.blogContent"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
              @change="onEditorChange($event)">
      </quill-editor>
    </div>
  </el-card>
</template>

<script>
  import {request} from "../../network/request";
  import hljs from 'highlight.js'
  import {quillEditor} from "vue-quill-editor"; //调用编辑器
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction
    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],
    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    ['link', 'image', 'video'],
    ['clean']                                         // remove formatting button
  ]

  //七牛云上传域名: http(s)://upload-z2.qiniup.com
  //七牛云的AK: eiHzK04yfyyh-EymPKICBT-WFpanee7HXxXoDG78
  //七牛云的SK: 0kHNdQYXaD1cpgERUam2kbNuQpJbPZaHYR4OtU49
  export default {
    name: "Editor",
    components: {
      quillEditor
    },
    activated() {
      if (this.blog !== undefined) {
        //说明修改文章
        this.status = 0;
        this.selectBlogById()
      }
      //说明写文章
    },
    data() {
      return {
        inputVisible: false,
        inputValue: '',
        editorOption: {
          placeholder: '请输入文本...',
          modules: {
            toolbar: {
              container: toolbarOptions,  // 工具栏
            },
          },
        },
        uploadUrl: "",
        qiniuForm: {},


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
      onEditorReady(editor) { // 准备编辑器

      },
      onEditorBlur() {
      }, // 失去焦点事件
      onEditorFocus() {
      }, // 获得焦点事件
      onEditorChange({quill, html, text}) {
        // 内容改变事件
        // console.log(html)
        this.blogInfo.blogContent = html
      },
      // 上传图片前
      beforeUpload(res, file) {
      },
      // 上传图片成功
      uploadSuccess(res, file) {
      },
      // 上传图片失败
      uploadError(res, file) {
      },
      //返回上一级页面
      goBack() {
        this.$router.back();
      },
      handleClose(tag) {
        this.blogInfo.blogTagList.splice(this.blogInfo.blogTagList.indexOf(tag), 1);
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

      selectBlogById() {
        let blog = this.$store.getters.getBlogInfo;
        let blogId = blog.blogId
        let blogStatus = blog.blogStatus
        request({
          url: '/api/blog/selectOneBlog?id=' + blogId + '&status=' + blogStatus,
          method: 'get',
        }).then(res => {
          let resData = res.data;
          console.log(resData);
          if (resData.status === 2000) {
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
        let url = '/api/blog/insertNewBlog'
        if (this.status === 0) {
          url = '/api/blog/updateBlog'
          console.log("更新博客");
        }
        request({
          url: url,
          method: 'post',
          data: blog
        }).then(res => {
          let resData = res.data;
          if (resData.status === 2000) {
            console.log("操作成功");
            this.$message.success("操作成功")
          }
        })
      }
    },
  }
</script>

<style scoped>
  .ql-editor {
    height: 800px;
  }
</style>
