/**
 * 菜单配置
 * name：菜单名称
 * id：菜单的key
 * img：菜单显示的图片
 * authorities：权限
 * childMenu：子菜单[{name,id,img}]
 */
export default [{
  name: "首页",
  id: "1",
  routerPath: "home",
  img: 'home',
  authorities: ['worker', 'manager', 'super']
},
{
  name: "卡口",
  id: "2",
  routerPath: "kakou",
  img: "kakou",
  authorities: ['worker', 'manager', 'super'],
  childMenu: [{
    parentId: '2',
    name: "报警查询",
    id: "21",
    routerPath: "warningSearch",
    img: "warningSearch"

  },
  {
    parentId: '2',
    name: "路人查询",
    id: "22",
    routerPath: "passerbySearchOnCondition",
    img: "passerbySearch"
  }]
},
{
  name: "检索",
  id: "3",
  routerPath: "search",
  img: "search",
  authorities: ['worker', 'manager', 'super'],
  childMenu: [{
    parentId: '3',
    name: "底库检索",
    id: "31",
    routerPath: "albumQuery",
    img: "albumQuery"
  },
  {
    parentId: '3',
    name: "路人检索",
    id: "22",
    routerPath: "passerbyQuery",
    img: "passerbyQuery"
  }]
},
{
  name: "比对",
  id: "4",
  routerPath: "faceCompare",
  img: "faceCompare",
  authorities: ['worker', 'manager', 'super']
},
{
  name: "资源",
  id: "5",
  routerPath: "resource",
  img: "resource",
  authorities: ['manager', 'super'],
  childMenu: [{
    parentId: '5',
    name: "底库管理",
    id: "51",
    routerPath: "albumManage",
    img: "albumManage"
  },
  {
    parentId: '5',
    name: "相机管理",
    id: "52",
    routerPath: "cameraManage",
    img: "camera"
  },
  {
    parentId: '5',
    name: "布控管理",
    id: "53",
    routerPath: "controlManage",
    img: "capture"
  },
  {
    parentId: '5',
    name: "批量入库",
    id: "54",
    routerPath: "batchImport",
    img: "batch"
  },
  {
    parentId: '5',
    name: "相机标注",
    id: "55",
    routerPath: "cameraLocation",
    img: "location"
  }]
},
{
  name: "系统",
  id: "6",
  routerPath: "system",
  authorities: ['super'],
  img: "system",
  childMenu: [{
    parentId: '6',
    name: "用户管理",
    id: "61",
    routerPath: "userManage",
    img: "userManage"
  },
  {
    parentId: '6',
    name: "站点管理",
    id: "62",
    routerPath: "deptManage",
    img: "deptManage"
  },
  {
    parentId: '6',
    name: '参数配置',
    id: '63',
    routerPath: 'configManage',
    img: "config"
  },
  {
    parentId: '6',
    name: '操作日志',
    id: '64',
    routerPath: 'logManage',
    img: "log"
  },
  {
    parentId: '6',
    name: '系统说明',
    id: '65',
    routerPath: 'version',
    img: "explain"
  }]
},
{
  name: "个人中心",
  id: "7",
  routerPath: "user",
  img: "userinfo",
  authorities: ['worker', 'manager', 'super'],
  childMenu: [{
    parentId: '7',
    name: "账户安全",
    id: "71",
    routerPath: "accountSecurity",
    img: "accountSecurity"
  },
  {
    parentId: '7',
    name: "个性化设置",
    id: "72",
    routerPath: "personalize",
    img: "personalize"
  }]
}]