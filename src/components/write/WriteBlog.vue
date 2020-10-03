<template>
  <el-card>
    <div slot="header">
      <el-row>
        <el-col :span="12">
          <el-page-header @back="goBack" content="博客编辑"/>
        </el-col>
      </el-row>
    </div>
    <el-container>
      <el-aside width="40%">
        <div style="margin-left: 20px">
          <div>
            标题:
            <el-input v-model="blogInfo.blogTitle"
                      style="width: 300px;margin: 15px;"></el-input>
          </div>
          <div>
            分类:
            <el-input v-model="blogInfo.blogType"
                      style="width: 300px;margin: 15px"></el-input>
          </div>
          <div>
            标签:
            <el-tag
                closable
                :key="index"
                v-for="(tag,index) in blogInfo.blogTagList"
                style=" margin: 15px"
                :disable-transitions="false"
                @close="handleClose(tag)">
              {{ tag.name }}
            </el-tag>
            <el-input
                style="width: 100px;margin: 15px"
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm">
            </el-input>
            <el-button
                v-else style="margin: 15px"
                class="button-new-tag"
                @click="showInput">+
            </el-button>
          </div>
          <div>
            概要:
            <el-input
                v-model="blogInfo.blogOverview"
                style="width: 300px;margin: 15px">
            </el-input>
          </div>
        </div>
      </el-aside>
      <el-aside width="50%">
        <div style="margin-left: 20px">
          <el-tooltip class="item" @click.native="uploadImgDialogVisible = true" effect="dark" content="点击更换封面"
                      placement="right">
            <el-image class="blog-cover-img" :src="blogInfo.blogCoverUrl">
            </el-image>
          </el-tooltip>
        </div>
      </el-aside>
    </el-container>
    <el-row>
      <el-col>
        <el-button style="float: right; margin-right: 10px" type="text" @click="addBlog">保存</el-button>
      </el-col>
      <el-col>
        <mavon-editor
            ref=md
            @imgAdd="handleEditorImgAdd"
            @imgDel="handleEditorImgDel"
            @save="addBlog"
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
  name: "WriteBlog",
  activated() {

  },
  data() {
    return {
      //控制对话框的显示变量
      uploadImgDialogVisible: false,

      inputVisible: false,
      inputValue: '',
      uploadUrl: "",

      //markdown语法的值
      value: '',

      //博客属性
      blogInfo: {
        blogCoverUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        blogTitle: '',
        blogType: '',
        blogOverview: '',
        blogRawContent: '',
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


    //增加博客
    addBlog() {
      let blog = {};
      blog.blogCoverUrl = this.blogInfo.blogCoverUrl
      blog.blogTagList = JSON.stringify(this.blogInfo.blogTagList);
      blog.blogTitle = this.blogInfo.blogTitle;
      blog.blogType = this.blogInfo.blogType;
      blog.blogRawContent = this.blogInfo.blogRawContent;
      blog.blogOverview = this.blogInfo.blogOverview
      let url = '/api/blog/add/blog'
      request({
        url: url,
        method: 'post',
        data: blog
      }).then(res => {
        let resData = res.data;
        if (resData.status === 200) {
          this.$message.success("新增成功")
          this.$router.push({
            path: "/blog-admin/manage-blog/manage-list"
          })
          this.clearBlog()
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

    //清空当前博客内容
    clearBlog() {
      this.blogInfo.blogCoverUrl = 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
      this.blogInfo.blogTitle = ''
      this.blogInfo.blogType = ''
      this.blogInfo.blogOverview = ''
      this.blogInfo.blogRawContent = ''
      this.blogInfo.blogTagList = []

    }
  },
}
</script>

<style scoped>
.mk-editor {
  height: 800px;
}

.blog-cover-img {
  border-radius: 15px;
  width: 400px;
  height: 266px;
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
