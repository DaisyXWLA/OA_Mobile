<template>
  <div>
    <van-nav-bar fixed title="任务" left-arrow @click-left="back">
      <template #right>
        <van-icon name="search" size="20" style="padding-right:10px;" @click="search" />
        <div class="more">
          <div>
            <van-icon name="ellipsis" size="20" @click="more" />
          </div>
          <div v-show="showPopUp" class="pop-up">
            <p @click="releaseTask">发布任务</p>
            <p @click="myTask">我的任务</p>
          </div>
        </div>
      </template>
    </van-nav-bar>
    <van-tabs v-model="activeName" style="margin-top:44px">
      <van-tab :title="`已完成(${finishedTitle})`" name="a">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getFinishedData"
        >
          <van-swipe-cell v-for="(item, i) in finishedDatas" :key="i">
            <ul class="content">
              <li @click="detail(item.id)">
                <p class="title">{{ item.taskName }}</p>
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
              </li>
            </ul>
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="removeFinishedData(item.id)"
              />
            </template>
          </van-swipe-cell>
        </van-list>
      </van-tab>
      <van-tab :title="`未完成(${unfinishedTitle})`" name="b">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getUnfinishedData"
        >
          <van-swipe-cell v-for="(item, i) in unfinishedDatas" :key="i">
            <ul class="content">
              <li @click="detail(item.id)">
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
              </li>
            </ul>
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="removeUnfinishedData(item.id)"
              />
            </template>
          </van-swipe-cell>
        </van-list>
      </van-tab>
      <van-tab :title="`全部(${totalTitle})`" name="c">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData">
          <van-swipe-cell v-for="(item, i) in totalDatas" :key="i">
            <ul class="content">
              <li @click="detail(item.id)">
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
              </li>
            </ul>
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="removeTotalData(item.id)"
              />
            </template>
          </van-swipe-cell>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { findAll } from '@/api/task.js'
import { findAllCompleteTask } from '@/api/task.js'
import { findAllUndoneTask } from '@/api/task.js'
import { remove } from '@/api/task.js'
export default {
  data() {
    return {
      loading: false,
      finished: false,
      activeName: 'a',
      showPopUp: false,
      totalDatas: [],
      finishedDatas: [],
      unfinishedDatas: [],
      finishedTitle: '',
      unfinishedTitle: '',
      totalTitle: ''
    }
  },
  created() {
    this.$parent.showTab = false
  },
  mounted() {
    this.getData()
    this.getUnfinishedData()
  },
  methods: {
    back() {
      this.$router.push({ path: '/index' })
    },
    detail(id) {
      this.$router.push({ path: '/taskDetail', query: { id: id } })
    },
    search() {
      this.$router.push({ path: '/taskSearch' })
    },
    more() {
      if (this.showPopUp === false) {
        this.showPopUp = true
      } else {
        this.showPopUp = false
      }
    },
    releaseTask() {
      this.$router.push({ path: '/releaseTask' })
    },
    myTask() {
      this.$router.push({ path: '/myTask' })
    },
    // 获取全部任务信息
    getData() {
      findAll().then(resp => {
        if (resp.status === 200) {
          this.totalDatas = resp.body
          // this.totalTitle = `全部(${resp.total})`
          this.totalTitle = resp.total
          this.loading = false
          this.finished = true
        } else {
          this.totalTitle = 0
          this.loading = false
          this.finished = true
        }
      })
    },
    // 已完成
    getFinishedData() {
      findAllCompleteTask().then(resp => {
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
    // 未完成
    getUnfinishedData() {
      findAllUndoneTask().then(resp => {
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
    },
    // 删除已完成任务
    removeFinishedData(id) {
      this.$dialog
        .confirm({
          title: '删除',
          message: '确定删除？'
        })
        .then(() => {
          const params = { ids: id }
          remove(params).then(resp => {
            if (resp.status === 200) {
              this.$toast('删除成功')
              this.getFinishedData()
              this.getData()
            }
          })
        })
        .catch(() => {
          // on cancel
        })
    },
    // 删除未完成任务
    removeUnfinishedData(id) {
      this.$dialog
        .confirm({
          title: '删除',
          message: '确定删除？'
        })
        .then(() => {
          const params = { ids: id }
          remove(params).then(resp => {
            if (resp.status === 200) {
              this.$toast('删除成功')
              this.getUnfinishedData()
              this.getData()
            }
          })
        })
        .catch(() => {
          // on cancel
        })
    },
    // 删除全部中的任务
    removeTotalData(id) {
      this.$dialog
        .confirm({
          title: '删除',
          message: '确定删除？'
        })
        .then(() => {
          const params = { ids: id }
          remove(params).then(resp => {
            if (resp.status === 200) {
              this.$toast('删除成功')
              this.getData()
              this.getFinishedData()
              this.getUnfinishedData()
            }
          })
        })
        .catch(() => {
          // on cancel
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
    right: -10px;
    top: 25px;
    width: 120px;
    border-radius: 6px;
    background: #fff;
    z-index: 9999;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    padding: 10px 0;
    p {
      padding: 10px;
      &:first-child {
        border-bottom: 1px solid #eee;
      }
      &:hover {
        background: #ccc;
      }
    }
  }
}
.content {
  margin-bottom: 10px;
  li {
    height: 170px;
    background: #fff;
    // padding: 10px;
    border-radius: 6px;
  }
  .title {
    font-size: 16px;
    color: #018afe;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 10px 10px 0;
    box-sizing: border-box;
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
    color: #777;
    font-size: 12px;
    margin-top: 10px;
    line-height: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    height: 60px;
    padding: 0 10px;
    box-sizing: border-box;
    /deep/ p {
      margin: 0 !important;
      padding: 0 !important;
    }
  }
  .add-border {
    border-bottom: 1px solid #eee;
    padding: 0 10px 5px;
    box-sizing: border-box;
  }
  .progress-bar {
    margin-top: 10px;
    padding: 0 10px;
    box-sizing: border-box;
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
}
/deep/ .van-tabs__line {
  bottom: 0.42rem;
  z-index: 0;
}
.van-button {
  height: 170px;
  padding: 10px;
  border-radius: 0 6px 6px 0;
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
<style lang="scss">
// 删除确认弹框
.van-dialog__header {
  text-align: left;
  padding: 15px;
  box-sizing: border-box;
  background: #018afe;
  color: #fff;
}
</style>
