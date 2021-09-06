<template>
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
</template>

<script>
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'pc-base',
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
      return this.api.putObj(row)
    },
    delRequest (row) {
      return this.api.delObj(row.id)
    }
  }
}
</script>
