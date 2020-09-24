<template>
  <div class="container">
    <div class="top">
      <div class="my-bg">
        <van-row class="portrait">
          <van-col span="6">
            <van-image
              round
              fit="cover"
              width="68"
              height="68"
              lazy-load
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </van-col>
          <van-col span="18">
            <p>Andy</p>
            <p>软件部-开发工程师</p>
          </van-col>
        </van-row>
      </div>
      <div class="oper-module">
        <van-row>
          <van-col span="8" align="center">
            <van-image :src="attendanceIcon" />
            <p>我的考勤</p>
          </van-col>
          <van-col span="8" align="center">
            <van-image :src="taskIcon" />
            <p>我的任务</p>
          </van-col>
          <van-col span="8" align="center">
            <van-image :src="applyIcon" />
            <p>我的申请</p>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="list">
      <van-cell is-link @click="message">
        <van-image :src="messageIcon" />
        <span style="vertical-align: middle;">新消息通知</span>
      </van-cell>
      <van-cell is-link @click="message">
        <van-image :src="modifyPwdIcon" />
        <span style="vertical-align: middle;">修改密码</span>
      </van-cell>
      <van-cell is-link @click="message">
        <van-image :src="aboutIcon" />
        <span style="vertical-align: middle;">关于我们</span>
      </van-cell>
      <van-cell is-link @click="message">
        <van-image :src="feedbackIcon" />
        <span style="vertical-align: middle;">意见反馈</span>
      </van-cell>
    </div>
    <div style="padding:100px 15px 100px">
      <van-button round block type="info" @click="exit">取消登录</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      attendanceIcon: require('../../../static/my-attendance.png'),
      taskIcon: require('../../../static/my-task.png'),
      applyIcon: require('../../../static/my-application.png'),
      messageIcon: require('../../../static/message-icon.png'),
      modifyPwdIcon: require('../../../static/modify-pwd.png'),
      aboutIcon: require('../../../static/about.png'),
      feedbackIcon: require('../../../static/feedback.png')
    }
  },
  created() {
    this.$parent.showTab = true
  },
  mounted() {},
  methods: {
    message() {
      this.$router.push({ path: '/message' })
    },
    exit() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  background: #fff;
  .top {
    position: relative;
    .my-bg {
      width: 100%;
      height: 150px;
      padding: 15px;
      box-sizing: border-box;
      background: #018afe;
      .portrait {
        .van-col {
          &:nth-child(2) {
            padding: 15px 0;
            p {
              color: #fff;
              font-size: 14px;
              margin: 0;
              &:first-child {
                margin-bottom: 5px;
              }
            }
          }
        }
      }
    }
    .oper-module {
      padding: 15px 10px;
      box-sizing: border-box;
      background: #fff;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
      border-radius: 10px;
      width: 90%;
      margin: auto;
      position: absolute;
      bottom: -40px;
      left: 0;
      right: 0;
      .van-row {
        .van-col {
          &:nth-child(2) {
            border-left: 1px solid #eee;
            border-right: 1px solid #eee;
          }
        }
      }
      /deep/ .van-image__img {
        width: 30px;
      }
      p {
        margin: 0;
        font-size: 12px;
      }
    }
  }
  .list {
    margin-top: 50px;
    .van-image {
      width: 20px;
      height: 20px;
      border-radius: 6px;
      padding: 5px;
      box-sizing: border-box;
      vertical-align: middle;
      margin-right: 5px;
      /deep/ .van-image__img {
        width: 100%;
      }
    }
    .van-cell {
      /deep/ .span {
        vertical-align: middle;
      }
      &:nth-child(1) {
        .van-image {
          background: linear-gradient(139deg, rgba(225, 135, 135, 1) 0%, rgba(222, 39, 39, 1) 100%);
        }
      }
      &:nth-child(2) {
        .van-image {
          background: linear-gradient(138deg, rgba(107, 171, 235, 1) 0%, rgba(10, 102, 194, 1) 100%);
        }
      }
      &:nth-child(3) {
        .van-image {
          background: linear-gradient(137deg, rgba(232, 198, 146, 1) 0%, rgba(255, 154, 3, 1) 100%);
        }
      }
      &:nth-child(4) {
        .van-image {
          background: linear-gradient(135deg, rgba(168, 236, 229, 1) 0%, rgba(6, 193, 187, 1) 100%);
        }
      }
    }
  }
}
</style>
