<template>
  <div>
    <div id="index">
      <div class="container">
        <div class="copywriting_block">
          <div class="copywriting">
            <h1>一触即发，所向披靡</h1>
            <h2>应用多种行业</h2>

            <h4>解放双手，解放重复劳动力，专注辅助开发实现</h4>
            <h5>
              Free hands, free repetitive labor, assist development focus on
              business realization
            </h5>

            <a href="https://github.com/codex-league/codex">
              立即关注
            </a>
          </div>

          <span>
            <img src="@/assets/style1.png" />
          </span>
        </div>

        <div class="star_block">
          <div class="title">
            功能亮点
          </div>
          <div class="star">
            <span><img src="@/assets/star1.png" /> 安全 </span>
            <span><img src="@/assets/star2.png" /> 智能 </span>
            <span><img src="@/assets/star3.png" /> 多样化 </span>
            <span><img src="@/assets/star4.png" /> 高效率 </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index"
};
</script>

<style lang="scss" scoped>
.copywriting_block {
  display: flex;
  justify-content: space-between;
  margin-top: 65px;
}

.copywriting {
  color: white;
  padding-top: 50px;
}

.copywriting > h1 {
  height: 50px;
  line-height: 50px;
  font-size: 28px;
}

.copywriting > h2 {
  height: 50px;
  line-height: 50px;
  font-size: 21px;
}

.copywriting > h4 {
  font-size: 14px;
}

.copywriting > h5 {
  font-size: 10px;
}

.copywriting > a {
  width: 175px;
  height: 49px;
  background: linear-gradient(
    90deg,
    rgba(65, 235, 193, 1),
    rgba(77, 161, 255, 1)
  );
  border-radius: 4px;
  border: 0;
  font-size: 21px;
  font-weight: 500;
  margin-top: 50px;
  display: block;
  text-align: center;
  line-height: 49px;
  color: white;
  cursor: pointer;
}

.copywriting_block > span > img {
  height: 324px;
}

.star_block {
  display: flex;
  flex-direction: column;
  text-align: center;
  color: rgba(246, 246, 246, 1);
  margin-top: 120px;
}

.star_block > .title {
  font-size: 21px;
  font-family: SourceHanSansCN;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}

.star_block > .star {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.star_block > .star > span {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  font-size: 18px;
  font-family: SourceHanSansCN;
  font-weight: 500;
}

.star_block > .star > span > img {
  width: 166px;
  height: 166px;
}
</style>
