<template>
    <div class="container container_body">
        <el-row>
            <el-col :span="6" class="boundary_left">
                <div class="preview_api">
                    <el-collapse v-model="activeName" accordion>
                        <el-collapse-item v-for="(item, index) in apis" :key="index" :title="item.name" :name="index">
                            <ul>
                                <li v-for="(api,index) in item.apis" :key="index" @click="checkoutApi(api)">
                                    {{ api.summary }}
                                    <span>- {{api.path}} </span>
                                </li>
                            </ul>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-col>
            <el-col :span="16" class="boundary_right">
                <div v-if="activeApi">
                    <span class="title">{{ activeApi.summary }}</span>
                    <div v-for="(peration, index) in activeApi.operations" :key="index" class="restful_box">
                        <div class="request">
                            <el-input v-model="protocol + '//' + host + peration.path" readonly>
                                <template slot="prepend">{{ peration.method }}</template>
                            </el-input>
<!--                            <el-button type="success" @click="$message('功能暂未实现，Please wait.')">Copy</el-button>-->
                        </div>
                        <div v-if="peration.params.length" class="request_param">
                          <span class="title">Request param - 请求参考</span>
                          <el-table
                              :data="peration.params"
                              style="width: 100%"
                              row-key="field"
                              :tree-props="{children: 'child'}">
                            <el-table-column
                                prop="field"
                                label="字段"
                                width="200">
                              <template slot="header">
                                字段 <span>(field name)</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                                prop="describe"
                                label="描述"
                                width="200">
                              <template slot="header">
                                描述 <span>(describe)</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                                prop="type"
                                label="类型">
                              <template slot="header">
                                类型 <span>(fileld type)</span>
                              </template>
                              <template slot-scope="scope">
                                <el-tag size="mini" type="info">{{ scope.row.type}}</el-tag>
                              </template>
                            </el-table-column>
                            <el-table-column
                                prop="required"
                                label="是否必填"
                                width="150">
                              <template slot="header">
                                是否必填 <span>(required)</span>
                              </template>
                              <template slot-scope="scope">
                                <el-tag v-if="scope.row.required" size="mini" type="danger">必填</el-tag>
                                <el-tag v-if="!scope.row.required" size="mini" type="success">选填</el-tag>
                              </template>
                            </el-table-column>
                          </el-table>
                        </div>

                        <div v-if="peration.paramsBody" class="request_body">
                          <span class="title">Request body - 请求参考</span>
                          <el-table
                              :data="peration.paramsBody"
                              style="width: 100%"
                              row-key="field"
                              :tree-props="{children: 'child'}">
                            <el-table-column
                                prop="field"
                                label="字段"
                                width="200">
                              <template slot="header">
                                字段 <span>(field name)</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              prop="describe"
                              label="描述"
                              width="200">
                              <template slot="header">
                                描述 <span>(describe)</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                                prop="type"
                                label="类型">
                              <template slot="header">
                                类型 <span>(fileld type)</span>
                              </template>
                              <template slot-scope="scope">
                                <el-tag size="mini" type="info">{{ scope.row.type}}</el-tag>
                              </template>
                            </el-table-column>
                            <el-table-column
                                prop="required"
                                label="是否必填"
                                width="150">
                              <template slot="header">
                                是否必填 <span>(required)</span>
                              </template>
                              <template slot-scope="scope">
                                <el-tag v-if="scope.row.required" size="mini" type="danger">必填</el-tag>
                                <el-tag v-if="!scope.row.required" size="mini" type="success">选填</el-tag>
                              </template>
                            </el-table-column>
                          </el-table>
                        </div>

                      <br>

                      <div v-if="peration.responseBody" class="response_body">
                        <span class="title">Response body - 响应参考</span>
                        <el-table
                            :data="peration.responseBody"
                            style="width: 100%"
                            row-key="field"
                            :tree-props="{children: 'child'}">
                          <el-table-column
                              prop="field"
                              label="字段"
                              width="200">
                            <template slot="header">
                              字段 <span>(field name)</span>
                            </template>
                          </el-table-column>
                          <el-table-column
                              prop="describe"
                              label="描述"
                              width="200">
                            <template slot="header">
                              描述 <span>(describe)</span>
                            </template>
                          </el-table-column>
                          <el-table-column
                              prop="type"
                              label="类型">
                            <template slot="header">
                              类型 <span>(fileld type)</span>
                            </template>
                            <template slot-scope="scope">
                              <el-tag size="mini" type="info">{{ scope.row.type}}</el-tag>
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>

</template>

<script>
  import { getApi } from "../../api";

  export default {
    name: "index",
    data() {
      return {
        host: window.location.host,
        protocol: window.location.protocol,
        activeName: ["1"],
        apis: undefined,
        activeApi: undefined
      };
    },
    created() {
      getApi().then(result => {
        this.apis = result.controller;
        if (this.apis && this.apis.length > 0) {
          this.activeApi = this.apis[0].apis[0];
        }
      });
    },
    methods: {
      checkoutApi(api) {

        console.log(api)
        this.activeApi = api;
      }
    }
  };
</script>

<style lang="scss" scoped>

    .boundary_left {
        border-right: #EEE 2px solid;
        min-height: 80vh;
    }

    .boundary_left > div {
        margin: 20px 0 0;
    }

    .preview_api .el-collapse {
        border-top: none;
    }

    .preview_api .el-collapse .el-collapse-item__header {
        color: #8A8E93;
    }

    .preview_api ul li {
        text-align: left;
        height: 38px;
        line-height: 35px;
        font-size: 13px;
        font-weight: 500;
        color: #68717F;
        cursor: pointer;
        padding-left: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 250px;
    }

    .preview_api ul li:hover {
        background-color: #F3F3F3;
        border-right: #4BAAF7 2px solid;
    }


    .preview_api ul li span {
        color: #CFCFCF;
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


    .restful_box {
        margin: 0 0 40px 0;
        border-bottom: 1px #efefef solid;
        width: 100%;
        padding: 0 0 40px 0;
    }

    .request {
        display: flex;
        align-items: center;
    }

    .request > div {
        padding: 5px;
    }

    .response_body > .title,
    .request_body > .title,
    .request_param > .title {
        font-size: 16px;
        font-weight: 500;
        color: #8A8E93;
        margin: 10px 0;
        display: block;
    }

    .request_body table,
    .request_param table {
        width: 100%;
    }

    .request_body table th,
    .request_body table td,
    .request_param table th,
    .request_param table td {
        height: 45px;
        padding-left: 30px;
    }

    .request_body table tr,
    .request_param table tr {
        border-bottom: 1px solid #DFDFDF;
    }

    .request_body table tr:hover,
    .request_param table tr:hover {
        background-color: #F3F3F3;
    }

    .request_body table tr th,
    .request_param table tr th {
        background-color: #F5F7F9;
        font-size: 14px;
        font-weight: 500;
        color: #68717F;
    }

    .request_body table tr th > span,
    .request_param table tr th > span {
        color: #cfcfcf;
        font-size: 12px;
    }

    .request_body table tr td,
    .request_param table tr td {
        text-align: left;
        font-size: 14px;
        color: #68717F;
    }
</style>
