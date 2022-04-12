const menu = [
    {
        key: '/index',
        title: '首页',
        icon: 'home'
    },
    {
        title: '通用',
        key: '/public',
        icon: '',
        auth: ['3'],
        subs: [
            { title: '按钮', key: '/public/button', icon: '' },
            { title: '图标', key: '/public/icon', icon: '' }
        ]
    },
    {
        title: '导航',
        key: '/nav',
        icon: 'bulb',
        auth: ['3'],
        subs: [
            { title: '下拉菜单', key: '/nav/dropdown', icon: '' },
            { title: '导航菜单', key: '/nav/menu', icon: '' },
            { title: '步骤条', key: '/nav/steps', icon: '' }
        ]
    },
    {
        title: '表单',
        key: '',
        icon: 'form',
        auth: ['3'],
        subs: [
            { title: '基础表单', key: '/form/base-form', icon: '' },
            { title: '步骤表单', key: '/form/step-form', icon: '' }
        ]
    },
    {
        title: '展示',
        key: '/show',
        icon: 'pie-chart',
        auth: ['3'],
        subs: [
            { title: '表格', key: '/show/table', icon: '' },
            { title: '折叠面板', key: '/show/collapse', icon: '' },
            { title: '树形控件', key: '/show/tree', icon: '' },
            { title: '标签页', key: '/show/tabs', icon: '' }
        ]
    },
    {
        title: '其它',
        key: '/others',
        icon: 'paper-clip',
        auth: ['3'],
        subs: [
            { title: '进度条', key: '/others/progress', icon: '' },
            { title: '动画', key: '/others/animation', icon: '' },
            { title: '上传', key: '/others/upload', icon: '' },
            { title: '富文本', key: '/others/editor', icon: '' },
            { title: '404', key: '/404', icon: '' },
            { title: '500', key: '/500', icon: '' }
        ]
    },
    {
        title: '多级导航',
        key: '/one',
        icon: 'bars',
        auth: ['3'],
        subs: [
            {
                title: '二级',
                key: '/one/two',
                icon: '',
                subs: [{ title: '三级', key: '/one/two/three', icon: '' }]
            }
        ]
    },
    {
        title: '岗位信息',
        key: '/station',
        icon: 'appstore',
        auth: ['1'],
        subs: [{ title: '岗位总览', key: '/station/station-table', icon: '' }]
    },
    {
        title: '岗位信息',
        key: '/station',
        icon: 'appstore',
        auth: ['2'],
        subs: [
            { title: '岗位发布', key: '/station/station-info', icon: '' },
            { title: '岗位总览', key: '/station/station-table', icon: '' }
        ]
    },
    {
        title: '个人管理',
        key: '/user',
        icon: 'user',
        auth: ['1'],
        subs: [
            { title: '个人信息', key: '/user/user-info', auth: ['1'], icon: '' },
            { title: '就业申请', key: '/user/user-emp', icon: '' }
        ]
    },
    {
        title: '个人管理',
        key: '/user',
        icon: 'user',
        auth: ['2'],
        subs: [{ title: '个人信息', key: '/user/user-info', auth: ['1'], icon: '' }]
    },
    {
        title: '申请管理',
        key: '/app/app-check',
        icon: 'form',
        auth: ['2']
    },
    {
        title: '关于',
        key: '/about',
        icon: 'info-circle'
    }
]

export default menu
