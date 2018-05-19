import { Entity } from './entity'
import Vue, { ComponentOptions, AsyncComponent } from 'vue'
export class MenuInfo extends Entity<number> {
  Title: string
  Path: string
  Link: string
  Icon: string
  Children: MenuInfo[]
  Component: ComponentOptions<Vue> | typeof Vue | AsyncComponent
  Hidden: boolean

  constructor(info: {
    Title: string
    Path: string
    Link?: string
    Icon?: string
    Children?: MenuInfo[]
    Component?: ComponentOptions<Vue> | typeof Vue | AsyncComponent
    Hidden?: boolean
  }) {
    super(
      Object.assign(
        {
          Title: '',
          Icon: '',
          Link: '',
          Children: [],
          Hidden: false
        },
        info
      )
    )
  }
}
