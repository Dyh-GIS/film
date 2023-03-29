<template>
    <div>
        <div class="city_header">
            <van-nav-bar title="当前城市" @click-left="back">
                <template #left>
                    <van-icon name="close" size="18"/>
                </template>
            </van-nav-bar>
        </div>
        <div class="city_list">
            <van-index-bar :index-list="computedCities" :sticky="false" v-for="data in cityList" :key="data.firstLetter">
                <van-index-anchor  :index="data.firstLetter" />
                <van-cell v-for="item in data.cities" :key="item.cityId" :title="item.name" @click="changeCity(item)"/>
            </van-index-bar>
        </div>
    </div>
</template>

<script>
import http from '@/util/http'

export default {
  data () {
    return {
      cityList: [],
      hotCity: []
    }
  },
  computed: {
    computedCities () {
      return this.cityList.map(item => item.firstLetter)
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    handleCities (arr) {
      const cities = []
      // 准备26个大写英文字母
      const letterList = []
      for (let i = 65; i < 91; i++) {
        letterList.push(String.fromCharCode(i))
      }
      letterList.forEach(letter => {
        // 根据拼音将城市按首字母分类
        const list = arr.filter(item => item.pinyin.substring(0, 1).toUpperCase() === letter)
        // 判断是否为空数组
        if (list.length > 0) {
          cities.push({
            firstLetter: letter,
            cities: list
          })
        }
      })
      return cities
    },
    changeCity (data) {
      this.$store.commit('changeCityId', data.cityId)
      this.$store.commit('changeCityName', data.name)
      this.$router.push('/nowplaying')
    }
  },
  destroyed () {
    this.$store.commit('show')
  },
  mounted () {
    this.$store.commit('hidden')
    http({
      url: '/gateway?k=949804',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      this.cityList = this.handleCities(res.data.data.cities)
      console.log(this.cityList)
    })
  }
}

</script>

<style lang="scss" scoped>
</style>
