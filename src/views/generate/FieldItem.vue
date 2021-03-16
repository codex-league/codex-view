<template>
    <el-table :data="fields">
        <el-table-column prop="attrType" label="类型"></el-table-column>
        <el-table-column prop="maxLength" label="长度"></el-table-column>
        <el-table-column prop="attrname" align-center label="字段名称"></el-table-column>
        <el-table-column prop="comments" label="注释"></el-table-column>
        <el-table-column label="注解" width="180">
            <template slot-scope="scope">

                <div v-if="scope.row.primary === 'primary'">
                    {{ descPrimary(kind, scope) }}
                </div>

                <div v-else>
                    <el-select v-model="scope.row.annotation" placeholder="不显示" size="mini">
                        <el-option
                                v-for="(item, index) in getOptions(scope.row.attrType, kind)"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </template>
        </el-table-column>
    </el-table>

</template>

<script>
  export default {
    name: "FieldItem",
    props: {
      fields: {},
      kind: undefined
    },
    data() {
      return {
        tableData: this.fields,
        options: [
          { value: undefined, label: "不显示", kind: "add,update,del,detail" },
          { value: "@ApiModelProperty", label: "选填", kind: "add,update,del,detail" },
          { value: "like", label: "模糊查询", kind: "list" },
          { value: "equal", label: "精确查询", kind: "list" },
          {
            value: "@NotNull",
            label: "@NotNull",
            type: "Integer,Long,Short,Byte,Double,Float,Boolean,Date",
            kind: "add,update,del,detail"
          },
          { value: "@NotBlank", label: "@NotBlank", type: "String", kind: "add,update,del,detail" },
          { value: "@NotEmpty", label: "@NotEmpty", type: "String", kind: "add,update,del,detail" },
          {
            value: "@Null",
            label: "@Null",
            type: "String,Integer,Long,Short,Byte,Double,Float,Boolean,Date",
            kind: "add,update,del,detail"
          },
          { value: "@Pattern", label: "@Pattern", type: "String", kind: "add,update,del,detail" }
          // { value: "@TableField(fill = FieldFill.INSERT)", label: "添加时自动设置时间", type: "Date", kind: "add" },
          // { value: "@TableField(fill = FieldFill.UPDATE)", label: "修改时自动设置时间", type: "Date", kind: "update" }
          // {value: '@Max', label: '@Max'},
          // {value: '@Min', label: '@Min'},
          // {value: '@Digits', label: '@Digits'},
          // {value: '@Email', label: '@Email'},
          // {value: '@Future', label: '@Future'},
          // {value: '@AssertFalse', label: '@AssertFalse'},
          // {value: '@AssertTrue', label: '@AssertTrue'},
          // {value: '@DecimalMax', label: '@DecimalMax'},
          // {value: '@DecimalMin', label: '@DecimalMin'},
          // {value: '@Size', label: '@Size'},
          // {value: '@FutureOrPresent', label: '@FutureOrPresent'},
          // {value: '@Negative', label: '@Negative'},
          // {value: '@NegativeOrZero', label: '@NegativeOrZero'},
          // {value: '@Past', label: '@Past'},
          // {value: '@PastOrPresent', label: '@PastOrPresent'},
          // {value: '@Positive', label: '@Positive'},
          // {value: '@PositiveOrZero', label: '@PositiveOrZero'}
        ]
      };
    },
    created() {
      console.log(this.fields);
      console.log(this.kind);
    },
    methods: {
      /**
       * 获取选项
       * @param type
       * @param kind
       * @returns {[]}
       */
      getOptions(type, kind) {
        let tempOptions = [];
        this.options.forEach(item => {
          if ((!item["type"] || item.type.indexOf(type) > -1)
            && (!item["kind"] || item.kind.indexOf(kind) > -1)) { // 如果 type没有条件，直接通过
            tempOptions.push(JSON.parse(JSON.stringify(item)));
          }
        });
        return tempOptions;
      },

      /**
       * 翻译主键操作信息
       * @param kind
       * @returns {string}
       */
      descPrimary(kind, scope) {
        if (kind === "add") {
          return "Not Set";
        }

        if (kind === "update") {
          scope.row.annotation = "@NotBlank";
          return "Not Blank";
        }
        return "";
      }
    }
  };
</script>

<style lang="scss" scoped>

    /*.preview_table {*/
    /*    width: 100%;*/
    /*}*/

    /*.preview_table,*/
    /*.preview_table tr th,*/
    /*.preview_table tr td {*/
    /*    border: #efefef 1px solid;*/
    /*    height: 35px;*/
    /*    padding-left: 5px;*/
    /*}*/

    /*.preview_table tr th {*/
    /*    background-color: #F5F7F9;*/
    /*    height: 35px;*/
    /*    font-size: 14px;*/
    /*    font-weight: 500;*/
    /*    color: rgba(138, 142, 147, 1);*/
    /*}*/

    /*.preview_table th td {*/
    /*    height: 32px;*/
    /*}*/

    /*.preview_table tr:not(:first-child):hover {*/
    /*    background-color: #F3F3F3;*/
    /*}*/

</style>
