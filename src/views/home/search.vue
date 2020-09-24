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
              <p class="text" v-html="item.projectContent"></p>
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
    </div>
  </div>
</template>
<script>
import { findAll } from '@/api/project.js'
export default {
  data() {
    return {
      value: '',
      datas: [],
      cancel: true,
      pic: require('../../../static/no-data.png'),
      noData: true,
      list: false,
      loading: false,
      finished: false
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
      const params = { projectName: this.value }
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
    }
  }
}
</script>
<style lang="scss" scoped>
.searchBar {
  background: #018afe;
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
    height: 130px;
    background: #fff;
    padding: 10px;
    border-radius: 6px;
  }
  .title {
    font-size: 16px;
    color: #409eff;
    margin-bottom: 5px;
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
.list {
  padding: 12px;
}
.van-search /deep/ .van-cell {
  padding: 1px 10px 1px 1px;
}
.van-search__content {
  border-radius: 15px;
}
</style>
