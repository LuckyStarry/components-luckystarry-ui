import { MenuInfo } from 'luckystarry/models'
import { frame } from 'luckystarry/store'
import UI from './ui'
export class System extends frame.Frame {
  constructor() {
    super({
      modules: {
        ui: new UI()
      }
    })
  }
}
