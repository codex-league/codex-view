<template>
    <div class="container">
        <div :class="[ $route.path === '/'? 'head_block_white' : 'head_block_grey' ]" class="head_block">
      <span class="logo">
        <img src="@/assets/logo.png"/>
      </span>
            <ul>
                <li>
                    <router-link :class="{ active: $route.path === '/' }" to="/"
                    >关于我们
                    </router-link
                    >
                </li>
                <li>
                    <router-link
                            :class="{ active: $route.path === '/generate' }"
                            to="/generate"
                    >代码生成
                    </router-link
                    >
                </li>
                <li>
                    <router-link :class="{ active: $route.path === '/apix' }" to="/apix"
                    >API-X
                    </router-link
                    >
                </li>
                <li>
                    <router-link
                            :class="{ active: $route.path === '/regular' }"
                            to="/regular"
                    >正则工具
                    </router-link
                    >
                </li>
                <li>
                    <router-link
                            :class="{ active: $route.path === '/json/format' }"
                            to="/json/format"
                    >JSON校验工具
                    </router-link
                    >
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
  export default {
    name: "TopFrame"
  };
</script>

<style scoped lang="scss">
    .head_block {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
    }

    .head_block > .logo > img {
        height: 60px;
    }

    .head_block > ul > li {
        margin-left: 20px;
    }

    .head_block_white > ul > li > a {
        background: #ffffff;
    }

    .head_block_grey > ul > li,
    .head_block_grey > ul > li > a {
        background: #68717f;
    }

    .head_block > ul > li,
    .head_block > ul > li > a {
        font-family: PingFang SC;
        font-weight: 600;
        line-height: 60px;
        -webkit-background-clip: text;
        color: transparent;
        display: inline;
        float: left;
        font-size: 13px;
        cursor: pointer;
    }

    .head_block > ul > li > a:hover {
        color: transparent;
        background: linear-gradient(to right, #41ebc1, #4da1ff);
        -webkit-background-clip: text;
    }

    .head_block > ul > li > a.active {
        background: linear-gradient(to right, #41ebc1, #4da1ff);
        text-decoration: underline;
        -webkit-background-clip: text;
    }
</style>
