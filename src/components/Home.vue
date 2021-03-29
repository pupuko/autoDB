<template>
  <div class="main">
    <div class="side">
      <pu-menu :items="menuItems" @click="menuClick">
        <div class="title">
          <p>DB Manager</p>
        </div>
        <div class="search">
          <pu-input :placeholder="`search...`"></pu-input>
          <i class="el-icon-plus" @click="tableClick('add')"></i>
        </div>
      </pu-menu>
    </div>
    <div class="body">
      <div class="top" v-if="currentTable.index == -1">
        <!-- <div class="add">
          <pu-button @click="btnClick"> add </pu-button>
        </div>
        <div class="search"></div> -->
      </div>
      <div class="content">
        <div v-if="currentTable.index !== -1">
          <h3>{{ currentTable.name }}</h3>
          <div class="button-bar">
            <pu-button @click="keyClick('add')"> Add Key </pu-button>
            <pu-button @click="tableClick('check')"> Check Data </pu-button>
            <pu-button @click="tableClick('delete', currentTable.name)">
              Delete Table</pu-button
            >
          </div>
          <el-table :data="tableData" stripe>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="name"></el-table-column>
            <el-table-column prop="type" label="type"></el-table-column>
            <el-table-column label="tools" width="100">
              <template slot-scope="scope">
                <i
                  class="el-icon-edit"
                  @click="keyClick('edit', scope.row)"
                ></i>
                <i
                  class="el-icon-delete"
                  @click="keyClick('delete', scope.row)"
                ></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="box">
      <pu-box v-if="isShowBox" @close="boxClose" :title="`Create a new table`">
        <div class="content">
          <!-- <el-form>
            <el-form-item prop="name" label="Table Name">
              <el-input
                v-model="addTableName"
                placeholder="Input table name..."
              ></el-input>
            </el-form-item>
          </el-form> -->
          <div class="table-name">
            <p>Table Name</p>
            <el-input
              placeholder="Input table name..."
              v-model="addTableName"
            ></el-input>
          </div>
          <el-form>
            <el-form-item>
              <el-form
                :inline="true"
                v-for="(item, index) in tableForm"
                :model="tableForm[index]"
                :key="index"
                class="key-row"
              >
                <el-form-item :label="`key ${index}`">
                  <el-input
                    :placeholder="`Input key${index}'s name`"
                    v-model="tableForm[index].name"
                  ></el-input>
                </el-form-item>
                <el-form-item :label="`value ${index}`">
                  <el-select
                    v-model="tableForm[index].type"
                    :placeholder="`select key${index}'s type`"
                  >
                    <el-option
                      v-for="(item, index) in typeOptions"
                      :key="index"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <i
                    class="el-icon-delete"
                    @click="formClick('delete', index)"
                  ></i>
                </el-form-item>
              </el-form>
            </el-form-item>
            <!-- <el-form-item>
          </el-form-item> -->
            <!-- <el-form-item>
            <el-button @click="addTable">Add Table</el-button>
          </el-form-item> -->
          </el-form>
          <i class="el-icon-plus" @click="formClick('add')"></i>
        </div>

        <div class="footer">
          <pu-button @click="addTable">Create Table</pu-button>
          <pu-button @click="boxClose">Cancel</pu-button>
        </div>
      </pu-box>
    </div>
  </div>
</template>

<script>
import button from '@/components/pu-kit/pu-button.vue'
import input from '@/components/pu-kit/pu-input.vue'
import menu from '@/components/pu-kit/pu-menu.vue'
import box from '@/components/pu-kit/pu-box.vue'
export default {
  name: 'home',
  components: {
    'pu-button': button,
    'pu-input': input,
    'pu-menu': menu,
    'pu-box': box,
  },
  data() {
    return {
      addTableName: '',
      menuItems: [],
      isShowBox: 0,
      tableForm: [],
      currentTable: { name: '', index: -1 },
      tableData: [],
      typeOptions: [
        'String',
        'Boolean',
        'Integer',
        'Double',
        'Arrays',
        'Object',
        'Null',
        'Timestamp',
        'Date',
      ],
      rules: {
        name: [
          {
            required: true,
            message: "Please input table's name",
            trigger: 'blur',
          },
        ],
      },
    }
  },
  mounted() {
    this.getTableName()
  },
  methods: {
    btnClick() {
      console.log('add')
    },
    menuClick(item, index) {
      console.log(item, index)
      this.currentTable.index = index
      this.currentTable.name = item
      this.getTableInfo(item)
    },
    formClick(type, data) {
      switch (type) {
        case 'add':
          this.tableForm.push({ name: '', type: '' })
          break
        case 'delete':
          let index = data
          this.tableForm.splice(index, 1)
          break
      }
    },
    keyClick(type, data) {
      switch (type) {
        case 'edit':
          let row = data
          console.log(row)
          break
        case 'delete':
          console.log('delete', row)
      }
    },
    tableClick(type, data) {
      switch (type) {
        case 'add':
          this.isShowBox = 1

          break
        case 'check':
          break
        case 'delete':
          console.log('delete')
          this.deleteTable(data)
          break
      }
    },

    boxClose() {
      this.isShowBox = 0
      this.tableForm = []
    },
    getTableName() {
      this.$api.getTableName().then((json) => {
        if (json.msg === 'succeed') {
          console.log(json)
          this.menuItems = json.data
        } else {
          console.log(json.msg)
        }
      })
    },
    addTable() {
      let data = {
        tableName: this.addTableName,
        tableKey: this.tableForm,
      }
      if (this.addTableName.trim() != '') {
        if (this.tableForm.length == 0) {
          this.$message.warning('At least one key needed.')
          return
        }
        for (let i in this.tableForm) {
          if (
            this.tableForm[i].name.trim() == '' ||
            this.tableForm[i].type.trim() == ''
          ) {
            this.$message.warning('Please complete table keys.')
            return
          }
        }
        this.$api.addTable(data).then((json) => {
          console.log(json)
          if (json.msg === 'succeed') {
            this.$message.success('add complete!')
            this.addTableName = ''
            this.tableForm = []
            this.getTableName()
            this.$nextTick((_) => {
              this.currentTable.index = this.menuItems.length - 1
              this.currentTable.name = this.menuItems[this.menuItems.length - 1]
            })
            this.boxClose()
          } else {
            this.$message.error(json.msg)
          }
        })
      } else {
        this.$message.warning('Please input table name.')
        this.addTableName = ''
      }
    },
    getTableInfo(tableName) {
      this.$api.getTableInfo(tableName).then((json) => {
        console.log(json)
        if (json.msg === 'succeed') {
          this.tableData = json.data.tableKey
        }
      })
    },
    deleteTable(tableName) {
      this.$confirm('This will delete the table, continue?', 'warning', {
        confirmButtonText: 'Continue',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(() => {
          this.$api.deleteTable(tableName).then((json) => {
            console.log(json)
            this.getTableName()
            this.currentTable = this.$options.data().currentTable
          })
          this.$message.success('Delete complete!')
        })
        .catch(() => {
          this.$message.info('Cancel operation.')
        })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main {
  margin: 0;
  display: flex;
  height: 100vh;

  .side {
    width: 200px;
    height: 100%;
    background: darkslategrey;
    .pu-menu {
      color: #ddd;
      >>> .pu-menu-item {
        height: 50px;
        line-height: 50px;
      }
      >>> .pu-menu-list {
        overflow-y: overlay;
      }
    }
    .title {
      height: 50px;
      width: 100%;
      display: flex;
      padding: 15px;
      font-size: 24px;
      font-weight: bold;
      box-sizing: border-box;
      align-items: center;
      justify-content: space-between;
      color: lightgreen;
      font-family: sans-serif;
      // &::before {
      //   content: 'DB Manager';
      //   position: absolute;
      //   color: lightgreen;

      //   filter: blur(1px);
      // }
      // &::after {
      //   content: 'DB Manager';
      //   position: absolute;
      //   color: darkslategray;
      // }
    }
    .search {
      height: 30px;
      margin: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .pu-input {
        width: 140px;
        border-radius: 20px;
        background: darkslategray;
        border-color: transparent;
        padding-left: 15px;
        color: lightgreen;
        height: 30px;
        font-size: 14px;
        filter: brightness(0.9);
        transition: 0.2s;
        &:focus {
          border-color: rgba(144, 238, 144, 0.5);
        }
      }
      i {
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        transition: 0.2s;
        width: 30px;
        height: 30px;
        position: relative;
        background: darkslategray;
        filter: brightness(0.9);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        &::before {
        }
        &:hover {
          color: lightgreen;
        }
        &:active {
          color: lightgreen;
          filter: brightness(0.8);
        }
      }
    }
  }
  .body {
    width: calc(100% - 200px);
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    background: whitesmoke;
    .top {
      display: flex;
      justify-content: space-between;
      // height: 35px;
      .add {
        .pu-button {
          background: darkslategrey;
          color: white;
        }
      }
      .search {
        .pu-input {
          &:focus {
            border-color: darkslategrey;
          }
        }
      }
    }
    .content {
      height: calc(100% - 80px);
      // margin-top: 10px;
      > div {
        h3 {
          padding-bottom: 10px;
          text-align: left;
          line-height: 30px;
          height: 40px;
          margin-bottom: 10px;
          font-size: 22px;
          font-family: sans-serif;
          border-bottom: 1px solid #ddd;
          box-sizing: border-box;
          color: darkslategray;
          font-weight: bold;
        }
        .button-bar {
          display: flex;
          margin-bottom: 10px;
          height: 30px;
          user-select: none;
          .pu-button {
            margin-right: 10px;
            color: gray;
            background: white;
            border-color: #ddd;
            height: 30px;
            &:nth-child(3) {
              background: #f56c6c;
              color: white;
              border-color: none;
            }
          }
        }
        .el-table {
          >>> th,
          tr {
            height: 50px;
          }
          i {
            // width: 20px;
            // height: 20px;
            font-size: 16px;
            margin-right: 10px;
            cursor: pointer;
            transition: 0.2s;
            &:hover {
              &:nth-child(1) {
                color: #409eff;
              }
              &:nth-child(2) {
                color: #f56c6c;
              }
            }
          }
        }
      }
    }
  }
  .box {
    box-sizing: border-box;
    i {
      cursor: pointer;
    }
    .el-input {
      width: 200px;
    }
    .el-form {
    }
    .key-row {
      margin: 10px;
    }
    .content {
      width: 100%;
      padding: 10px;
      padding-left: 20px;
      box-sizing: border-box;
      overflow-y: scroll;

      .table-name {
        // text-align: left;
        p {
          margin-bottom: 10px;
          // text-align: left;
        }
        margin-bottom: 10px;
      }
    }
    .footer {
      position: absolute;
      height: 40px;
      width: 100%;
      bottom: 20px;
      display: flex;
      justify-content: center;
      .pu-button {
        margin: 0 10px;
        &:nth-child(1) {
          background: darkslategray;
          color: #ddd;
          &:hover {
            filter: brightness(1.2);
          }
        }
        &:nth-child(2) {
          background: #ddd;
          &:hover {
            filter: brightness(0.9);
          }
        }
      }
      // left: 10px;
      // right: 10px;
    }
  }
}
</style>
