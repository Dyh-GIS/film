<template>
    <div v-if="filmInfo">
        <detail-header ><div v-scroll="30">{{filmInfo.name}}</div></detail-header>
        <div :style="{backgroundImage:'url('+filmInfo.poster+')'}" class="poster"></div>
        <!-- 内容 -->
        <div class="content">
            <div>{{filmInfo.name}}</div>
            <div >
                <div class="detail-text">{{filmInfo.category}}</div>
                <div class="detail-text">{{filmInfo.premiereAt | dateFilter}} 上映</div>
                <div class="detail-text">{{filmInfo.nation}} | {{ filmInfo.runtime }} 分钟</div>
                <div class="detail-text" style="line-height: .9375rem; " :class="isHidden?'hidden':''">
                    {{filmInfo.synopsis}}
                </div>
                <div style="text-align: center;"><i :class="isHidden?'el-icon-arrow-down':'el-icon-arrow-up'" @click="isHidden=!isHidden"></i></div>
            </div>
        </div>
        <!-- 演职员表 -->
        <div class="actors">
          <div class="title">演职员表</div>
            <detail-swiper :perview="3.5" name="actor">
              <swiper-item v-for="(data,index) in filmInfo.actors" :key="index">
                <div :style="{backgroundImage:'url('+data.avatarAddress+')'}" class="avatar"></div>
              <div style="text-align: center; font-size: 12px;">{{data.name}}</div>
              <div style="text-align: center; font-size: 12px; color: #797d82;">{{data.role}}</div>
              </swiper-item>
            </detail-swiper>
        </div>
        <!-- 剧照 -->
        <div class="photos">
          <div class="title">剧照</div>
          <detail-swiper :perview="2" name="photo">
              <swiper-item v-for="(data,index) in filmInfo.photos" :key="index" >
                <div :style="{backgroundImage:'url('+data+')'}" class="avatar" @click="preViewImg(index)"></div>
              </swiper-item>
            </detail-swiper>
         <!--  <detail-swiper>
              <swiper-item v-for="(data,index) in filmInfo.photos" :key="index">
                <div :style="{backgroundImage:'url('+data+')'}" ></div>
              </swiper-item>
            </detail-swiper> -->
        </div>
    </div>
</template>

<script>
import http from '@/util/http'
import moment from 'moment'
import Vue from 'vue'
import detailSwiper from '@/components/detail/detailSwiper.vue'
import swiperItem from '@/components/detail/swiperItem.vue'
import detailHeader from '@/components/detail/detailHeader.vue'
import { ImagePreview } from 'vant'

Vue.use(ImagePreview)
moment.locale('zh-cn')
Vue.filter('dateFilter', (data) => {
  return moment(data * 1000).format('YYYY-MM-DD')
})
// 指令封装
Vue.directive('scroll', {
  inserted (el, binding) {
    // inserted只调用一次
    // 设置组件隐藏
    el.style.display = 'none'
    // 监听滚动事件
    window.onscroll = () => {
      if ((document.documentElement.scrollTop || document.body.scrollTop) > binding.value) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  // 销毁指令
  unbind () {
    window.onscroll = null
  }
})
export default {
  data () {
    return {
      isHidden: true,
      filmInfo: null
    }
  },
  methods: {
    // 图片预览
    preViewImg (index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        closeable: true
      })
    }
  },
  components: {
    detailSwiper,
    swiperItem,
    detailHeader
  },
  mounted () {
    this.$store.commit('hidden')
  },
  destroyed () {
    this.$store.commit('show')
  },
  created () {
    http({
      url: `/gateway?filmId=${this.$route.query.filmId}&k=8386040`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      this.filmInfo = res.data.data.film
    })
  }
}
</script>
<style lang="scss" scoped>
.poster{
    width: 100%;
    height: 13.125rem;
    background-position: center;
    background-size: cover;
}
.content{
    padding: .9375rem;
    border: .3125rem solid #f4f4f4;
    border-bottom: 0;
    border-top: 0;
    .detail-text{
        font-size: 13px;
        color: #797d82;
        margin-top: .25rem;
    }
    .hidden{
        overflow: hidden;
        height: 1.875rem;
    }
}
.avatar{
  width: 100%;
  height: 5.3125rem;
  background-position: center;
  background-size: cover;
}
.actors{
  padding: .9375rem;
  border: .3125rem solid #f4f4f4;

}
  .title{
  padding-bottom: .625rem;
}
.photos{
   padding: .9375rem;
    border: .3125rem solid #f4f4f4;
    border-bottom: 0;
    border-top: 0;
}
</style>
