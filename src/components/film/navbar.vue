<!-- 底部导航组件 -->
<template>
    <div>
        <footer>
            <ul>
                <router-link v-for="item in data" :key="item.id" :to="item.path" custom v-slot="{navigate,isActive}" >
            <li @click="navigate" :class="isActive?'highlight':''">
              <i :class=item.url></i>
              <span>{{item.name}}</span>
            </li>
                </router-link>
            </ul>
        </footer>
    </div>
</template>

<script>
export default {
  data () {
    return {
      data: [
        {
          id: 1,
          path: '/nowPlaying',
          name: '电影',
          url: 'el-icon-video-camera-solid'
        },
        {
          id: 2,
          path: '/cinemas',
          name: '影院',
          url: 'el-icon-s-platform'
        },
        {
          id: 3,
          path: '/center',
          name: '我的',
          url: 'el-icon-s-custom'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
    /* 高亮 */
    .highlight{
      color: #ff5f16;
    }
    footer{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3.0625rem;
        background-color: #f4f4f4;
        z-index: 100;//设置层级
        ul{
            display: flex;
            li{
                flex:1;
                line-height: 1.5625rem;
                text-align: center;
                display: flex;
                flex-direction: column;
                i{
                  font-size: 20px;
                  margin-top: .125rem;
                }
                span{
                  margin-top: .125rem;
                  font-size: 16px;
                }
            }
        }
    }
</style>
