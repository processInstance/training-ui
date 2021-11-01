<template>
  <pc-tree-table
    v-bind:options="crudOptions"
    v-bind:api="api"

  >

  </pc-tree-table>
</template>

<script>
import { addObj, page, putObj, delObj } from './api'
import { getTree } from '@/views/platbase/group/api'
import { crudOptions } from './crud'

export default {
  name: 'crudUser',
  data () {
    return {
      api: { addObj, page, putObj, delObj, getTree },
      crudOptions
    }
  },
  methods: {
    batchDel: function () {
      console.log('batchDel')
    }
  }
}
</script>
