<template>
  <div>
    <van-nav-bar fixed title="任务详情" left-arrow @click-left="back">
      <template #right>
        <img :src="modifyIcon" alt style="width:20px" @click="modify" />
      </template>
    </van-nav-bar>
    <div class="container">
      <van-row class="space">
        <van-col span="12" align="left" class="title">任务优先级</van-col>
        <van-col span="12" align="right">
          <van-tag v-if="datas.priorityName === '紧急'" round size="large" color="#F56C6C">
            <p>紧急</p>
          </van-tag>
          <van-tag v-else-if="datas.priorityName === '重要'" round size="large" color="#409EFF">
            <p>重要</p>
          </van-tag>
          <van-tag v-else-if="datas.priorityName === '次要'" round size="large" color="#E6A23C">
            <p>次要</p>
          </van-tag>
          <van-tag v-else-if="datas.priorityName === '一般'" round size="large" color="#ff976a">
            <p>一般</p>
          </van-tag>
        </van-col>
      </van-row>
      <van-row class="space">
        <van-col span="12" align="left" class="title">任务状态</van-col>
        <van-col span="12" align="right">
          <van-tag v-if="datas.status === 0" round size="large" color="#ccc">
            <p>未开始</p>
          </van-tag>
          <van-tag v-else-if="datas.status === -1" round size="large" color="#ccc">
            <p>已关闭</p>
          </van-tag>
          <van-tag v-else-if="datas.status === 1" round size="large" color="#07c160">
            <p>进行中</p>
          </van-tag>
          <van-tag v-else-if="datas.status === 2" round size="large" color="#07c160">
            <p>已完成</p>
          </van-tag>
          <van-tag v-else-if="datas.status === 3" round size="large" color="#ee0a24">
            <p>已超期</p>
          </van-tag>
          <van-tag v-else-if="datas.status === 4" round size="large" color="#ff976a">
            <p>已暂停</p>
          </van-tag>
          <van-tag v-else round size="large" color="#ccc">已取消</van-tag>
        </van-col>
      </van-row>
      <van-row class="space">
        <van-col span="8" align="left" class="title">任务类型</van-col>
        <van-col span="16" align="right">
          <p v-if="datas.taskType === 0" class="member">项目任务</p>
          <p v-else-if="datas.taskType === 1" class="member">突发任务</p>
          <p v-else-if="datas.taskType === 2" class="member">周期任务</p>
          <p v-else-if="datas.taskType === 3" class="member">触发任务</p>
          <p v-else-if="datas.taskType === 4" class="member">其他任务</p>
        </van-col>
      </van-row>
      <van-row class="space">
        <van-col span="12" align="left" class="title">指派给</van-col>
        <van-col span="12" align="right">
          <p>{{ datas.executorName }}</p>
        </van-col>
      </van-row>
      <van-row class="space">
        <van-col span="12" align="left" class="title">关联项目</van-col>
        <van-col span="12" align="right">
          <p>{{ datas.projectInfoName }}</p>
        </van-col>
      </van-row>
      <van-row class="space">
        <van-col span="12" align="left" class="title">截止日期</van-col>
        <van-col span="12" align="right">
          <p>{{ taskEndTime }}</p>
        </van-col>
      </van-row>
      <van-row class="space">
        <van-col span="12" align="left" class="title">完成进度</van-col>
        <van-col span="12" align="right">
          <p>{{ `${datas.completeSchedule}%` }}</p>
        </van-col>
      </van-row>
      <van-row class="space">
        <van-col span="24" align="left" class="title-lg">{{ datas.taskName }}</van-col>
        <van-col span="24">
          <van-row style="line-height:20px">
            <van-col span="10" style="color:#999;">{{ `${taskStartTime} - ${taskEndTime}`}}</van-col>
            <van-col v-if="datas.status === 0" span="14" style="color:#ccc;">未开始</van-col>
            <van-col v-else-if="datas.status === -1" span="14" style="color:#ccc;">已关闭</van-col>
            <van-col v-else-if="datas.status === 1" span="14" style="color:#07c160;">进行中</van-col>
            <van-col v-else-if="datas.status === 2" span="14" style="color:#07c160;">已完成</van-col>
            <van-col v-else-if="datas.status === 3" span="14" style="color:#ee0a24;">已超期</van-col>
            <van-col v-else-if="datas.status === 4" span="14" style="color:#ff976a;">已暂停</van-col>
          </van-row>
        </van-col>
        <van-col span="24">
          <p class="content" v-html="datas.taskContent"></p>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import { findOne } from '@/api/task.js'
export default {
  data() {
    return {
      currentRate: 0,
      member: 'Julie，Jack，Nick，Andy，Julie，Jack，Nick，Andy',
      modifyIcon: require('../../../static/modify.png'),
      datas: {},
      taskStartTime: '',
      taskEndTime: ''
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
    modify() {
      if (this.datas.status === -1) {
        this.$toast.fail('该任务已关闭，不可编辑')
      } else if (this.datas.status === 1) {
        this.$toast.fail('该任务正在进行中，不可编辑')
      } else if (this.datas.status === 2) {
        this.$toast.fail('该任务已完成，不可编辑')
      } else if (this.datas.status === 3) {
        this.$toast.fail('该任务已超期，不可编辑')
      } else if (this.datas.status === 4) {
        this.$toast.fail('该任务已暂停，不可编辑')
      } else {
        this.$router.push({ path: '/modifyTask', query: { id: this.$route.query.id } })
      }
    },
    getData(id) {
      const params = { id: id }
      findOne(params).then(resp => {
        if (resp.status === 200) {
          this.datas = resp.body
          this.taskStartTime = resp.body.planStartTime.slice(0, 10)
          this.taskEndTime = resp.body.planEndTime.slice(0, 10)
        }
      })
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
.van-tag {
  padding: 0;
}
.van-tag--round {
  p {
    width: 58px;
    height: 26px;
    line-height: 26px;
    color: #fff !important;
    text-align: center;
  }
}
</style>
