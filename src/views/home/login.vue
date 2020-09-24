<template>
  <div class="login">
    <div class="login-bg">
      <img :src="imgBg" alt />
      <div class="login-con">
        <img :src="imgLog" alt />
        <van-form @submit="onSubmit">
          <van-row>
            <van-col span="3">
              <img :src="userIcon" alt />
            </van-col>
            <van-col span="21">
              <van-field
                v-model="username"
                name="用户名"
                placeholder="请输入用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
              />
            </van-col>
          </van-row>
          <van-row>
            <van-col span="3">
              <img :src="pwdIcon" alt />
            </van-col>
            <van-col span="19">
              <van-field
                v-model="password"
                :type="type"
                name="密码"
                placeholder="请输入密码"
                :rules="[{ required: true, message: '请填写密码' }]"
              />
            </van-col>
            <van-col span="2" @click="switchPwdType">
              <img :src="eyeIcon" alt />
            </van-col>
          </van-row>
          <van-row style="border:none;margin-top:20px;padding:0 12px">
            <van-col span="12" align="left">
              <van-checkbox icon-size="16" v-model="checked" shape="square">记住密码</van-checkbox>
            </van-col>
            <van-col span="12" align="right">
              <a href="#" style="color:inherit">忘记密码？</a>
            </van-col>
          </van-row>
          <div style="margin-top:30px">
            <van-button round block type="info" native-type="submit" @click="login">提交</van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getLogin } from '@/api/login.js'
import { getLoginInfo } from '@/api/login.js'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      imgBg: require('../../../static/login-bg.png'),
      imgLog: require('../../../static/login-logo.png'),
      userIcon: require('../../../static/username.png'),
      pwdIcon: require('../../../static/password.png'),
      eyeIcon: require('../../../static/pwd-close-eye.png'),
      username: '',
      password: '',
      checked: false,
      type: 'password'
    }
  },

  computed: {},
  mounted() {},
  methods: {
    onSubmit() {},
    login() {
      const params = { username: this.username, password: this.password, grant_type: 'password' }
      Cookies.set('token', 'Basic aHlrdy1vYTpoeWt3LW9hLXNlY3JldA==')
      getLogin(params).then(resp => {
        // console.log(resp)
        if (resp.message === 'Source must not be null') {
          this.$toast.fail('用户名错误，请重新输入')
        } else if (resp.oAuth2ErrorCode === 'invalid_grant') {
          this.$toast.fail('密码错误，请重新输入')
        } else if (resp.tokenType === 'bearer') {
          Cookies.set('token', resp.tokenType + ' ' + resp.value)
          getLoginInfo(params).then(resp => {
            Cookies.set('role', resp.roleModels)
            Cookies.set('botten', resp.modelActions)
            Cookies.set('userId', resp.id)
            this.$router.push({ path: '/index' })
          })
        }
      })
    },
    switchPwdType() {
      if (this.password !== '') {
        if (this.type === 'password') {
          this.type = 'text'
          this.eyeIcon = require('../../../static/pwd-open-eye.png')
        } else {
          this.type = 'password'
          this.eyeIcon = require('../../../static/pwd-close-eye.png')
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  background: #fff;
  height: 100vh;
  .login-bg {
    text-align: center;
    position: relative;
    img {
      width: 100%;
    }
    .login-con {
      position: absolute;
      top: 75%;
      left: 0;
      right: 0;
      img {
        width: 100px;
      }
      .van-form {
        padding: 20px;
        img {
          width: 20px;
          margin-top: 10px;
        }
        .van-row {
          border-bottom: 1px solid #ddd;
        }
        .van-cell {
          background: none;
        }
      }
    }
  }
}
</style>
