import luckystarry from 'luckystarry'
import { App } from 'demo/views/app'
import { Admin } from 'demo/store'
import { menus } from 'demo/models/constants/menus'

luckystarry.utils.cache.prefix = 'luckystarry_admin_demo'
luckystarry.utils.http.baseUrl = '/admin/api'
luckystarry.ui.title = '织梦者管理平台'
luckystarry.ui.version = '1.0.0'

new luckystarry.builder()
  .callbackUrl('/admin/oauth/callback')
  .modules({ admin: new Admin() })
  .menus(...menus)
  .build(App)
