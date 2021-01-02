import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index';

const Login = () => import('../components/login/Login');
const Home = () => import('../components/Home');
const ManageBlog = () => import('../components/manage/ManageBlog');
const ManageList = () => import('../components/manage/manageList/ManageList');
const EditBlog = () => import('../components/manage/editBlog/EditBlog');
const PEditBlog = () => import('../components/personal/editBlog/PEditBlog');
const PrivateManage = () => import('../components/personal/PrivateManage');
const PrivateInfoCard = () => import('../components/personal/privateInfoCard/PrivateInfoCard');
const WriteBlog = () => import('../components/write/WriteBlog');
const PersonalDetail = () => import('../components/personal/personalInfo/PersonalDetail')

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
                component: ManageBlog,
                children: [
                    {
                        path: '',
                        redirect: 'manage-list'
                    },
                    {
                        path: 'manage-list',
                        component: ManageList,
                    },
                    {
                        path: 'manage-edit',
                        component: EditBlog
                    },
                ]
            },
            {
                path: 'private-manage',
                component: PrivateManage,
                children: [
                    {
                        path: '',
                        redirect: 'private-info-card'
                    },
                    {
                        path: 'private-info-card',
                        component: PrivateInfoCard
                    },
                    {
                        path: 'private-edit',
                        component: PEditBlog
                    },
                    {
                        path: 'personal-detail',
                        component: PersonalDetail
                    }
                ]
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

//路由守卫
router.beforeEach((to, from, next) => {
    let isLogin = store.state.userInfo.isLogin;
    let to_path = to.path
    if (to_path !== '/blog-admin/blog-login') {
        if (isLogin) {
            next();
        } else {
            next({
                path: '/blog-admin/blog-login'
            })
        }
    }
    next()

})
export default router
