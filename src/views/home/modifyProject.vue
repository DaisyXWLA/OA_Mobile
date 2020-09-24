<template>
  <div>
    <van-nav-bar fixed title="编辑项目" left-arrow @click-left="back"></van-nav-bar>
    <van-form @submit="onSubmit" style="margin-top:44px">
      <van-field
        v-model="projectName"
        name="项目名称"
        label="项目名称"
        placeholder="项目名称"
        :rules="[{ required: true, message: '请填写项目名称' }]"
      />
      <van-field
        v-model="projectCode"
        name="项目编号"
        label="项目编号"
        placeholder="项目编号"
        :rules="[{ required: true, message: '请填写项目编号' }]"
      />
      <van-field
        v-model="principal"
        name="负责人"
        label="负责人"
        is-link
        readonly
        placeholder="请选择负责人"
        @click="showPrincipalOption = true"
      ></van-field>
      <van-action-sheet
        v-model="showPrincipalOption"
        :round="false"
        :actions="principalOption"
        @select="principalSelect"
      ></van-action-sheet>
      <van-field
        v-model="projectType"
        name="项目类型"
        label="项目类型"
        is-link
        readonly
        placeholder="请选择项目类型"
        @click="showProjectTypeOption = true"
      ></van-field>
      <van-action-sheet
        v-model="showProjectTypeOption"
        :round="false"
        :actions="projectTypeOption"
        @select="projectTypeSelect"
      ></van-action-sheet>
      <van-field
        v-model="projectCycle"
        name="项目周期"
        label="项目周期"
        is-link
        readonly
        placeholder="请选择项目周期"
        @click="showProjectCycleOption = true"
        :border="false"
      ></van-field>
      <van-calendar v-model="showProjectCycleOption" type="range" @confirm="onConfirm" />
      <p></p>
      <van-field
        class="description"
        v-model="description"
        rows="2"
        autosize
        label="项目描述"
        type="textarea"
        maxlength="1000"
        placeholder="请输入项目描述"
        show-word-limit
        :border="false"
      />
      <p></p>
      <van-field label="项目成员" readonly style="border:none" :border="false" />
      <div class="member">
        <ul>
          <li v-for="(item, i) in memberList" :key="i">
            <p>
              <span>{{ item.name }}</span>
            </p>
            <span class="closeBtn" @click="deleteMember(item)">
              <van-icon name="cross" size="8" color="#fff" />
            </span>
          </li>
          <p class="addBtn">
            <van-icon name="plus" @click="showMemberOption = true"></van-icon>
          </p>
        </ul>
      </div>
      <van-action-sheet
        v-model="showMemberOption"
        :round="false"
        :actions="principalOption"
        @select="memberSelect"
      ></van-action-sheet>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">更新</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { findOne } from '@/api/project.js'
import { update } from '@/api/project.js'
import { pullDownInfo } from '@/api/project.js'
export default {
  data() {
    return {
      projectName: '',
      projectCode: '',
      principal: '',
      principalOption: [],
      showPrincipalOption: false,
      projectType: '短期项目',
      projectTypeOption: [{ name: '短期项目' }, { name: '长期项目' }, { name: '运维项目' }],
      showProjectTypeOption: false,
      projectCycle: '',
      projectStartTime: '',
      projectEndTime: '',
      showProjectCycleOption: false,
      description: '',
      member: '',
      showMemberOption: false,
      memberList: [],
      deleteMemberBtn: false,
      datas: {}
    }
  },
  created() {
    this.$parent.showTab = false
  },
  mounted() {
    this.getData(this.$route.query.id)
    this.getMember()
  },
  methods: {
    // 获取数据
    getData(id) {
      const params = { id: id }
      findOne(params).then(resp => {
        if (resp.status === 200) {
          this.projectName = resp.body.projectName
          this.projectCode = resp.body.projectCode
          this.principal = resp.body.projectLeader
          this.projectType = resp.body.projectTypeName
          this.projectStartTime = resp.body.planStartDate
          this.projectEndTime = resp.body.planEndDate
          this.projectCycle = `${resp.body.planStartDate} - ${resp.body.planEndDate}`
          const memberArr = resp.body.memberNames.split(',')
          for (let i = 0; i < memberArr.length; i++) {
            const memberObj = {}
            memberObj.name = memberArr[i]
            this.memberList.push(memberObj)
          }
          this.description = resp.body.projectContent
          this.member = resp.body.memberNames
        }
      })
    },
    back() {
      this.$router.back(-1)
    },
    onSubmit() {
      const params = {
        id: this.$route.query.id,
        projectName: this.projectName,
        projectCode: this.projectCode,
        projectLeader: this.principal,
        projectType: this.projectType,
        planStartDate: this.projectStartTime,
        planEndDate: this.projectEndTime,
        projectContent: this.description,
        ids: this.member
      }
      update(params).then(resp => {
        if (resp.status === 200) {
          this.$toast('编辑成功')
          // setTimeout(() => {
          //   this.$router.back(-1)
          // }, 500)
        } else {
          this.$toast('编辑失败')
        }
      })
    },
    // 获取人员
    getMember() {
      pullDownInfo().then(resp => {
        if (resp.status === 200) {
          this.principalOption = resp.body.map((item, index) => {
            return Object.assign({}, { name: item.title })
          })
        }
      })
    },
    principalSelect(data) {
      this.showPrincipalOption = false
      this.principal = data.name
    },
    projectTypeSelect(data) {
      this.showProjectTypeOption = false
      this.projectType = data.name
    },
    projectCycleSelect(data) {
      this.showProjectCycleOption = false
      this.projectCycle = data.name
    },
    memberSelect(data) {
      this.showMemberOption = false
      this.memberList.push(data)
      this.memberList = Array.from(new Set(this.memberList))
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
      const memberArr = []
      for (let i = 0; i < this.memberList.length; i++) {
        memberArr.push(this.memberList[i].name)
      }
      this.member = memberArr.join(',')
    },
    // 项目周期
    formatDate(date) {
      return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
    },
    onConfirm(date) {
      const [start, end] = date
      this.showProjectCycleOption = false
      this.projectCycle = `${this.formatDate(start)} - ${this.formatDate(end)}`
      this.projectStartTime = this.formatDate(start)
      this.projectEndTime = this.formatDate(end)
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
    max-height: 150px;
    overflow: auto;
  }
  /deep/ .van-field {
    border: none;
  }
}
.member {
  background: #fff;
  padding: 5px 12px;
  ul {
    max-height: 210px;
    overflow: auto;
    li {
      position: relative;
      display: inline-block;
      p {
        display: inline-block;
        width: 60px;
        height: 60px;
        line-height: 60px;
        border-radius: 50%;
        text-align: center;
        margin: 5px 12px;
        background: #018afe;
        color: #fff;
      }
      .closeBtn {
        display: inline-block;
        width: 14px;
        height: 14px;
        line-height: 14px;
        padding: 2px;
        text-align: center;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.2);
        position: absolute;
        top: 0;
        right: 0;
      }
    }
    .addBtn {
      display: inline-block;
      width: 60px;
      height: 60px;
      // line-height: 60px;
      border-radius: 50%;
      background: #e6e6e6;
      text-align: center;
      margin: 5px 12px;
      vertical-align: middle;
      .van-icon {
        font-size: 30px;
        color: #999;
        padding-top: 16px;
      }
    }
  }
}
</style>
