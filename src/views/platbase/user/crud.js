export const crudOptions = (vm) => {
  return {
    pageOptions: {
      compact: true // 是否紧凑型页面
    },
    options: {
      height: '100%' // 表格高度100%, 使用toolbar必须设置
    },
    formOptions: {
      defaultSpan: 12 // 默认的表单 span
    },
    rowHandle: {
      fixed: 'right',
      view: {
        thin: true,
        text: null
      },
      edit: {
        thin: true,
        type: 'primary',
        // circle: true,
        text: null
      },
      remove: {
        thin: true,
        text: null
      },
      width: 140
    },
    columns: [
      {
        title: 'ID',
        key: 'id',
        width: 90,
        form: {
          disabled: true
        }
      },
      {
        title: '名称',
        key: 'userName',
        show: true,
        sortable: true,
        minWidth: 200,
        form: {
          order: 1
        }
      }
    ]
  }
}
