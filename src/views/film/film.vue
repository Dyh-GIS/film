<template>
    <div>
        <film-header class="sticky"></film-header>
        <!-- 路由容器 -->
        <router-view/>
    </div>
</template>

<script>
import filmHeader from '@/components/film/filmHeader.vue'
export default {
  components: {
    filmHeader
  }
}
</script>

<style lang="scss" scoped>
.sticky{
  position: sticky;
  top: 0px;
  background-color: #fff;
  z-index: 100;
}
</style>
