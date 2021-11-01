<template>
  <div class="body-wrap">
    <el-row :gutter="20">
      <el-col :span="12">
        <div>
          <!--      搜索-->
          <div>
            <el-input placeholder="搜索成员或部门" v-model="searchInput" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="doSearch"></el-button>
            </el-input>
          </div>
          <!--      展示-->
          <div>
            <!--        树-->
            <div v-show="!searchResShow">
              <!--          分栏-->
              <div>
                <p class="col-p" :class="currentType===1?'activeCol':''" @click="currentType=1">组织机构</p>
                <p class="col-p" :class="currentType===2?'activeCol':''" @click="currentType=2">角色</p>
                <p class="col-p" :class="currentType===3?'activeCol':''" @click="currentType=3">岗位</p>
                <p class="col-p" :class="currentType===4?'activeCol':''" @click="currentType=4">自定义群组</p>
              </div>
              <!--          树容器-->
              <div>
                <el-tree
                         ref="deptTree"
                         :props="defaultProps"
                         @node-click="treeNodeClick"
                         node-key="id"
                         :load="loadNode"
                         :check-strictly=true
                         :expand-on-click-node=false
                         lazy>
                  <span class="custom-tree-node" slot-scope="{ node,data }">

                      <i v-if="data.isUser" class="el-icon-user" style="margin-right: 2px;"></i>
                      <i v-else class="el-icon-folder" style="margin-right: 2px;"></i>

                    <span>{{ node.label }}</span>
                    <i v-show="node.checked" class="el-icon-check" style="margin-left: 2px;"></i>

      </span>
                </el-tree>

              </div>
            </div>
            <!--        查询结果-->
            <div v-show="searchResShow">
              <div>人员</div>
              <div v-for="item in userSearchRes" :key="item.id" @click="searchResClick(item)">
                <div><i class="el-icon-user"></i></div>
                <div>
                  <div>
                    <div>{{item.name}}</div>
                    <i v-show="item.checked" class="el-icon-check" style="margin-left: 2px;"></i>
                  </div>
                  <div>{{item.parent}}</div>
                </div>
              </div>
              <div>部门</div>
              <div v-for="item in groupSearchRes" :key="item.id" @click="searchResClick(item)">
                <div><i class="el-icon-user"></i></div>
                <div>
                  <div>
                    <div>{{item.name}}</div>
                    <i v-show="item.checked" class="el-icon-check" style="margin-left: 2px;"></i>
                  </div>
                  <div>{{item.parent}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <!--    选择结果-->
        <div>
          <div>已经选择的成员或组织</div>
          <div>
            <div v-for="item in selectedResult" :key="item.id">
              <div style="display: inline-block">{{item.name}}</div>
              <i class="el-icon-close" @click="removeSelected(item)" style="float: right;margin-top: 2px;"></i>
            </div>
          </div>

        </div>
      </el-col>

    </el-row>

  </div>
</template>

<script>
/**
   * 仅选人、选人和组织
   * 查询已选的接口
   * 选人回调接口
   */
import { getChildIncludedUser, serachUserAndGroup } from '@/views/platbase/group/api'
export default {
  name: 'userSelector',
  props: {
    couldSelectGroup: {
      type: Boolean,
      default: false
    },
    initSelected: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      searchInput: '',
      currentType: 1,
      searchResShow: false,
      userSearchRes: [],
      groupSearchRes: [],
      selectedResult: this.initSelected,
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf'
      }
    }
  },
  watch: {
    currentType () {
      // 重置
      this.$refs.deptTree.updateKeyChildren(0, [])
      this.$refs.deptTree.getNode(0).loaded = false
      this.$refs.deptTree.getNode(0).expanded = false
      this.$refs.deptTree.getNode(0).isLeaf = false
    },
    searchInput () {
      this.searchInput ? this.searchResShow = true : this.searchResShow = false
    }
  },
  created () {
    console.log(this.selectedResult)
  },
  methods: {
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: '全部机构', id: '0' }])
      }
      if (node.level > 0) {
        getChildIncludedUser({ nodeId: node.data.id, type: this.currentType }).then(res => {
          const treeData = []
          res.data.users.forEach(item => {
            treeData.push({
              id: item.id,
              name: item.userName,
              isUser: true,
              leaf: true
            })
          })
          res.data.groups.forEach(item => {
            treeData.push({
              id: item.id,
              name: item.name
            })
          })
          resolve(treeData)
          treeData.map(item => {
            if (this.selectedResult.find(element => element.id === item.id)) {
              this.$refs.deptTree.getNode(item).checked = true
            }
          })
        })
      }
    },
    treeNodeClick (data, node, compoent) {
      if (node.level === 1) {
        return
      }
      // 部门不能勾选 并且 当前不是用户时，返回
      if (!(this.couldSelectGroup || data.isUser)) { return }
      // 未选时，勾选
      if (!node.checked) {
        this.selectedResult.push(data)
        node.checked = true
      } else {
        this.removeSelected(data)
      }
    },
    searchResClick (data) {
      //if (!(this.couldSelectGroup || data.isUser)) { return }
      // 未选时，勾选
      if (!data.checked) {
        this.selectedResult.push(data)
        data.checked = true
      } else {
        for (let i = 0; i < this.selectedResult.length; i++) {
          if (this.selectedResult[i].id === data.id) {
            data.checked = false
            this.selectedResult.splice(i, 1)
            break
          }
        }
      }
    },
    removeSelected (data) {
      for (let i = 0; i < this.selectedResult.length; i++) {
        if (this.selectedResult[i].id === data.id) {
          const node = this.$refs.deptTree.getNode(this.selectedResult[i])
          node && (node.checked = false)
          this.selectedResult.splice(i, 1)
          break
        }
      }
    },
    getSelectId () {
      return this.selectedResult.map(item => item.id)
    },
    doSearch () {
      serachUserAndGroup({ keyword: this.searchInput }).then(res => {
        const selectIds = this.getSelectId()
        this.groupSearchRes = []
        this.userSearchRes = []
        res.data.users.forEach(item => {
          const parent = item.departments ? item.departments[0] ? item.departments[0].name : '' : ''
          this.userSearchRes.push({
            id: item.id,
            name: item.userName,
            isUser: true,
            parent: parent,
            checked: item.id.indexOf(selectIds) > -1
          })
        })
        res.data.groups.forEach(item => {
          this.groupSearchRes.push({
            id: item.id,
            name: item.name,
            parent: item.parent ? item.parent.name : '',
            checked: item.id.indexOf(selectIds) > -1
          })
        })
      })
    }
  }
}
</script>

<style scoped>
.multiPickerDlg_right{
  padding-left: 20px;
  border-left: 1px solid #E4E6E9;
  float: right;
}
  .activeCol{
  background-color: #66b1ff;
  }
  .col-p{
    display: inline-block;
    margin-right: 5px;
  }
  .body-wrap{
    padding: 20px 20px 30px 30px;
    overflow: auto;
    min-height: 450px;
    min-width: 600px;
  }
</style>
