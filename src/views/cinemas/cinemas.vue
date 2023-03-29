<template>
    <div>
        <!-- 导航栏 -->
        <div>
            <van-nav-bar title="影院" ref="nav" @click-left="toCity" @click-right="Search">
                <template #left>
                    <span>{{$store.state.cityName}}</span>
                    <van-icon name="arrow-down" size="18"/>
                </template>
                <template #right>
                    <van-icon name="search" size="18" />
                </template>
            </van-nav-bar>
        </div>
        <div class="box" :style="{ height: height }">
            <ul>
                <li v-for="item in $store.state.cinemaList" :key="item.cinemaId">
                    <div class="left">
                        <div class="left-name">
                            {{ item.name }}
                        </div>
                        <div class="left-address">
                            {{ item.address }}
                        </div>
                    </div>
                    <div class="right">
                        <span style="color:red ;font-size: 15px;">￥{{ item.lowPrice / 100 }}起</span>
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import BetterScroll from 'better-scroll'
export default {
  data () {
    return {
      cinemaList: null,
      height: '0px'
    }
  },
  mounted () {
    // this.$store.commit('show')
    // 获取高度
    this.height = document.documentElement.clientHeight - document.querySelector('footer').offsetHeight -
     this.$refs.nav.$el.offsetHeight + 'px'

    // 分发
    if (this.$store.state.cinemaList.length === 0) {
      this.$store.dispatch('getCinemas', this.$store.state.cityId).then(
        res => {
          this.$nextTick(() => {
            new BetterScroll('.box', { scrollbar: { fade: true } })
          })
        }
      )
    } else {
      this.$nextTick(() => {
        new BetterScroll('.box', { scrollbar: { fade: true } })
      })
    }
    /*   http({
      url: `/gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=7466371`,
      headers: {
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(res => {
      this.cinemaList = res.data.data.cinemas
      this.$nextTick(() => {
        new BetterScroll('.box', { scrollbar: { fade: true } })
      })
    }) */
  },
  methods: {
    toCity () {
      this.$router.push('/')
      // 清除缓存
      this.$store.commit('clearCinemaCache')
    },
    Search () {
      this.$router.push('/search')
    }
  }
}
</script>

<style lang="scss" scoped>
li {
    padding: .9375rem;
    display: flex;
    justify-content: space-between;
    border: .3125rem solid #f4f4f4;
    border-bottom: 0;

    .left {
        width: 15rem;
        // 文字过长省略
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        .left-name {
            font-size: 15px;
        }

        .left-address {
            font-size: 12px;
            margin-top: .3125rem;
            color: #797d82;

        }
    }
}

.box {
    overflow: hidden;
    position: relative;
}
</style>
