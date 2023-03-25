import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer: (state) => {
      return {
        cityId: state.cityId,
        cityName: state.cityName
      }
    }
  }

  )],
  // 公共状态
  state: {
    cityId: 500100,
    cityName: '重庆',
    cinemaList: [],
    navbarShow: true
  },
  getters: {
  },
  // 修改状态,只支持同步
  mutations: {
    changeCityId (state, cityId) {
      state.cityId = cityId
    },
    changeCityName (state, cityName) {
      state.cityName = cityName
    },
    changeCinemaData (state, data) {
      state.cinemaList = data
    },
    clearCinemaCache (state) {
      state.cinemaList = []
    },
    show (state) {
      state.navbarShow = true
    },
    hidden (state) {
      state.navbarShow = false
    }

  },
  // 同步和异步
  actions: {
    // 获取影院数据并缓存
    getCinemas (store, id) {
      return http({
        url: `/gateway?cityId=${id}&ticketFlag=1&k=7466371`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then((res) => {
        store.commit('changeCinemaData', res.data.data.cinemas)
      })
    }
  },
  modules: {
  }
})
