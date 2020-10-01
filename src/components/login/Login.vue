<template>
  <div class="login_container">
    <div class="login_box">
      <!--      头像区域-->
      <div class="avatar_box">
        <img src="http://47.107.64.157/user/avatar/tx1.jpeg" alt="">
      </div>
      <div style="margin-bottom: 10px">
        <h3 class="title">个人博客管理系统</h3>
      </div>

      <!--      登录表单区域-->
      <el-form ref="loginFormRef" :model="loginForm" label-width="0px" class="login_form">

        <!--        用户名-->
        <el-form-item prop="username">
          <el-input placeholder="账号" v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>


        <!--        密码-->
        <el-form-item prop="password">
          <el-input placeholder="密码" type="password" v-model="loginForm.password"
                    prefix-icon="el-icon-s-promotion"></el-input>
        </el-form-item>


        <!--        按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">清空</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import {request} from '../../network/request'

export default {
  name: "Login.vue",
  data() {
    return {
      //这是登录的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },

      // loginFormRules: {
      //   //登录框验证
      //   username: [
      //     { required: true, message: '请输用户名', trigger: 'blur' },
      //     { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
      //   ],
      //   //密码框验证
      //   password: [
      //     {required: true, message: '请输入密码', trigger: 'blur'},
      //     { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
      //   ]
      // }
    }
  },
  methods: {

    login() {
      this.$router.replace("/blog-admin")
    },


    resetLoginForm() {
      this.$confirm('确定清空当前信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs.loginFormRef.resetFields();
        this.$message({
          type: 'success',
          message: '清空成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '清空失败'
        });
      });
    }
  }
}
</script>

<style scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}


.login_container .avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}

.login_container .avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eeeeee;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.title {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.btns {
  display: flex;
  justify-content: flex-end;
}

</style>
