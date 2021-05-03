/// <reference path="index.d.ts" />
// ===========================================================

import { compact, fromPairs, keys, omit } from 'lodash'
// ===========================================================

class tailwind_classes_parcer {
  /*!*/ private obj: Argument

  constructor (obj: Argument) {
    this.obj = obj
  }

  public result (): object {
    const result = keys(this.obj).map(key => {
      return [key, this._handleValue(this.obj[key])]
    })

    return fromPairs(result)
  }

  private _handleValue (value: PropValue<string|object>): string {
    switch (typeof value) {
      case 'string':
        return value ? value : undefined
      case 'function':
        const result = value()
        return result ? result : undefined
      case 'object':
        return this._handleObject(value)
      default:
        return undefined
    }
  }

  private _handleObject (obj: PropValue<object>): string {
    const variants = omit(obj, ['base', 'custom'])

    const withPrefix = keys(variants).map(key => {
      const value: string = this._handleValue(variants[key])
      const result = value.match(/[\S]+/gi).map(el => `${key}:${el}`)
      return result.join(' ')
    }).join(' ')

    return compact([this._handleValue(obj.base), withPrefix, obj.custom]).join(' ')
  }

}

export = function (obj: Argument): object {
  return new tailwind_classes_parcer(obj).result()
} 
