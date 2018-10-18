import ElementUI from 'element-ui'
import Vue, { VueConstructor } from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Vuex from 'vuex'
import { types } from './store/root'
import { MenuInfo } from './models'
import { frame, root } from './store'
import callback from './ui/oauth/callback'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(ElementUI)

export default class builder {
  private _callback: string
  private _modules: { [key: string]: any }
  private _menus: MenuInfo[]

  public Modules(modules: { [key: string]: frame.IFrame }): builder {
    this._modules = Object.assign({}, modules)
    return this
  }

  public Callback(callbackUrl: string): builder {
    this._callback = callbackUrl
    return this
  }

  public Menus(...menus: MenuInfo[]): builder {
    this._menus = menus || []
    return this
  }

  public Build(app: VueConstructor<Vue>, configs?: { el?: string }) {
    configs = Object.assign({ el: '#app' }, configs)
    let menus = this._menus
    let routes = menusToRoutes(menus)
    routes.push({
      path: this._callback,
      meta: { title: '登陆成功' },
      component: callback
    })
    const router = new VueRouter({ mode: 'history', routes })
    const states = new root.Root(menus, this._modules)
    const store = new Vuex.Store(states)

    router.afterEach((to, from) => {
      let paths = deepFind(menus, to.meta.uid)
      store.commit(types.mutations.ACTIVED_MENUS_RESET, paths)
    })

    return new Vue({
      el: configs.el,
      store,
      router,
      render: h => h(app)
    })
  }
}

function menusToRoutes(menus: MenuInfo[]): RouteConfig[] {
  let routes = new Array<RouteConfig>()
  for (let menu of menus || []) {
    if (menu.Component) {
      routes.push({
        path: menu.Path,
        meta: { title: menu.Title, uid: menu.uuid },
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

function deepFind(menus: MenuInfo[], uid: string): MenuInfo[] {
  if (menus && menus.length && uid) {
    for (let i = 0; i < menus.length; i++) {
      let menu = menus[i]
      if (menu.uuid === uid) {
        return [menu]
      }
      let child = deepFind(menu.Children, uid)
      if (child && child.length) {
        return [menu, ...child]
      }
    }
  }
  return []
}
