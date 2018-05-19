import luckystarry from 'luckystarry'
const base = '/admin/ui'
export const menus = [
  new luckystarry.models.MenuInfo({
    Title: '首页',
    Path: '/admin(/ui)?',
    Link: '/admin',
    Icon: 'fa fa-fw fa-university',
    Component: () => import('demo/views/admin/home')
  })
]
