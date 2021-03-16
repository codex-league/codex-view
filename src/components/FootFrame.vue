<template>
  <div class="bottom_block">
    <div>
      欢迎关注Github：<a href="https://github.com/codex-league/codex">
        https://github.com/codex-league/codex
      </a>
    </div>
    <div>
      使用帮助请移步至
      <a href="https://github.com/codex-league/codex">
        https://github.com/codex-league/codex
      </a>
    </div>
    <div>使用请遵循Apache开源协议，开源产品非任何组织和个人独自拥有</div>
  </div>
</template>

<script>
export default {
  name: "FootFrame"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bottom_block {
  background-color: #031759;
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
}

.bottom_block > div {
  color: white;
  font-size: 9px;
  height: 38px;
  line-height: 38px;
  opacity: 0.8;
}

.bottom_block > div > a {
  color: white;
  font-size: 9px;
}
</style>
