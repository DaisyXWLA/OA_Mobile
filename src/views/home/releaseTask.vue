<template>
  <div>
    <van-nav-bar fixed title="发布任务" left-arrow @click-left="back"></van-nav-bar>
    <van-form @submit="onSubmit" style="margin-top:44px">
      <van-field
        v-model="taskName"
        name="任务名称"
        label="任务名称"
        placeholder="任务名称"
        :rules="[{ required: true, message: '请填写任务名称' }]"
      />
      <van-field
        v-model="taskType"
        name="任务类型"
        label="任务类型"
        is-link
        readonly
        placeholder="请选择任务类型"
        @click="showTaskTypeOption = true"
      ></van-field>
      <van-action-sheet
        v-model="showTaskTypeOption"
        :round="false"
        :actions="taskTypeOption"
        @select="taskTypeSelect"
      ></van-action-sheet>
      <van-field
        v-model="assign"
        name="指派给"
        label="指派给"
        is-link
        readonly
        placeholder="请选择指派给"
        @click="showAssignOption = true"
      ></van-field>
      <van-action-sheet
        v-model="showAssignOption"
        :round="false"
        :actions="assignOption"
        @select="assignSelect"
      ></van-action-sheet>
      <!-- 开始时间 -->
      <van-field
        v-model="taskStartTime"
        name="任务周期"
        label="任务周期"
        is-link
        readonly
        placeholder="请选择任务开始时间"
        @click="showTaskStartTimeOption = true"
        :rules="[{ required: true, message: '请选择任务开始时间' }]"
      ></van-field>
      <van-popup v-model="showTaskStartTimeOption" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          title="选择完整时间"
          :formatter="formatter"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="showTaskStartTimeOption = false"
          @confirm="startTimeConfirm"
        />
      </van-popup>
      <!-- 结束时间 -->
      <van-field
        class="endTime"
        v-model="taskEndTime"
        is-link
        readonly
        placeholder="请选择任务结束时间"
        @click="showTaskEndTimeOption = true"
        :rules="[{ required: true, message: '请选择任务结束时间' }]"
      ></van-field>
      <van-popup v-model="showTaskEndTimeOption" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          title="选择完整时间"
          :formatter="formatter"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="showTaskEndTimeOption = false"
          @confirm="endTimeConfirm"
        />
      </van-popup>
      <van-field
        v-model="relatedProject"
        name="关联项目"
        label="关联项目"
        is-link
        readonly
        placeholder="请选择关联项目"
        @click="showRelatedProjectOption = true"
      ></van-field>
      <van-action-sheet
        v-model="showRelatedProjectOption"
        :round="false"
        :actions="relatedProjectOption"
        @select="relatedProjectSelect"
      ></van-action-sheet>
      <div class="copier">
        <van-field
          class="copier-ipt"
          label="抄送人"
          :placeholder="placeholder"
          is-link
          readonly
          @click="showMemberOption = true"
        />
        <div class="member">
          <ul>
            <li v-for="(item, i) in memberList" :key="i">
              <p>
                <span>{{ item.name }}</span>
                <span class="closeBtn" @click="deleteMember(item)">
                  <van-icon name="cross" size="8" color="#999" />
                </span>
              </p>
              <span v-if="memberList.length > 1">，</span>
            </li>
          </ul>
        </div>
      </div>
      <van-action-sheet
        v-model="showMemberOption"
        :round="false"
        :actions="memberOption"
        @select="memberSelect"
      ></van-action-sheet>
      <van-row class="priority">
        <van-col span="24">
          <van-field label="优先级" readonly />
        </van-col>
        <van-col span="24">
          <van-row type="flex" justify="center">
            <van-col span="5" v-for="(item, i) in priorityList" :key="i" align="center">
              <van-tag
                ref="tag"
                round
                size="large"
                :class="{ checked: i === priority }"
                @click="getPriority(item, i)"
              >{{ item.name }}</van-tag>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
      <p></p>
      <van-field
        class="description"
        v-model="description"
        rows="2"
        autosize
        label="任务描述"
        type="textarea"
        maxlength="1000"
        placeholder="请输入任务描述"
        show-word-limit
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">保存</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { save } from '@/api/task.js'
import { pullDownInfo } from '@/api/project.js'
import { pullDownProject } from '@/api/task.js'
export default {
  data() {
    return {
      taskName: '',
      password: '',
      taskType: '',
      taskTypeOption: [
        { name: '项目任务' },
        { name: '突发任务' },
        { name: '周期任务' },
        { name: '触发任务' },
        { name: '其他任务' },
        { name: '系统缺陷' }
      ],
      showTaskTypeOption: false,
      assign: '',
      assignOption: [],
      showAssignOption: false,
      taskStartTime: '',
      taskEndTime: '',
      taskCycleOption: [],
      showTaskStartTimeOption: false,
      showTaskEndTimeOption: false,
      relatedProject: '',
      relatedProjectOption: [],
      showRelatedProjectOption: false,
      description: '',
      member: '',
      showMemberOption: false,
      memberOption: [],
      memberList: [],
      placeholder: '请选择抄送人',
      deleteMemberBtn: false,
      priorityList: [{ name: '重要' }, { name: '次要' }, { name: '紧急' }, { name: '一般' }],
      priority: 0,
      priorityName: '',
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date()
    }
  },
  created() {
    this.$parent.showTab = false
  },
  mounted() {
    this.getMember()
    this.getProject()
    this.getPriorityValue()
  },
  methods: {
    back() {
      this.$router.push({ path: '/task' })
    },
    onSubmit() {
      const params = {
        taskName: this.taskName,
        taskType: this.taskType,
        executor: this.assign,
        planStartTime: this.taskStartTime,
        planEndTime: this.taskEndTime,
        projectInfo: this.relatedProject,
        copyPerson: this.member,
        priority: this.priorityName,
        taskContent: this.description
      }
      save(params).then(resp => {
        if (resp.status === 200) {
          this.$toast('任务发布成功')
          this.taskName = ''
          this.taskType = ''
          this.assign = ''
          this.taskStartTime = ''
          this.taskEndTime = ''
          this.relatedProject = ''
          this.memberList = []
          this.placeholder = '请选择抄送人'
          this.priority = 0
          this.description = ''
        } else {
          this.$toast('任务发布失败')
        }
      })
    },
    taskTypeSelect(data) {
      this.showTaskTypeOption = false
      this.taskType = data.name
    },
    assignSelect(data) {
      this.showAssignOption = false
      this.assign = data.name
    },
    relatedProjectSelect(data) {
      this.showRelatedProjectOption = false
      this.relatedProject = data.name
    },
    memberSelect(data) {
      this.showMemberOption = false
      this.memberList.push(data)
      this.memberList = Array.from(new Set(this.memberList))
      if (this.memberList.length > 0) {
        this.placeholder = ''
      } else {
        this.placeholder = '请选择抄送人'
      }
      const memberArr = []
      for (let i = 0; i < this.memberList.length; i++) {
        memberArr.push(this.memberList[i].name)
      }
      this.member = memberArr.join(',')
    },
    deleteMember(data) {
      for (let i = 0; i < this.memberList.length; i++) {
        if (this.memberList[i] === data) {
          this.memberList.splice(i, 1)
        }
      }
      if (this.memberList.length > 0) {
        this.placeholder = ''
      } else {
        this.placeholder = '请选择抄送人'
      }
      const memberArr = []
      for (let i = 0; i < this.memberList.length; i++) {
        memberArr.push(this.memberList[i].name)
      }
      this.member = memberArr.join(',')
    },
    getPriority(data, index) {
      this.priority = index
      this.priorityName = data.name
    },
    getPriorityValue() {
      if (this.priority === 0) {
        this.priorityName = '重要'
      }
    },
    // 获取人员
    getMember() {
      pullDownInfo().then(resp => {
        if (resp.status === 200) {
          this.assignOption = resp.body.map((item, index) => {
            return Object.assign({}, { name: item.title })
          })
          this.memberOption = resp.body.map((item, index) => {
            return Object.assign({}, { name: item.title })
          })
        }
      })
    },
    // 获取项目
    getProject() {
      pullDownProject().then(resp => {
        if (resp.status === 200) {
          this.relatedProjectOption = resp.body.map((item, index) => {
            return Object.assign({}, { name: item.title })
          })
        }
      })
    },
    // 选项格式化函数
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      } else if (type === 'hour') {
        return `${value}时`
      } else if (type === 'minute') {
        return `${value}分`
      } else if (type === 'second') {
        return `${value}秒`
      }
      return value
    },
    startTimeConfirm(date) {
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()
      if (month >= 1 && month <= 9) {
        month = `0${month}`
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`
      }
      if (hour >= 0 && hour <= 9) {
        hour = `0${hour}`
      }
      if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`
      }
      this.taskStartTime = `${year}.${month}.${day} ${hour}:${minute}`
      this.showTaskStartTimeOption = false
    },
    endTimeConfirm(date) {
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()
      if (month >= 1 && month <= 9) {
        month = `0${month}`
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`
      }
      if (hour >= 0 && hour <= 9) {
        hour = `0${hour}`
      }
      if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`
      }
      this.taskEndTime = `${year}.${month}.${day} ${hour}:${minute}`
      this.showTaskEndTimeOption = false
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
.description {
  /deep/ .van-field__value {
    max-height: 300px;
    overflow: auto;
  }
  /deep/ .van-field {
    border: none;
  }
}
.copier {
  position: relative;
  background: #fff;
  .copier-ipt {
    z-index: 1;
    background: none;
  }
  .member {
    position: absolute;
    top: 0;
    right: 30px;
    z-index: 1;
    ul {
      width: 240px;
      // max-width: 240px;
      overflow-y: hidden;
      overflow-x: scroll;
      white-space: nowrap;
      li {
        display: inline-block;
        margin-right: 5px;
        p {
          display: inline-block;
          margin-right: 10px;
          position: relative;
          font-size: 14px;
          .closeBtn {
            position: absolute;
            top: -8px;
            right: -10px;
            z-index: 999 !important;
          }
        }
      }
    }
  }
}
.priority {
  background: #fff;
  /deep/ .van-col {
    &:nth-child(2) {
      font-size: 14px;
      margin-bottom: 10px;
    }
  }
  .van-tag--round {
    padding: 4px 18px;
  }
  .van-tag--large {
    font-size: 12px;
  }
}
.checked {
  background: #409eff;
}
.endTime {
  /deep/ .van-field__control {
    width: 60%;
    margin-left: 28%;
  }
  /deep/ .van-field__error-message {
    width: 60%;
    margin-left: 28%;
  }
}
</style>
