import { prefix } from '.'
import { LoginUser } from '../../models/login-user'
const KEY_TOKEN_USER = 'user'

function getKey(): string {
  return `${prefix}_${KEY_TOKEN_USER}`
}

export function set(user: LoginUser) {
  let key = getKey()
  if (key) {
    localStorage.setItem(key, JSON.stringify(user))
  }
}

export function get(): LoginUser {
  let key = getKey()
  if (key) {
    let json = localStorage.getItem(key)
    let user = JSON.parse(json)
    if (user) {
      return new LoginUser(user)
    }
  }
}

export function clear() {
  let key = getKey()
  if (key) {
    localStorage.removeItem(key)
  }
}

export function safty() {
  let keys = new Array<string>()
  let reg = new RegExp(`^${prefix}_${KEY_TOKEN_USER}`)
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i)
    if (key !== getKey() && reg.test(key)) {
      keys.push(key)
    }
  }
  if (keys && keys.length) {
    keys.forEach(k => localStorage.removeItem(k))
  }
}
