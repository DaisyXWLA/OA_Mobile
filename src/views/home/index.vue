<!-- home -->
<template>
  <div class="app-container">
    <div class="warpper">
      <div class="search-bar">
        <van-row>
          <van-col span="20">
            <img :src="logoIcon" alt />
            <span>郑州海友科伟电子科技有限公司</span>
          </van-col>
          <van-col span="2" align="left" @click="msg">
            <img :src="messageIcon" alt />
          </van-col>
          <van-col span="2" align="right" @click="search">
            <img :src="searchIcon" alt />
          </van-col>
        </van-row>
      </div>
      <div class="slideshow">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img :src="image" />
          </van-swipe-item>
        </van-swipe>
        <van-notice-bar
          text="通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容"
          left-icon="volume-o"
          background="#fff"
          color="#999"
        />
      </div>
      <van-grid :border="false" :column-num="4">
        <van-grid-item @click="attendance">
          <van-image :src="attendanceIcon" />
          <p>考勤</p>
        </van-grid-item>
        <van-grid-item @click="apply">
          <van-image :src="applyIcon" />
          <p>申请</p>
        </van-grid-item>
        <van-grid-item @click="notice">
          <van-image :src="noticeIcon" />
          <p>通知公告</p>
        </van-grid-item>
        <van-grid-item @click="log">
          <van-image :src="logIcon" />
          <p>日志</p>
        </van-grid-item>
        <van-grid-item @click="project">
          <van-image :src="projectIcon" />
          <p>项目</p>
        </van-grid-item>
        <van-grid-item @click="task">
          <van-image :src="taskIcon" />
          <p>任务</p>
        </van-grid-item>
        <van-grid-item @click="approve">
          <van-image :src="approveIcon" />
          <p>审批</p>
        </van-grid-item>
        <van-grid-item @click="workDiary">
          <van-image :src="workDiaryIcon" />
          <p>工作日志</p>
        </van-grid-item>
      </van-grid>
      <van-grid :border="false" :column-num="4" v-show="showMenu">
        <van-grid-item @click="builderDiary">
          <van-image :src="builderDiaryIcon" />
          <p>施工日志</p>
        </van-grid-item>
        <van-grid-item @click="workPlan">
          <van-image :src="workPlanIcon" />
          <p>工作计划</p>
        </van-grid-item>
      </van-grid>
      <van-grid :border="false" :column-num="1">
        <van-grid-item
          v-if="showMenu == false"
          icon="arrow-down"
          @click="switchIcon"
          style="color:#ccc;cursor:pointer"
        ></van-grid-item>
        <van-grid-item v-else icon="arrow-up" @click="switchIcon" style="color:#ccc;cursor:pointer"></van-grid-item>
      </van-grid>
      <ul class="backlog">
        <h3 style="font-size:16px;margin:0;padding-bottom:12px">待办事项</h3>
        <li @click="detail">
          <van-row>
            <van-col span="4">
              <p class="left approve">审批</p>
            </van-col>
            <van-col span="14">
              <p class="title">张三的请假申请张三的请假申请张三的请假申请张三的请假申请张三的请假申请张三的请假申请</p>
              <p class="name">
                审批人：
                <span>李芳芳</span>
              </p>
            </van-col>
            <van-col span="6">
              <p class="time">
                剩余时间：
                <span>3</span>天
              </p>
            </van-col>
          </van-row>
        </li>
        <li>
          <van-row>
            <van-col span="4">
              <p class="left project">项目</p>
            </van-col>
            <van-col span="14">
              <p class="title">张三的请假申请张三的请假申请张三的请假申请张三的请假申请张三的请假申请张三的请假申请</p>
              <p class="name">
                审批人：
                <span>李芳芳</span>
              </p>
            </van-col>
            <van-col span="6">
              <p class="time">
                剩余时间：
                <span>3</span>天
              </p>
            </van-col>
          </van-row>
        </li>
        <li>
          <van-row>
            <van-col span="4">
              <p class="left task">任务</p>
            </van-col>
            <van-col span="14">
              <p class="title">张三的请假申请张三的请假申请张三的请假申请张三的请假申请张三的请假申请张三的请假申请</p>
              <p class="name">
                审批人：
                <span>李芳芳</span>
              </p>
            </van-col>
            <van-col span="6">
              <p class="time">
                剩余时间：
                <span>3</span>天
              </p>
            </van-col>
          </van-row>
        </li>
        <li>
          <van-row>
            <van-col span="4">
              <p class="left approve">审批</p>
            </van-col>
            <van-col span="14">
              <p class="title">张三的请假申请张三的请假申请张三的请假申请张三的请假申请张三的请假申请张三的请假申请</p>
              <p class="name">
                审批人：
                <span>李芳芳</span>
              </p>
            </van-col>
            <van-col span="6">
              <p class="time">
                剩余时间：
                <span>3</span>天
              </p>
            </van-col>
          </van-row>
        </li>
        <li>
          <van-row>
            <van-col span="4">
              <p class="left project">项目</p>
            </van-col>
            <van-col span="14">
              <p class="title">张三的请假申请张三的请假申请张三的请假申请张三的请假申请张三的请假申请张三的请假申请</p>
              <p class="name">
                审批人：
                <span>李芳芳</span>
              </p>
            </van-col>
            <van-col span="6">
              <p class="time">
                剩余时间：
                <span>3</span>天
              </p>
            </van-col>
          </van-row>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logoIcon: require('../../../static/logo-mini.png'),
      messageIcon: require('../../../static/message.png'),
      searchIcon: require('../../../static/search.png'),
      images: [require('../../../static/banner-01.png'), require('../../../static/banner-02.png')],
      attendanceIcon: require('../../../static/attendance.png'),
      applyIcon: require('../../../static/apply.png'),
      noticeIcon: require('../../../static/notice.png'),
      logIcon: require('../../../static/log.png'),
      projectIcon: require('../../../static/project.png'),
      taskIcon: require('../../../static/task.png'),
      approveIcon: require('../../../static/approve.png'),
      workDiaryIcon: require('../../../static/work-diary.png'),
      builderDiaryIcon: require('../../../static/builder-diary.png'),
      workPlanIcon: require('../../../static/work-plan.png'),
      showMenu: false,
      list: [
        // {opr:'审批'}
      ]
    }
  },

  computed: {},
  created() {
    this.$parent.showTab = true
  },
  mounted() {},

  methods: {
    msg() {
      this.$router.push({ path: '/' })
    },
    search() {
      this.$router.push({ path: '/search' })
    },
    attendance() {},
    apply() {},
    notice() {},
    log() {},
    project() {
      this.$router.push({ path: '/project' })
    },
    task() {
      this.$router.push({ path: '/task' })
    },
    approve() {},
    workDiary() {},
    builderDiary() {},
    workPlan() {},
    switchIcon() {
      if (this.showMenu === false) {
        this.showMenu = true
      } else {
        this.showMenu = false
      }
    },
    detail() {}
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  .warpper {
    background: #eee;
    .search-bar {
      padding: 12px;
      background: #018afe;
      img {
        vertical-align: middle;
      }
      span {
        font-size: 14px;
        color: #fff;
        vertical-align: middle;
        padding-left: 5px;
      }
    }
    .slideshow {
      margin-bottom: 5px;
      .van-swipe {
        height: 150px;
        .van-swipe-item {
          img {
            width: 100%;
          }
        }
      }
      .van-notice-bar {
        height: 30px;
      }
    }
    .van-grid {
      background: #fff;
      /deep/ .van-grid-item__content {
        padding: 5px;
        p {
          margin: 0;
          padding-top: 5px;
        }
      }
    }
    .backlog {
      margin-top: 5px;
      background: #fff;
      padding: 12px;
      li {
        border-bottom: 1px solid #e9e9e9;
        padding: 10px 0;
        cursor: pointer;
      }
      .left {
        width: 48px;
        height: 48px;
        line-height: 48px;
        border-radius: 50%;
        text-align: center;
        color: #fff;
      }
      .approve {
        background: linear-gradient(135deg, rgba(245, 157, 195, 1) 0%, rgba(209, 15, 94, 1) 100%);
      }
      .project {
        background: linear-gradient(139deg, rgba(107, 239, 202, 1) 0%, rgba(96, 208, 152, 1) 100%);
      }
      .task {
        background: linear-gradient(135deg, rgba(138, 135, 238, 1) 0%, rgba(59, 17, 202, 1) 100%);
      }
      .title {
        font-size: 14px;
        padding: 5px 10px 0 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .name {
        font-size: 12px;
        color: #999;
        padding-top: 5px;
      }
      .time {
        color: #999;
        margin-top: 33%;
      }
      p {
        margin: 0;
      }
    }
  }
}
</style>
