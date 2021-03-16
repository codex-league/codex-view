<template>
    <div class="container">
        <el-input
                type="textarea"
                :rows="16"
                placeholder="请输入内容"
                v-model="content"
        ></el-input>
        <div style="margin-top: 15px;">
            <el-button @click="formatData()" size="mini" type="success" round
            >格式化json数据
            </el-button>
        </div>
    </div>
</template>

<script>
  import { formatJson } from "@/util/json";

  export default {
    name: "codejson",
    data() {
      return {
        content: "",
        rules: {
          content: [{ required: true, message: "验证内容不能为空" }]
        }
      };
    },
    methods: {
      formatData() {

        if (!this.content) {
          this.$message.info("内容为空");
          return;
        }
        try {
          this.content = formatJson(this.content);
        } catch (e) {
          this.$message.error("JSON字符串验证无法通过，无法进行格式化");
        }
      }
    }
  };
</script>

<style scoped>

</style>
