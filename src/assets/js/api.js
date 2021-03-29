const baseUrl = 'http://172.20.10.5:9500/api';

function request(url, type, data) {
  let method = 'GET';
  if (type) {
    method = type.toUpperCase();
  }

  return (
    fetch(baseUrl + url, {
      headers: {
        'content-type': 'application/json'
      },
      method: method,
      body: JSON.stringify(data)
    }).then(res => res.json())
  )
}
function getTableName() {
  return request('/getTableName', 'get')
}

function getTables() {
  return request('/getTables', 'get')
}

function deleteTable(tableName) {
  return request(`/deleteTable?tableName=${tableName}`, 'delete')
}

function getTableData(data) {
  return request(`/getTableData`, 'get', data)
}

function getData(tableName, dataId) {
  return request(`/getData?tableName=${tableName}&id=${dataId}`, 'get')
}

function addData(tableName, dataId, data) {
  return request(`/addData`, 'post', data)
}

function deleteData(tableName, dataId) {
  return request(`/deleteData?=${tableName}&id=${dataId}`, 'delete')
}

function addTable(data) {
  return request('/addTable', 'post', data)
} 

function getTableInfo(tableName) {
  return request(`/getTableInfo?tableName=${tableName}`, 'get')
}

export default {
  getTableName,
  getTables,
  deleteTable,
  getTableData,
  getData,
  addData,
  deleteData,
  addTable,
  getTableInfo
}
