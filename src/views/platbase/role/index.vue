<template>
<pc-tree-table
  v-bind:options="crudOptions"
  v-bind:api="api"

>

</pc-tree-table>
</template>

<script>
import { addObj, page, putObj, delObj, getTree, treeSearch, getObj } from '@/views/platbase/group/api'
import { crudOptions } from '@/views/platbase/group/crud'

export default {
  name: 'crudRole',
  props: {
    // 1 部门 2 角色 3 岗位 4 自定义群组
    groupType: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      api: {
        page: this.pagePrehandle,
        putObj,
        delObj,
        getTree: this.getTreePrehandle,
        treeSearch,
        addObj: this.addObjPrehandle,
        getObj
      },
      crudOptions
    }
  },
  methods: {
    batchDel: function () {
      console.log('batchDel')
    },
    addObjPrehandle: function (obj) {
      if (obj.parent) { obj.parent = obj.parent[0] }
      obj.type = this.groupType
      return addObj(obj)
    },
    pagePrehandle: function (query) {
      query.type = this.groupType
      return page(query)
    },
    getTreePrehandle: function (query) {
      query.type = this.groupType
      return getTree(query)
    }
  }
}
</script>
