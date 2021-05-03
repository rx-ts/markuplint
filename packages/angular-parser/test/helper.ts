/* eslint-disable @typescript-eslint/ban-types */

import { parse } from 'markuplint-angular-parser'

const map = new WeakMap<object, true>()

const deleteKeys = <T extends object>(node: T, keys: string[]) => {
  for (const key of keys) {
    delete node[key as keyof T]
  }
  return node
}

export const _cleanParse = <T extends object>(nodes: T) => {
  for (const _key of Object.keys(nodes)) {
    const key = _key as keyof T

    const node = (nodes[key] as unknown) as object | null

    if (!node || typeof node !== 'object' || map.get(node)) {
      continue
    }

    map.set(node, true)

    _cleanParse(
      deleteKeys(node, [
        'uuid',
        'childNodes',
        'parentNode',
        'prevNode',
        'nextNode',
        'pearNode',
      ]),
    )
  }

  return nodes
}

export const cleanParse = (text: string) => _cleanParse(parse(text))
