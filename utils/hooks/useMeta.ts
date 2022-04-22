import * as navMenu from '../../metas/navMenu.json'
import { Dispatch, SetStateAction, useState } from 'react'
interface INavItem {
    name: string
    href: string
}
interface INavMeta {
    nav?: INavItem[]
}
interface IMeta {
    [key: string]: INavMeta // additional type could be added as meta type grow
}
const metas: IMeta = { navMenu }

export function useMeta(metaName: string): [INavMeta | null, Dispatch<SetStateAction<string>>] {
    const [thisMetaName, setThisMetaName] = useState(metaName)
    return [metas[thisMetaName] ? metas[thisMetaName] : null, setThisMetaName]
}

