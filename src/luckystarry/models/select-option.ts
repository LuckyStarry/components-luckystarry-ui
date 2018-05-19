export interface ISelectOption {
  readonly Text: string
  readonly Value: string
  readonly Desc: string
  readonly Icon: string
}

export class SelectOption implements ISelectOption {
  private _text: string
  private _value: string
  private _desc: string = ''
  private _icon: string = ''

  constructor(text: string, value: string, desc?: string, icon?: string) {
    this._text = text
    this._value = value
    this._desc = desc || ''
    this._icon = icon || ''
  }

  get Text(): string {
    return this._text
  }

  get Value(): string {
    return this._value
  }

  get Desc(): string {
    return this._desc
  }

  get Icon(): string {
    return this._icon
  }
}
