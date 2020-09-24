<template>
  <div>
    <form action="/">
      <van-row class="searchBar">
        <van-col span="2" class="left" align="left" @click="back">
          <van-icon name="arrow-left" size="20" color="#fff" />
        </van-col>
        <van-col span="21">
          <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch" />
        </van-col>
        <!-- <van-col span="3" class="right" align="right">
          <van-icon v-if="flag == true && value != ''" name="wap-home-o" @click="back" />
          <span v-else>取消</span>
        </van-col>-->
      </van-row>
    </form>
    <div v-show="noData" class="no-data">
      <van-image :src="pic" width="260" class="pic"></van-image>
      <p>暂无数据</p>
    </div>
    <div v-show="list" class="list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
        <van-swipe-cell v-for="(item, i) in datas" :key="i">
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
                  <p class="time">{{ `${item.planStartTime} - ${item.planEndTime}` }}</p>
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
    </div>
  </div>
</template>
<script>
import { findAll } from '@/api/task.js'
export default {
  data() {
    return {
      loading: false,
      finished: false,
      value: '',
      datas: [],
      cancel: true,
      pic: require('../../../static/no-data.png'),
      noData: true,
      list: false
    }
  },
  created() {
    this.$parent.showTab = false
  },
  mounted() {},
  methods: {
    back() {
      this.$router.back(-1)
    },
    onSearch(data) {
      const params = { taskName: this.value }
      findAll(params).then(resp => {
        if (resp.status === 200) {
          this.datas = resp.body
          if (this.datas.length > 0) {
            this.noData = false
            this.list = true
          } else {
            this.noData = true
            this.list = false
          }
          this.loading = false
          this.finished = true
        }
      })
    },
    detail(id) {
      this.$router.push({ path: '/taskDetail', query: { id: id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.searchBar {
  background: #018afe;
  height: 45px;
}
.van-search {
  background: none;
  padding-right: 0;
}
.van-search__action {
  color: #fff;
}
.right {
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  padding-top: 3.5%;
  padding-right: 12px;
  i {
    font-size: 24px;
  }
}
.left {
  padding-top: 3.5%;
  padding-left: 16px;
}
.no-data {
  text-align: center;
  margin-top: 20%;
  p {
    font-size: 24px;
    color: #ddd;
  }
}
p {
  margin: 0;
  padding: 0;
}
.content {
  margin-bottom: 10px;
  li {
    height: 150px;
    background: #fff;
    padding: 10px;
    border-radius: 6px;
  }
  .title {
    font-size: 16px;
    color: #409eff;
    margin-bottom: 10px;
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
}
.van-button {
  height: 150px;
  padding: 10px;
  border-radius: 0 6px 6px 0;
}
.list {
  padding: 12px;
}
.van-search {
  padding: 7px 10px;
}
.van-search /deep/ .van-cell {
  padding: 3px 10px 3px 1px;
  box-sizing: border-box;
}
.van-search__content {
  border-radius: 15px;
}
</style>
