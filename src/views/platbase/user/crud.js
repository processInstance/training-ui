import { getTree } from '@/views/platbase/group/api'
import { getObj } from '@/views/platbase/user/api'

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
        disabled: true
      },
      {
        title: '名称',
        key: 'userName',
        sortable: 'custom',
        minWidth: 150,
        form: {
          order: 1,
          rules: [// 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请输入名称' }
          ],
          component: {

            maxlength: 15// 原生属性要写在这里

          }
        },
        search: {
          order: 1 // 查询框字段排序，数字越小越靠前
        }
      },
      {
        title: '登录名称',
        key: 'loginName',
        sortable: 'custom',
        minWidth: 150,
        form: {
          order: 1,
          rules: [// 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请输入名称' }
          ],
          component: {

            maxlength: 15// 原生属性要写在这里

          }
        },
        search: {
          order: 2 // 查询框字段排序，数字越小越靠前
        }
      },
      {
        title: '部门',
        key: 'departments',
        type: 'tree-selector',
        minWidth: 200,
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
          order: 1,
          component: {
            span: 24,
            props: {
              multiple: true,
              elProps: {
                lazy: true,
                'check-strictly': true,
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
          },
          rules: [// 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请选择父节点' }
          ]
        },
        component: {
          valueBinding: {
            prop: 'value', // 当前格子的值（row[key]）
            handle ({ value }) {
              // 对value做一些处理,这里的value是后台传来的departments
              return value.map(x => x.name)
            }
          }
        }

      },
      {
        title: '性别',
        key: 'sex',
        sortable: 'custom',
        minWidth: 70,
        type: 'select',
        form: {
          order: 1
        },
        search: {
          order: 2 // 查询框字段排序，数字越小越靠前
        },
        dict: { // 数据字典配置， 供select等组件通过value匹配label
          data: [ // 本地数据字典，若data为null，则通过http请求获取远程数据字典
            { value: '1', label: '男' },
            { value: '2', label: '女' }

          ]
        }
      },
      {
        title: '民族',
        key: 'nation',
        sortable: 'custom',
        minWidth: 70,
        type: 'select',
        show: false,
        form: {
          order: 1
        },
        search: {
          order: 2 // 查询框字段排序，数字越小越靠前
        },
        dict: { // 数据字典配置， 供select等组件通过value匹配label
          data: [ // 本地数据字典，若data为null，则通过http请求获取远程数据字典
            { value: '1', label: '汉族' },
            { value: '2', label: '蒙古族' },
            { value: '3', label: '壮族' },
            { value: '4', label: '苗族' }
          ]
        }
      },
      {
        title: '籍贯',
        key: 'nativePlace',
        show: false,
        sortable: 'custom',
        minWidth: 200,
        form: {
          order: 1
        }
      },
      {
        title: '生日',
        key: 'birthday',
        type: 'date',
        show: false,
        sortable: 'custom',
        minWidth: 200,
        form: {
          order: 1
        }
      },
      {
        title: '身份证号',
        key: 'idCard',
        show: false,
        sortable: 'custom',
        minWidth: 200,
        form: {
          order: 1
        }
      },
      {
        title: '联系电话',
        key: 'telephone',
        show: false,
        sortable: 'custom',
        minWidth: 200,
        form: {
          order: 1
        }
      },
      {
        title: '手机',
        key: 'mobilePhone',
        show: false,
        sortable: 'custom',
        minWidth: 200,
        form: {
          order: 1
        }
      },
      {
        title: '状态',
        key: 'status',
        sortable: 'custom',
        minWidth: 70,
        type: 'select',
        show: true,
        form: {
          order: 1
        },
        search: {
          order: 2 // 查询框字段排序，数字越小越靠前
        },
        dict: { // 数据字典配置， 供select等组件通过value匹配label
          data: [ // 本地数据字典，若data为null，则通过http请求获取远程数据字典
            { value: '1', label: '启用' },
            { value: '2', label: '停用' }
          ]
        }
      },
      {
        title: '排序',
        key: 'orderNum',
        show: true,
        sortable: 'custom',
        minWidth: 70,
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
        show: false,
        minWidth: 200,
        form: {
          order: 1
        }
      }
    ]
  }
}
