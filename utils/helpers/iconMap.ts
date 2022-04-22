import * as iconsImport from '@fortawesome/free-solid-svg-icons';
import * as regularIconsImport from '@fortawesome/free-regular-svg-icons';
import * as brandIconsImport from "@fortawesome/free-brands-svg-icons"
import { camelCase, upperFirst } from 'lodash';

type iconType = any
interface IIcons {
    [key: string]: iconType
}

let iconsImportVar: IIcons = iconsImport
let brandIconsImportVar: IIcons = brandIconsImport
let regularIconsImportVar: IIcons = regularIconsImport
export function iconMap(name: string): iconType {

    let icon = iconsImportVar[`fa${upperFirst(camelCase(name))}`];
    if (icon == null || icon == undefined) {
        icon = brandIconsImportVar[`fa${upperFirst(camelCase(name))}`];
    }
    if (icon == null || icon == undefined) {
        icon = regularIconsImportVar[`fa${upperFirst(camelCase(name))}`];
    }
    return icon
}
