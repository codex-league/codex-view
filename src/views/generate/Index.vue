<template>
    <div class="container container_body">
        <el-row>
            <el-col :span="10" class="boundary_left">
                <div class="table">
                    <table>
                        <tr>
                            <th>表名</th>
                            <th>注释</th>
                        </tr>
                        <tr v-for="(item, index) in tableList" :key="index" @click="intTableOptions(item)">
                            <td>{{ item.tableName }}</td>
                            <td>{{ item.tableComment }}</td>
                        </tr>
                    </table>
                </div>
            </el-col>
            <el-col :span="14" class="boundary_right">
                <div>
                    <span class="title">准备生成CRUD</span>
                    <el-card shadow="never">
                        <div class="crud_option">
                            <el-form label-width="150px" size="mini"
                                     border>
                                <el-form-item label="表名：">
                                    <span v-if="activeTable" style="font-size: 16px; font-weight: 500">{{ activeTable.tableName }}</span>
                                </el-form-item>
                                <el-form-item label="表注释：">
                                    <span v-if="activeTable"
                                          style="font-size: 14px">{{ activeTable.tableComment }}</span>
                                </el-form-item>

                                <el-form-item label="忽略的前缀">
                                    <el-radio-group v-model="tablePrefix">
                                        <el-radio label="" border>无</el-radio>
                                        <el-radio v-if="activeTable" v-for="(item, index) in prefix" :key="index"
                                                  :label="item"
                                                  border>{{ item }}
                                        </el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="是否生成Controller:">
                                    <el-radio-group v-model="isCtrlGenerate">
                                        <el-radio label="1" border>是</el-radio>
                                        <el-radio label="2" border>否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="生成接口:" required>
                                    <el-checkbox-group v-model="checkoutInterface" @change="handleCheckInterface">
                                        <el-checkbox v-for="(item, key) in interfaces" :label="key"> {{ item }}
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-card>
                </div>

                <div>
                    <span class="title">接口预览</span>
                    <div class="preview_option">
                        <el-collapse v-model="activeName" accordion>
                            <el-collapse-item title="新增接口" name="1" v-if="controllerContainer.add">
                                <field-item :fields="controllerContainer.add.fields" :kind="'add'"></field-item>
                            </el-collapse-item>
                            <el-collapse-item title="更新接口" name="2" v-if="controllerContainer.update">
                                <field-item :fields="controllerContainer.update.fields" :kind="'update'"></field-item>
                            </el-collapse-item>
                            <el-collapse-item title="删除接口" name="3" v-if="controllerContainer.del">
                                无需设置
                            </el-collapse-item>
                            <el-collapse-item title="详情接口" name="4" v-if="controllerContainer.detail">
                                无需设置
                            </el-collapse-item>
                            <el-collapse-item title="列表接口（分页）" name="5" v-if="controllerContainer.list">
                                无需设置
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>

                <div class="generate_button">
                    <el-button type="primary" @click="generate">生成代码</el-button>
                </div>
            </el-col>
        </el-row>
    </div>

</template>

<script>
  import { generateCode, getTableInfo, getTableList } from "../../api";
  import FieldItem from "./FieldItem";

  export default {
    name: "generate",
    components: { FieldItem },
    data() {
      return {
        interfaces: {
          add: "增加",
          update: "修改",
          del: "删除",
          detail: "详情",
          list: "列表"
        },
        checkoutInterface: [],
        activeName: undefined,
        tableList: undefined,
        attributes: undefined,
        package: undefined,
        prefix: undefined,
        tablePrefix: "",
        activeTable: undefined,
        isCtrlGenerate: "1",
        controllerContainer: {}
      };
    },
    created() {
      getTableList().then(result => {
        const { tableList, prefix } = result;

        this.tableList = tableList;
        this.prefix = prefix.split(",");
        this.package = result.package;

        if (tableList.length > 0) {
          this.intTableOptions(tableList[0]);
        }

      });
    },
    methods: {
      intTableOptions(table) {
        this.activeTable = table;
        getTableInfo(table.tableName).then(result => {
          this.attributes = result.attributes;
        });
      },
      handleCheckInterface(controllerKeys) {
        for (const key in this.interfaces) {
          if (!this.controllerContainer[key] && controllerKeys.indexOf(key) !== -1) {
            this.$set(this.controllerContainer, key, {
              fields: JSON.parse(JSON.stringify(this.attributes))
            });
          }

          if (controllerKeys.indexOf(key) === -1) {
            this.$delete(this.controllerContainer, key);
          }
        }
      },
      generate() {
        generateCode(this.activeTable.tableName, this.tablePrefix, this.controllerContainer).then(() => {
          window.location.href = process.env.VUE_APP_BASE_API + "/codex/generate/code/downloadByteBucket/" + this.activeTable.tableName;
        });
      }
    }
  };
</script>

<style lang="scss" scoped>

    .boundary_left {
        border-right: #EEE 2px solid;
        min-height: 100%;
    }

    .boundary_left > div {
        margin: 20px 0 0;
    }

    .boundary_left > .table table {
        width: 100%;
    }

    .boundary_left > .table table tr th {
        padding-left: 10px;
        background-color: #EAF6FE;
        border-right: #EAF6FE 2px solid;
        height: 35px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(138, 142, 147, 1);
    }

    .boundary_left > .table table tr td {
        padding-left: 10px;
        height: 35px;
        font-size: 14px;
        color: rgba(138, 142, 147, 1);
    }

    .boundary_left > .table table tr:nth-of-type(odd) {
        background-color: #fafafa;
        border-right: #fafafa 2px solid;
    }

    .boundary_left > .table table tr:not(:first-child):hover {
        background-color: #F3F3F3;
        border-right: #4BAAF7 2px solid;
    }

    .boundary_right {

    }

    .boundary_right > div {
        margin: 20px 0 0 10px;
        width: 100%;
    }

    .boundary_right > div > .title {
        font-size: 16px;
        font-weight: 500;
        color: #68717F;
        padding: 0 0 10px 0;
        display: block;
        /*border-bottom: #efefef 1px solid;*/
    }

    .crud_option {
    }

    .preview_option {
    }


    .generate_button {
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>
