import { prefix } from './index'
const KEY_TOKEN = 'token'
const KEY_TOKEN_EXPIRE = 'token_expire'
const EMPTY_TOKEN = ''

export function set(token: string) {
  let tomorrow = new Date(new Date(new Date().getTime() + 86400000).getTime())
  localStorage.setItem(`${prefix}_${KEY_TOKEN}`, token)
  localStorage.setItem(
    `${prefix}_${KEY_TOKEN_EXPIRE}`,
    new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate())
      .getTime()
      .toString()
  )
}

export function get(): string {
  let token = localStorage.getItem(`${prefix}_${KEY_TOKEN}`)
  if (!token) {
    return EMPTY_TOKEN
  }
  let expire = parseInt(
    localStorage.getItem(`${prefix}_${KEY_TOKEN_EXPIRE}`),
    10
  )
  if (isNaN(expire)) {
    return EMPTY_TOKEN
  } else if (expire < new Date().getTime()) {
    return EMPTY_TOKEN
  }
  return token
}

export function clear() {
  localStorage.removeItem(`${prefix}_${KEY_TOKEN}`)
  localStorage.removeItem(`${prefix}_${KEY_TOKEN_EXPIRE}`)
}
