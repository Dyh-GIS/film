<template>
    <div class="header">
        <i class="el-icon-arrow-left" @click="back"></i>
        <slot></slot>
    </div>
</template>

<script>
export default {
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2.75rem;
    line-height: 2.75rem;
    text-align: center;
    i{
        font-size: 1.875rem;
        position: fixed;
        left: .625rem;
        top: 0px;
        height: 2.75rem;
        line-height: 2.75rem;
    }
}
</style>
