import loadable from '@/utils/loadable'

const Index = loadable(() => import(/* webpackChunkName: 'index' */ '@/views/Index'))

// 通用
const ButtonView = loadable(() => import(/* webpackChunkName: 'button' */ '@/views/PublicView/Button'))
const IconView = loadable(() => import(/* webpackChunkName: 'icon' */ '@/views/PublicView/Icon'))

// 导航
const DropdownView = loadable(() => import(/* webpackChunkName: 'dropdown' */ '@/views/NavView/Dropdown'))
const MenuView = loadable(() => import(/* webpackChunkName: 'menu' */ '@/views/NavView/Menu'))
const StepView = loadable(() => import(/* webpackChunkName: 'step' */ '@/views/NavView/Step'))

// 表单
const FormBaseView = loadable(() => import(/* webpackChunkName: 'formBase' */ '@/views/FormView/FormBaseView'))
const FormStepView = loadable(() => import(/* webpackChunkName: 'formStep' */ '@/views/FormView/FormStepView'))

// 展示
const TableView = loadable(() => import(/* webpackChunkName: 'table' */ '@/views/ShowView/Table'))
const CollapseView = loadable(() => import(/* webpackChunkName: 'collapse' */ '@/views/ShowView/Collapse'))
const TreeView = loadable(() => import(/* webpackChunkName: 'tree' */ '@/views/ShowView/Tree'))
const TabsView = loadable(() => import(/* webpackChunkName: 'tabs' */ '@/views/ShowView/Tabs'))

// 其它
const ProgressView = loadable(() => import(/* webpackChunkName: 'progress' */ '@/views/Others/Progress'))
const AnimationView = loadable(() => import(/* webpackChunkName: 'animation' */ '@/views/Others/Animation'))
const EditorView = loadable(() => import(/* webpackChunkName: 'editor' */ '@/views/Others/Editor'))
const UploadView = loadable(() => import(/* webpackChunkName: 'upload' */ '@/views/Others/Upload'))

const Three = loadable(() => import(/* webpackChunkName: 'three' */ '@/views/TestView'))
const About = loadable(() => import(/* webpackChunkName: 'about' */ '@/views/About'))

//个人设置
const UserInfoView = loadable(() => import(/* webpackChunkName: 'userInfoView' */ '@/views/UserView/UserInfoView'))
const UserEmploymentView = loadable(() =>
    import(/* webpackChunkName: 'userEmploymentView' */ '@/views/UserView/UserEmploymentView')
)

//岗位信息
const StationInfoView = loadable(() =>
    import(/* webpackChunkName: 'stationInfoView' */ '@/views/StationView/StationInfoView')
)
const StationTableView = loadable(() =>
    import(/* webpackChunkName: 'stationTableView' */ '@/views/StationView/StationTableView')
)

//就业申请审核
const AppCheckView = loadable(() => import(/* webpackChunkName: 'AppCheckView' */ '@/views/AppCheckView'))

const routes = [
    { path: '/index', exact: true, name: 'Index', component: Index, auth: [1] },
    { path: '/public/button', exact: false, name: '按钮', component: ButtonView, auth: [1] },
    { path: '/public/icon', exact: false, name: '图标', component: IconView, auth: [1] },
    { path: '/nav/dropdown', exact: false, name: '下拉菜单', component: DropdownView },
    { path: '/nav/menu', exact: false, name: '下拉菜单', component: MenuView },
    { path: '/nav/steps', exact: false, name: '步骤条', component: StepView },
    { path: '/form/base-form', exact: false, name: '表单', component: FormBaseView },
    { path: '/form/step-form', exact: false, name: '表单', component: FormStepView },
    { path: '/show/table', exact: false, name: '表格', component: TableView },
    { path: '/show/collapse', exact: false, name: '折叠面板', component: CollapseView },
    { path: '/show/tree', exact: false, name: '树形控件', component: TreeView },
    { path: '/show/tabs', exact: false, name: '标签页', component: TabsView },
    { path: '/others/progress', exact: false, name: '进度条', component: ProgressView, auth: [1] },
    { path: '/others/animation', exact: false, name: '动画', component: AnimationView, auth: [1] },
    { path: '/others/editor', exact: false, name: '富文本', component: EditorView, auth: [1] },
    { path: '/others/upload', exact: false, name: '上传', component: UploadView, auth: [1] },
    { path: '/one/two/three', exact: false, name: '三级', component: Three },
    { path: '/about', exact: false, name: '关于', component: About, auth: [1] },
    { path: '/user/user-info', exact: false, name: '个人信息', component: UserInfoView },
    { path: '/user/user-emp', exact: false, name: '就业申请', component: UserEmploymentView },
    { path: '/station/station-info', exact: false, name: '岗位发布', component: StationInfoView },
    { path: '/station/station-table', exact: false, name: '岗位总览', component: StationTableView },
    { path: '/app/app-check', exact: false, name: '申请审核', component: AppCheckView }
]

export default routes
