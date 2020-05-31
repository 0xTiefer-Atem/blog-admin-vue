<template>
  <el-container class="home-container">
<!--    头部区域-->
    <el-header>
      <div>
        <img class="logo-img" src="../assets/logo.png" alt="">
        <span class="system_title">个人博客后台管理系统</span>
      </div>
      <el-button type="info" @click="logOut">退出</el-button>
      </el-header>
<!--    页面主体区-->
    <el-container>
<!--      侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
<!--        侧边栏菜单区域-->
        <el-menu background-color="#333744"
        text-color="#fff"
        active-text-color="#409eff"
        :collapse="isCollapse"
        :collapse-transition="false"
        :router="true"
        :default-active="activePath">
<!--          一级菜单-->
          <div v-for="menu in menuList" :key="menu.menuName">
            <div  v-if="menu.children.length !== 0" >
              <el-submenu  :index="baseUrl + '' + menu.menuPath"
                          @click="saveNavState(baseUrl + '' + menu.menuPath)">
                <template slot="title">
                  <i :class="menu.menuIcon"></i>
                  <span slot="title">{{menu.menuName}}</span>
                </template>

                  <el-menu-item  v-for="subMenu in menu.children" :index="baseUrl + '' + menu.menuPath + '' + subMenu.menuPath" :key="subMenu.menuPath">
                    <template slot="title">
                      <i :class="subMenu.menuIcon"></i>
                      <span slot="title">{{subMenu.menuName}}</span>
                    </template>
                  </el-menu-item>

              </el-submenu>
            </div>
            <div v-else>
              <el-menu-item :index="baseUrl + '' + menu.menuPath"
                            @click="saveNavState(baseUrl + '' + menu.menuPath)">
                <template slot="title">
                  <i :class="menu.menuIcon"></i>
                  <span slot="title">{{menu.menuName}}</span>
                </template>
              </el-menu-item>
            </div>
          </div>
        </el-menu>
      </el-aside>
<!--      右侧内容主体-->
      <el-main>
<!--        路由占位符-->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
      name: "Home",
      data() {
          return {
              //是否折叠
              isCollapse: false,

              //公共路径
              baseUrl: '/blog-admin',

              //导航栏上的路径和名称
              menuList: [
                  {
                      menuName: '文章管理',
                      menuPath: '/manage-blog',
                      menuIcon: 'el-icon-s-management',
                      children: [
                          {
                              menuName: '文章列表',
                              menuPath: '/manage-list',
                              menuIcon: 'el-icon-s-order',
                          },
                          {
                              menuName: '修改文章',
                              menuPath: '/manage-edit',
                              menuIcon: 'el-icon-edit',
                          }
                      ]
                  },
                  {
                      menuName: '写博客',
                      menuPath: '/write-blog',
                      menuIcon: 'el-icon-message-solid',
                      children: []
                  },
                  {
                      menuName: '个人信息',
                      menuPath: '/private-manage',
                      menuIcon: 'el-icon-s-order',
                      children: []
                  }
              ],
              //被激活的链接地址
              activePath: ''
          }
      },
      activated() {
          this.activePath = window.sessionStorage.getItem('activePath');
      },
      methods: {
          //登出函数
          logOut() {
              window.sessionStorage.clear();
              this.$store.commit('logOutUser');
              this.$router.replace('/');
          },

          //点击按钮切换菜单的折叠
          toggleCollapse() {
              this.isCollapse = !this.isCollapse;
          },
          //保存链接的激活状态
          saveNavState(activePath) {
              console.log(activePath);
              window.sessionStorage.setItem('activePath', activePath);
              this.activePath = activePath;
          }
      }
  }
</script>

<style scoped>

  /*让home-container充满全屏*/
  .home-container {
    height: 100%;
  }

  .el-header {
    background-color: #373D41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }

  .el-header div {
    display: flex;
    align-items: center;
  }

  .el-header div span {
    margin-left: 15px;
  }

  .el-aside {
    background-color: #333744;
  }

  .el-aside .el-menu {
    border-right: none;
  }

  .el-main {
    background-color: #EAEDF1;
  }

  .logo-img {
    width: 50px;
    height: 50px;
  }

  .toggle-button{
    background-color: #4a5060;
    font-size: 15px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>