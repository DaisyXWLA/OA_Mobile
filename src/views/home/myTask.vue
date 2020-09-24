<template>
  <div>
    <van-nav-bar fixed title="我的任务" left-arrow @click-left="back">
      <template #right>
        <van-icon name="search" size="20" style="padding-right:10px;" @click="search" />
      </template>
    </van-nav-bar>
    <van-tabs v-model="activeName" style="margin-top:44px">
      <van-tab :title="`未完成(${unfinishedTitle})`" name="a">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getUnfinishedData"
        >
          <van-swipe-cell v-for="(item, i) in unfinishedDatas" :key="i">
            <ul class="content">
              <li>
                <div @click="detail(item.id)">
                  <van-row>
                    <van-col span="20" align="left">
                      <p class="title">{{ item.taskName }}</p>
                    </van-col>
                    <van-col span="4" align="right" style="padding:10px 0">
                      <van-tag v-if="item.status === 0" mark color="#ccc" size="medium">未开始</van-tag>
                      <van-tag v-else-if="item.status === -1" mark color="#ccc" size="medium">已关闭</van-tag>
                      <van-tag v-else-if="item.status === 1" mark color="#07c160" size="medium">进行中</van-tag>
                      <van-tag v-else-if="item.status === 2" mark color="#07c160" size="medium">已完成</van-tag>
                      <van-tag v-else-if="item.status === 3" mark color="#ee0a24" size="medium">已超期</van-tag>
                      <van-tag v-else-if="item.status === 4" mark color="#ff976a" size="medium">已暂停</van-tag>
                      <van-tag v-else mark type="primary" size="medium">已取消</van-tag>
                    </van-col>
                  </van-row>
                  <div style="padding:10px">
                    <van-row class="add-border">
                      <van-col span="12">
                        <p class="name">
                          任务类型：
                          <span v-if="item.taskType === 0">项目任务</span>
                          <span v-else-if="item.taskType === 1">突发任务</span>
                          <span v-else-if="item.taskType === 2">周期任务</span>
                          <span v-else-if="item.taskType === 3">触发任务</span>
                          <span v-else-if="item.taskType === 4">其他任务</span>
                        </p>
                      </van-col>
                      <van-col span="12" align="right">
                        <p
                          class="time"
                        >{{ `${item.planStartTime.slice(0, 10)} - ${item.planEndTime.slice(0, 10)}` }}</p>
                      </van-col>
                    </van-row>
                    <p
                      v-if="item.taskContent === ''"
                      class="text"
                      style="color:#eee;font-size:18px;text-align:center;padding-top:20px;box-sizing:border-box"
                    >暂无任务描述</p>
                    <p v-else class="text" v-html="item.taskContent"></p>
                    <van-row class="progress-bar">
                      <van-col span="4">完成进度</van-col>
                      <van-col span="18" align="center">
                        <van-progress
                          :percentage="item.completeSchedule"
                          stroke-width="8"
                          color="linear-gradient(to right, #6C02D2, #419BFD)"
                        />
                      </van-col>
                      <van-col span="2" align="right">
                        <p>{{ `${item.completeSchedule}%` }}</p>
                      </van-col>
                    </van-row>
                  </div>
                </div>
                <van-row class="operBtn">
                  <van-col
                    class="startBtn"
                    span="8"
                    align="center"
                    @click="start(item.id,item.status)"
                  >
                    <van-icon class="startIcon" name="play-circle-o" size="20" />
                    <span>开始</span>
                  </van-col>
                  <van-col span="8" align="center" @click="finish(item.id, item.status)">
                    <van-icon name="stop-circle-o" size="20" />
                    <span>完成</span>
                  </van-col>
                  <van-col span="8" align="center" @click="hour(item.id, item.status)">
                    <van-icon name="clock-o" size="20" />
                    <span>工时</span>
                  </van-col>
                </van-row>
              </li>
            </ul>
          </van-swipe-cell>
        </van-list>
      </van-tab>
      <van-tab :title="`已完成(${finishedTitle})`" name="b">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getFinishedData"
        >
          <van-swipe-cell v-for="(item, i) in finishedDatas" :key="i">
            <ul class="content">
              <li>
                <div @click="detail(item.id)">
                  <van-row>
                    <van-col span="20" align="left">
                      <p class="title">{{ item.taskName }}</p>
                    </van-col>
                    <van-col span="4" align="right" style="padding:10px 0">
                      <van-tag v-if="item.status === 0" mark color="#ccc" size="medium">未开始</van-tag>
                      <van-tag v-else-if="item.status === -1" mark color="#ccc" size="medium">已关闭</van-tag>
                      <van-tag v-else-if="item.status === 1" mark color="#07c160" size="medium">进行中</van-tag>
                      <van-tag v-else-if="item.status === 2" mark color="#07c160" size="medium">已完成</van-tag>
                      <van-tag v-else-if="item.status === 3" mark color="#ee0a24" size="medium">已超期</van-tag>
                      <van-tag v-else-if="item.status === 4" mark color="#ff976a" size="medium">已暂停</van-tag>
                      <van-tag v-else mark type="primary" size="medium">已取消</van-tag>
                    </van-col>
                  </van-row>
                  <div style="padding:10px">
                    <van-row class="add-border">
                      <van-col span="12">
                        <p class="name">
                          任务类型：
                          <span v-if="item.taskType === 0">项目任务</span>
                          <span v-else-if="item.taskType === 1">突发任务</span>
                          <span v-else-if="item.taskType === 2">周期任务</span>
                          <span v-else-if="item.taskType === 3">触发任务</span>
                          <span v-else-if="item.taskType === 4">其他任务</span>
                        </p>
                      </van-col>
                      <van-col span="12" align="right">
                        <p
                          class="time"
                        >{{ `${item.planStartTime.slice(0, 10)} - ${item.planEndTime.slice(0, 10)}` }}</p>
                      </van-col>
                    </van-row>
                    <p
                      v-if="item.taskContent === ''"
                      class="text"
                      style="color:#eee;font-size:18px;text-align:center;padding-top:20px;box-sizing:border-box"
                    >暂无任务描述</p>
                    <p v-else class="text" v-html="item.taskContent"></p>
                    <van-row class="progress-bar">
                      <van-col span="4">完成进度</van-col>
                      <van-col span="18" align="center">
                        <van-progress
                          :percentage="item.completeSchedule"
                          stroke-width="8"
                          color="linear-gradient(to right, #6C02D2, #419BFD)"
                        />
                      </van-col>
                      <van-col span="2" align="right">
                        <p>{{ `${item.completeSchedule}%` }}</p>
                      </van-col>
                    </van-row>
                  </div>
                </div>
                <van-row class="bottomBtn">
                  <van-col span="24" align="center">
                    <van-icon name="completed" size="20" color="#07c160" />
                    <span>已完成</span>
                  </van-col>
                </van-row>
              </li>
            </ul>
          </van-swipe-cell>
        </van-list>
      </van-tab>
    </van-tabs>
    <laborHour ref="showOrHideLaborHour" @getUnfinishedData="getUnfinishedData"></laborHour>
  </div>
</template>
<script>
import { findMyUndoneTask } from '@/api/task.js'
import { findMyCompleteTask } from '@/api/task.js'
import { start } from '@/api/task.js'
import { over } from '@/api/task.js'
import { workHour } from '@/api/task.js'
import laborHour from './laborHour'
export default {
  components: { laborHour },
  data() {
    return {
      loading: false,
      finished: false,
      activeName: 'a',
      showManHour: false,
      time: '',
      pattern: /\d{6}/,
      unfinishedTitle: '',
      finishedTitle: '',
      unfinishedDatas: [],
      finishedDatas: [],
      laborHour: false
    }
  },
  created() {
    this.$parent.showTab = false
  },
  mounted() {
    this.getFinishedData()
  },
  methods: {
    back() {
      this.$router.push({ path: '/task' })
    },
    detail(id) {
      this.$router.push({ path: '/myTaskDetail', query: { id: id } })
    },
    search() {
      this.$router.push({ path: '/myTaskSearch' })
    },
    // 未完成
    getUnfinishedData() {
      findMyUndoneTask().then(resp => {
        if (resp.status === 200) {
          this.unfinishedDatas = resp.body
          // this.unfinishedTitle = `未完成(${resp.total})`
          this.unfinishedTitle = resp.total
          this.loading = false
          this.finished = true
        } else {
          this.unfinishedTitle = 0
          this.loading = false
          this.finished = true
        }
      })
    }, // 已完成
    getFinishedData() {
      findMyCompleteTask().then(resp => {
        if (resp.status === 200) {
          this.finishedDatas = resp.body
          // this.finishedTitle = `已完成(${resp.total})`
          this.finishedTitle = resp.total
          this.loading = false
          this.finished = true
        } else {
          this.finishedTitle = 0
          this.loading = false
          this.finished = true
        }
      })
    },
    start(id, status) {
      if (status === 1) {
        this.$toast.fail('该任务正在进行中')
      } else if (status === 2) {
        this.$toast.fail('该任务已完成')
      } else {
        const params = { ids: id }
        start(params).then(resp => {
          if (resp.status === 200) {
            this.$toast.success('任务开始')
            this.getUnfinishedData()
          }
        })
      }
    },
    finish(id, status) {
      if (status === 0) {
        this.$toast.fail('该任务未开始')
      } else {
        this.$dialog
          .confirm({
            title: '完成',
            message: '确定完成'
          })
          .then(() => {
            const params = { ids: id }
            over(params).then(resp => {
              if (resp.status === 200) {
                this.$toast.success('任务完成')
                this.getFinishedData()
                this.getUnfinishedData()
              }
            })
          })
          .catch(() => {
            // on cancel
          })
      }
    },
    hour(id, status) {
      if (status === 0) {
        this.$toast.fail('该任务未开始')
      } else {
        this.$refs.showOrHideLaborHour.showOrHideOverlay(id)
      }
    },
    onFailed(errorInfo) {},
    submit() {
      const params = { time: this.time }
      workHour(params).then(resp => {
        if (resp.status === 200) {
          this.showManHour = false
        } else {
          this.showManHour = false
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
/deep/ .van-tab--active {
  color: #018afe;
}
/deep/ .van-tabs {
  z-index: 0;
}
/deep/ .van-tabs__line {
  background: #018afe;
}
/deep/ .van-tabs__content {
  padding: 12px;
}
p {
  margin: 0;
}
.more {
  position: relative;
  z-index: 1;
  .pop-up {
    position: absolute;
    right: 0;
    top: 0;
    width: 120px;
    border-radius: 6px;
    background: #fff;
    z-index: 100;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    p {
      padding: 10px 0;
    }
  }
}
.content {
  li {
    background: #fff;
    // padding: 10px;
    border-radius: 6px;
    margin-bottom: 10px;
  }
  .title {
    font-size: 16px;
    color: #018afe;
    padding: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .name {
    font-size: 12px;
    color: #999;
  }
  .time {
    font-size: 12px;
    color: #999;
  }
  .text {
    text-indent: 2em;
    color: #666;
    padding-top: 10px;
    line-height: 20px;
    height: 80px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    /deep/ p {
      margin: 0 !important;
      padding: 0 !important;
    }
  }
  .add-border {
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
  }
  .progress-bar {
    margin-top: 10px;
    /deep/ .van-progress__pivot {
      display: none;
    }
    .van-col {
      color: #999;
      font-size: 12px;
      &:nth-child(2) {
        padding: 5px;
      }
      &:nth-child(3) {
        padding-top: 2px;
      }
    }
  }
  .van-tag--mark {
    border-radius: 20px 0 0 20px;
  }
  .operBtn {
    background: #e2eefd;
    border-radius: 0 0 6px 6px;
    padding: 10px 0;
    span {
      font-size: 14px;
      color: #999;
      vertical-align: middle;
      padding-left: 5px;
    }
    .van-icon {
      vertical-align: middle;
      color: #999;
    }
  }
  .bottomBtn {
    background: #e2eefd;
    border-radius: 0 0 6px 6px;
    padding: 10px 0;
    span {
      font-size: 14px;
      color: #07c160;
      vertical-align: middle;
      padding-left: 5px;
    }
    .van-icon {
      vertical-align: middle;
    }
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  width: 230px;
  // height: 150px;
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  p {
    font-size: 16px;
    text-align: center;
    margin: 10px 0;
  }
  .manHourBtn {
    margin-top: 20px;
    button {
      background: none;
      border: none;
      padding: 0 15px;
      font-size: 14px;
      color: #018afe;
    }
  }
  .van-cell {
    border-bottom: 1px solid #018afe;
  }
}
// 固定tabs-bar
.van-tabs--line /deep/ .van-tabs__wrap {
  position: fixed;
  top: 45px;
  left: 0;
  right: 0;
  z-index: 999;
}
/deep/ .van-tab__pane {
  margin-top: 44px;
}
</style>
