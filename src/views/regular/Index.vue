<template>

    <div class="container container_body">
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple-light" style="padding: 0 10px;">
                    <el-card class="box-card" shadow="never">
                        <div style="margin-top: 15px">
                            <el-input v-model="expression" type="textarea" :rows="13" placeholder="请输入待校验文本"></el-input>
                        </div>
                        <div style="margin-top: 15px">
                            <el-input v-model="reg" placeholder="请输入正则表达式">
                                <el-button slot="append" @click="regular(reg,expression)">提交</el-button>
                            </el-input>
                        </div>
                    </el-card>
                </div>
            </el-col>

            <el-col :span="12">
                <div style="margin-top: 2px">
                    <el-card class="box-card" shadow="never">
                        <span>输出信息</span>
                        <el-input v-model="isMatching" type="textarea" :rows="15" disabled>
                        </el-input>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>

</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        isMatching: "",
        reg: "",
        expression: ""
      };
    },
    methods: {
      regular: function(reg, expression) {
        if (reg === "" || reg === null || expression === "" || expression === null) {
          return false;
        }
        alert(reg)
        const patt1 = new RegExp(reg)
        if (patt1.exec(expression) !== null) {
          this.isMatching = patt1.exec(expression);
        } else {
          this.isMatching = "无匹配";
        }
      }
    }
  };

</script>

<style scoped>

</style>
