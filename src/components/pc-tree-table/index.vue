<template>
  <el-container style="height: 100%;">
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
          >

            <div slot="header">
              <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />

              <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
              <slot name="header"></slot>
              <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners"/>
            </div>
          </d2-crud-x>
        </crud-container>

 </el-main>

  </el-container>

</template>

<script>
import { d2CrudPlus } from 'd2-crud-plus'
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
      isExpandAll: false
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
    treeSearchRequest (nodeName) {
      return this.api.treeSearch({ nodeName })
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
