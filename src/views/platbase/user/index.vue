<template>
<pc-base
  v-bind:options="crudOptions"
  v-bind:api="api"

>

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
