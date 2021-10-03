<template>
<pc-tree-table
  v-bind:options="crudOptions"
  v-bind:api="api"

>

</pc-tree-table>
</template>

<script>
import { addObj, page, putObj, delObj, getTree, treeSearch } from './api'
import { crudOptions } from './crud'

export default {
  name: 'crudGroup',
  data () {
    return {
      api: {
        page,
        putObj,
        delObj,
        getTree,
        treeSearch,
        addObj: this.addObjPrehandle
      },
      crudOptions
    }
  },
  methods: {
    batchDel: function () {
      console.log('batchDel')
    },
    addObjPrehandle: function (obj) {
      obj.parent = obj.parent[0]
      addObj(obj)
    }
  }
}
</script>
