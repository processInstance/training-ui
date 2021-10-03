// 公共 list 转 tree
export function listToTree (list, name, id) {
  name = name || 'name'
  id = id || 'id'
  const dataMap = {}
  const chilsMpa = {}
  const res = {}
  if (!list || !list.length) {
    return []
  }
  list.map(item => {
    item.children = []
    item.name = item[name]
    item.id = item[id]
    dataMap[item[id]] = item
  })
  list.map(item => {
    let tmpId = 0
    if (dataMap[item.parentId]) {
      tmpId = item.parentId
    }
    chilsMpa[tmpId] ? chilsMpa[tmpId].push(item) : chilsMpa[tmpId] = [item]
  })
  Object.keys(chilsMpa).sort((a, b) => {
    if (a || b) return 1
    return dataMap[a].path.split('/').length - dataMap[b].path.split('/').length
  }).map(v => {
    res[v] = chilsMpa[v]
  })
  return res
}
