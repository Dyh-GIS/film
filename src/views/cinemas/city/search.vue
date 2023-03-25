<template>
    <div>
        <div class="search_header">
             <van-search  v-model="value" show-action  placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel"/>
        </div>
        <!--<div class="box" :style="{ height: height }">-->
            <ul v-if="value">
                <li v-for="item in computedList" :key="item.cinemaId">
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
        <!-- </div> -->
    </div>
</template>

<script>
import BetterScroll from 'better-scroll'
export default {
  data () {
    return {
      value: '',
      height: '0px'
    }
  },
  methods: {
    onSearch () {

    },
    onCancel () {
      this.$router.back()
    }
  },
  mounted () {
    // 获取高度
    this.height = document.documentElement.clientHeight - document.querySelector('footer').offsetHeight -
    document.querySelector('.search_header').offsetHeight +
    'px'

    if (this.$store.state.cinemaList.length === 0) {
      this.$store.dispatch('getCinemas', this.$store.state.cityId)
    }
  },
  computed: {
    computedList () {
      return this.$store.state.cinemaList.filter(item => item.name.toUpperCase().includes(this.value.toUpperCase()) ||
      item.address.toUpperCase().includes(this.value.toUpperCase()))
    }
  }
}

</script>

<style lang="scss" scoped>
.search_header{
    height: 3.0625rem;
}
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
