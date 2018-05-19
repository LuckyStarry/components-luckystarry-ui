import { prefix } from './index'
import * as token from './token'
import { LoginUser } from 'luckystarry/models/login-user'
const KEY_TOKEN_USER = 'user'

function getKey(): string {
  let _token = token.get()
  if (_token) {
    return `${prefix}_${KEY_TOKEN_USER}_${_token}`
  }
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
  let reg = new RegExp(`^${prefix}_${KEY_TOKEN_USER}_.*`)
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
