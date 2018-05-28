import ElementUI from 'element-ui'
import { System } from 'luckystarry/impl/modules/system'
import { MenuInfo } from 'luckystarry/models'
import { frame } from 'luckystarry/store'
import callback from 'luckystarry/ui/oauth/callback'
import Vue, { VueConstructor } from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(ElementUI)

export default class builder {
  private _callbackUrl: string
  private _modules: { [key: string]: any }
  private _menus: MenuInfo[]

  modules(modules: { [key: string]: frame.IFrame }): builder {
    this._modules = Object.assign({}, modules)
    return this
  }

  callbackUrl(callbackUrl: string): builder {
    this._callbackUrl = callbackUrl
    return this
  }

  menus(...menus: MenuInfo[]): builder {
    this._menus = menus || []
    return this
  }

  build(app: VueConstructor<Vue>, configs?: { el?: string }) {
    configs = Object.assign({ el: '#app' }, configs)
    let routes = menusToRoutes(this._menus)
    routes.push({
      path: this._callbackUrl,
      meta: { title: '登陆成功' },
      component: callback
    })
    const store = new Vuex.Store({
      modules: Object.assign({ ['system']: new System() }, this._modules)
    })
    const router = new VueRouter({ mode: 'history', routes })

    return new Vue({ el: configs.el, store, router, render: h => h(app) })
  }
}

function menusToRoutes(menus: MenuInfo[]): RouteConfig[] {
  let routes = new Array<RouteConfig>()
  for (let menu of menus || []) {
    if (menu.Component) {
      routes.push({
        path: menu.Path,
        meta: { title: menu.Title },
        component: menu.Component
      })
    }
    if (menu.Children && menu.Children.length) {
      for (let route of menusToRoutes(menu.Children)) {
        routes.push(route)
      }
    }
  }
  return routes
}
