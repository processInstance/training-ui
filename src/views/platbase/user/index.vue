<template>
<pc-base
  v-bind:options="crudOptions"
  v-bind:api="api"

>
  <template v-slot:header>

    <el-button size="small" type="primary" @click="batchDel"><i class="el-icon-plus"/> 批量删除</el-button>
  </template>

</pc-base>
</template>

<script>
import { addObj, page, putObj, delObj } from './api'
import { crudOptions } from './crud'

export default {
  name: 'crudUser',
  data () {
    return {
      api: { addObj, page, putObj, delObj },
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
