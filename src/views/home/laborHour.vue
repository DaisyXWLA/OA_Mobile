<template>
  <div>
    <van-overlay :show="showManHour" @click="showManHour = false">
      <div class="wrapper">
        <div class="block" @click.stop>
          <van-form validate-first @failed="onFailed">
            <van-row>
              <van-col span="24">
                <p>工时</p>
              </van-col>
              <van-col span="24">
                <van-field
                  v-model="time"
                  type="number"
                  name="pattern"
                  placeholder="请输入工时"
                  :rules="[{ pattern, message: '请输入正确格式的内容' }]"
                />
              </van-col>
              <van-col span="24" align="right">
                <div class="manHourBtn">
                  <button @click="submit">保存</button>
                  <button @click="showManHour = false">取消</button>
                </div>
              </van-col>
            </van-row>
          </van-form>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { workHour } from '@/api/task.js'
export default {
  data() {
    return {
      showManHour: false,
      time: '',
      pattern: /\d{6}/,
      id: ''
    }
  },
  created() {
    this.$parent.showTab = false
  },
  mounted() {},
  methods: {
    onFailed(errorInfo) {},
    submit() {
      if (this.time !== '') {
        const params = { id: this.id, useHours: this.time }
        workHour(params).then(resp => {
          if (resp.status === 200) {
            this.showManHour = false
            this.$emit('getUnfinishedData')
          } else {
            this.showManHour = false
          }
        })
      }
    },
    showOrHideOverlay(id) {
      this.showManHour = true
      this.id = id
    }
  }
}
</script>
<style lang="scss" scoped>
p {
  margin: 0;
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
</style>
