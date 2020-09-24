<template>
  <div>
    <van-nav-bar fixed title="项目" left-arrow @click-left="back">
      <template #right>
        <van-icon name="search" size="20" style="padding-right:10px;" @click="search" />
        <van-icon name="plus" size="20" @click="addProject" />
      </template>
    </van-nav-bar>
    <van-tabs v-model="activeName" style="margin-top:44px">
      <van-tab :title="`我负责的(${responsibleTotal})`" name="a">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getResponsibleData"
        >
          <van-swipe-cell v-for="(item, i) in responsibleDatas" :key="i">
            <ul class="content">
              <li ref="changeBorder" @click="detail(item.id)">
                <p class="title">{{ item.projectName }}</p>
                <van-row>
                  <van-col span="12">
                    <p class="name">
                      负责人：
                      <span>{{ item.projectLeader }}</span>
                    </p>
                  </van-col>
                  <van-col span="12" align="right">
                    <p class="time">{{ `${item.planStartDate} - ${item.planEndDate}` }}</p>
                  </van-col>
                </van-row>
                <p
                  v-if="item.projectContent === ''"
                  class="text"
                  style="color:#eee;font-size:18px;text-align:center;padding-top:20px;box-sizing:border-box"
                >暂无项目描述</p>
                <p v-else class="text" v-html="item.projectContent"></p>
              </li>
            </ul>
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="removeResponsible(item.id)"
              />
            </template>
          </van-swipe-cell>
        </van-list>
      </van-tab>
      <van-tab :title="`我参与的(${participateTotal})`" name="b">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getParticipateData"
        >
          <van-swipe-cell v-for="(item, i) in participateDatas" :key="i">
            <ul class="content">
              <li ref="changeBorder" @click="detail(item.id)">
                <p class="title">{{ item.projectName }}</p>
                <van-row>
                  <van-col span="12">
                    <p class="name">
                      负责人：
                      <span>{{ item.projectLeader }}</span>
                    </p>
                  </van-col>
                  <van-col span="12" align="right">
                    <p class="time">{{ `${item.planStartDate} - ${item.planEndDate}` }}</p>
                  </van-col>
                </van-row>
                <p
                  v-if="item.projectContent === ''"
                  class="text"
                  style="color:#eee;font-size:18px;text-align:center;padding-top:20px;box-sizing:border-box"
                >暂无项目描述</p>
                <p v-else class="text" v-html="item.projectContent"></p>
              </li>
            </ul>
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="removeParticipate(item.id)"
              />
            </template>
          </van-swipe-cell>
        </van-list>
      </van-tab>
      <van-tab :title="`全部项目(${allProject})`" name="c">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData">
          <van-swipe-cell v-for="(item, i) in totalDatas" :key="i">
            <ul class="content">
              <li ref="changeBorder" @click="detail(item.id)">
                <p class="title">{{ item.projectName }}</p>
                <van-row>
                  <van-col span="12">
                    <p class="name">
                      负责人：
                      <span>{{ item.projectLeader }}</span>
                    </p>
                  </van-col>
                  <van-col span="12" align="right">
                    <p class="time">{{ `${item.planStartDate} - ${item.planEndDate}` }}</p>
                  </van-col>
                </van-row>
                <p
                  v-if="item.projectContent === ''"
                  class="text"
                  style="color:#eee;font-size:18px;text-align:center;padding-top:20px;box-sizing:border-box"
                >暂无项目描述</p>
                <p v-else class="text" v-html="item.projectContent"></p>
              </li>
            </ul>
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="removeAll(item.id)"
              />
            </template>
          </van-swipe-cell>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { findAll } from '@/api/project.js'
import { findMyResponsibleInfo } from '@/api/project.js'
import { findMyParticipateInfo } from '@/api/project.js'
import { deleteProject } from '@/api/project.js'
export default {
  data() {
    return {
      loading: false,
      finished: false,
      activeName: 'a',
      responsibleDatas: [],
      participateDatas: [],
      totalDatas: [],
      responsibleTotal: '',
      participateTotal: '',
      allProject: ''
    }
  },
  created() {
    this.$parent.showTab = false
  },
  mounted() {
    this.getData()
    // this.getResponsibleData()
    this.getParticipateData()
  },
  methods: {
    back() {
      this.$router.push({ path: '/index' })
    },
    detail(id) {
      // console.log(id)
      this.$router.push({ path: '/projectDetail', query: { id: id } })
    },
    search() {
      this.$router.push({ path: '/projectSearch' })
    },
    addProject() {
      this.$router.push({ path: '/addProject' })
    },
    // 全部项目
    getData() {
      findAll().then(resp => {
        if (resp.status === 200) {
          this.totalDatas = resp.body
          this.allProject = resp.total
          this.loading = false
          this.finished = true
        } else {
          this.allProject = `全部项目(0)`
          this.loading = false
          this.finished = true
        }
      })
    },
    // 我负责的
    getResponsibleData() {
      findMyResponsibleInfo().then(resp => {
        if (resp.status === 200) {
          this.responsibleDatas = resp.body
          this.responsibleTotal = resp.total
          this.loading = false
          this.finished = true
        } else {
          this.responsibleTotal = `我负责的(0)`
          this.loading = false
          this.finished = true
        }
      })
    },
    // 我参与的
    getParticipateData() {
      findMyParticipateInfo().then(resp => {
        if (resp.status === 200) {
          this.participateDatas = resp.body
          this.participateTotal = resp.total
          this.loading = false
          this.finished = true
        } else {
          this.participateTotal = `我参与的(0)`
          this.loading = false
          this.finished = true
        }
      })
    },
    // 删除我负责的数据
    removeResponsible(id) {
      this.$dialog
        .confirm({
          title: '删除',
          message: '确定删除'
        })
        .then(() => {
          const params = { ids: id }
          deleteProject(params).then(resp => {
            if (resp.status === 200) {
              this.$toast('删除成功')
              this.getResponsibleData()
              this.getData()
            }
          })
        })
        .catch(() => {
          // on cancel
        })
    },
    // 删除我参与的数据
    removeParticipate(id) {
      this.$dialog
        .confirm({
          title: '删除',
          message: '确定删除'
        })
        .then(() => {
          const params = { ids: id }
          deleteProject(params).then(resp => {
            if (resp.status === 200) {
              this.$toast('删除成功')
              this.getParticipateData()
              this.getData()
            }
          })
        })
        .catch(() => {
          // on cancel
        })
    },
    // 删除全部中的数据
    removeAll(id) {
      this.$dialog
        .confirm({
          title: '删除',
          message: '确定删除'
        })
        .then(() => {
          const params = { ids: id }
          deleteProject(params).then(resp => {
            if (resp.status === 200) {
              this.$toast('删除成功')
              this.getData()
              this.getResponsibleData()
              this.getParticipateData()
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
/deep/ .van-tabs__line {
  background: #018afe;
}
/deep/ .van-tabs__content {
  padding: 12px;
}
p {
  margin: 0;
  padding: 0;
}
.content {
  margin-bottom: 10px;
  li {
    height: 130px;
    background: #fff;
    padding: 10px;
    border-radius: 6px;
  }
  .title {
    font-size: 16px;
    color: #409eff;
    margin-bottom: 5px;
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
    color: #777;
    font-size: 12px;
    margin-top: 8px;
    line-height: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    max-height: 80px;
    /deep/ p {
      margin: 0 !important;
      padding: 0 !important;
    }
  }
}
.van-button {
  height: 150px;
  padding: 10px;
  border-radius: 0 6px 6px 0;
}
.van-tabs--line /deep/ .van-tabs__wrap {
  position: fixed;
  top: 45px;
  left: 0;
  right: 0;
  z-index: 100;
}
/deep/ .van-tab__pane {
  margin-top: 44px;
}
</style>
