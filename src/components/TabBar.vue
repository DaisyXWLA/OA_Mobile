<template>
  <div>
    <van-tabbar fixed route>
      <van-tabbar-item to="/index">
        <span>首页</span>
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? homeIcon.active : homeIcon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/message" badge="3">
        <span>消息</span>
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? messageIcon.active : messageIcon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/addressList">
        <span>通讯录</span>
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? addressListIcon.active : addressListIcon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <span>我的</span>
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? myIcon.active : myIcon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'TabBar',
  data() {
    return {
      active: 0,
      homeIcon: {
        active: require('../../static/home-hover.png'),
        inactive: require('../../static/home.png')
      },
      messageIcon: {
        active: require('../../static/information-hover.png'),
        inactive: require('../../static/information.png')
      },
      addressListIcon: {
        active: require('../../static/address-list-hover.png'),
        inactive: require('../../static/address-list.png')
      },
      myIcon: {
        active: require('../../static/my-hover.png'),
        inactive: require('../../static/my.png')
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.van-tabbar--fixed {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
</style>
