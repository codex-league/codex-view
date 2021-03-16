import request from "@/util/request";


/**
 * 获取API
 */
export function getApi() {
  return request({
    url: "/codex/apix/doc",
    method: "get"
  });
}

/**
 * 获取表信息
 */
export function getTableInfo(tableName) {
  return request({
    url: "/codex/generate/table/attribute/detail/" + tableName,
    method: "get"
  });
}

/**
 * 获取表列表
 */
export function getTableList() {
  return request({
    url: "/codex/generate/table/option",
    method: "get"
  });
}


/**
 * 预生成代码
 */
export function generateCode(tableName, tablePrefix, controllerContainer) {
  return request({
    url: "/codex/generate/code/controller/" + tableName + "?tablePrefix=" + tablePrefix,
    method: "post",
    data: controllerContainer
  });
}
