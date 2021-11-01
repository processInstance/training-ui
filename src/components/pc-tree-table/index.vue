<template>
  <el-container style="height: 100%;background-color: white">
    <el-aside>

        <div>
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>

          <el-tree
            class="filter-tree"
            :props="defaultProps"
            :load="loadNode"
            node-key="id"
            @node-click="treeNodeClick"
            lazy
            :filter-node-method="filterNode"
            :default-expand-all="isExpandAll"
            ref="tree">
          </el-tree>
        </div>
    </el-aside>

 <el-main>
        <crud-container  :class="{'page-compact':crud.pageOptions.compact}">
          <!--    <template slot="header">-->
          <!--      test-->
          <!--    </template>-->
          <d2-crud-x
            ref="d2Crud"
            v-bind="_crudProps"
            v-on="_crudListeners"
            @selectUser="handleSelectUser"
          >

            <div slot="header">
              <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />

              <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
              <slot name="header"></slot>
              <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners"/>
            </div>
            <template slot="orderNumFormSlot" slot-scope="scope">
             <el-input ref="slotExampleFormRef" :disabled="scope.mode==='view'" v-model.number="scope.form['orderNum']" ></el-input>
            </template>
          </d2-crud-x>
        </crud-container>

 </el-main>
    <el-dialog title="选择用户"
               :visible.sync="dialogUserSelectorVisible"
               destroy-on-close
    >

      <user-selector ref="userSelector"></user-selector>

      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="updateGroupUser">确定
        </el-button>
      </div>
    </el-dialog>

  </el-container>

</template>

<script>
import { d2CrudPlus } from 'd2-crud-plus'
import { getUsers, bindUser } from '@/views/platbase/group/api'
export default {
  name: 'pc-tree-table',
  props: {
    // d2-crudx-plus配置
    options: {
      type: Function,
      required: true
    },
    // crud基础api
    api: {
      type: Object,
      required: true,
      default: function () {
        return { message: 'hello' }
      }
    }
  },
  components: {},
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      filterText: '',
      data: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      isExpandAll: false,
      dialogUserSelectorVisible: false,
      currentGroupId: ''
    }
  },
  methods: {
    getCrudOptions () {
      return this.options(this)
    },
    pageRequest (query) {
      return this.api.page(query)
    },
    addRequest (row) {
      return this.api.addObj(row)
    },
    updateRequest (row) {
      return this.api.putObj(row.id, row)
    },
    delRequest (row) {
      return this.api.delObj(row.id)
    },
    treeRequest (nodeId) {
      return this.api.getTree({ nodeId })
    },
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: '全部机构', id: '0' }])
      }
      if (node.level > 0) {
        this.treeRequest(node.data.id).then(res => {
          resolve(res.data)
        })
      }
    },
    // 编辑对话框打开前获取详情
    fetchDetail (index, row) {
      if (index == null) {
        // 添加
        return {}
      }
      return this.api.getObj(row.id).then(res => {
        return res.data
      })
    },
    treeNodeClick (data, node, compoent) {
      // 重置查询条件
      this.$refs.search.$refs.searchForm.resetFields()
      // 重置页码
      this.doPageTurn(1)
      // 查询条件
      this.crud.searchOptions.form = { parentId: data.id }
      this.doRefresh({ from: 'treeNodeClick' })
    },
    handleSelectUser (event) {
      /**
       * 点击选择用户后，设置初始化值
       *
       */
      this.currentGroupId = event.row.id
      getUsers({ nodeId: this.currentGroupId }).then(res => {
        const initSelectedRes = []
        if (res.data) {
          res.data.forEach(item => {
            initSelectedRes.push(
              {
                id: item.id,
                name: item.userName,
                isUser: true,
                leaf: true
              }
            )
          })
        }
        this.dialogUserSelectorVisible = true
        if (!this.$refs.userSelector) {
          setTimeout(() => {
            this.$refs.userSelector.selectedResult = initSelectedRes
          }, 10)
        } else {
          this.$refs.userSelector.selectedResult = initSelectedRes
        }
      })
    },
    updateGroupUser () {
      /**
       * 获取选中的idlist
       * 提交后台
       */

      const params = {
        groupId: this.currentGroupId,
        userIds: this.$refs.userSelector.getSelectId()
      }
      bindUser(params).then(res => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.dialogUserSelectorVisible = false
      })
    }
  },
  watch: {
    filterText (val) {
      // const that = this
      // this.treeSearchRequest(val).then(res => {
      //   // 获取到数据
      //   // 根据path排序
      //   // 根据id 查找到node,判断是否有子节点，有则更新，无则增加
      //   // 找到所有有子节点的节点，基
      //   debugger
      //   const nodeTree = listToTree(res.data)
      //   Object.keys(nodeTree).map(function (v) {
      //     that.$refs.tree.append(nodeTree[v], that.$refs.tree.getNode(v))
      //   })
      //   that.$refs.tree.filter(val)
      // })
      this.$refs.tree.filter(val)
    }
  }
}
</script>
