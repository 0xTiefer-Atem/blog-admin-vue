import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('../components/login/Login');
const Home = () => import('../components/Home');
const ManageBlog = () => import('../components/manage/ManageBlog');
const PrivateManage = () => import('../components/personal/PrivateManage');
const WriteBlog = () => import('../components/write/WriteBlog');

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const routes = [

  {
    path: '',
    redirect: '/blog-admin/blog-login'
  },
  {
    path: '/blog-admin/blog-login',
    component: Login,
  },
  {
    path: '/blog-admin',
    component: Home,
    children: [
      {
        path: '',
        redirect: 'manage-blog'
      },
      {
        path: 'manage-blog',
        component: ManageBlog
      },
      {
        path: 'private-manage',
        component: PrivateManage
      },
      {
        path: 'write-blog',
        component: WriteBlog
      },
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});


export default router
