const _import = require('@/libs/util.import.' + process.env.NODE_ENV)
export const platbaseRoutes = [
  // 首页
  {
    path: 'crudUser',
    name: 'crudUser',
    meta: {
      auth: true
    },
    component: _import('platbase/user')
  },
  {
    path: 'crudGroup',
    name: 'crudGroup',
    meta: {
      auth: true
    },
    component: _import('platbase/group')
  },
  {
    path: 'crudRole',
    name: 'crudRole',
    meta: {
      auth: true
    },
    component: _import('platbase/role')
  }

]
