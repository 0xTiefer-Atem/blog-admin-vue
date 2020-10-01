<template>
  <!--个人信息展示-->
  <el-card>
    <el-row>
      <el-divider content-position="left">基本信息</el-divider>
      <el-col :offset="1" :span="3">
        <el-image
            class="avatar-img"
            :preview-src-list="srcList"
            :src="userInfo.userAvatar"/>
        <el-button @click="dialogVisible = true" style="margin-left: 30%" type="text">更换头像</el-button>
      </el-col>
      <el-col :span="17" :offset="1">
        <el-row>
          <el-col :span="8">
            <el-input class="info-input" v-model="userInfo.userName">
              <template slot="prepend">昵称</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-input class="info-input" v-model="userInfo.userMotor">
              <template slot="prepend">座右铭</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-input class="info-input" v-model="userInfo.userEmail">
              <template slot="prepend">邮箱</template>
            </el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-divider content-position="left">个人技能</el-divider>
      <el-col :offset="1" :span="8">
        <el-collapse accordion>
          <el-collapse-item
              v-for="(skill, index) in userInfo.userSkillInfoList"
              :key="index"
              :title="skill.skillName"
              class="block">
            <el-slider style="width: 95%" v-model="skill.skillPercentage"></el-slider>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <el-row>
      <el-divider content-position="left">相关网站链接</el-divider>
      <el-col :offset="1" :span="8">
        <el-collapse accordion>
          <el-collapse-item v-for="(info, index) in userInfo.userRelatedLinks" :key="index" :title="info.webName"
                            :name="index">
            <el-input v-model="info.webLink"></el-input>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <el-row>
      <el-divider></el-divider>
      <el-col :offset="1" :span="8">
        <el-button type="text">保存</el-button>
      </el-col>
    </el-row>
    <!--更换头像对话框-->
    <el-dialog
        title="选择上传的头像"
        :visible.sync="dialogVisible"
        width="20%">
      <el-upload
          class="avatar-uploader"
          action="http://localhost:9192/api/blog/upload/avatar"
          :show-file-list="false"
          @closed="dialogClose"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogClose">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </el-card>
</template>

<script>
import {request} from "@/network/request";

export default {
  name: "PersonalDetail",
  data() {
    return {
      imageUrl: '',
      userInfo: {},
      dialogVisible: false,
      srcList: []
    }
  },
  activated() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      request({
        url: '/api/blog/select/user/info?userNo=001',
        method: 'get'
      }).then(res => {
        let resData = res.data;
        if (resData.status === 200) {
          let userInfo = resData.result.data
          console.log(userInfo);
          userInfo.userRelatedLinks = JSON.parse(userInfo.userRelatedLinks)
          userInfo.userSkillInfoList = JSON.parse(userInfo.userSkillInfoList)
          userInfo.userEmail = '1144502582@qq.com'
          this.userInfo = userInfo
          this.srcList.push(userInfo.userAvatar)
        } else {
          this.$message.error("个人信息失败")
        }
      })
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    //对话框关闭调用的函数
    dialogClose() {
      this.dialogVisible = false
      this.imageUrl = ''
    }
  }
}
</script>

<style scoped>
.avatar-img {
  width: 100%;
  display: block;
  border-radius: 4px;
}

.info-input {
  margin: 10px;
}

.avatar-uploader .el-upload .avatar-uploader-icon {
  margin-left: 45%;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .avatar-uploader-icon:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  margin-left: 45%;
  width: 178px;
  height: 178px;
  display: block;
}
</style>