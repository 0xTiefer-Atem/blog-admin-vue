<template>
  <el-card>
    <div slot="header">
      <el-row>
        <el-col :span="12">
          <el-page-header @back="goBack" content="博客更新"/>
        </el-col>
      </el-row>
    </div>
    <!--标题封面部分-->
    <el-container>
      <el-aside width="40%">
        <div style="margin-left: 20px">
          <div>
            标题:
            <el-input :disabled="!markDownEditable.isEditable" v-model="blogInfo.blogTitle"
                      style="width: 300px;margin: 15px;"></el-input>
          </div>
          <div>
            分类:
            <el-input :disabled="!markDownEditable.isEditable" v-model="blogInfo.blogType"
                      style="width: 300px;margin: 15px"></el-input>
          </div>
          <div>
            标签:
            <el-tag
                :closable="markDownEditable.isEditable"
                :key="index"
                v-for="(tag,index) in blogInfo.blogTagList"
                style=" margin: 15px"
                :disable-transitions="false"
                @close="handleClose(tag)">
              {{ tag.name }}
            </el-tag>
            <el-input
                :disabled="!markDownEditable.isEditable"
                style="width: 100px;margin: 15px"
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm">
            </el-input>
            <el-button
                :disabled="!markDownEditable.isEditable"
                v-else style="margin: 15px"
                class="button-new-tag"
                @click="showInput">+
            </el-button>
          </div>
          <div>
            概要:
            <el-input
                :disabled="!markDownEditable.isEditable"
                v-model="blogInfo.blogOverview"
                style="width: 300px;margin: 15px">
            </el-input>
          </div>
        </div>
      </el-aside>
      <el-aside width="50%">
        <div style="margin-left: 20px">
          <el-tooltip class="item" @click.native="uploadImgDialogVisible = true" effect="dark" content="点击更换封面" placement="right">
            <el-image class="blog-cover-img" :src="blogInfo.blogCoverUrl" ></el-image>
          </el-tooltip>
        </div>
      </el-aside>
    </el-container>


    <el-row>
      <el-col>
        <el-button style="float: right; margin-right: 10px" type="text" @click="updateBlog">保存</el-button>
        <el-button
            v-if="markDownEditable.isEditable"
            @click="preview"
            type="text"
            style="margin-bottom: 10px;margin-right: 10px; float: right"
            icon="el-icon-view">
          预览
        </el-button>
        <el-button
            v-if="!markDownEditable.isEditable"
            style="margin-bottom: 10px;margin-right: 10px; float: right"
            type="text"
            @click="edit"
            icon="el-icon-edit">
          编辑
        </el-button>
      </el-col>
      <el-col>
        <mavon-editor
            ref=md
            @imgAdd="handleEditorImgAdd"
            @imgDel="handleEditorImgDel"
            @save="updateBlog"
            :subfield="markDownEditable.subfield"
            :defaultOpen="'preview'"
            :toolbarsFlag="markDownEditable.toolbarsFlag"
            :editable="markDownEditable.editable"
            v-highlight
            codeStyle="atom-one-dark"
            :boxShadow="false"
            class="mk-editor"
            v-model="blogInfo.blogRawContent"/>
      </el-col>
    </el-row>

    <!--上传封面对话框-->
    <el-dialog
        title="请选择封面"
        :visible.sync="uploadImgDialogVisible"
        width="30%">
      <el-upload
          class="avatar-uploader"
          action="http://47.107.64.157:9192/api/blog/upload/img"
          :show-file-list="false"
          @closed="dialogClose"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
        <i class="el-icon-plus cover-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogClose">取 消</el-button>
    <el-button type="primary" @click="dialogClose">确 定</el-button>
  </span>
    </el-dialog>

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
    console.log(this.$route.query.blogNo)
    this.blogInfo.blogNo = this.$route.query.blogNo
    this.selectBlogByBlogNo(this.blogInfo.blogNo)
  },
  data() {
    return {
      //控制对话框的显示变量
      uploadImgDialogVisible: false,

      inputVisible: false,
      inputValue: '',
      uploadUrl: "",

      //默认预览模式
      markDownEditable: {
        isEditable: false,
        subfield: false,
        defaultOpen: 'preview',
        toolbarsFlag: false,
        editable: false
      },


      //博客属性
      blogInfo: {
        blogNo: '',
        blogCoverUrl: '',
        blogTitle: '',
        blogType: '',
        blogOverview: '',
        blogRawContent: '',
        blogTagList: []
      }
    }
  },
  methods: {
    //编辑模式
    edit() {
      this.markDownEditable.isEditable = true;
      this.markDownEditable.subfield = true;
      this.markDownEditable.defaultOpen = 'edit';
      this.markDownEditable.toolbarsFlag = true;
      this.markDownEditable.editable = true;
    },

    //预览模式
    preview() {
      this.markDownEditable.isEditable = false;
      this.markDownEditable.subfield = false;
      this.markDownEditable.defaultOpen = 'preview';
      this.markDownEditable.toolbarsFlag = false;
      this.markDownEditable.editable = false;
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

    //一篇博客信息
    selectBlogByBlogNo(blogNo) {
      request({
        url: '/api/blog/query/one?blogNo=' + blogNo,
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
      blog.blogNo = this.blogInfo.blogNo
      blog.blogCoverUrl = this.blogInfo.blogCoverUrl
      blog.blogTagList = JSON.stringify(this.blogInfo.blogTagList);
      blog.blogTitle = this.blogInfo.blogTitle;
      blog.blogType = this.blogInfo.blogType;
      blog.blogRawContent = this.blogInfo.blogRawContent;
      blog.blogOverview = this.blogInfo.blogOverview
      console.log(blog)
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
          this.preview()
        }
      })
    },

    //上传图片
    handleEditorImgAdd(pos, $file) {
      let fileData = new FormData();
      fileData.append('file', $file);
      request({
        url: '/api/blog/upload/img',
        data: fileData,
        method: 'post'
      }).then(res => {
        console.log(res)
        let resData = res.data;
        console.log(resData);
        if (resData.status === 200) {
          let imgUrl = resData.result.data.imgUrl
          this.$refs.md.$imglst2Url([[pos, imgUrl]])
        } else {
          this.$message.error("图片上传失败")
        }
      })

    },
    //删除图片
    handleEditorImgDel(pos) {
      // delete this.imgFile[pos]
    },

    //对话框关闭调用的函数
    dialogClose() {
      this.uploadImgDialogVisible = false
    },
    //上传封面成功后的回调函数
    handleAvatarSuccess(res) {
      if (res.status === 200) {
        this.$message.success("封面上传成功")
        console.log(res)
        let imgUrl = res.result.data.imgUrl
        this.blogInfo.blogCoverUrl = imgUrl
        this.uploadImgDialogVisible = false
      } else {
        this.$message.error("封面上传失败")
      }
    },

    //上传封面之前的函数
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
      }
      return isJPG && isLt5M;
    },

  },
}
</script>

<style scoped>
.mk-editor {
  height: 800px;
  margin: 0;
}

.blog-cover-img {
  border-radius: 15px;
  width: 400px;
  height: 266px;
}
.cover-img {
  margin-left: 45%;
  width: 178px;
  height: 178px;
  display: block;
}
.cover-uploader-icon {
  margin-left: 55%;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.cover-uploader-icon:hover {
  border-color: #409EFF;
}

.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

</style>
