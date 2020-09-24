<template>
  <div>
    <van-nav-bar fixed title="项目详情" left-arrow @click-left="back">
      <template #right>
        <img :src="modifyIcon" alt style="width:20px" @click="modify" />
      </template>
    </van-nav-bar>
    <div class="container">
      <van-row class="space">
        <van-col span="24" class="title-lg">项目进度</van-col>
        <van-col span="24" align="center" class="rate">
          <van-circle
            v-model="currentRate"
            :rate="currentRate"
            :speed="100"
            layer-color="#ebedf0"
            :text="currentRate.toFixed(0) + '%'"
          />
          <p class="text">完成占比</p>
        </van-col>
        <van-col span="24" class="statistics">
          <van-row gutter="20">
            <van-col span="8" align="left">
              总任务数：
              <span>{{ datas.totalTaskNumber }}</span>
            </van-col>
            <van-col span="8" align="center">
              已完成：
              <span>{{ datas.completeTaskNumber }}</span>
            </van-col>
            <van-col span="8" align="right">
              未完成：
              <span>{{ datas.undoneTaskNumber }}</span>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
      <van-row class="space">
        <van-col span="12" align="left" class="title">项目状态</van-col>
        <van-col span="12" align="right">
          <!-- <van-tag round size="large" type="success">{{datas.status}}</van-tag> -->
          <van-tag round size="large" color="#ccc" v-if="datas.status === 0">未开始</van-tag>
          <van-tag round size="large" color="#07c160" v-else-if="datas.status === 1">进行中</van-tag>
          <van-tag round size="large" color="#07c160" v-else-if="datas.status === 2">已完成</van-tag>
          <van-tag round size="large" type="danger" v-else-if="datas.status === 3">已超期</van-tag>
        </van-col>
      </van-row>
      <van-row class="space">
        <van-col span="8" align="left" class="title">项目团队成员</van-col>
        <van-col span="16" align="right" @click="toast">
          <p class="member">{{ datas.memberNames }}</p>
        </van-col>
      </van-row>
      <van-row class="space">
        <van-col span="12" align="left" class="title">截止日期</van-col>
        <van-col span="12" align="right">
          <p>{{ projectEndDate }}</p>
        </van-col>
      </van-row>
      <van-row class="space">
        <van-col span="24" align="left" class="title-lg">{{ datas.projectName }}</van-col>
        <van-col span="24">
          <van-row style="line-height:20px">
            <van-col span="10" style="color:#999;">{{ `${projectStartDate} - ${projectEndDate}` }}</van-col>
            <van-col span="14" style="color:#409EFF;">{{ datas.projectLeader }}</van-col>
          </van-row>
        </van-col>
        <van-col span="24">
          <p class="content" v-html="datas.projectContent"></p>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import { findOne } from '@/api/project.js'
export default {
  data() {
    return {
      currentRate: 0,
      member: '',
      modifyIcon: require('../../../static/modify.png'),
      datas: {},
      projectStartDate: '',
      projectEndDate: ''
    }
  },
  created() {
    this.$parent.showTab = false
  },
  mounted() {
    this.getData(this.$route.query.id)
  },
  methods: {
    back() {
      this.$router.back(-1)
    },
    toast() {
      this.$toast(this.datas.memberNames)
    },
    // 获取数据
    getData(id) {
      const params = { id: id }
      findOne(params).then(resp => {
        if (resp.status === 200) {
          this.datas = resp.body
          this.currentRate = parseFloat(resp.body.percentage)
          this.projectStartDate = resp.body.planStartDate.slice(0, 10).replace(/-/g, '.')
          this.projectEndDate = resp.body.planEndDate.slice(0, 10).replace(/-/g, '.')
        }
      })
    },
    // 修改数据
    modify() {
      this.$router.push({ path: 'modifyProject', query: { id: this.$route.query.id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.van-nav-bar {
  background: #018afe;
}
/deep/ .van-nav-bar .van-icon {
  color: #fff;
  font-size: 20px;
}
/deep/ .van-nav-bar__text {
  color: #fff;
}
/deep/ .van-nav-bar__title {
  color: #fff;
}
.container {
  background: #fff;
  margin-top: 44px;
  .space {
    padding: 15px;
    border-bottom: 1px solid #eee;
    p {
      margin: 0;
      color: #999;
      font-size: 12px;
    }
    .member {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
    }
    .content {
      text-indent: 2em;
      color: #666;
      font-size: 12px;
      margin-top: 5px;
      max-height: 360px;
      line-height: 20px;
      overflow: auto;
      /deep/ p {
        margin: 0;
      }
    }
  }
  .title-lg {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .title {
    font-size: 14px;
  }
  .rate {
    position: relative;
    .text {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 20%;
      font-size: 12px;
    }
  }
  .statistics {
    margin-top: 10px;
    .van-row {
      .van-col {
        font-size: 14px;
        color: #666;
      }
    }
  }
}
/deep/ .van-circle__text {
  top: 40%;
  font-size: 18px;
}
</style>
