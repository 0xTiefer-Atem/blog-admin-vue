<template>
  <el-container class="home-container">
    <!--    头部区域-->
    <el-header>
      <div>
        <el-avatar class="logo-img" :src="this.$store.getters.getUserAvatar"/>
        <span class="system_title">{{ this.$store.getters.getUserName }}-个人博客后台管理系统</span>
      </div>
      <el-button type="text" @click="logOut">退出</el-button>
    </el-header>
    <!--    页面主体区-->
    <el-container>
      <!--      侧边栏-->
      <el-aside width='200px'>
        <!--        侧边栏菜单区域-->
        <el-menu background-color="#333744"
                 text-color="#fff"
                 active-text-color="#409eff"
                 :collapse-transition="false"
                 :router="true"
                 :default-active="activePath">
          <!--          一级菜单-->
          <div v-for="menu in menuList" :key="menu.menuName">
            <div v-if="menu.children.length !== 0">
              <el-submenu :index="baseUrl + '' + menu.menuPath"
                          @click="saveNavState(baseUrl + '' + menu.menuPath)">
                <template slot="title">
                  <i :class="menu.menuIcon"></i>
                  <span slot="title">{{ menu.menuName }}</span>
                </template>

                <el-menu-item v-for="subMenu in menu.children"
                              :index="baseUrl + '' + menu.menuPath + '' + subMenu.menuPath" :key="subMenu.menuPath">
                  <template slot="title">
                    <i :class="subMenu.menuIcon"></i>
                    <span slot="title">{{ subMenu.menuName }}</span>
                  </template>
                </el-menu-item>

              </el-submenu>
            </div>
            <div v-else>
              <el-menu-item :index="baseUrl + '' + menu.menuPath"
                            @click="saveNavState(baseUrl + '' + menu.menuPath)">
                <template slot="title">
                  <i :class="menu.menuIcon"></i>
                  <span slot="title">{{ menu.menuName }}</span>
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
          ]
        },
        {
          menuName: '写博客',
          menuPath: '/write-blog',
          menuIcon: 'el-icon-edit',
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
    //保存链接的激活状态
    saveNavState(activePath) {
      // console.log(activePath);
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

.el-header div {
  display: flex;
  align-items: center;
}

.el-header div span {
  margin-left: 15px;
}

.el-aside {
  border-right: none;
}

.logo-img {
  width: 50px;
  height: 50px;
}
</style>
