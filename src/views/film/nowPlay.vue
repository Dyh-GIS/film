<template>
    <div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
          <van-cell v-for="item in hotFilms" :key="item.filmId" @click="toDetail(item.filmId)">
            <img :src=item.poster @click="toDetail(item.filmId)">
            <div class="detail">
              <div class="title">{{item.name}}</div>
              <div class="content">
                <div :class="item.grade?'':'hidden'">观众评分：<span style="color: #ff5f16;">{{item.grade}}</span></div>
                <!-- 主演 过滤器-->
                <div class="actors">主演： {{item.actors | actorsFilter}}</div>
                <!-- 地区时长 -->
                <div><span>{{item.nation}} | {{item.runtime}}</span></div>
              </div>
            </div>
          </van-cell>
        </van-list>
    </div>
</template>

<script>
import http from '@/util/http'
import vue from 'vue'
vue.filter('actorsFilter', (data) => {
  if (data === undefined) return '暂无主演'
  return data.map(item => item.name).join(' ')
}
)
export default {
  data () {
    return {
      hotFilms: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0
    }
  },
  methods: {
    toDetail (id) {
      this.$router.push({ path: '/detail', query: { filmId: id } })
    },
    onLoad () {
      if (this.hotFilms.length === this.total && this.total !== 0) {
        this.finished = true
        return
      }
      this.current++
      setTimeout(() => {
        http(
          {
            url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=1336497`,
            headers: {
              ' X-Host': 'mall.film-ticket.film.list'
            }
          }).then(
          res => {
            this.hotFilms = [...this.hotFilms, ...res.data.data.films]
            this.loading = false
          }
        )
      }, 1000)
    }
  },
  mounted () {
    http(
      {
        url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=1336497`,
        headers: {
          ' X-Host': 'mall.film-ticket.film.list'
        }
      }).then(
      res => {
        this.hotFilms = res.data.data.films
        this.total = res.data.data.total
      }
    )
  }
}

</script>

<style lang="scss" scoped>
.van-list{
  .van-cell{
    overflow: hidden;
    padding: .9375rem;
    .detail{
      padding-left: 4.375rem;
    }
    img{
      width: 4.125rem;
      float: left;
    }
    .title{
      font-size: 16px;
    }
    .content{
      font-size: 13px;
      color: rgb(145, 135, 135);
      .actors{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

      }
    }
  }
}
.hidden{
  // 占位隐藏
  visibility: hidden;
}
</style>
