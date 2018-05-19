export function jsonp(url): Promise<string> {
  return new Promise((resolve, reject) => {
    let funcId = `luckystarry_jsonp_${new Date().getTime()}`
    window[funcId] = result => {
      resolve(result)
      let getId = document.getElementById(funcId)
      getId.parentNode.removeChild(getId)
      window[funcId] = null
    }

    let script = document.createElement('script')
    script.setAttribute('id', funcId)
    script.setAttribute('src', url + '?callback=' + funcId)
    script.setAttribute('type', 'text/javascript')
    document.body.appendChild(script)
  })
}
