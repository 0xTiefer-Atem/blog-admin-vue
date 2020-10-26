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
      <el-divider content-position="left">
        个人技能
        <!--添加个人技能-->
        <el-popover
            placement="right-start"
            title="技能添加"
            v-model="skillPopoverVisible"
            trigger="click">
          <el-input style="width: 95%" placeholder="请输入技术名称" class="info-input" v-model="skill.skillName">
            <template slot="prepend">技术名称</template>
          </el-input>
          <br>
          <el-input style="width: 95%" placeholder="默认为0" class="info-input" v-model="skill.skillPercentage">
            <template slot="prepend">评分</template>
          </el-input>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="cancelAddSkill">取消</el-button>
            <el-button type="text" size="mini" @click="addSkill">确定</el-button>
          </div>
          <el-button type="text" slot="reference">添加</el-button>
        </el-popover>
      </el-divider>
      <el-col :offset="1" :span="8">
        <el-collapse accordion>
          <el-collapse-item
              v-for="(skill, index) in userInfo.userSkillInfoList"
              :key="index"
              :title="skill.skillName"
              class="block">
            <el-slider style="margin-left: 20px;width: 90%" v-model="skill.skillPercentage"></el-slider>
            <el-button style="float: right;margin-right: 50px" type="text" @click.stop="deleteSkillItem(index)">删除
            </el-button>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <el-row>
      <el-divider content-position="left">
        相关网站链接
        <!--添加相关网站-->
        <el-popover
            placement="right-start"
            title="网址添加"
            v-model="webPopoverVisible"
            trigger="click">
          <el-input style="width: 95%" placeholder="网站名称" class="info-input" v-model="relatedLink.webName">
            <template slot="prepend">网站</template>
          </el-input>
          <br>
          <el-input style="width: 95%" placeholder="https://github.com/" class="info-input"
                    v-model="relatedLink.webLink">
            <template slot="prepend">网址</template>
          </el-input>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="cancelAddWeb">取消</el-button>
            <el-button type="text" size="mini" @click="addWeb">确定</el-button>
          </div>
          <el-button type="text" slot="reference">添加</el-button>
        </el-popover>
      </el-divider>
      <el-col :offset="1" :span="8">
        <el-collapse accordion>
          <el-collapse-item v-for="(info, index) in userInfo.userRelatedLinks" :key="index" :title="info.webName"
                            :name="index">
            <el-input style="width: 65%" v-model="info.webLink"></el-input>
            <el-button style="float: right;margin-right: 50px" type="text" @click="deleteWeb(index)">删除</el-button>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <el-row>
      <el-divider></el-divider>
      <el-col :offset="1" :span="8">
        <el-button type="text" @click="updateUserInfo">保存</el-button>
      </el-col>
    </el-row>
    <!--更换头像对话框-->
    <el-dialog
        title="选择上传的头像"
        :visible.sync="dialogVisible"
        width="20%">
      <el-upload
          class="avatar-uploader"
          action="http://47.107.64.157:9192/api/blog/upload/avatar"
          :show-file-list="false"
          @closed="dialogClose"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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

export default {
  name: "PersonalDetail",
  data() {
    return {
      imageUrl: '',
      userInfo: {},
      dialogVisible: false,
      srcList: [],

      webPopoverVisible: false,

      //相关网站属性
      relatedLink: {
        webName: '',
        webLink: ''
      },

      skillPopoverVisible: false,

      //技能属性
      skill: {
        skillName: '',
        skillPercentage: ''
      }
    }
  },
  activated() {
    this.getUserInfo();
  },
  methods: {
    //获取用户信息
    getUserInfo() {
      let userNo = this.$store.getters.getUserNo
      request({
        url: '/api/blog/select/user/info?userNo=' + userNo,
        method: 'get'
      }).then(res => {
        let resData = res.data;
        if (resData.status === 200) {
          let userInfo = resData.result.data
          userInfo.userRelatedLinks = JSON.parse(userInfo.userRelatedLinks)
          userInfo.userSkillInfoList = JSON.parse(userInfo.userSkillInfoList)
          userInfo.userEmail = '1144502582@qq.com'
          this.userInfo = userInfo
          // console.log(this.userInfo);
          this.srcList.push(userInfo.userAvatar)
        } else {
          this.$message.error("个人信息失败")
        }
      })
    },

    //上传头像成功后的回调函数
    handleAvatarSuccess(res, file) {
      // console.log(res)
      if (res.status === 200) {
        this.$message.success("头像上传成功")
        let avatarUrl = res.result.data.imgUrl
        this.imageUrl = avatarUrl
        this.srcList = []
        this.srcList.push(avatarUrl)
      } else {
        this.$message.error("头像上传失败")
      }
    },

    //上传头像之前的函数
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
      this.userInfo.userAvatar = this.imageUrl
      this.imageUrl = ''
    },

    //更新用户信息
    updateUserInfo() {
      let postUserInfo = {};
      postUserInfo.userAvatar = this.userInfo.userAvatar
      postUserInfo.userMotor = this.userInfo.userMotor
      postUserInfo.userName = this.userInfo.userName
      postUserInfo.userNo = this.userInfo.userNo
      postUserInfo.userRelatedLinks = JSON.stringify(this.userInfo.userRelatedLinks)
      postUserInfo.userSkillInfoList = JSON.stringify(this.userInfo.userSkillInfoList)
      // console.log(postUserInfo)
      request({
        url: '/api/blog/update/user/info',
        method: 'post',
        data: postUserInfo
      }).then(res => {
        let resData = res.data;
        if (resData.status === 200) {
          this.$message.success("信息更新成功")
          let userInfo = {}
          userInfo.userAvatar = postUserInfo.userAvatar
          userInfo.userName = postUserInfo.userName
          userInfo.userNo = postUserInfo.userNo
          this.$store.commit('updateUserInfo', {
            userInfo
          })
          this.getUserInfo()
        } else {
          this.$message.error("信息更新失败")
        }
      })
    },

    //取消技能添加
    cancelAddSkill() {
      this.skillPopoverVisible = false
      this.skill.skillName = ''
      this.skill.skillPercentage = 0
    },

    //添加技能
    addSkill() {
      this.skillPopoverVisible = false
      let skillItem = {}
      skillItem.skillName = this.skill.skillName
      skillItem.skillPercentage = Number(this.skill.skillPercentage)
      this.userInfo.userSkillInfoList.push(skillItem)
      this.skill.skillName = ''
      this.skill.skillPercentage = 0
    },

    //删除技能
    deleteSkillItem(index) {
      this.userInfo.userSkillInfoList.splice(index, 1);
    },

    //取消添加web网址
    cancelAddWeb() {
      this.webPopoverVisible = false
      this.relatedLink.webName = ''
      this.relatedLink.webLink = ''
    },

    //添加网址
    addWeb() {
      let relatedLinkItem = {}
      relatedLinkItem.webName = this.relatedLink.webName
      relatedLinkItem.webLink = this.relatedLink.webLink
      this.userInfo.userRelatedLinks.push(relatedLinkItem)
      this.webPopoverVisible = false
      this.relatedLink.webName = ''
      this.relatedLink.webLink = ''
    },

    //删除网址
    deleteWeb(index) {
      this.userInfo.userRelatedLinks.splice(index, 1);
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