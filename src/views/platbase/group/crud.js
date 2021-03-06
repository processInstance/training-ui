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
        return vm.api.getObj(row.id).then(res => {
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
      custom: [
        {
          thin: true,
          text: '',
          type: 'warning',
          size: 'small',
          emit: 'selectUser',
          icon: 'el-icon-s-flag'
        }
      ],
      width: 250
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
        sortable: 'custom', // 是否支持排序，如果传入'custom'，则为服务端排序。如果传入其他字符串，则以该字符串作为排序字段名
        minWidth: 200,
        form: {
          order: 1,
          rules: [// 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请输入名称' }
          ],
          component: {

            maxlength: 30// 原生属性要写在这里

          }
        },
        search: {
          order: 1 // 查询框字段排序，数字越小越靠前
        }
      },
      {
        title: '编码',
        key: 'code',
        show: true,
        sortable: 'custom',
        minWidth: 200,
        form: {
          order: 1,
          rules: [// 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请输入编码' }
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
                    vm.api.getTree({ nodeId: node.data.id }).then(res => {
                      resolve(res.data)
                    })
                  }
                }
              }
            }
          },
          rules: [// 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请选择父节点' }
          ]
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
        sortable: 'custom',
        minWidth: 200,
        form: {
          order: 1
        }
      },
      {
        title: '排序',
        key: 'orderNum',
        show: true,
        sortable: 'custom',
        minWidth: 200,
        form: {
          slot: true,
          order: 1,
          component: {
          },
          rules: [// 【可选】添加和修改时的校验规则，不配置则不校验
            { type: 'number', message: '排序必须为数字值' }
          ]

        }
      },
      {
        title: '备注',
        key: 'remark',
        show: true,
        sortable: 'custom',
        minWidth: 200,
        form: {
          order: 1
        }
      },
      {
        title: 'path',
        key: 'path',
        show: true,
        sortable: 'custom',
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
