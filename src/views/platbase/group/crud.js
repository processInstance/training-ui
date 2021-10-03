import { getTree, getObj } from './api'
export const crudOptions = (vm) => {
  return {
    pageOptions: {
      compact: true // 是否紧凑型页面
    },

    options: {
      height: '100%', // 表格高度100%, 使用toolbar必须设置
      // 添加时，index为null
      fetchDetail (index, row, mode) {
        if (index == null) {
          // 添加
          return {}
        }
        return getObj(row.id).then(res => {
          return res.data
        })
      }
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
        },
        // show: false
        disabled: true
      },
      {
        title: '名称',
        key: 'name',
        sortable: 'custom',
        minWidth: 200,
        form: {
          order: 1,
          rules: [// 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请输入部门名称' }
          ],
          component: {

            maxlength: 30// 原生属性要写在这里

          }
        },
        search: {
          order: 1 // 查询字段排序，数字越小越靠前
        }
      },
      {
        title: '编码',
        key: 'code',
        show: true,
        sortable: true,
        minWidth: 200,
        form: {
          order: 1,
          rules: [// 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请输入部门编码' }
          ],
          component: {
            placeholder: '添加后不可修改，请注意'
          }

        },
        editForm: {
          component: {
            readonly: true
          }
        }

      },
      {
        title: '上级节点',
        key: 'parent',
        type: 'tree-selector',
        dict: {
          isTree: true,
          label: 'name',
          value: 'id',
          getNodes (values) { // 配置行展示远程获取nodes
            return new Promise((resolve) => {
              resolve(values)
            })
          }
        },
        form: {
          component: {
            span: 24,
            props: {
              multiple: false,
              elProps: {
                lazy: true,
                load (node, resolve) { // 懒加载
                  if (node.level === 0) {
                    return resolve([{ name: '全部机构', id: '0' }])
                  }
                  if (node.level > 0) {
                    getTree({ nodeId: node.data.id }).then(res => {
                      resolve(res.data)
                    })
                  }
                }
              }
            }
          }
        },
        component: {
          valueBinding: {
            prop: 'value', // 当前格子的值（row[key]）将会赋值给el-image组件的src属性
            handle ({ value }) { // 对value做一些处理
              return value ? value.name : ''
            }
          }
        }

      },
      {
        title: '简称',
        key: 'shortName',
        show: true,
        sortable: true,
        minWidth: 200,
        form: {
          order: 1
        }
      },
      {
        title: '排序',
        key: 'orderNum',
        show: true,
        sortable: true,
        minWidth: 200,
        form: {
          order: 1
        }
      },
      {
        title: '备注',
        key: 'remark',
        show: true,
        sortable: true,
        minWidth: 200,
        form: {
          order: 1
        }
      },
      {
        title: 'path',
        key: 'path',
        show: true,
        sortable: true,
        minWidth: 200,
        form: {
          order: 1,

          component: {
            readonly: true
          }

        }
      }
    ]
  }
}
