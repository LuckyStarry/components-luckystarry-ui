import { prefix } from '.'
const KEY_TOKEN = 'token'
const EMPTY_TOKEN = ''

export function set(token: string) {
  localStorage.setItem(`${prefix}_${KEY_TOKEN}`, token)
}

export function get(): string {
  let token = localStorage.getItem(`${prefix}_${KEY_TOKEN}`)
  if (!token) {
    return EMPTY_TOKEN
  }
  return token
}

export function clear() {
  localStorage.removeItem(`${prefix}_${KEY_TOKEN}`)
}
