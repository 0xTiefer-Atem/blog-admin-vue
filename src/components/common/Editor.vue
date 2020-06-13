<template>
  <el-card>
    <div slot="header">
      <el-page-header @back="goBack" content="文章编辑">
      </el-page-header>
    </div>
    <el-row :grunt="24">
      <el-col :span="12">
        标题:<el-input v-model="blogInfo.blogTitle" style="width: 300px;margin: 10px"></el-input>
      </el-col>
      <el-col :span="12">
        分类:<el-input v-model="blogInfo.blogType" style="width: 300px;margin: 10px"></el-input>
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
          {{tag}}
        </el-tag>
        <el-input
            style="width: 300px;margin-top: 10px;margin-left: 5px"
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else style="margin-top: 10px"  class="button-new-tag" @click="showInput">+</el-button>
      </el-col>
      <el-col :span="12">
        概要:<el-input v-model="blogInfo.blogOverView" style="width: 300px;margin: 10px"></el-input>
      </el-col>
    </el-row>
    <quill-editor
        class="ql-editor"
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
        @change="onEditorChange($event)">
    </quill-editor>
  </el-card>
</template>

<script>
    import hljs from 'highlight.js'
    import { quillEditor } from "vue-quill-editor"; //调用编辑器
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    const toolbarOptions =  [
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
        this.editorOption.modules.syntax = {
          highlight: text => hljs.highlightAuto(text).value
        }

        console.log(this.blog);
      },
      props: {
        blog: {
          type: Object,
          default: () => {

          }
        }
      },
      data() {
        return {
          inputVisible: false,
          inputValue: '',
          content: "",
          editorOption: {
            placeholder: '请输入文本...',
            modules: {
              toolbar: {
                container: toolbarOptions,  // 工具栏
              },
            },s
          },
          uploadUrl: "",
          qiniuForm: {},
          blogInfo: {
            blogTitle: '',
            blogType: '',
            blogOverView: '',

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
          console.log(html)
          this.content = html
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
            this.blogInfo.blogTagList.push(inputValue);
          }
          this.inputVisible = false;
          this.inputValue = '';
        }
      },
      computed: {

      },
      beforeRouteUpdate(to, from, next) {
        console.log("离开编辑")
        next();
      },
    }
</script>

<style scoped>
  .ql-editor{
    height:800px;
  }
</style>
