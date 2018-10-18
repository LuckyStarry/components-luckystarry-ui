interface IOptions {
  state?: () => any
  actions?: any
  getters?: any
  mutations?: any
  modules?: any
}

export function OptionsMerge<T extends IOptions, U extends IOptions>(
  base: T,
  extra: U
): T & U {
  let options = {} as T & U
  extra = extra || ({} as U)
  options.state = () =>
    merge(base.state ? base.state() : {}, extra.state ? extra.state() : {})
  options.actions = merge(base.actions, extra.actions)
  options.getters = merge(base.getters, extra.getters)
  options.mutations = merge(base.mutations, extra.mutations)
  options.modules = merge(base.modules, extra.modules)
  return options
}

function merge(base, extra) {
  let result = {}
  for (let key of getKeys(base)) {
    result[key] = base[key]
  }
  for (let key of getKeys(extra)) {
    result[key] = extra[key]
  }
  return result
}

function getKeys(obj: any): string[] {
  if (obj) {
    let keys = Object.keys(obj)
    return keys.concat(getKeys(obj.__proto__)).filter(n => n !== 'constructor')
  } else {
    return []
  }
}
