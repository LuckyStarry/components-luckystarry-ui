import { MenuInfo } from 'luckystarry/models'
import { Frame } from 'luckystarry/store'
import UI from './ui'
export class System extends Frame {
  constructor(configs: { menus: MenuInfo[] }) {
    super({
      modules: {
        ui: new UI(configs)
      }
    })
  }
}
