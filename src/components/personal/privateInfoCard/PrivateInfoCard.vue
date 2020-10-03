<template>
  <div>
    <el-card class="personal-card" shadow="never">
      <el-row :gutter="24">
        <!--个人信息-->
        <el-col :span="8" :offset="2">
          <el-card :body-style="{ padding: '0px' }"
                   class="article-card"
                   shadow="hover">
            <img src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" class="image">
            <el-row>
              <el-col>
                <div>
                  <el-card class="article-info-card" @click.native="personalInfoClick" shadow="never">
                    <div slot="header" class="article-title">
                      0xTiefer_Atem
                    </div>
                    <div class="article-cover-text">
                      Technology changes the world
                    </div>
                    <el-divider></el-divider>
                    <el-row :grunt="24">
                      <el-col :span="12" :offset="12">
                        <div>
                          <el-tag>2020-05-27 10:42:23</el-tag>
                        </div>
                      </el-col>
                    </el-row>
                  </el-card>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>

        <!--个人简历，教育经历-->
        <el-col :span="8" :offset="2" v-for="(info, index) in personalInfoList" :key="index">
          <el-card :body-style="{ padding: '0px' }"
                   class="article-card"
                   shadow="hover">
            <img src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" class="image">
            <el-row>
              <el-col>
                <div>
                  <el-card class="article-info-card" @click.native="personalDetailClick(info)" shadow="never">
                    <div slot="header" class="article-title">
                      {{ info.blogTitle }}
                    </div>
                    <div class="article-cover-text">
                      {{ info.blogType }}
                    </div>
                    <el-divider></el-divider>
                    <el-row :grunt="24">
                      <el-col :span="12" :offset="12">
                        <div>
                          <el-tag>{{ dateFormat(info.createTime) }}</el-tag>
                        </div>
                      </el-col>
                    </el-row>
                  </el-card>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {request} from "@/network/request";
import moment from "moment";

export default {
  name: "PrivateManage",
  data() {
    return {
      personalInfoList: []
    }
  },
  activated() {
    request({
      url: '/api/blog/query/special',
      method: 'get'
    }).then(res => {
      let resData = res.data;
      console.log(resData);
      if (resData.status === 200) {
        this.personalInfoList = resData.result.data;
      } else {
        this.$message.error("文章查询失败")
      }
    })
  },
  methods: {
    /*日期处理*/
    dateFormat(date) {
      return moment(date).format("YYYY-MM-DD HH:mm")
    },
    personalDetailClick(info) {
      let query = {}
      query.blogNo = info.blogNo
      query.blogStatus = info.blogStatus
      this.$router.push({
        path: "/blog-admin/private-manage/private-edit",
        query
      });
    },
    personalInfoClick() {
      this.$router.push('/blog-admin/private-manage/personal-detail')
    }
  }
}
</script>

<style scoped>

.image {
  width: 100%;
  display: block;
}

.article-card {
  border-radius: 30px;
  margin: 10px;
}

.article-cover-text {
  margin: 10px;
  text-indent: 34px;
  text-align: left;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

}

.article-title {
  font-weight: bold;
  text-align: left;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

</style>
