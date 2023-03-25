<!-- 电影头部导航组件 -->
<template>
    <div>
        <header>
            <ul>
                <router-link to="/nowPlaying" custom v-slot="{ navigate, isActive }">
                    <li @click="navigate">
                        <span :class="isActive ? 'highlight' : ''">正在热映</span>
                    </li>
                </router-link>
                <router-link to="/commingSoon" custom v-slot="{ navigate, isActive }">
                    <li @click="navigate">
                        <span :class="isActive ? 'highlight' : ''">即将上映</span>
                    </li>
                </router-link>
            </ul>
        </header>
    </div>
</template>

<style lang="scss" scoped>
/* 高亮 */
.highlight {
    color: #ff5f16;
    border-bottom: 1px solid #ff5f16;
}

ul {
    display: flex;
    height: 3.0625rem;
    line-height: 3.0625rem;
    li {
        flex: 1;
        text-align: center;
        span{
            font-size: 16px;
        }
    }
}
</style>
